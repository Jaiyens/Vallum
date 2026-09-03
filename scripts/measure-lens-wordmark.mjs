// Lens wordmark alignment probe. Measures the typed VALLUM LABS ink box and
// the vine-art <img> live, then prints the em constants HeroCopy.tsx needs
// (see the constants block above LENS_WORDMARK_SRC there). Run it after any
// change to the wordmark font, string, tracking or kerning; after the art is
// regenerated, re-derive ASSET below first (cross-correlate a clean typed
// render against the art's bright-ceramic mask) and then run it.
// Usage: node scripts/measure-lens-wordmark.mjs           (server on :3000)
//        VERIFY_URL=http://localhost:3002 VIEWPORTS=1440x900,2560x1440 \
//          node scripts/measure-lens-wordmark.mjs
// Writes measure-shots/<width>-{typed,art,overlay}.png (overlay: typed in
// red, art in cyan, coincidence reads white) and measure-shots/results.json.
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";

const BASE = process.env.VERIFY_URL ?? "http://localhost:3000";
const VIEWPORTS = (process.env.VIEWPORTS ?? "1440x900,1710x1107,1920x1080,2560x1440")
  .split(",")
  .map((s) => s.split("x").map(Number));
const OUT = "measure-shots";
fs.mkdirSync(OUT, { recursive: true });
const DPR = 2;

// A) asset letter-face fractions of the art frame (HeroCopy.tsx constants).
const ASSET = { left: 0.0497, right: 0.9483, capTop: 0.326, baseline: 0.698 };
const RW = ASSET.right - ASSET.left;
const FH = ASSET.baseline - ASSET.capTop;
const BELOW = 1 - ASSET.baseline;
const CX = (ASSET.left + ASSET.right) / 2;

// Everything hidden, page painted black, then one subtree shown again so a
// luminance scan of the screenshot is that subtree's ink.
const HIDE = `html,body{background:#000!important} body *{visibility:hidden!important}`;
const SHOW_TYPED = `${HIDE} [data-word-mask],[data-word-mask] *{visibility:visible!important;opacity:1!important;-webkit-mask-image:none!important;mask-image:none!important} [data-word-mask] h1{color:#fff!important}`;
const SHOW_ART = `${HIDE} [data-lens-word],[data-lens-word] *{visibility:visible!important;opacity:1!important} [data-lens-word]{-webkit-mask-image:none!important;mask-image:none!important;display:block!important}`;

async function scan(png, thr) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  let x0 = W, x1 = -1, y0 = H, y1 = -1;
  const col = new Uint32Array(W), row = new Uint32Array(H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      if (lum > thr) {
        col[x]++; row[y]++;
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
  }
  let rmax = 0, cmax = 0;
  for (let y = 0; y < H; y++) rmax = Math.max(rmax, row[y]);
  for (let x = 0; x < W; x++) cmax = Math.max(cmax, col[x]);
  const span = (arr, n, lim) => { let a = -1, b = -1; for (let i = 0; i < n; i++) if (arr[i] > lim) { if (a < 0) a = i; b = i + 1; } return a < 0 ? null : [a / DPR, b / DPR]; };
  return {
    x0: x0 / DPR, x1: (x1 + 1) / DPR, y0: y0 / DPR, y1: (y1 + 1) / DPR,
    w: (x1 - x0 + 1) / DPR, h: (y1 - y0 + 1) / DPR,
    // crude letter-face estimate: rows/cols carrying a big share of the peak
    faceRows: span(row, H, rmax * 0.4), faceCols: span(col, W, cmax * 0.12),
  };
}

