// Crawls the local site and writes artifacts to disk.
//
// This exists so critics read files instead of streaming accessibility trees
// through tool calls. Playwright MCP returns 50k+ tokens per page. Seven critics
// times eight iterations of that is the entire usage budget spent on looking.
//
// Three outputs, and the last two are new because the last build missed the
// biggest visual bug on the site by only ever looking at pages at rest:
//   1. screenshots + dom + axe, per route, per width
//   2. artifacts/states/  interaction captures: canvas orbit sweep, opened panels, focus
//   3. artifacts/luminance.json  how dark the page actually is, as a number
//
// Usage: node nightshift/scripts/crawl.mjs
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE = process.env.NS_BASE || 'http://localhost:3000';
const WIDTHS = [375, 768, 1440];
const OUT = 'artifacts';

// Luminance thresholds. Matches the gate in verify.sh and the spec in BRIEF.md.
const DARK = 60;   // 0-255 greyscale. ink #0C0B09 lands near 12, forest #16281D near 38
const LIGHT = 140; // bone #F2EEE5 lands near 238

let sharp = null;
try { sharp = (await import('sharp')).default; }
catch { console.warn('sharp not installed, luminance profiling skipped. npm i -D sharp'); }

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '-'));

async function discover(page) {
  const seen = new Set(['/']);
  const queue = ['/'];
  while (queue.length) {
    const path = queue.shift();
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 20000 });
    } catch { continue; }
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    for (const h of hrefs) {
      if (!h || !h.startsWith('/') || h.startsWith('//') || h.includes('#')) continue;
      if (!seen.has(h)) { seen.add(h); queue.push(h); }
    }
  }
  return [...seen];
}

// Squash the full-page shot to 1x100 greyscale. Each byte is the mean luminance
// of one percent of the page height. This turns "everything is too dark" from a
// complaint into a measurement.
async function luminance(buf) {
  if (!sharp) return null;
  const raw = await sharp(buf).resize(1, 100, { fit: 'fill' }).greyscale().raw().toBuffer();
  const bands = [...raw];
  const lower = bands.slice(35); // top 35% is hero + Helix and is allowed to be dark
  return {
    bands,
    darkBandsLower: lower.filter((b) => b < DARK).length,
    lowerBandCount: lower.length,
    lightBandsTotal: bands.filter((b) => b > LIGHT).length,
    meanAll: Math.round(bands.reduce((a, b) => a + b, 0) / bands.length),
    meanLower: Math.round(lower.reduce((a, b) => a + b, 0) / lower.length),
  };
}

// Everything the page does that a screenshot at rest cannot show.
async function captureStates(page, name) {
  const shots = [];
  const shot = async (tag) => {
    const p = `${OUT}/states/${name}-${tag}.png`;
    await page.screenshot({ path: p });
    shots.push(p);
  };

  // 1. Canvas orbit sweep. Drives the real OrbitControls by dragging, then reads
  //    the centerpiece text against every angle. This is the Helix contrast check.
  const canvas = await page.$('canvas');
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box && box.width > 100) {
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.move(cx, cy);
      await page.mouse.down();
      const STEPS = 12;
      for (let i = 0; i < STEPS; i++) {
        const t = (i + 1) / STEPS;
        await page.mouse.move(cx + t * box.width * 0.8, cy + Math.sin(t * Math.PI) * box.height * 0.25, { steps: 4 });
        await page.waitForTimeout(140);
        await shot(`rot-${String(i).padStart(2, '0')}`);
      }
      await page.mouse.up();
      await page.waitForTimeout(400);
    }
  }

  // 2. Open states. Click the first few things that look clickable and see what happens.
  const clickables = await page.$$('[role="button"], button, [data-panel], canvas + * [tabindex="0"]');
  for (let i = 0; i < Math.min(clickables.length, 3); i++) {
    try {
      await clickables[i].click({ timeout: 3000 });
      await page.waitForTimeout(700);
      await shot(`open-${i}`);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    } catch { /* not clickable, not a finding for the crawler */ }
  }

  // 3. Focus. Tab a few times and capture. Focus rings have to survive bone, ink, and canvas.
  for (let i = 0; i < 4; i++) await page.keyboard.press('Tab');
  await shot('focus');

  return shots;
}

