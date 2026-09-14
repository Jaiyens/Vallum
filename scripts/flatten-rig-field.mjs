// Flattens the rig render's studio field to one tone without matting.
//
// The source render (assets-src/new-rig-silent.mp4) sits on a charcoal
// studio field with a soft falloff of about 25 levels, brightest up and left
// of centre and darkest at the right edge. The section behind it is one flat
// colour, so any falloff left in the frames shows the 1280x720 rectangle as
// an edge. The 2026-09-12 pass fitted a quadratic to a 40px ring of the first
// frame only: the border matched but the interior kept roughly 6 levels of
// the falloff either way, which still read as a box (founder, 2026-09-14:
// the edges of the explosion should be the background colour).
//
// This pass models the whole field and still never cuts the rig out (the
// 2026-09-03 ink pass did, and the founder rejected the quality loss):
//   1. The field is static across the sequence, so wherever the rig ever
//      uncovers a pixel, the per-pixel median of the stack is the field.
//      Pixels whose luma never moves more than a few levels are field.
//   2. A degree-6 Legendre surface per channel, fitted to those pixels with
//      outliers rejected, is the field plate everywhere, including under the
//      rig.
//   3. Every pixel of every frame shifts by (plate - target): the field lands
//      on the target and the rig moves by the same few levels as the field
//      under it. Colour is otherwise untouched.
//   4. Pixels within grain distance of the plate snap to the target exactly
//      (smoothstep on a 3x3 mean of the distance, dilated 1px so rig edges
//      keep their antialiasing). Grain left on a dark field comes back from
//      lossy webp as blocky texture against the flat section.
//   5. The same weight eases to zero over the outer EDGE px. Mid-explosion
//      the strap and a few small parts leave the rendered frame; once the
//      field is flat the frame border is invisible, so a hard cut there reads
//      as a part sliced by nothing. They fade into the field instead. This
//      also clears the source's darker last columns (a codec edge, ~10
//      levels).
//
// Usage: node scripts/flatten-rig-field.mjs <dir-of-source-pngs> [firstIndex]
//   Reads f-NNN.png (1-based, from `ffmpeg -vf fps=10`), keeps 56 frames from
//   firstIndex (default 5), writes public/rig/frames/frame-NNN.webp at q88
//   and the two stills as byte copies of the first and last frame.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2];
const FIRST = Number(process.argv[3] ?? 5);
const COUNT = 56;
const TARGET = [24, 27, 30]; // pre-encode field tone; the section paints what the ENCODED frames draw (see FutureRigSection), measured in-page from the canvas, since lossy webp shifts a flat dark tone by a level or two
const STILL_RANGE = 8; // temporal luma range below which a pixel is always field
const REJECT = 3; // refit without median pixels further than this from the plate
const DEGREE = 6;
const T0 = 3; // mean distance from the plate below this is field (snaps to target)
const T1 = 7; // and above this is rig (untouched but for the offset); smoothstep between
const EDGE = 40; // px over which the rig eases into the field at the frame border
const OUT = "public/rig/frames";
const CWEBP = process.env.CWEBP ?? "/Users/panda/opt/anaconda3/bin/cwebp";
const CWEBP_ARGS = (process.env.CWEBP_ARGS ?? "-q 88 -m 6").split(/\s+/).filter(Boolean);
const KEEP_PNG_DIR = process.env.KEEP_PNG_DIR; // keep the flattened PNGs here for encoder tests
if (!SRC) throw new Error("source dir required");

const src = (i) => path.join(SRC, `f-${String(i).padStart(3, "0")}.png`);
const load = async (file) => {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, W: info.width, H: info.height };
};
const { W, H } = await load(src(FIRST));
const P = W * H;
const luma = (b, p) => 0.2126 * b[p * 3] + 0.7152 * b[p * 3 + 1] + 0.0722 * b[p * 3 + 2];
const frames = [];
for (let n = 0; n < COUNT; n++) frames.push((await load(src(FIRST + n))).data);

// 1. Per-pixel median (by counting, values are bytes) and temporal luma range.
const median = new Uint8Array(P * 3);
const still = new Uint8Array(P);
const hist = new Uint16Array(256);
for (let i = 0; i < P * 3; i++) {
  hist.fill(0);
  for (let n = 0; n < COUNT; n++) hist[frames[n][i]]++;
  let seen = 0, v = 0;
  while (seen + hist[v] <= COUNT / 2) seen += hist[v++];
  median[i] = v;
}
for (let p = 0; p < P; p++) {
  let lo = 255, hi = 0;
  for (let n = 0; n < COUNT; n++) { const l = luma(frames[n], p); if (l < lo) lo = l; if (l > hi) hi = l; }
  still[p] = hi - lo < STILL_RANGE ? 1 : 0;
}