const browser = await chromium.launch();
const results = [];
for (const [vw, vh] of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: DPR, reducedMotion: "no-preference" });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo(0, 0));

  const dom = await page.evaluate(() => {
    const h1 = document.querySelector("[data-wordmark]");
    const twin = document.querySelector("[data-lens-word] > div");
    const img = document.querySelector("[data-lens-word] img");
    const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom, w: b.width, h: b.height }; };
    const cs = getComputedStyle(h1);
    return {
      fs: parseFloat(cs.fontSize), font: cs.fontFamily.split(",")[0], weight: cs.fontWeight, letterSpacing: cs.letterSpacing, kerning: cs.fontKerning,
      h1: r(h1), twin: r(twin), img: r(img),
      imgStyle: img ? { width: img.style.width, height: img.style.height, transform: img.style.transform } : null,
    };
  });
  if (!dom.img) { console.log(`== ${vw}x${vh}: no lens art rendered (below lg or reduced motion); skipped`); await page.close(); continue; }

  const setProbe = (css) => page.evaluate((c) => { let st = document.getElementById("probe"); if (!st) { st = document.createElement("style"); st.id = "probe"; document.head.appendChild(st); } st.textContent = c; }, css);
  await setProbe(SHOW_TYPED); await page.waitForTimeout(150);
  const typedPng = await page.screenshot({ type: "png" });
  fs.writeFileSync(`${OUT}/${vw}-typed.png`, typedPng);
  const typed = await scan(typedPng, 128);
  await setProbe(SHOW_ART); await page.waitForTimeout(400);
  const artPng = await page.screenshot({ type: "png" });
  fs.writeFileSync(`${OUT}/${vw}-art.png`, artPng);
  const art = await scan(artPng, 170);

  // overlay crop: typed red, art cyan
  const t = await sharp(typedPng).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const a = await sharp(artPng).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = t.info.width, H = t.info.height, o = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const tl = 0.299 * t.data[i * 4] + 0.587 * t.data[i * 4 + 1] + 0.114 * t.data[i * 4 + 2];
    const al = 0.299 * a.data[i * 4] + 0.587 * a.data[i * 4 + 1] + 0.114 * a.data[i * 4 + 2];
    o[i * 4] = tl; o[i * 4 + 1] = al; o[i * 4 + 2] = al; o[i * 4 + 3] = 255;
  }
  const im = dom.img;
  const cx0 = Math.max(0, Math.round(Math.min(typed.x0, im.l) * DPR) - 40), cx1 = Math.min(W, Math.round(Math.max(typed.x1, im.r) * DPR) + 40);
  const cy0 = Math.max(0, Math.round(Math.min(typed.y0, im.t) * DPR) - 40), cy1 = Math.min(H, Math.round(Math.max(typed.y1, im.b) * DPR) + 40);
  await sharp(o, { raw: { width: W, height: H, channels: 4 } }).extract({ left: cx0, top: cy0, width: cx1 - cx0, height: cy1 - cy0 }).png().toFile(`${OUT}/${vw}-overlay.png`);

  // B) typed metrics in fs units, and the em constants they imply
  const fsPx = dom.fs, box = dom.h1;
  const B = {
    inkW: typed.w / fsPx,
    capH: typed.h / fsPx,
    inkBottomAboveBox: (box.b - typed.y1) / fsPx,
    inkCentreOff: ((typed.x0 + typed.x1) / 2 - (box.l + box.r) / 2) / fsPx,
    boxW: box.w / fsPx,
  };
  const em = { width: B.inkW / RW, height: B.capH / FH };
  em.translateY = BELOW * em.height - B.inkBottomAboveBox;
  em.translateX = B.inkCentreOff - (CX - 0.5) * em.width;
  const face = { l: im.l + ASSET.left * im.w, r: im.l + ASSET.right * im.w, t: im.t + ASSET.capTop * im.h, b: im.t + ASSET.baseline * im.h };
  const d = (v) => +v.toFixed(2);
  const faceA = { dLeft: d(face.l - typed.x0), dRight: d(face.r - typed.x1), dTop: d(face.t - typed.y0), dBottom: d(face.b - typed.y1) };
  const faceP = art.faceRows && art.faceCols ? { dLeft: d(art.faceCols[0] - typed.x0), dRight: d(art.faceCols[1] - typed.x1), dTop: d(art.faceRows[0] - typed.y0), dBottom: d(art.faceRows[1] - typed.y1) } : null;

  console.log(`\n== ${vw}x${vh}  fs=${fsPx.toFixed(2)}px  ${dom.font} ${dom.weight}  tracking=${dom.letterSpacing}  kerning=${dom.kerning}`);
  console.log(`h1 box w=${box.w.toFixed(2)}  twin box w=${dom.twin.w.toFixed(2)}  (must match)`);
  console.log(`typed ink  x[${typed.x0},${typed.x1}] y[${typed.y0},${typed.y1}]  w=${typed.w} h=${typed.h}`);
  console.log(`B) inkW=${B.inkW.toFixed(4)} capH=${B.capH.toFixed(4)} inkBottomAboveBox=${B.inkBottomAboveBox.toFixed(4)} inkCentreOff=${B.inkCentreOff.toFixed(4)} boxW=${B.boxW.toFixed(4)}  (fs units)`);
  console.log(`implied img: width ${em.width.toFixed(3)}em  height ${em.height.toFixed(3)}em  translateX(calc(-50% ${em.translateX < 0 ? "-" : "+"} ${Math.abs(em.translateX).toFixed(3)}em)) translateY(${em.translateY.toFixed(3)}em)`);
  console.log(`current img: ${JSON.stringify(dom.imgStyle)}`);
  console.log(`face (asset fractions on img rect) vs typed ink, px: ${JSON.stringify(faceA)}`);
  console.log(`face (bright-pixel profile, crude)  vs typed ink, px: ${JSON.stringify(faceP)}`);
  results.push({ vw, vh, dom, typed, art, B, em, faceA, faceP });
  await page.close();
}
await browser.close();
if (results.length) {
  const mean = (k) => results.reduce((s, r) => s + r.em[k], 0) / results.length;
  console.log(`\nMEAN implied img over ${results.length} viewports: width ${mean("width").toFixed(3)}em  height ${mean("height").toFixed(3)}em  translateX(calc(-50% ${mean("translateX") < 0 ? "-" : "+"} ${Math.abs(mean("translateX")).toFixed(3)}em)) translateY(${mean("translateY").toFixed(3)}em)`);
}
fs.writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
console.log(`wrote ${OUT}/results.json`);