const run = async () => {
  await mkdir(OUT, { recursive: true });
  await mkdir(`${OUT}/states`, { recursive: true });
  for (const w of WIDTHS) await mkdir(`${OUT}/${w}`, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();

  const routes = await discover(page);
  console.log(`discovered ${routes.length} routes: ${routes.join(' ')}`);

  const consoleLog = [];
  const linkReport = { links: [] };
  const violations = [];
  const lumen = {};

  for (const route of routes) {
    const name = slug(route);

    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      const errs = [];
      const onMsg = (m) => { if (m.type() === 'error') errs.push(m.text()); };
      page.on('console', onMsg);

      const resp = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 20000 });
      linkReport.links.push({
        url: route,
        status: resp?.status() ?? 0,
        state: resp && resp.status() < 400 ? 'OK' : 'BROKEN',
      });

      // Full page, so the critics can see what a scroll actually reveals.
      const buf = await page.screenshot({ path: `${OUT}/${w}/${name}.png`, fullPage: true });
      if (w === 1440) lumen[route] = await luminance(buf);

      page.off('console', onMsg);
      if (errs.length) consoleLog.push({ route, width: w, errors: errs });

      // DOM text in reading order. What critic-voice, critic-civilian and critic-flow read.
      if (w === 1440) {
        const text = await page.evaluate(() => document.body.innerText);
        const aria = await page.locator('body').ariaSnapshot().catch(() => '');
        await writeFile(`${OUT}/${w}/${name}.dom.txt`, `URL: ${BASE}${route}\n\n=== TEXT ===\n${text}\n\n=== ARIA ===\n${aria}\n`);
      }
    }

    // Axe once per route at 1440. WCAG 2.0/2.1 A and AA only.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 20000 });
    const res = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    for (const v of res.violations) violations.push({ ...v, route });
  }

  // States need motion on, so they get their own context. The main crawl runs
  // reduced-motion for stable screenshots, which would freeze the orbit.
  const mctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mpage = await mctx.newPage();
  const stateShots = [];
  for (const route of routes) {
    try {
      await mpage.goto(BASE + route, { waitUntil: 'networkidle', timeout: 20000 });
      await mpage.waitForTimeout(1200); // let the canvas mount
      stateShots.push(...(await captureStates(mpage, slug(route))));
    } catch (e) { console.warn(`states failed for ${route}: ${e.message}`); }
  }
  await mctx.close();

  await writeFile(`${OUT}/axe.json`, JSON.stringify({ violations }, null, 2));
  await writeFile(`${OUT}/links.json`, JSON.stringify(linkReport, null, 2));
  await writeFile(`${OUT}/console.json`, JSON.stringify(consoleLog, null, 2));
  await writeFile(`${OUT}/luminance.json`, JSON.stringify({
    note: 'Each route has 100 bands sampled down the full page, 0=black 255=white. Gate: bands 35-99 allow at most 20 dark (<60), whole page needs at least 45 light (>140). Top 35% is unconstrained, hero and Helix live there.',
    thresholds: { dark: DARK, light: LIGHT, maxDarkBandsLower: 20, minLightBandsTotal: 45 },
    routes: lumen,
  }, null, 2));
  await writeFile(`${OUT}/manifest.json`, JSON.stringify({
    crawledAt: new Date().toISOString(),
    base: BASE,
    routes,
    widths: WIDTHS,
    counts: {
      routes: routes.length,
      screenshots: routes.length * WIDTHS.length,
      stateShots: stateShots.length,
      axeViolations: violations.length,
      axeCriticalSerious: violations.filter((v) => ['critical', 'serious'].includes(v.impact)).length,
      brokenLinks: linkReport.links.filter((l) => l.state === 'BROKEN').length,
      consoleErrorPages: consoleLog.length,
    },
  }, null, 2));

  await browser.close();
  console.log(`wrote ${OUT}/. axe: ${violations.length} violations, ${violations.filter(v=>['critical','serious'].includes(v.impact)).length} critical/serious. states: ${stateShots.length} shots.`);
};

run().catch((e) => { console.error('crawl failed:', e.message); process.exit(1); });
