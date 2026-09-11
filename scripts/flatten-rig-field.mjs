// Flattens the rig render's studio field to one tone without matting.
//
// The source render (assets-src/new-rig-silent.mp4) sits on a charcoal
// field with a soft left-to-right and top-to-bottom falloff of about 15
// levels. The section behind it is one flat colour, so an untouched frame
// shows its rectangle as a faint edge. Rather than cut the rig out (the
// 2026-09-03 ink pass did, and the founder rejected the quality loss), this
// fits a smooth quadratic surface to the field from a 40px ring around the
// first frame, then subtracts (surface - target) from every pixel of every
// frame. The field lands exactly on the target; the rig shifts by the same
// few levels as the field under it, which the eye cannot see. Colour is
// untouched apart from that offset.
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
const RING = 40;
const OUT = "public/rig/frames";
const CWEBP = process.env.CWEBP ?? "/Users/panda/opt/anaconda3/bin/cwebp";
// Encoder settings. Lossy webp blocks up a flat dark field by a few levels
// per pixel, which reads as a faint texture against the flat section; tune
// with CWEBP_ARGS (space separated) and check the decoded ring spread.
const CWEBP_ARGS = (process.env.CWEBP_ARGS ?? "-q 88 -m 6").split(/\s+/).filter(Boolean);
const KEEP_PNG_DIR = process.env.KEEP_PNG_DIR; // keep the flattened PNGs here for encoder tests
if (!SRC) throw new Error("source dir required");

const src = (i) => path.join(SRC, `f-${String(i).padStart(3, "0")}.png`);
const { data: d0, info } = await sharp(src(FIRST)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// Least squares fit of c0 + c1 x + c2 y + c3 x^2 + c4 y^2 + c5 xy per channel
// over the ring pixels (normalised coordinates). Normal equations, 6x6.
const basis = (x, y) => { const u = x / W - 0.5, v = y / H - 0.5; return [1, u, v, u * u, v * v, u * v]; };
const ATA = Array.from({ length: 6 }, () => new Float64Array(6));
const ATb = [new Float64Array(6), new Float64Array(6), new Float64Array(6)];
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  if (!(x < RING || y < RING || x >= W - RING || y >= H - RING)) continue;
  const b = basis(x, y), i = (y * W + x) * C;
  for (let r = 0; r < 6; r++) { for (let c = 0; c < 6; c++) ATA[r][c] += b[r] * b[c]; for (let k = 0; k < 3; k++) ATb[k][r] += b[r] * d0[i + k]; }
}
const solve = (A, b) => { const n = 6, M = A.map((row, r) => [...row, b[r]]); for (let c = 0; c < n; c++) { let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; [M[c], M[p]] = [M[p], M[c]]; for (let r = 0; r < n; r++) { if (r === c) continue; const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; } } return M.map((row, r) => row[n] / row[r]); };
const coef = ATb.map((b) => solve(ATA, b));
const offset = new Float32Array(W * H * 3);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const b = basis(x, y); for (let k = 0; k < 3; k++) { let s = 0; for (let r = 0; r < 6; r++) s += coef[k][r] * b[r]; offset[(y * W + x) * 3 + k] = s - TARGET[k]; } }
console.log("field fit at corners (before):", [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1]].map(([x, y]) => [0, 1, 2].map((k) => Math.round(offset[(y * W + x) * 3 + k] + TARGET[k]))));

fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync("/tmp/rig-flat-");
for (let n = 0; n < COUNT; n++) {
  const { data } = await sharp(src(FIRST + n)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(W * H * 3);
  for (let p = 0; p < W * H; p++) for (let k = 0; k < 3; k++) { const v = data[p * C + k] - offset[p * 3 + k]; out[p * 3 + k] = v < 0 ? 0 : v > 255 ? 255 : Math.round(v); }
  const png = path.join(tmp, `frame-${String(n).padStart(3, "0")}.png`);
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toFile(png);
  execFileSync(CWEBP, ["-quiet", ...CWEBP_ARGS, png, "-o", path.join(OUT, `frame-${String(n).padStart(3, "0")}.webp`)]);
}
fs.copyFileSync(path.join(OUT, "frame-000.webp"), "public/rig/rig-closed.webp");
fs.copyFileSync(path.join(OUT, `frame-${String(COUNT - 1).padStart(3, "0")}.webp`), "public/rig/rig-exploded.webp");
fs.copyFileSync(path.join(tmp, "frame-000.png"), "public/rig/rig-closed.png");
fs.copyFileSync(path.join(tmp, `frame-${String(COUNT - 1).padStart(3, "0")}.png`), "public/rig/rig-exploded.png");
// report the flattened field at the ring of the first frame
const { data: dv } = await sharp(path.join(tmp, "frame-000.png")).raw().toBuffer({ resolveWithObject: true });
const mean = (pred) => { const s = [0, 0, 0]; let n = 0; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { if (!pred(x, y)) continue; const i = (y * W + x) * 3; s[0] += dv[i]; s[1] += dv[i + 1]; s[2] += dv[i + 2]; n++; } return s.map((v) => Math.round(v / n)); };
console.log("flattened ring: left", mean((x) => x < RING), "right", mean((x) => x >= W - RING), "top", mean((x, y) => y < RING), "bottom", mean((x, y) => y >= H - RING));
if (KEEP_PNG_DIR) { fs.mkdirSync(KEEP_PNG_DIR, { recursive: true }); for (const f of fs.readdirSync(tmp)) fs.copyFileSync(path.join(tmp, f), path.join(KEEP_PNG_DIR, f)); }
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`wrote ${COUNT} frames to ${OUT} and the two stills`);
