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

export type RigPart = {
  id: string;
  src: string;
  label: string;
  w: number;
  h: number;
};

export const RIG_PARTS: readonly RigPart[] = [
  { id: "hard-hat-mount", src: "/rig/hard-hat-mount.png", label: "Hard-hat mount", w: 640, h: 480 },
  { id: "head-strap", src: "/rig/head-strap.png", label: "Head strap", w: 640, h: 480 },
  { id: "iphone", src: "/rig/iphone.png", label: "iPhone 12 or newer", w: 640, h: 480 },
  { id: "phone-clamp", src: "/rig/phone-clamp.png", label: "Phone clamp", w: 640, h: 480 },
  { id: "cable", src: "/rig/cable.png", label: "Cable", w: 640, h: 480 },
  { id: "chest-harness", src: "/rig/chest-harness.png", label: "Chest harness", w: 640, h: 480 },
] as const;
