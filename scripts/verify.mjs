// Visual + console verification harness. Stands in for Chrome DevTools MCP.
// Usage: node scripts/verify.mjs           (dev/prod server already on :3000)
//        REDUCED=1 node scripts/verify.mjs (emulate prefers-reduced-motion)
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.VERIFY_URL ?? "http://localhost:3000";
const REDUCED = process.env.REDUCED === "1";
const WIDTHS = [1280, 768, 360];
const OUT = ".verify";
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
  await page.waitForTimeout(1200); // fonts + load-in animations settle

  await page.screenshot({ path: `${OUT}/${tag}-top.png` });

  // hero mid-scrub states
  for (const [name, factor] of [["hero-mid", 0.6], ["hero-late", 1.4]]) {
    await page.evaluate(
      (f) => window.scrollTo({ top: window.innerHeight * f, behavior: "instant" }),
      factor,
    );
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${tag}-${name}.png` });
  }

  // section states mid-scrub: scroll each anchor near the viewport bottom
  // third so its ScrollTrigger sits at/near full progress, then screenshot
  // "center": element mid-viewport (non-pinned scrub triggers)
  // "pin:N": element top + N viewport-heights into its pin range
  const ANCHORS = [
    ["showcase", '[data-showcase="frame"]', "center"],
    ["exploded", "#rig", "pin:1.4"],
  ];
  for (const [name, selector, mode] of ANCHORS) {
    const found = await page.evaluate(([sel, m]) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const target = m.startsWith("pin:")
        ? top + window.innerHeight * parseFloat(m.slice(4))
        : top - window.innerHeight * 0.38 + rect.height / 2;
      window.scrollTo({ top: Math.max(target, 0), behavior: "instant" });
      return true;
    }, [selector, mode]);
    if (!found) continue;
    await page.waitForTimeout(900); // let the scrubbed timeline catch up
    await page.screenshot({ path: `${OUT}/${tag}-${name}.png` });
  }

  // step-scroll the full page to fire every ScrollTrigger
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= total; y += 400) {
    await page.evaluate((t) => window.scrollTo({ top: t, behavior: "instant" }), y);
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
  (s) => s.pageErrors.length > 0 || s.overflow.hasOverflow || s.consoleMsgs.some((m) => m.type === "error"),
);
console.log(JSON.stringify(summary.map(({ width, consoleMsgs, pageErrors, overflow }) => ({
  width,
  errors: consoleMsgs.filter((m) => m.type === "error").length,
  warnings: consoleMsgs.filter((m) => m.type === "warning").length,
  pageErrors: pageErrors.length,
  hasOverflow: overflow.hasOverflow,
})), null, 2));
console.log(bad.length ? "FAIL" : "PASS");
process.exit(bad.length ? 1 : 0);
