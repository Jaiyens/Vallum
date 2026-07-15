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
  const checks = [];
  const check = (name, pass, detail = "") => checks.push({ name, pass, detail });
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") {
      consoleMsgs.push({ type: m.type(), text: m.text().slice(0, 500) });
    }
  });
  page.on("pageerror", (e) => pageErrors.push(String(e)));

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(1600); // fonts + the 900ms wordmark entrance settle

  await page.screenshot({ path: `${OUT}/${tag}-load.png` });

  // Hero pin states. The hero pins for 250% of the viewport height, so
  // pin progress p maps to scrollY = p * 2.5 * vh. Selectors are
  // defensive: every state skips cleanly if the hero is absent.
  const hasHero = await page.evaluate(
    () => !!document.querySelector("[data-hero-root]"),
  );
  if (hasHero) {
    const scrollToP = async (p) => {
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: "instant" }),
        Math.round(800 * 2.5 * p),
      );
    };

    if (!REDUCED && width >= 1024) {
      // Slow-mo engage: play inside the LOAD-BEARING iron block and hover
      // the beam crew. The film must ease into slow motion and the lens
      // must show the robot twin.
      await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        if (v) {
          v.currentTime = 10.6;
          v.play().catch(() => {});
        }
      });
      await page.mouse.move(Math.round(width * 0.4), 240);
      await page.waitForTimeout(900);
      const engaged = await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        return v ? v.playbackRate : null;
      });
      check("slowmo-engaged", engaged !== null && engaged < 0.5, `rate=${engaged}`);
      await page.screenshot({ path: `${OUT}/${tag}-hero-lens-slowmo.png` });

      // Retirement: scrolling past the threshold must release slow motion
      // and hide the ring.
      await scrollToP(0.15);
      await page.waitForTimeout(800);
      const retired = await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        const ring = document.querySelector("[data-lens-ring]");
        return {
          rate: v ? v.playbackRate : null,
          ringOpacity: ring ? getComputedStyle(ring).opacity : null,
        };
      });
      check(
        "lens-retired",
        retired.rate !== null && retired.rate >= 0.95 && retired.ringOpacity === "0",
        JSON.stringify(retired),
      );
    }

    if (!REDUCED) {
      // Pause on the hold frame so beat shots are deterministic.
      await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        if (v) {
          v.pause();
          v.currentTime = 11.5;
        }
      });
      await page.waitForTimeout(500);
    }

    await scrollToP(0.28);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${tag}-hero-beat-one.png` });

    await scrollToP(0.54);
    await page.waitForTimeout(700);
    if (!REDUCED) {
      const frozen = await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        return v ? { paused: v.paused, t: v.currentTime } : null;
      });
      check(
        "switch-frozen",
        frozen !== null && frozen.paused && Math.abs(frozen.t - 11.5) < 0.1,
        JSON.stringify(frozen),
      );
    } else {
      const treat = await page.evaluate(() => {
        const el = document.querySelector("[data-hero-treat]");
        return el ? parseFloat(getComputedStyle(el).opacity) : null;
      });
      check(
        "reduced-treat-mid",
        treat !== null && treat > 0.2 && treat < 0.8,
        `opacity=${treat}`,
      );
    }
    await page.screenshot({ path: `${OUT}/${tag}-hero-switch-frozen.png` });

    await scrollToP(0.75);
    await page.waitForTimeout(700);
    if (!REDUCED) {
      const post = await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        const ring = document.querySelector("[data-lens-ring]");
        return {
          paused: v ? v.paused : null,
          rate: v ? v.playbackRate : null,
          ringOpacity: ring ? getComputedStyle(ring).opacity : "0",
        };
      });
      check(
        "post-switch-playing",
        post.paused === false && post.rate === 1 && post.ringOpacity === "0",
        JSON.stringify(post),
      );
      // Freeze the frame again for a deterministic screenshot.
      await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        if (v) v.pause();
      });
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
    await page.screenshot({ path: `${OUT}/${tag}-hero-post-switch.png` });
    if (!REDUCED) {
      await page.evaluate(() => {
        const v = document.querySelector("[data-hero-root] video");
        if (v) v.play().catch(() => {});
      });
    }

    await page.evaluate(() =>
      window.scrollTo({ top: Math.round(800 * 2.6), behavior: "instant" }),
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
      checks: checks.map((c) => `${c.pass ? "ok" : "FAIL"}:${c.name}${c.pass ? "" : ` ${c.detail}`}`),
    })),
    null,
    2,
  ),
);
console.log(bad.length ? "FAIL" : "PASS");
process.exit(bad.length ? 1 : 0);
