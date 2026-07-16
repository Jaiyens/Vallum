// Measures the Helix, it never just looks.
//
// This defect shipped once because the last build looked at the centerpiece
// once, at rest, and the text was legible only by the luck of a dark panel
// behind it. This script drives the ring through 12 azimuth angles and, at
// each one, blanks the centerpiece text, screenshots the glass band, and
// measures the WCAG contrast between bone text and the mean luminance of the
// band behind it. Every angle must clear 4.5:1. It also runs the frame-time
// check on the focus blur and the 375 touch-scroll trace.
//
// Usage: node nightshift/scripts/helix-contrast.mjs
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const BASE = process.env.NS_BASE || "http://localhost:3001";
const OUT = "nightshift/scripts/out";

const srgbToLinear = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const relLum = (r, g, b) =>
  0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
const contrast = (l1, l2) =>
  (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
const BONE_L = relLum(242, 238, 229); // #F2EEE5, the centerpiece text color

async function measureFPS(page, ms = 1000) {
  return page.evaluate(
    (dur) =>
      new Promise((res) => {
        let frames = 0;
        const t0 = performance.now();
        const loop = () => {
          frames += 1;
          const dt = performance.now() - t0;
          if (dt < dur) requestAnimationFrame(loop);
          else res(Math.round((frames * 1000) / dt));
        };
        requestAnimationFrame(loop);
      }),
    ms,
  );
}

async function bandStats(buf) {
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let R = 0,
    G = 0,
    B = 0;
  const n = width * height;
  // Column luminance, to catch a bright vertical streak (blurred surf) that a
  // full-region mean would average away.
  const colLum = new Float64Array(width);
  const colCount = new Float64Array(width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = (y * width + x) * channels;
      const r = data[p],
        g = data[p + 1],
        b = data[p + 2];
      R += r;
      G += g;
      B += b;
      colLum[x] += relLum(r, g, b);
      colCount[x] += 1;
    }
  }
  R /= n;
  G /= n;
  B /= n;
  // Brightest 24px-wide window of columns.
  const win = Math.min(24, width);
  let worst = 0;
  for (let x = 0; x + win <= width; x++) {
    let s = 0;
    for (let k = 0; k < win; k++) s += colLum[x + k] / colCount[x + k];
    const m = s / win;
    if (m > worst) worst = m;
  }
  const meanL = relLum(R, G, B);
  return {
    meanRGB: [Math.round(R), Math.round(G), Math.round(B)],
    meanLum: +meanL.toFixed(4),
    worstLum: +worst.toFixed(4),
    meanContrast: +contrast(BONE_L, meanL).toFixed(2),
    worstContrast: +contrast(BONE_L, worst).toFixed(2),
  };
}

const blankText = (page) =>
  page.evaluate(() => {
    const t = document.querySelector("[data-centerpiece-text]");
    if (t) {
      t.setAttribute("data-saved", t.textContent || "");
      t.textContent = "";
    }
    document
      .querySelectorAll(".gallery-caret")
      .forEach((c) => (c.style.visibility = "hidden"));
  });
const restoreText = (page) =>
  page.evaluate(() => {
    const t = document.querySelector("[data-centerpiece-text]");
    if (t && t.getAttribute("data-saved") !== null) {
      t.textContent = t.getAttribute("data-saved");
      t.removeAttribute("data-saved");
    }
    document
      .querySelectorAll(".gallery-caret")
      .forEach((c) => (c.style.visibility = ""));
  });

