// Regrades the rig scrub frames onto a dead-flat ink field.
//
// Why this exists: the source render (assets-src/new-rig-silent.mp4) ships on a
// charcoal studio backdrop with a soft radial falloff and amber connector
// accents. The falloff reads as a vignette/glow on the bone page (F-0413) and
// amber is off-palette (F-0421). An earlier pass recast the backdrop into the
// forest family; the founder rejected the green outright (2026-09-03), so the
// field is now the ink token, flat, and the rig itself is monochrome.
//
// The grade, per frame:
//   1. The studio backdrop is static across all 56 frames (frame-to-frame delta
//      in the margins: mean 0.57, max 5), so one backdrop plate serves them all.
//      The plate is a robust quartic fit to the per-pixel median of the stack,
//      refit with outliers rejected until only backdrop pixels drive it.
//      Fit quality on margin-only pixels: median residual 0.5, p95 1.9.
//   2. Matte = |luma - plate| through a smoothstep. This keeps the rig where it
//      is DARKER than the backdrop too (strap, base plate), which a luma
//      threshold cannot do. Then 1px dilate + 3-tap blur closes pinholes where
//      the rig happens to sit at the backdrop's own level and antialiases the
//      cut into the field.
//   3. Composite: field -> exactly ink. Rig -> its own luma screened onto ink,
//      so highlights still reach white and nothing sits below the surface it
//      is drawn on. Luma only, so amber accents and the PCB's green go neutral.
//
// Usage: node scripts/grade-rig-frames.mjs            (writes public/rig/frames-ink)
//        DRY=1 node scripts/grade-rig-frames.mjs      (grade frame 0 and 55 only)
// Requires ffmpeg (decode + PNG) and cwebp (encode; this ffmpeg has no libwebp).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const W = 1280;
const H = 720;
const COUNT = 56;
const INK = [12, 11, 9]; // #0C0B09, the ink token
const T0 = 3.0; // |luma - plate| below this is field
const T1 = 8.0; // and above this is rig; between, a smoothstep
const QUALITY = 70;

const SRC = "public/rig/frames";
const OUT = "public/rig/frames-ink";
const STILLS = [
  { frame: 0, name: "rig-closed-ink" },
  { frame: COUNT - 1, name: "rig-exploded-ink" },
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "rig-grade-"));
const src = (i) => `${SRC}/frame-${String(i).padStart(3, "0")}.webp`;

