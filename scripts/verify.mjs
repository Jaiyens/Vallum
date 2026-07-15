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
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") {
      consoleMsgs.push({ type: m.type(), text: m.text().slice(0, 500) });
    }
  });
  page.on("pageerror", (e) => pageErrors.push(String(e)));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(1600); // fonts + the 900ms wordmark entrance settle

  await page.screenshot({ path: `${OUT}/${tag}-load.png` });

  // Hero pin states. The hero pins for about 100vh from the top of the
  // page, so viewport-height offsets from 0 land inside and past the pin.
  // Selectors are defensive: every state skips cleanly while the hero is
  // not built yet.
  const hasHero = await page.evaluate(
    () => !!document.querySelector("[data-hero-root]"),
  );
  if (hasHero) {
    await page.evaluate(() =>
      window.scrollTo({ top: window.innerHeight * 0.5, behavior: "instant" }),
    );
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${tag}-hero-mid-pin.png` });

    await page.evaluate(() =>
      window.scrollTo({ top: window.innerHeight * 1.05, behavior: "instant" }),
    );
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${tag}-hero-post-wipe.png` });

    // Cursor lens reveal: desktop, motion mode only. A real mouse move to
    // viewport center must light the reveal layer and the lens ring. The
    // video pauses on a real block first (11.5s = LOAD-BEARING iron) so
    // the human and robot halves are visibly different in the shot.
    if (width >= 1024 && !REDUCED) {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        if (v) {
          v.pause();
          v.currentTime = 11.5;
        }
      });
      await page.waitForTimeout(500); // seek + repaint
      // Aim at the beam crew upper left of center: at 11.5s the human
      // and robot plates visibly differ there, so the reveal is provable
      // in the screenshot.
      await page.mouse.move(Math.round(width * 0.4), 240);
      await page.waitForTimeout(450); // quickTo settle
      await page.screenshot({ path: `${OUT}/${tag}-hero-lens.png` });
      await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        if (v) v.play().catch(() => {});
      });
    }
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
    // Static rig fallback shot so every width still documents the section.
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
  summary.push({ width, reduced: REDUCED, consoleMsgs, pageErrors, overflow });
  await page.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/summary.json`, JSON.stringify(summary, null, 2));

const bad = summary.filter(
  (s) =>
    s.pageErrors.length > 0 ||
    s.overflow.hasOverflow ||
    s.consoleMsgs.some((m) => m.type === "error"),
);
console.log(
  JSON.stringify(
    summary.map(({ width, consoleMsgs, pageErrors, overflow }) => ({
      width,
      errors: consoleMsgs.filter((m) => m.type === "error").length,
      warnings: consoleMsgs.filter((m) => m.type === "warning").length,
      pageErrors: pageErrors.length,
      hasOverflow: overflow.hasOverflow,
    })),
    null,
    2,
  ),
);
console.log(bad.length ? "FAIL" : "PASS");
process.exit(bad.length ? 1 : 0);
