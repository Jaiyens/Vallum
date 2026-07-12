// Copy and dot geometry for the future rig section. The visual is a frame
// sequence rendered to canvas (see RigScrub.tsx); dot coordinates are
// percentages of that frame and are only valid on the fully exploded final
// frame, so dots reveal in the last stretch of the scrub. Label y positions
// are percentages of the visual box height.

export type Cluster = "sensing" | "trust" | "endurance";

export type Callout = {
  id: string;
  cluster: Cluster;
  name: string;
  support: string;
  // Anchor dot position on the exploded frame, in percent of frame size.
  dot: { xPct: number; yPct: number };
  label: { side: "left" | "right"; yPct: number };
};

export const SECTION_COPY = {
  eyebrow: "Concept. In development.",
  headline: "The rig we are building to capture the real world at scale",
  subline: "A purpose-built egocentric rig. Every component earns its place in the data.",
  bridge: "Today: commodity capture on refurbished iPhones. Tomorrow: a purpose-built rig.",
  caption: "v-next concept, subject to change",
  visualLabel:
    "Exploded view of the Vallum capture rig concept. A head mounted unit with a front sensor bar, housing, mainboard, side arm, batteries, storage, and head strap, separated along one explosion axis.",
} as const;

export const CLUSTERS: { key: Cluster; label: string }[] = [
  { key: "sensing", label: "Sensing" },
  { key: "trust", label: "Trust" },
  { key: "endurance", label: "Endurance" },
];

export const CALLOUTS: Callout[] = [
  // sensing, left column
  {
    id: "rgb-cam",
    cluster: "sensing",
    name: "Wide FOV RGB camera",
    support: "Captures the worker’s point of view. The frame a robot policy learns from.",
    dot: { xPct: 24.8, yPct: 20 },
    label: { side: "left", yPct: 47 },
  },
  {
    id: "stereo",
    cluster: "sensing",
    name: "Stereo depth pair",
    support: "Two cameras, overlapping fields. Depth and 3D hand tracking without a lidar.",
    dot: { xPct: 20.8, yPct: 22.5 },
    label: { side: "left", yPct: 94 },
  },
  {
    id: "imu",
    cluster: "sensing",
    name: "IMU (6-axis)",
    support: "Tracks head and body motion at high rate. Turns raw video into action labels.",
    dot: { xPct: 44, yPct: 42 },
    label: { side: "left", yPct: 30 },
  },
  {
    id: "gnss",
    cluster: "sensing",
    name: "GNSS module",
    support: "Logs where each clip was captured. Proves geographic diversity across sites.",
    dot: { xPct: 52.5, yPct: 50.5 },
    label: { side: "left", yPct: 12 },
  },
  {
    id: "mics",
    cluster: "sensing",
    name: "Directional microphones",
    support: "Capture task audio and spoken context. Aligned to the action on screen.",
    dot: { xPct: 17, yPct: 25.5 },
    label: { side: "left", yPct: 67 },
  },
  // trust, right column
  {
    id: "blur",
    cluster: "trust",
    name: "On-device face blur",
    support: "Blurs faces and plates before storage. POPIA-clean and consent-safe by default.",
    dot: { xPct: 39, yPct: 48 },
    label: { side: "right", yPct: 8 },
  },
  {
    id: "signing",
    cluster: "trust",
    name: "Provenance signing",
    support: "Signs every clip at capture with C2PA. Tamper-evident chain of custody.",
    dot: { xPct: 47, yPct: 41 },
    label: { side: "right", yPct: 22 },
  },
  {
    id: "compute",
    cluster: "trust",
    name: "Edge compute module",
    support: "Runs blur and signing on-device. Nothing leaves the rig unprocessed.",
    dot: { xPct: 43.5, yPct: 44 },
    label: { side: "right", yPct: 36 },
  },
  // endurance, right column
  {
    id: "storage",
    cluster: "endurance",
    name: "Secure storage",
    support: "Encrypted, swappable, field-ready. Full days of capture without offload.",
    dot: { xPct: 62.5, yPct: 57.5 },
    label: { side: "right", yPct: 94 },
  },
  {
    id: "battery",
    cluster: "endurance",
    name: "Swappable batteries",
    support: "Hot-swap in the field. A full shift of dangerous work, captured.",
    dot: { xPct: 56, yPct: 62.5 },
    label: { side: "right", yPct: 82 },
  },
  {
    id: "housing-mount",
    cluster: "endurance",
    name: "Rugged mount and housing",
    support: "IP-rated for dust, water, heat. Built for farms and job sites, not labs.",
    dot: { xPct: 33, yPct: 33.5 },
    label: { side: "right", yPct: 69 },
  },
];
