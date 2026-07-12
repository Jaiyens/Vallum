// Copy and geometry for the future rig section live here. Coordinates are in
// the schematic's viewBox space (0 0 1200 680). Anchor points are in the
// exploded (final) position. Home point = anchor minus explode offset.

export type Cluster = "sensing" | "trust" | "endurance";

export type Callout = {
  id: string;
  cluster: Cluster;
  name: string;
  support: string;
  anchor: { x: number; y: number };
  explode: { dx: number; dy: number };
  label: { side: "left" | "right"; y: number };
};

export const VIEWBOX = { w: 1200, h: 680 } as const;

// Leader lines stop at the label column edges.
export const LABEL_EDGE = { left: 260, right: 940 } as const;

export const SECTION_COPY = {
  eyebrow: "Concept. In development.",
  headline: "The rig we are building to capture the real world at scale",
  subline: "A purpose-built egocentric rig. Every component earns its place in the data.",
  bridge: "Today: commodity capture on refurbished iPhones. Tomorrow: a purpose-built rig.",
  caption: "v-next concept, subject to change",
  svgLabel:
    "Exploded schematic of the Vallum capture rig concept. A head mounted unit with a camera cluster, sensing modules, on-device trust hardware, and field endurance parts.",
} as const;

export const CLUSTERS: { key: Cluster; label: string }[] = [
  { key: "sensing", label: "Sensing" },
  { key: "trust", label: "Trust" },
  { key: "endurance", label: "Endurance" },
];

export const CALLOUTS: Callout[] = [
  // sensing (left column)
  {
    id: "rig-camera",
    cluster: "sensing",
    name: "Wide FOV RGB camera",
    support: "Captures the worker’s point of view. The frame a robot policy learns from.",
    anchor: { x: 332, y: 322 },
    explode: { dx: -120, dy: -30 },
    label: { side: "left", y: 330 },
  },
  {
    id: "rig-stereo",
    cluster: "sensing",
    name: "Stereo depth pair",
    support: "Two cameras, overlapping fields. Depth and 3D hand tracking without a lidar.",
    anchor: { x: 282, y: 395 },
    explode: { dx: -150, dy: 40 },
    label: { side: "left", y: 440 },
  },
  {
    id: "rig-imu",
    cluster: "sensing",
    name: "IMU (6-axis)",
    support: "Tracks head and body motion at high rate. Turns raw video into action labels.",
    anchor: { x: 540, y: 175 },
    explode: { dx: -20, dy: -160 },
    label: { side: "left", y: 220 },
  },
  {
    id: "rig-gnss",
    cluster: "sensing",
    name: "GNSS module",
    support: "Logs where each clip was captured. Proves geographic diversity across sites.",
    anchor: { x: 600, y: 110 },
    explode: { dx: -40, dy: -190 },
    label: { side: "left", y: 110 },
  },
  {
    id: "rig-mics",
    cluster: "sensing",
    name: "Directional microphones",
    support: "Capture task audio and spoken context. Aligned to the action on screen.",
    anchor: { x: 466, y: 600 },
    explode: { dx: -60, dy: 170 },
    label: { side: "left", y: 550 },
  },
  // trust (right column, upper)
  {
    id: "rig-blur",
    cluster: "trust",
    name: "On-device face blur",
    support: "Blurs faces and plates before storage. POPIA-clean and consent-safe by default.",
    anchor: { x: 915, y: 208 },
    explode: { dx: 170, dy: -125 },
    label: { side: "right", y: 210 },
  },
  {
    id: "rig-sign",
    cluster: "trust",
    name: "Provenance signing",
    support: "Signs every clip at capture with C2PA. Tamper-evident chain of custody.",
    anchor: { x: 928, y: 327 },
    explode: { dx: 160, dy: -17 },
    label: { side: "right", y: 310 },
  },
  {
    id: "rig-compute",
    cluster: "trust",
    name: "Edge compute module",
    support: "Runs blur and signing on-device. Nothing leaves the rig unprocessed.",
    anchor: { x: 880, y: 175 },
    explode: { dx: 130, dy: -160 },
    label: { side: "right", y: 110 },
  },
  // endurance (right column, lower)
  {
    id: "rig-storage",
    cluster: "endurance",
    name: "Secure storage",
    support: "Encrypted, swappable, field-ready. Full days of capture without offload.",
    anchor: { x: 920, y: 440 },
    explode: { dx: 165, dy: 50 },
    label: { side: "right", y: 430 },
  },
  {
    id: "rig-battery",
    cluster: "endurance",
    name: "Swappable batteries",
    support: "Hot-swap in the field. A full shift of dangerous work, captured.",
    anchor: { x: 920, y: 532 },
    explode: { dx: 110, dy: 130 },
    label: { side: "right", y: 530 },
  },
  {
    id: "rig-strap",
    cluster: "endurance",
    name: "Rugged mount and housing",
    support: "IP-rated for dust, water, heat. Built for farms and job sites, not labs.",
    anchor: { x: 798, y: 602 },
    explode: { dx: 0, dy: 150 },
    label: { side: "right", y: 620 },
  },
];

export function homePoint(c: Callout) {
  return { x: c.anchor.x - c.explode.dx, y: c.anchor.y - c.explode.dy };
}

// One elbow route from the anchor toward the label column, then along the
// slot row to the column edge. Near-level anchors, and anchors too close to
// the column edge for a clean elbow, get a straight line instead.
export function leaderPath(c: Callout) {
  const { x: ax, y: ay } = c.anchor;
  const labelY = c.label.y;
  const left = c.label.side === "left";
  const end = left ? LABEL_EDGE.left : LABEL_EDGE.right;
  const mx = left ? ax - 36 : ax + 36;
  const elbowFits = left ? mx > end + 20 : mx < end - 20;
  if (Math.abs(ay - labelY) < 10 || !elbowFits) {
    return `M ${ax} ${ay} L ${end} ${labelY}`;
  }
  return `M ${ax} ${ay} L ${mx} ${ay} L ${mx} ${labelY} L ${end} ${labelY}`;
}
