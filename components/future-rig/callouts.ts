// Copy and geometry for the future rig section live here. Coordinates are in
// the schematic's viewBox space (0 0 1200 680). The SVG is authored in its
// exploded state. Anchors sit on part perimeters per the geometry contract.

export type Cluster = "sensing" | "trust" | "endurance";

export type Callout = {
  id: string;
  cluster: Cluster;
  name: string;
  support: string;
  anchor: { x: number; y: number };
  // Explicit leader route, authored to avoid crossing any part body.
  route: string;
  label: { side: "left" | "right"; y: number };
};

export type Mover = {
  id: string;
  cluster: Cluster;
  // Assembled position delta. The scrub animates translate from this to zero.
  from: { x: number; y: number };
};

export const VIEWBOX = { w: 1200, h: 680 } as const;

// Leader lines end at the viewBox edges. Label columns sit outside the canvas.
export const LABEL_EDGE = { left: 62, right: 1178 } as const;

export const SECTION_COPY = {
  eyebrow: "Concept. In development.",
  headline: "The rig we are building to capture the real world at scale",
  subline: "A purpose-built egocentric rig. Every component earns its place in the data.",
  bridge: "Today: commodity capture on refurbished iPhones. Tomorrow: a purpose-built rig.",
  caption: "v-next concept, subject to change",
  svgLabel:
    "Exploded schematic of the Vallum capture rig concept. A head mounted unit with a front sensor bar, a central housing, a side arm, and a rear pod, drawn along one explosion axis.",
} as const;

export const CLUSTERS: { key: Cluster; label: string }[] = [
  { key: "sensing", label: "Sensing" },
  { key: "trust", label: "Trust" },
  { key: "endurance", label: "Endurance" },
];

// Groups the scrub moves, in reveal order within each cluster. The housing
// is the static assembly anchor and never animates.
export const MOVERS: Mover[] = [
  { id: "g-front-bar", cluster: "sensing", from: { x: 70, y: 0 } },
  { id: "g-imu", cluster: "sensing", from: { x: 0, y: 85 } },
  { id: "g-gnss", cluster: "sensing", from: { x: 0, y: 88 } },
  { id: "g-arm", cluster: "trust", from: { x: -70, y: 0 } },
  { id: "g-rear-pod", cluster: "trust", from: { x: -140, y: 0 } },
  { id: "g-compute", cluster: "trust", from: { x: 0, y: 120 } },
  { id: "g-storage", cluster: "endurance", from: { x: 0, y: -100 } },
  { id: "g-battery", cluster: "endurance", from: { x: 0, y: -103 } },
  { id: "g-strap", cluster: "endurance", from: { x: 0, y: -110 } },
];

export const CALLOUTS: Callout[] = [
  // sensing, left column
  {
    id: "g-rgb-cam",
    cluster: "sensing",
    name: "Wide FOV RGB camera",
    support: "Captures the worker’s point of view. The frame a robot policy learns from.",
    anchor: { x: 130, y: 320 },
    route: `M 130 320 L ${LABEL_EDGE.left} 320`,
    label: { side: "left", y: 320 },
  },
  {
    id: "g-stereo",
    cluster: "sensing",
    name: "Stereo depth pair",
    support: "Two cameras, overlapping fields. Depth and 3D hand tracking without a lidar.",
    anchor: { x: 300, y: 367 },
    route: `M 300 367 L 300 438 L 332 438 L 332 640 L ${LABEL_EDGE.left} 640`,
    label: { side: "left", y: 640 },
  },
  {
    id: "g-imu",
    cluster: "sensing",
    name: "IMU (6-axis)",
    support: "Tracks head and body motion at high rate. Turns raw video into action labels.",
    anchor: { x: 457, y: 170 },
    route: `M 457 170 L 430 170 L 430 205 L ${LABEL_EDGE.left} 205`,
    label: { side: "left", y: 205 },
  },
  {
    id: "g-gnss",
    cluster: "sensing",
    name: "GNSS module",
    support: "Logs where each clip was captured. Proves geographic diversity across sites.",
    anchor: { x: 555, y: 165 },
    route: `M 555 165 L 530 165 L 530 80 L ${LABEL_EDGE.left} 80`,
    label: { side: "left", y: 80 },
  },
  {
    id: "g-mics",
    cluster: "sensing",
    name: "Directional microphones",
    support: "Capture task audio and spoken context. Aligned to the action on screen.",
    anchor: { x: 230, y: 404 },
    route: `M 230 404 L 230 412 L 120 412 L 120 455 L ${LABEL_EDGE.left} 455`,
    label: { side: "left", y: 455 },
  },
  // trust, right column
  {
    id: "g-blur",
    cluster: "trust",
    name: "On-device face blur",
    support: "Blurs faces and plates before storage. POPIA-clean and consent-safe by default.",
    anchor: { x: 991, y: 138 },
    route: `M 991 138 L 991 55 L ${LABEL_EDGE.right} 55`,
    label: { side: "right", y: 55 },
  },
  {
    id: "g-signing",
    cluster: "trust",
    name: "Provenance signing",
    support: "Signs every clip at capture with C2PA. Tamper-evident chain of custody.",
    anchor: { x: 1036, y: 138 },
    route: `M 1036 138 L 1036 104 L 1120 104 L 1120 150 L ${LABEL_EDGE.right} 150`,
    label: { side: "right", y: 150 },
  },
  {
    id: "g-compute",
    cluster: "trust",
    name: "Edge compute module",
    support: "Runs blur and signing on-device. Nothing leaves the rig unprocessed.",
    anchor: { x: 1070, y: 150 },
    route: `M 1070 150 L 1110 150 L 1110 245 L ${LABEL_EDGE.right} 245`,
    label: { side: "right", y: 245 },
  },
  // endurance, right column
  {
    id: "g-storage",
    cluster: "endurance",
    name: "Secure storage",
    support: "Encrypted, swappable, field-ready. Full days of capture without offload.",
    anchor: { x: 1055, y: 520 },
    route: `M 1055 520 L 1070 520 L 1070 640 L ${LABEL_EDGE.right} 640`,
    label: { side: "right", y: 640 },
  },
  {
    id: "g-battery",
    cluster: "endurance",
    name: "Swappable batteries",
    support: "Hot-swap in the field. A full shift of dangerous work, captured.",
    anchor: { x: 1155, y: 510 },
    route: `M 1155 510 L 1160 510 L 1160 555 L ${LABEL_EDGE.right} 555`,
    label: { side: "right", y: 555 },
  },
  {
    id: "g-housing-mount",
    cluster: "endurance",
    name: "Rugged mount and housing",
    support: "IP-rated for dust, water, heat. Built for farms and job sites, not labs.",
    anchor: { x: 620, y: 425 },
    route: `M 620 425 L 620 470 L ${LABEL_EDGE.right} 470`,
    label: { side: "right", y: 470 },
  },
];

export function leaderPath(c: Callout) {
  return c.route;
}