// 2. Robust least squares fit of sum c_ij P_i(u) P_j(v), i + j <= DEGREE, per
// channel over always-field pixels (every other pixel is plenty).
const legendre = (t) => {
  const out = [1, t];
  for (let k = 1; k < DEGREE; k++) out.push(((2 * k + 1) * t * out[k] - k * out[k - 1]) / (k + 1));
  return out;
};
const terms = [];
for (let i = 0; i <= DEGREE; i++) for (let j = 0; i + j <= DEGREE; j++) terms.push([i, j]);
const T = terms.length;
const Lu = Array.from({ length: W }, (_, x) => legendre(((x + 0.5) / W) * 2 - 1));
const Lv = Array.from({ length: H }, (_, y) => legendre(((y + 0.5) / H) * 2 - 1));
const basis = (x, y, b) => { for (let t = 0; t < T; t++) b[t] = Lu[x][terms[t][0]] * Lv[y][terms[t][1]]; };
const solve = (A, rhs) => {
  const n = rhs.length, M = A.map((row, r) => [...row, rhs[r]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row, r) => row[n] / row[r]);
};

const plate = new Float32Array(P * 3);
const evalPlate = (coef) => {
  const b = new Float64Array(T);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    basis(x, y, b);
    for (let k = 0; k < 3; k++) { let s = 0; for (let t = 0; t < T; t++) s += coef[k][t] * b[t]; plate[(y * W + x) * 3 + k] = s; }
  }
};
const use = still.slice();
for (let pass = 0; pass < 4; pass++) {
  const ATA = Array.from({ length: T }, () => new Float64Array(T));
  const ATb = [new Float64Array(T), new Float64Array(T), new Float64Array(T)];
  const b = new Float64Array(T);
  let used = 0;
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
    const p = y * W + x;
    if (!use[p]) continue;
    basis(x, y, b);
    for (let r = 0; r < T; r++) {
      for (let c = r; c < T; c++) ATA[r][c] += b[r] * b[c];
      for (let k = 0; k < 3; k++) ATb[k][r] += b[r] * median[p * 3 + k];
    }
    used++;
  }
  for (let r = 0; r < T; r++) for (let c = 0; c < r; c++) ATA[r][c] = ATA[c][r];
  evalPlate(ATb.map((rhs) => solve(ATA.map((row) => [...row]), [...rhs])));
  const res = [];
  for (let p = 0; p < P; p++) {
    if (!still[p]) continue;
    const r = Math.abs(luma(median, p) - (0.2126 * plate[p * 3] + 0.7152 * plate[p * 3 + 1] + 0.0722 * plate[p * 3 + 2]));
    use[p] = r < REJECT ? 1 : 0;
    res.push(r);
  }
  res.sort((a, c) => a - c);
  console.log(`plate pass ${pass}: ${used} samples, field residual median ${res[res.length >> 1].toFixed(2)} p95 ${res[Math.floor(res.length * 0.95)].toFixed(2)}`);
}

// 3 and 4. Offset every frame onto the target and snap grain to it.
const smoothstep = (a, b, e) => { const t = Math.min(1, Math.max(0, (e - a) / (b - a))); return t * t * (3 - 2 * t); };
const smooth = (e) => smoothstep(T0, T1, e);
fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync("/tmp/rig-flat-");
const dist = new Float32Array(P);
const w0 = new Float32Array(P);
for (let n = 0; n < COUNT; n++) {
  const f = frames[n];
  for (let p = 0; p < P; p++) {
    let d = 0;
    for (let k = 0; k < 3; k++) d = Math.max(d, Math.abs(f[p * 3 + k] - plate[p * 3 + k]));
    dist[p] = d;
  }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let s = 0, c = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const yy = y + dy, xx = x + dx;
      if (yy < 0 || xx < 0 || yy >= H || xx >= W) continue;
      s += dist[yy * W + xx]; c++;
    }
    w0[y * W + x] = smooth(s / c);
  }
  const out = Buffer.alloc(P * 3);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let w = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const yy = y + dy, xx = x + dx;
      if (yy < 0 || xx < 0 || yy >= H || xx >= W) continue;
      w = Math.max(w, w0[yy * W + xx]);
    }
    w *= smoothstep(0, EDGE, Math.min(x, y, W - 1 - x, H - 1 - y));
    const p = y * W + x;
    for (let k = 0; k < 3; k++) {
      const v = TARGET[k] + w * (f[p * 3 + k] - plate[p * 3 + k]);
      out[p * 3 + k] = v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
    }
  }
  const png = path.join(tmp, `frame-${String(n).padStart(3, "0")}.png`);
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toFile(png);
  execFileSync(CWEBP, ["-quiet", ...CWEBP_ARGS, png, "-o", path.join(OUT, `frame-${String(n).padStart(3, "0")}.webp`)]);
}
fs.copyFileSync(path.join(OUT, "frame-000.webp"), "public/rig/rig-closed.webp");
fs.copyFileSync(path.join(OUT, `frame-${String(COUNT - 1).padStart(3, "0")}.webp`), "public/rig/rig-exploded.webp");
fs.copyFileSync(path.join(tmp, "frame-000.png"), "public/rig/rig-closed.png");
fs.copyFileSync(path.join(tmp, `frame-${String(COUNT - 1).padStart(3, "0")}.png`), "public/rig/rig-exploded.png");
if (KEEP_PNG_DIR) { fs.mkdirSync(KEEP_PNG_DIR, { recursive: true }); for (const f of fs.readdirSync(tmp)) fs.copyFileSync(path.join(tmp, f), path.join(KEEP_PNG_DIR, f)); }
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`wrote ${COUNT} frames to ${OUT} and the two stills`);
