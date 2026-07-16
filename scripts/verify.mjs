// Visual + console verification harness. Stands in for Chrome DevTools MCP.
// Usage: node scripts/verify.mjs           (dev/prod server already on :3000)
//        REDUCED=1 node scripts/verify.mjs (emulate prefers-reduced-motion)
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.VERIFY_URL ?? "http://localhost:3000";
const REDUCED = process.env.REDUCED === "1";
const WIDTHS = [1280, 768, 360];
const OUT = "verify-shots";
fs.mkdirSync(OUT, { recursive: true });

// Hotspot probe points at the 1280x800 viewport, derived from the seed
// rects in components/hero/hotspots.ts via the cover math (s=1.111,
// dw=1422, ox=-71, oy=0). Re-derive if the rects are re-tuned.
//   iron beam worker A {u:.36,v:.20,w:.08,h:.18} -> x 441..555, y 160..304
//   cold point (150,650) is far outside every iron rect plus margins
//   orchard crew cluster {u:.42,v:.56,w:.22,h:.24} -> center ~(683,544)
const IRON_HOT = { x: 500, y: 230 };
const COLD = { x: 150, y: 650 };
const ORCHARD_HOT = { x: 683, y: 544 };
const WORDMARK_CENTER = { x: 640, y: 496 }; // 62svh optical center

const summary = [];
const browser = await chromium.launch();

