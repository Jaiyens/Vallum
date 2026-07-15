// Every media path on the site lives here. Swapping placeholder footage for
// real footage means replacing files in /public or editing this map. No
// component changes needed.

export type VideoAsset = {
  mp4: string;
  webm?: string;
  poster: string;
  label: string;
};

// The hero film. hero.webm and hero.mp4 are a 1280x1440 vertical stack:
// human timeline on the top half, robot timeline on the bottom half, one
// decode for both layers. hero-mobile.mp4 is the human timeline alone at
// 1280x720 for small viewports. Block timings live in
// components/hero/readout-map.ts and mirror cutlist.json in the film
// workspace. The retired placeholder files remain at /video/.
export const HERO = {
  stackWebm: "/hero/hero.webm",
  stackMp4: "/hero/hero.mp4",
  mobileMp4: "/hero/hero-mobile.mp4",
  poster: "/hero/hero-poster.jpg",
  label: "Field work film, human timeline above, robot timeline below",
} as const;

export const SHOWCASE_VIDEO = {
  farm: {
    mp4: "/video/pov-farm.mp4",
    webm: "/video/pov-farm.webm",
    poster: "/video/pov-farm-poster.jpg",
    label: "First-person clip of farm work used as labeled training data",
  },
} satisfies Record<string, VideoAsset>;

// The future rig section scrubs a webp frame sequence at /rig/frames,
// generated from assets-src/new-rig-silent.mp4 (never shipped to the
// client). Frame paths live in components/future-rig/frames-manifest.ts;
// copy and dot geometry live in components/future-rig/callouts.ts.
