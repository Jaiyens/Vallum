// Every media path on the site lives here. Swapping placeholder footage for
// real footage means replacing files in /public or editing this map. No
// component changes needed.

export type VideoAsset = {
  mp4: string;
  webm?: string;
  poster: string;
  label: string;
};

export const HERO_VIDEO = {
  human: {
    mp4: "/video/hero-human.mp4",
    webm: "/video/hero-human.webm",
    poster: "/video/hero-human-poster.jpg",
    label: "First-person view of a human doing outdoor manual work",
  },
  robot: {
    mp4: "/video/hero-robot.mp4",
    webm: "/video/hero-robot.webm",
    poster: "/video/hero-robot-poster.jpg",
    label: "First-person view of a robot doing the same work",
  },
} satisfies Record<string, VideoAsset>;

export const SHOWCASE_VIDEO = {
  farm: {
    mp4: "/video/pov-farm.mp4",
    webm: "/video/pov-farm.webm",
    poster: "/video/pov-farm-poster.jpg",
    label: "First-person clip of farm work used as labeled training data",
  },
} satisfies Record<string, VideoAsset>;

// The future rig section draws its schematic as inline SVG. Its geometry and
// copy live in components/future-rig/callouts.ts.