function decode(file) {
  return execFileSync(
    "ffmpeg",
    ["-v", "error", "-i", file, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
    { maxBuffer: W * H * 3 * 4 },
  );
}

function luma(rgb) {
  const y = new Uint8Array(W * H);
  for (let i = 0, p = 0; i < y.length; i++, p += 3) {
    y[i] = (rgb[p] * 299 + rgb[p + 1] * 587 + rgb[p + 2] * 114) / 1000;
  }
  return y;
}

// --- backdrop plate -------------------------------------------------------

const M = 15; // quartic basis
function basis(x, y) {
  const u = (x - W / 2) / (W / 2);
  const v = (y - H / 2) / (H / 2);
  return [1, u, v, u * u, u * v, v * v, u ** 3, u * u * v, u * v * v, v ** 3,
    u ** 4, u ** 3 * v, u * u * v * v, u * v ** 3, v ** 4];
}

function solve(points) {
  const A = Array.from({ length: M }, () => new Float64Array(M + 1));
  for (const [x, y, z] of points) {
    const b = basis(x, y);
    for (let i = 0; i < M; i++) {
      for (let j = i; j < M; j++) A[i][j] += b[i] * b[j];
      A[i][M] += b[i] * z;
    }
  }
  for (let i = 0; i < M; i++) for (let j = 0; j < i; j++) A[i][j] = A[j][i];
  for (let c = 0; c < M; c++) {
    let p = c;
    for (let r = c + 1; r < M; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    const pivot = A[c][c];
    for (let j = c; j <= M; j++) A[c][j] /= pivot;
    for (let r = 0; r < M; r++) {
      if (r === c || !A[r][c]) continue;
      const f = A[r][c];
      for (let j = c; j <= M; j++) A[r][j] -= f * A[c][j];
    }
  }
  return Array.from({ length: M }, (_, i) => A[i][M]);
}

function buildPlate(stack) {
  const step = 4;
  const points = [];
  const scratch = new Uint8Array(stack.length);
  for (let y = 2; y < H; y += step) {
    for (let x = 2; x < W; x += step) {
      const i = y * W + x;
      for (let f = 0; f < stack.length; f++) scratch[f] = stack[f][i];
      const sorted = Array.from(scratch).sort((a, b) => a - b);
      const mid = sorted.length >> 1;
      points.push([x, y, (sorted[mid - 1] + sorted[mid]) / 2]);
    }
  }
  // Robust fit: seed on plausible-backdrop levels, then keep only pixels the
  // model already explains. The rig covers a minority of any given pixel's
  // 56 samples away from the centre, so the median is backdrop nearly
  // everywhere and the rejection rounds clear what is left.
  let rows = points.filter((p) => p[2] <= 60);
  let co;
  for (let it = 0; it < 5; it++) {
    co = solve(rows);
    rows = points.filter(([x, y, z]) => {
      const r = z - basis(x, y).reduce((s, b, i) => s + co[i] * b, 0);
      return r >= -4 && r <= 3;
    });
  }
  const margin = points.filter(([x, y]) => x < 60 || x > W - 60 || y < 40 || y > H - 40);
  const res = margin
    .map(([x, y, z]) => Math.abs(z - basis(x, y).reduce((s, b, i) => s + co[i] * b, 0)))
    .sort((a, b) => a - b);
  console.log(
    `plate: quartic fit, margin residual median ${res[res.length >> 1].toFixed(2)}, ` +
      `p95 ${res[Math.floor(res.length * 0.95)].toFixed(2)}, max ${res.at(-1).toFixed(2)}`,
  );

  const plate = new Uint8Array(W * H);
  for (let y = 0, i = 0; y < H; y++) {
    const v = (y - H / 2) / (H / 2);
    const k0 = co[0] + co[2] * v + co[5] * v ** 2 + co[9] * v ** 3 + co[14] * v ** 4;
    const k1 = co[1] + co[4] * v + co[8] * v ** 2 + co[13] * v ** 3;
    const k2 = co[3] + co[7] * v + co[12] * v ** 2;
    const k3 = co[6] + co[11] * v;
    const k4 = co[10];
    for (let x = 0; x < W; x++, i++) {
      const u = (x - W / 2) / (W / 2);
      plate[i] = Math.max(0, Math.min(255, Math.round(k0 + u * (k1 + u * (k2 + u * (k3 + u * k4))))));
    }
  }
  return plate;
}

// --- matte + composite ----------------------------------------------------

const smoothstep = (t) => t * t * (3 - 2 * t);
const MATTE = new Uint8Array(511); // indexed by (luma - plate) + 255
for (let d = 0; d < 511; d++) {
  const a = Math.abs(d - 255);
  MATTE[d] = a <= T0 ? 0 : a >= T1 ? 255 : Math.round(255 * smoothstep((a - T0) / (T1 - T0)));
}

function shape(w) {
  // separable 1px max-dilate, then a separable 3-tap blur
  let cur = w;
  for (const pass of [Math.max, null]) {
    for (const off of [1, W]) {
      const next = new Uint8Array(W * H);
      for (let i = 0; i < next.length; i++) {
        const a = i >= off ? cur[i - off] : 0;
        const b = i + off < next.length ? cur[i + off] : 0;
        next[i] = pass ? pass(cur[i], a, b) : (cur[i] * 2 + a + b) >> 2;
      }
      cur = next;
    }
  }
  return cur;
}

function grade(rgb, plate) {
  const y = luma(rgb);
  const w = new Uint8Array(W * H);
  for (let i = 0; i < w.length; i++) w[i] = MATTE[y[i] - plate[i] + 255];
  const m = shape(w);
  const out = Buffer.allocUnsafe(W * H * 3);
  for (let i = 0, p = 0; i < m.length; i++, p += 3) {
    const v = (m[i] * y[i]) / 255;
    for (let c = 0; c < 3; c++) {
      out[p + c] = INK[c] + Math.round((v * (255 - INK[c])) / 255);
    }
  }
  return out;
}

function encode(rgb, basename) {
  const png = path.join(tmp, `${basename}.png`);
  execFileSync(
    "ffmpeg",
    ["-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", `${W}x${H}`,
      "-i", "-", png],
    { input: rgb },
  );
  return png;
}

// --- run ------------------------------------------------------------------

console.log(`decoding ${COUNT} frames from ${SRC}`);
const frames = [];
for (let i = 0; i < COUNT; i++) frames.push(decode(src(i)));
const plate = buildPlate(frames.map(luma));

const dry = process.env.DRY === "1";
fs.mkdirSync(OUT, { recursive: true });
const targets = dry ? [0, COUNT - 1] : [...frames.keys()];
let bytes = 0;
for (const i of targets) {
  const name = `frame-${String(i).padStart(3, "0")}`;
  const png = encode(grade(frames[i], plate), name);
  const webp = `${OUT}/${name}.webp`;
  execFileSync("cwebp", ["-quiet", "-q", String(QUALITY), png, "-o", webp]);
  bytes += fs.statSync(webp).size;
  // The stills must decode to the same pixels as the frames they poster, so
  // they are copies, never a second encode.
  const still = STILLS.find((s) => s.frame === i);
  if (still) {
    fs.copyFileSync(webp, `public/rig/${still.name}.webp`);
    fs.copyFileSync(png, `public/rig/${still.name}.png`);
  }
}
console.log(
  `wrote ${targets.length} frames to ${OUT} (${(bytes / 1024 / 1024).toFixed(2)} MB)` +
    (dry ? " [DRY]" : ""),
);
fs.rmSync(tmp, { recursive: true, force: true });
