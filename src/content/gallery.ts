// UI copy for the problem section gallery. Every string ships verbatim.
// Never paraphrase here or at a call site. Real panels play finished human
// clips; AI panels play generated unpopulated environments and must never
// contain people.

export type PanelMedia =
  | { kind: "real"; clip: "human-orchard" | "human-iron" | "human-solar" | "human-rig" }
  | { kind: "ai"; key: "fishing-deck" | "canoe-fishery" | "haze-yard" | "cut-block" };

export type GalleryPanelContent = {
  id: string;
  industry: string;
  media: PanelMedia;
  stat: string;
  source: string;
  secondary?: { stat: string; source: string };
};

export const GALLERY_PANELS = [
  {
    id: "p1",
    industry: "farming",
    media: { kind: "real", clip: "human-orchard" },
    stat: "One in three of the world's fatal workplace injuries happens to a farm worker.",
    source: "ILO, 2023",
  },
  {
    id: "p2",
    industry: "construction",
    media: { kind: "real", clip: "human-iron" },
    stat: "At least 108,000 construction workers are killed on site every year. About one every five minutes.",
    source: "ILO, 2023",
  },
  {
    id: "p3",
    industry: "fishing",
    media: { kind: "ai", key: "fishing-deck" },
    stat: "More than 100,000 fishers die on the job every year.",
    source: "FISH Safety Foundation / Pew, 2022",
  },
  {
    id: "p4",
    industry: "west africa fishery",
    media: { kind: "ai", key: "canoe-fishery" },
    stat: "In West Africa, about one in a hundred fishers dies every year.",
    source: "Pew, 2022",
  },
  {
    id: "p5",
    industry: "heat",
    media: { kind: "real", clip: "human-solar" },
    stat: "2.4 billion workers are exposed to dangerous heat on the job.",
    source: "ILO, 2024",
  },
  {
    id: "p6",
    industry: "air",
    media: { kind: "ai", key: "haze-yard" },
    stat: "Up to 860,000 outdoor workers die each year from the air they breathe at work.",
    source: "ILO, 2024",
  },
  {
    id: "p7",
    industry: "logging",
    media: { kind: "ai", key: "cut-block" },
    stat: "In the US, logging is the deadliest job. 110 deaths per 100,000 workers.",
    source: "BLS, 2024",
    secondary: {
      stat: "US loggers die at eight times the rate of police officers.",
      source: "BLS, 2023",
    },
  },
  {
    id: "p8",
    industry: "the pattern",
    media: { kind: "real", clip: "human-rig" },
    stat: "Farming, construction, forestry, fishing and factory work cause 63 percent of all workplace deaths.",
    source: "ILO, 2023",
  },
] as const satisfies readonly GalleryPanelContent[];

// The typewriter centerpiece on the helix axis. The stem keeps its trailing
// space; each full line is stem + line, typed as one string.
export const GALLERY_CENTERPIECE = {
  stem: "the work ",
  lines: ["that kills.", "no one records.", "machines must learn."],
  ariaLabel:
    "the work that kills, the work no one records, the work machines must learn",
} as const;