async function desktop(browser, report) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const stage = await page.$("[data-helix-stage]");
  if (!stage) {
    report.errors.push("no [data-helix-stage] at 1440; helix did not mount");
    await ctx.close();
    return;
  }
  await stage.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  report.beforeFocusFPS = await measureFPS(page); // auto-rotating

  const hasHook = await page.evaluate(() => !!window.__helix);
  if (!hasHook) report.errors.push("window.__helix hook missing");

  for (let i = 0; i < 12; i++) {
    const deg = i * 30;
    await page.evaluate((d) => window.__helix?.setRotation(d), deg);
    await page.waitForTimeout(260);
    await page.screenshot({ path: `${OUT}/helix-rot-${String(i).padStart(2, "0")}.png` });
    const box = await page.$eval("[data-centerpiece-band]", (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    // The footprint of the actual glyphs (the ghost reserves it even when the
    // text is blanked), so we measure what sits behind the text, not the band's
    // bright edges where no text ever lands.
    const tbox = await page.$eval("[data-centerpiece-textbox]", (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    await blankText(page);
    await page.waitForTimeout(80);
    const toClip = (b) => ({
      x: Math.max(0, Math.round(b.x)),
      y: Math.max(0, Math.round(b.y)),
      width: Math.min(Math.round(b.w), 1440 - Math.max(0, Math.round(b.x))),
      height: Math.max(1, Math.round(b.h)),
    });
    const bandBuf = await page.screenshot({ clip: toClip(box) });
    const textBuf = await page.screenshot({ clip: toClip(tbox) });
    await restoreText(page);
    await sharp(bandBuf).toFile(`${OUT}/band-${String(i).padStart(2, "0")}.png`);
    const band = await bandStats(bandBuf);
    const text = await bandStats(textBuf);
    report.angles.push({
      deg,
      meanRGB: band.meanRGB,
      meanLum: band.meanLum,
      meanContrast: band.meanContrast,
      worstContrast: band.worstContrast,
      textMeanContrast: text.meanContrast,
      textWorstContrast: text.worstContrast,
    });
  }

  // Focus blur frame cost. Front panel 0, then open it programmatically (the
  // 3D panels overlap on screen, so a hit-tested click is unreliable in the
  // harness; a synthetic click still runs the real React handler).
  await page.evaluate((d) => window.__helix?.setRotation(d), 0);
  await page.waitForTimeout(300);
  const opened = await page.evaluate(() => {
    const btn = document.querySelector('[data-panel-index="0"] button');
    if (!btn) return false;
    btn.click();
    return true;
  });
  if (opened) {
    await page.waitForSelector("[data-takeover]", { timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUT}/helix-focus.png` });
    report.focusFPS = await measureFPS(page);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
  } else {
    report.errors.push("could not open focus state (panel 0 button missing)");
  }

  await ctx.close();
}

async function mobile375(browser, report) {
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const section = await page.$("#problem");
  if (!section) {
    report.errors.push("no #problem section at 375");
    await ctx.close();
    return;
  }
  // Bring the section near the top so there is page below it to scroll into.
  await page.evaluate(() => {
    const s = document.getElementById("problem");
    if (s) window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - 40);
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/mobile-375.png` });

  const rowBox = await page
    .$eval(".gallery-row", (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    })
    .catch(() => null);

  const client = await ctx.newCDPSession(page);
  // synthesizeScrollGesture drives a real touch scroll (gestureSourceType
  // touch), including the scroll-chaining from a scroll container up to the
  // page that raw dispatchTouchEvent never simulates. yDistance positive
  // scrolls the content up (finger down); negative scrolls content down.
  const scrollGesture = (x, y, xDistance, yDistance) =>
    client.send("Input.synthesizeScrollGesture", {
      x: Math.round(x),
      y: Math.round(y),
      xDistance,
      yDistance,
      gestureSourceType: "touch",
      speed: 800,
    });

  // Control: a vertical touch scroll on a neutral point above the row proves
  // the harness can scroll the page at all.
  {
    const y0 = rowBox ? Math.max(120, rowBox.y - 120) : 200;
    const before = await page.evaluate(() => window.scrollY);
    await scrollGesture(187, y0, 0, -260);
    await page.waitForTimeout(600);
    const after = await page.evaluate(() => window.scrollY);
    report.touch.controlVertical = { pageScrolled: Math.round(after - before) };
    await page.evaluate(() => {
      const s = document.getElementById("problem");
      if (s) window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - 40);
    });
    await page.waitForTimeout(400);
  }

  // Vertical touch scroll that STARTS inside the gallery row: the section must
  // not eat it, the page must scroll.
  if (rowBox) {
    const cx = rowBox.x + rowBox.w / 2;
    const cy = rowBox.y + rowBox.h / 2;
    const before = await page.evaluate(() => window.scrollY);
    await scrollGesture(cx, cy, 0, -260); // finger up => page scrolls down
    await page.waitForTimeout(600);
    const after = await page.evaluate(() => window.scrollY);
    report.touch.verticalStartInRow = {
      scrollBefore: Math.round(before),
      scrollAfter: Math.round(after),
      pageScrolled: Math.round(after - before),
    };

    // Horizontal touch inside the row: the row should scroll, the page must
    // not. Raw touch events (not synthesizeScrollGesture) so scroll-snap does
    // not settle the row back to zero mid-measurement.
    const rowLeftBefore = await page.$eval(".gallery-row", (el) => el.scrollLeft);
    const pageBefore = await page.evaluate(() => window.scrollY);
    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: cx + 120, y: cy }],
    });
    for (let i = 1; i <= 10; i++) {
      await client.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: cx + 120 - i * 22, y: cy }],
      });
      await page.waitForTimeout(12);
    }
    const rowLeftMid = await page.$eval(".gallery-row", (el) => el.scrollLeft);
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    const pageAfter = await page.evaluate(() => window.scrollY);
    const rowOverflow = await page.$eval(".gallery-row", (el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    report.touch.horizontalInRow = {
      rowScrolled: Math.round(rowLeftMid - rowLeftBefore),
      pageMoved: Math.round(pageAfter - pageBefore),
      // Structural proof the row scrolls on x; the synthetic-touch scrollLeft
      // reading is unreliable against scroll-snap, so this is the honest check.
      rowHorizontallyScrollable: rowOverflow.scrollWidth > rowOverflow.clientWidth,
      scrollWidth: rowOverflow.scrollWidth,
      clientWidth: rowOverflow.clientWidth,
    };
  } else {
    report.errors.push("no .gallery-row at 375");
  }

  report.mobileFPS = await measureFPS(page);
  await ctx.close();
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = {
    base: BASE,
    boneLuminance: +BONE_L.toFixed(4),
    contrastFloor: 4.5,
    angles: [],
    touch: {},
    errors: [],
  };
  try {
    await desktop(browser, report);
  } catch (e) {
    report.errors.push("desktop pass threw: " + (e?.message || String(e)));
  }
  try {
    await mobile375(browser, report);
  } catch (e) {
    report.errors.push("mobile pass threw: " + (e?.message || String(e)));
  }
  await browser.close();

  report.minMeanContrast = report.angles.length
    ? Math.min(...report.angles.map((a) => a.meanContrast))
    : null;
  report.minWorstContrast = report.angles.length
    ? Math.min(...report.angles.map((a) => a.worstContrast))
    : null;
  report.allAnglesPassMean =
    report.angles.length === 12 && report.angles.every((a) => a.meanContrast >= 4.5);

  await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));

  report.minTextMeanContrast = report.angles.length
    ? Math.min(...report.angles.map((a) => a.textMeanContrast))
    : null;
  report.minTextWorstContrast = report.angles.length
    ? Math.min(...report.angles.map((a) => a.textWorstContrast))
    : null;
  report.allAnglesPassTextWorst =
    report.angles.length === 12 && report.angles.every((a) => a.textWorstContrast >= 4.5);

  console.log("\n=== Helix contrast (bone text vs band behind it) ===");
  console.log("  angle | full-band mean | behind-text mean | behind-text worst");
  for (const a of report.angles)
    console.log(
      `  ${String(a.deg).padStart(3)}deg |     ${String(a.meanContrast).padStart(6)}:1 |       ${String(a.textMeanContrast).padStart(6)}:1 |       ${String(a.textWorstContrast).padStart(6)}:1`,
    );
  console.log(`  min full-band mean   : ${report.minMeanContrast}:1  (charter metric)`);
  console.log(`  min behind-text mean : ${report.minTextMeanContrast}:1`);
  console.log(`  min behind-text worst: ${report.minTextWorstContrast}:1`);
  console.log(`  all 12 clear 4.5 (charter mean metric): ${report.allAnglesPassMean}`);
  console.log(`  all 12 clear 4.5 (behind-text worst)  : ${report.allAnglesPassTextWorst}`);
  console.log("\n=== Frame time ===");
  console.log(`  desktop auto-rotate : ${report.beforeFocusFPS} fps`);
  console.log(`  desktop focus blur  : ${report.focusFPS} fps`);
  console.log(`  mobile 375          : ${report.mobileFPS} fps`);
  console.log("\n=== Touch scroll at 375 ===");
  console.log(`  vertical swipe in row -> page scrolled: ${report.touch.verticalStartInRow?.pageScrolled}px`);
  console.log(`  horizontal swipe in row -> row: ${report.touch.horizontalInRow?.rowScrolled}px, page: ${report.touch.horizontalInRow?.pageMoved}px`);
  if (report.errors.length) console.log("\n  errors:", report.errors);
  console.log(`\n  wrote ${OUT}/report.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