for (const width of WIDTHS) {
  const tag = REDUCED ? `${width}-reduced` : `${width}`;
  const page = await browser.newPage({
    viewport: { width, height: 800 },
    reducedMotion: REDUCED ? "reduce" : "no-preference",
  });
  const consoleMsgs = [];
  const pageErrors = [];
  const checks = [];
  const check = (name, pass, detail = "") =>
    checks.push({ name, pass, detail });
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") {
      consoleMsgs.push({ type: m.type(), text: m.text().slice(0, 500) });
    }
  });
  page.on("pageerror", (e) => pageErrors.push(String(e)));

  const video = () =>
    page.evaluate(() => {
      const v = document.querySelector("[data-hero-root] video");
      return v ? { paused: v.paused, rate: v.playbackRate, t: v.currentTime } : null;
    });
  const ringState = () =>
    page.evaluate(() => {
      const ring = document.querySelector("[data-lens-ring]");
      const stage = document.querySelector("[data-hero-stage]");
      return {
        opacity: ring ? parseFloat(getComputedStyle(ring).opacity) : null,
        converting: ring ? ring.hasAttribute("data-converting") : null,
        lr: stage
          ? parseFloat(getComputedStyle(stage).getPropertyValue("--lr"))
          : null,
      };
    });
  const seekPlay = (t) =>
    page.evaluate((time) => {
      const v = document.querySelector("[data-hero-root] video");
      if (v) {
        v.currentTime = time;
        v.play().catch(() => {});
      }
    }, t);

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(3000); // fonts + the ~2s wordmark entrance settle

  await page.screenshot({ path: `${OUT}/${tag}-load.png` });

  const hasHero = await page.evaluate(
    () => !!document.querySelector("[data-hero-root]"),
  );
  if (hasHero) {
    // The old entrance artifacts must not exist in any mode.
    const noScan = await page.evaluate(
      () =>
        !document.querySelector("[data-scan-line]") &&
        !document.querySelector("[data-wordmark-hi]"),
    );
    check("no-scan-line", noScan);

    if (!REDUCED) {
      const wm = await page.evaluate(() => {
        const el = document.querySelector("[data-wordmark-text]");
        return el ? parseFloat(getComputedStyle(el).opacity) : null;
      });
      check("wordmark-resolved", wm !== null && wm >= 0.99, `opacity=${wm}`);
    }

    // The hero pins for 300% of the viewport height: p -> scrollY = p*3*vh.
    const scrollToP = async (p) => {
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: "instant" }),
        Math.round(800 * 3 * p),
      );
    };

    if (!REDUCED && width >= 1024) {
      // Passive lens over a drone establisher + the robotic wordmark
      // variant visible inside the circle.
      await seekPlay(8.0);
      await page.mouse.move(WORDMARK_CENTER.x, WORDMARK_CENTER.y);
      await page.waitForTimeout(700);
      let v = await video();
      let r = await ringState();
      check(
        "est-passive",
        v.rate >= 0.95 &&
          r.opacity > 0.45 &&
          r.opacity < 0.75 &&
          r.lr > 38 &&
          r.lr < 50,
        JSON.stringify({ rate: v.rate, ...r }),
      );
      const lensWord = await page.evaluate(() => {
        const el = document.querySelector("[data-lens-word]");
        if (!el) return null;
        const cs = getComputedStyle(el);
        const mask = cs.maskImage || cs.webkitMaskImage || "";
        return { opacity: parseFloat(cs.opacity), radial: mask.includes("radial-gradient") };
      });
      check(
        "lens-word-visible",
        lensWord !== null && lensWord.opacity >= 0.99 && lensWord.radial,
        JSON.stringify(lensWord),
      );
      await page.screenshot({ path: `${OUT}/${tag}-hero-lens-word.png` });

      // Slow motion engages ONLY over a worker figure. Rate target is
      // 0.5x and the focus veil must be up while engaged.
      await seekPlay(10.8);
      await page.mouse.move(IRON_HOT.x, IRON_HOT.y);
      await page.waitForTimeout(900);
      v = await video();
      r = await ringState();
      const veilOn = await page.evaluate(() => {
        const el = document.querySelector("[data-focus-veil]");
        return el ? parseFloat(getComputedStyle(el).opacity) : null;
      });
      check(
        "hotspot-engaged",
        v.rate >= 0.4 &&
          v.rate <= 0.6 &&
          r.lr > 62 &&
          r.lr < 74 &&
          veilOn !== null &&
          veilOn > 0.8,
        JSON.stringify({ rate: v.rate, lr: r.lr, veil: veilOn }),
      );
      await page.screenshot({ path: `${OUT}/${tag}-hero-lens-slowmo.png` });

      // Near miss: a point just past the figure's edge, where the old
      // generous geometry kept slow motion engaged. It must release.
      await page.mouse.move(610, 230);
      await page.waitForTimeout(1000);
      v = await video();
      const veilNear = await page.evaluate(() => {
        const el = document.querySelector("[data-focus-veil]");
        return el ? parseFloat(getComputedStyle(el).opacity) : null;
      });
      check(
        "near-miss-releases",
        v.rate >= 0.95 && veilNear !== null && veilNear < 0.1,
        JSON.stringify({ rate: v.rate, veil: veilNear }),
      );

      // THE regression: moving the circle off the figure, still on the
      // film during a worker block, must release the slow motion while
      // the ring stays armed and the veil drops. Re-seek first: the
      // near-miss step consumed most of the iron block's runtime.
      await seekPlay(10.8);
      await page.mouse.move(COLD.x, COLD.y);
      await page.waitForTimeout(1000);
      v = await video();
      r = await ringState();
      const veilOff = await page.evaluate(() => {
        const el = document.querySelector("[data-focus-veil]");
        return el ? parseFloat(getComputedStyle(el).opacity) : null;
      });
      check(
        "off-figure-release",
        v.rate >= 0.95 &&
          r.opacity >= 0.9 &&
          r.lr > 54 &&
          r.lr < 66 &&
          veilOff !== null &&
          veilOff < 0.1,
        JSON.stringify({ rate: v.rate, ...r, veil: veilOff }),
      );

      // A block change under a stationary cursor must release too.
      await page.mouse.move(IRON_HOT.x, IRON_HOT.y);
      await page.waitForTimeout(700);
      await seekPlay(8.0);
      await page.waitForTimeout(1000);
      v = await video();
      r = await ringState();
      check(
        "block-change-release",
        v.rate >= 0.95 && r.opacity <= 0.75,
        JSON.stringify({ rate: v.rate, ...r }),
      );

      // Window blur releases instantly.
      await seekPlay(10.8);
      await page.mouse.move(IRON_HOT.x, IRON_HOT.y);
      await page.waitForTimeout(700);
      await page.evaluate(() => window.dispatchEvent(new Event("blur")));
      await page.waitForTimeout(250);
      v = await video();
      check("blur-release", v.rate >= 0.95, `rate=${v.rate}`);

      // Scrolling retires the lens entirely.
      await page.mouse.move(IRON_HOT.x + 4, IRON_HOT.y + 4); // recover from blur
      await page.waitForTimeout(700);
      await scrollToP(0.15);
      await page.waitForTimeout(900);
      v = await video();
      r = await ringState();
      check(
        "lens-retired",
        v.rate >= 0.95 && r.opacity === 0,
        JSON.stringify({ rate: v.rate, opacity: r.opacity }),
      );
    }

    await scrollToP(0.28);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${tag}-hero-beat-one.png` });

    // Conversion band: the lens circle expands past the corners while
    // the film runs at half speed.
    await scrollToP(0.47);
    await page.waitForTimeout(800);
    if (!REDUCED) {
      const v = await video();
      const r = await ringState();
      check(
        "conversion-mid",
        v.paused === false &&
          v.rate >= 0.4 &&
          v.rate <= 0.6 &&
          r.lr > 300 &&
          r.opacity > 0.8 &&
          r.converting === true,
        JSON.stringify({ rate: v.rate, paused: v.paused, ...r }),
      );
      if (width < 1024) {
        const treat = await page.evaluate(() => {
          const el = document.querySelector("[data-hero-treat]");
          const stage = document.querySelector("[data-hero-stage]");
          if (!el || !stage) return null;
          const cs = getComputedStyle(el);
          const mask = cs.maskImage || cs.webkitMaskImage || "";
          return {
            radial: mask.includes("radial-gradient"),
            lx: parseFloat(getComputedStyle(stage).getPropertyValue("--lx")),
            ly: parseFloat(getComputedStyle(stage).getPropertyValue("--ly")),
            w: stage.clientWidth,
            h: stage.clientHeight,
          };
        });
        check(
          "mobile-conversion-origin",
          treat !== null &&
            treat.radial &&
            Math.abs(treat.lx - treat.w * 0.5) < 4 &&
            Math.abs(treat.ly - treat.h * 0.72) < 4,
          JSON.stringify(treat),
        );
      }
    } else {
      const treat = await page.evaluate(() => {
        const el = document.querySelector("[data-hero-treat]");
        return el ? parseFloat(getComputedStyle(el).opacity) : null;
      });
      check(
        "reduced-treat-mid",
        treat !== null && treat > 0.3 && treat < 0.7,
        `opacity=${treat}`,
      );
      const r = await ringState();
      check("reduced-lr-static", r.lr === 60, `lr=${r.lr}`);
    }
    await page.screenshot({ path: `${OUT}/${tag}-hero-conversion-mid.png` });

    await scrollToP(0.75);
    await page.waitForTimeout(900);
    if (!REDUCED) {
      const v = await video();
      const r = await ringState();
      check(
        "post-conversion",
        v.paused === false && v.rate >= 0.95 && r.opacity === 0 && r.lr > 500,
        JSON.stringify({ rate: v.rate, paused: v.paused, ...r }),
      );
    } else {
      const tagState = await page.evaluate(() => {
        const robot = document.querySelector("[data-tag-robot]");
        return robot ? parseFloat(getComputedStyle(robot).opacity) : null;
      });
      check(
        "reduced-robot-tag",
        tagState !== null && tagState > 0.9,
        `opacity=${tagState}`,
      );
    }
    await page.screenshot({ path: `${OUT}/${tag}-hero-post-conversion.png` });

    // Orchard divergence: the re-cut closer has humans on top and robots
    // in the lens circle.
    if (!REDUCED && width >= 1024) {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.waitForTimeout(600);
      await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        if (v) {
          v.pause();
          v.currentTime = 24.0;
        }
      });
      await page.waitForTimeout(500);
      await page.mouse.move(ORCHARD_HOT.x, ORCHARD_HOT.y);
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/${tag}-hero-orchard-lens.png` });
      await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        if (v) v.play().catch(() => {});
      });
    }

    await page.evaluate(() =>
      window.scrollTo({ top: Math.round(800 * 3.1), behavior: "instant" }),
    );
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${tag}-hero-post-pin.png` });
  }

  // Rig states: mid-scrub and final frame. The pin block only exists on
  // desktop motion mode; smaller widths render the static rig and skip.
  const rig = await page.evaluate(() => {
    const pin = document.querySelector(".rig-pin");
    if (!pin) return null;
    const rect = pin.getBoundingClientRect();
    return { top: window.scrollY + rect.top, height: pin.offsetHeight };
  });
  if (rig) {
    await page.evaluate(
      (t) => window.scrollTo({ top: t, behavior: "instant" }),
      rig.top + 800 * 1.2,
    );
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${tag}-rig-mid.png` });

    await page.evaluate(
      (t) => window.scrollTo({ top: t, behavior: "instant" }),
      rig.top + rig.height - 800,
    );
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${tag}-rig-final.png` });
  } else {
    const found = await page.evaluate(() => {
      const el = document.querySelector("#rig");
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      window.scrollTo({
        top: Math.max(window.scrollY + rect.top - 100, 0),
        behavior: "instant",
      });
      return true;
    });
    if (found) {
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${OUT}/${tag}-rig-static.png` });
    }
  }

  // Step-scroll the full page to fire every ScrollTrigger.
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= total; y += 400) {
    await page.evaluate(
      (t) => window.scrollTo({ top: t, behavior: "instant" }),
      y,
    );
    await page.waitForTimeout(90);
  }
  await page.screenshot({ path: `${OUT}/${tag}-bottom.png` });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(800);

  const overflow = await page.evaluate(() => {
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 10)
      .map(
        (el) =>
          `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}.${String(el.className).slice(0, 80)}`,
      );
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
      wideElements: wide,
    };
  });

  await page.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
  summary.push({
    width,
    reduced: REDUCED,
    consoleMsgs,
    pageErrors,
    overflow,
    checks,
  });
  await page.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/summary.json`, JSON.stringify(summary, null, 2));

const bad = summary.filter(
  (s) =>
    s.pageErrors.length > 0 ||
    s.overflow.hasOverflow ||
    s.consoleMsgs.some((m) => m.type === "error") ||
    s.checks.some((c) => !c.pass),
);
console.log(
  JSON.stringify(
    summary.map(({ width, consoleMsgs, pageErrors, overflow, checks }) => ({
      width,
      errors: consoleMsgs.filter((m) => m.type === "error").length,
      warnings: consoleMsgs.filter((m) => m.type === "warning").length,
      pageErrors: pageErrors.length,
      hasOverflow: overflow.hasOverflow,
      checks: checks.map(
        (c) => `${c.pass ? "ok" : "FAIL"}:${c.name}${c.pass ? "" : ` ${c.detail}`}`,
      ),
    })),
    null,
    2,
  ),
);
console.log(bad.length ? "FAIL" : "PASS");
process.exit(bad.length ? 1 : 0);
