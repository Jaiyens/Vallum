// 56 frames extracted from assets-src/new-rig-silent.mp4 at 10fps (source
// frames 5 to 60; the first four are static), 1280x720, webp q88, encoded
// with cwebp -m 6. Frame 000 is the true closed unit; the last frame is the
// true exploded state and matches /rig/rig-exploded.png exactly.
//
// Grade history. The source is a colour render on a charcoal studio field
// with a soft radial falloff. Two regrades tried to move it onto the page's
// palette: a forest tint (F-0421) the founder rejected as green, then an ink
// pass (2026-09-03) that matted the field off and composited the rig back by
// luma alone, which the founder rejected as a quality loss ("way worse
// quality than before"). Since 2026-09-09 the frames are the source render
// in colour at q88 instead of the original q70, and the section's surface
// takes the render's own field tone instead (see FutureRigSection). The
// field's falloff is flattened onto that tone across the whole frame by
// scripts/flatten-rig-field.mjs (2026-09-14; the rig is offset, never
// matted), so the rectangle has no edge to hide. scripts/grade-rig-frames.mjs
// stays as the record of the retired ink pass.

export const FRAME_COUNT = 56;

export const FRAME_WIDTH = 1280;
export const FRAME_HEIGHT = 720;

// Cache key for the frame set. next.config.ts serves /rig/frames as
// immutable for a year (Vercel's default for public files is max-age=0,
// which made every visit revalidate all 56 frames), so BUMP THIS whenever
// the frames are regenerated (scripts/flatten-rig-field.mjs) or returning
// visitors keep the old set.
export const FRAMES_VERSION = "2026-09-14";

export function framePath(i: number) {
  return `/rig/frames/frame-${String(i).padStart(3, "0")}.webp?v=${FRAMES_VERSION}`;
}

// The closed webp is a byte-for-byte copy of frame 000, so the poster and
// the canvas's first drawn frame decode to identical pixels. Same deal for
// the exploded webp and the last frame.
export const RIG_STILLS = {
  closed: { webp: "/rig/rig-closed.webp", png: "/rig/rig-closed.png" },
  exploded: { webp: "/rig/rig-exploded.webp", png: "/rig/rig-exploded.png" },
} as const;
