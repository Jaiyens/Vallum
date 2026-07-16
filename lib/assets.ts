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

// Problem section gallery loops. Real panels (p1, p2, p5, p8) are conform
// passes over finished human clips in the shift workspace; AI panels (p3,
// p4, p6, p7) are generated unpopulated environments. p3 and p4 video
// files are pending generation approval; their posters come from the
// approved keyframes, which are the exact start frames of those clips.
export const GALLERY_VIDEO = {
  p1: {
    mp4: "/gallery/p1.mp4",
    poster: "/gallery/p1.webp",
    label: "Farm crew picking a pepper field by hand",
  },
  p2: {
    mp4: "/gallery/p2.mp4",
    poster: "/gallery/p2.webp",
    label: "Ironworkers walking steel beams on a high structure",
  },
  p3: {
    mp4: "/gallery/p3.mp4",
    poster: "/gallery/p3.webp",
    label: "Empty trawler deck in heavy grey seas",
  },
  p4: {
    mp4: "/gallery/p4.mp4",
    poster: "/gallery/p4.webp",
    label: "Wooden fishing canoes beached on a grey shore",
  },
  p5: {
    mp4: "/gallery/p5.mp4",
    poster: "/gallery/p5.webp",
    label: "Crew installing solar panels on a steep roof",
  },
  p6: {
    mp4: "/gallery/p6.mp4",
    poster: "/gallery/p6.webp",
    label: "Industrial yard in thick haze, cranes as silhouettes",
  },
  p7: {
    mp4: "/gallery/p7.mp4",
    poster: "/gallery/p7.webp",
    label: "Logging cut block with felled timber in fog",
  },
  p8: {
    mp4: "/gallery/p8.mp4",
    poster: "/gallery/p8.webp",
    label: "Roughnecks wrestling pipe on a drilling rig floor",
  },
} satisfies Record<string, VideoAsset>;

// The future rig section scrubs a webp frame sequence at /rig/frames,
// generated from assets-src/new-rig-silent.mp4 (never shipped to the
// client). Frame paths live in components/future-rig/frames-manifest.ts;
// copy and dot geometry live in components/future-rig/callouts.ts.
