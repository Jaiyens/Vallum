// Hand-authored worker-figure hotspots for the hero film. No tracking data
// exists in the footage, so every rect was authored by eye against gridded
// frames of the shipped 26.5s cut and can be tuned live with the
// ?hotspots=1 debug overlay. Coordinates are normalized to the 16:9 human
// sub-frame: u,v = rect top left, w,h = rect size, all in 0..1 of the
// 1280x720 frame. t is seconds on the hero timeline, the same clock as
// readout-map.ts.
//
// Interpolation contract: within a block, keys are sorted by t and every
// key carries the SAME number of rects in the same order (rect i at one
// key pairs with rect i at the next). Between keys rects lerp linearly;
// outside the key range they clamp. Blocks with no entry here (drone
// establishers, black tail) return no rects. Blocks are keyed by time,
// not kind, so cutlist kind changes never touch this file.

export type HotspotRect = { u: number; v: number; w: number; h: number };
export type HotspotKeyframe = { t: number; rects: HotspotRect[] };
export type HotspotBlock = { in: number; out: number; keys: HotspotKeyframe[] };

// The 16:9 sub-frame hotspots are authored against. Constants, not
// video.videoWidth: the desktop file is a 1280x1440 stack, and metadata
// may not exist yet when the first pointer event arrives.
export const FRAME_W = 1280;
export const FRAME_H = 720;

export const HOTSPOT_BLOCKS: HotspotBlock[] = [
  {
    // 4-7 UNIT-07 / SPLICE. Close shot: two roughnecks at the drill pipe.
    in: 4,
    out: 7,
    keys: [
      {
        t: 4,
        rects: [
          { u: 0.12, v: 0.25, w: 0.24, h: 0.7 },
          { u: 0.44, v: 0.3, w: 0.28, h: 0.6 },
        ],
      },
      {
        t: 7,
        rects: [
          { u: 0.12, v: 0.28, w: 0.23, h: 0.67 },
          { u: 0.42, v: 0.35, w: 0.3, h: 0.58 },
        ],
      },
    ],
  },
  {
    // 10-13 LOAD-BEARING. Beam crew band upper center plus the deck
    // worker bottom center.
    in: 10,
    out: 13,
    keys: [
      {
        t: 10,
        rects: [
          { u: 0.32, v: 0.14, w: 0.32, h: 0.28 },
          { u: 0.43, v: 0.68, w: 0.14, h: 0.32 },
        ],
      },
      {
        t: 13,
        rects: [
          { u: 0.33, v: 0.16, w: 0.32, h: 0.28 },
          { u: 0.44, v: 0.7, w: 0.14, h: 0.3 },
        ],
      },
    ],
  },
  {
    // 16-19 FIELD-SCAN. Two installers on the roof, drifting down and
    // toward frame center as the panel is placed.
    in: 16,
    out: 19,
    keys: [
      {
        t: 16,
        rects: [
          { u: 0.11, v: 0.03, w: 0.16, h: 0.26 },
          { u: 0.15, v: 0.3, w: 0.17, h: 0.34 },
        ],
      },
      {
        t: 19,
        rects: [
          { u: 0.13, v: 0.22, w: 0.15, h: 0.36 },
          { u: 0.38, v: 0.26, w: 0.16, h: 0.28 },
        ],
      },
    ],
  },
  {
    // 19-22 HIGH-SIDE. Rope-access climber on the blade, near static.
    in: 19,
    out: 22,
    keys: [
      { t: 19, rects: [{ u: 0.5, v: 0.14, w: 0.16, h: 0.34 }] },
      { t: 22, rects: [{ u: 0.5, v: 0.13, w: 0.17, h: 0.35 }] },
    ],
  },
  {
    // 22-26 LAST-SHIFT. Foreground pickers bottom left plus the central
    // crew band through the rows.
    in: 22,
    out: 26,
    keys: [
      {
        t: 22,
        rects: [
          { u: 0.02, v: 0.6, w: 0.3, h: 0.38 },
          { u: 0.36, v: 0.52, w: 0.34, h: 0.34 },
        ],
      },
      {
        t: 26,
        rects: [
          { u: 0.02, v: 0.62, w: 0.3, h: 0.36 },
          { u: 0.36, v: 0.54, w: 0.34, h: 0.32 },
        ],
      },
    ],
  },
];

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// Worker rects under the film clock at time t. Empty over est and black.
export function hotspotRectsAt(t: number): HotspotRect[] {
  const block = HOTSPOT_BLOCKS.find((b) => t >= b.in && t < b.out);
  if (!block) return [];
  const keys = block.keys;
  if (keys.length === 1 || t <= keys[0].t) return keys[0].rects;
  const last = keys[keys.length - 1];
  if (t >= last.t) return last.rects;
  let i = 0;
  while (i < keys.length - 2 && keys[i + 1].t < t) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const k = (t - a.t) / (b.t - a.t);
  return a.rects.map((ra, j) => {
    const rb = b.rects[j] ?? ra;
    return {
      u: lerp(ra.u, rb.u, k),
      v: lerp(ra.v, rb.v, k),
      w: lerp(ra.w, rb.w, k),
      h: lerp(ra.h, rb.h, k),
    };
  });
}

// Shared cover math. Mirrors the HeroVideo CSS framing and the canvas
// paint exactly: the 16:9 sub-frame covers the stage, centered.
export type CoverTransform = {
  s: number;
  dw: number;
  dh: number;
  ox: number;
  oy: number;
};
export type StageRect = { x: number; y: number; w: number; h: number };

export function coverTransform(W: number, H: number): CoverTransform {
  const s = Math.max(W / FRAME_W, H / FRAME_H);
  const dw = FRAME_W * s;
  const dh = FRAME_H * s;
  return { s, dw, dh, ox: (W - dw) / 2, oy: (H - dh) / 2 };
}

export function rectToStage(r: HotspotRect, c: CoverTransform): StageRect {
  return {
    x: c.ox + r.u * c.dw,
    y: c.oy + r.v * c.dh,
    w: r.w * c.dw,
    h: r.h * c.dh,
  };
}

// Circle-rect intersection in stage px: clamp the circle center into the
// rect to find the nearest rect point, then compare squared distances.
// The test runs in stage px because the lens is a true circle there; in
// normalized frame space it would be an ellipse.
export function circleIntersectsRect(
  cx: number,
  cy: number,
  r: number,
  rect: StageRect,
): boolean {
  const nx = Math.min(Math.max(cx, rect.x), rect.x + rect.w);
  const ny = Math.min(Math.max(cy, rect.y), rect.y + rect.h);
  const dx = cx - nx;
  const dy = cy - ny;
  return dx * dx + dy * dy <= r * r;
}

// The one call the lens makes: is the lens circle over any worker figure
// at film time t? margin > 0 widens the test for release hysteresis.
export function circleOverFigure(
  cx: number,
  cy: number,
  radius: number,
  t: number,
  W: number,
  H: number,
  margin = 0,
): boolean {
  const rects = hotspotRectsAt(t);
  if (rects.length === 0) return false;
  const c = coverTransform(W, H);
  const r = radius + margin;
  return rects.some((hr) =>
    circleIntersectsRect(cx, cy, r, rectToStage(hr, c)),
  );
}
