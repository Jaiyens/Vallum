// UI copy for the problem section gallery. Every string ships verbatim.
// Never paraphrase here or at a call site. Real panels play finished human
// clips; AI panels play generated unpopulated environments and must never
// contain people.
//
// Founder override 2026-07-16 (Jay's morning correction): all eight original
// stat panels are restored verbatim, each with its citation, overriding the
// FACTS.md two-stat site cap for this section. Every citation renders. The
// full statistic and its source live in the click takeover; the panel itself
// carries the industry label plus a compact headline number (a true extract
// of the full stat, no new fact) so the number reads while the panel orbits.

export type PanelMedia =
  | { kind: "real"; clip: "human-orchard" | "human-iron" | "human-solar" | "human-rig" }
  | {
      kind: "ai";
      key:
        | "fishing-deck"
        | "canoe-fishery"
        | "haze-yard"
        | "cut-block"
        | "heat-drought"
        | "air-plant";
    };

export type GalleryPanelContent = {
  id: string;
  industry: string;
  media: PanelMedia;
  // Compact headline shown on the orbiting panel band: a short, true extract
  // of the full stat's key number. Kept legible at panel scale.
  headline: string;
  // The full ledgered statistic, verbatim, with its source. Shown in the
  // click takeover.
  stat: string;
  source: string;
  // A second cited figure for the same industry, shown in the takeover only.
  secondary?: { stat: string; source: string };
};

// Every panel carries a statistic now, so this guard is always true. It stays
// exported for call-site compatibility and to keep the takeover's stat styling
// branch explicit.
export function isStatPanel(p: GalleryPanelContent): boolean {
  return "stat" in p;
}

// The accessible name for a panel button and its takeover dialog.
export function panelLabel(p: GalleryPanelContent): string {
  const secondary = p.secondary
    ? ` ${p.secondary.stat} Source: ${p.secondary.source}.`
    : "";
  return `${p.industry}. ${p.stat} Source: ${p.source}.${secondary}`;
}

// Annotated as GalleryPanelContent[] rather than `as const` so the optional
// secondary figure is reachable on the union; ids are looked up against
// GALLERY_VIDEO with an explicit keyof cast at every call site.
export const GALLERY_PANELS: readonly GalleryPanelContent[] = [
  {
    id: "p1",
    industry: "farming",
    media: { kind: "real", clip: "human-orchard" },
    headline: "1 in 3 workplace deaths",
    stat: "One in three of the world's fatal workplace injuries happens to a farm worker.",
    source: "ILO, 2023",
  },
  {
    id: "p2",
    industry: "construction",
    media: { kind: "real", clip: "human-iron" },
    headline: "108,000 killed a year",
    stat: "At least 108,000 construction workers are killed on site every year. About one every five minutes.",
    source: "ILO, 2023",
  },
  {
    id: "p3",
    industry: "fishing",
    media: { kind: "ai", key: "fishing-deck" },
    headline: "100,000+ die a year",
    stat: "More than 100,000 fishers die on the job every year.",
    source: "FISH Safety Foundation / Pew, 2022",
  },
  {
    id: "p4",
    industry: "west africa fishery",
    media: { kind: "ai", key: "canoe-fishery" },
    headline: "1 in 100 dies a year",
    stat: "In West Africa, about one in a hundred fishers dies every year.",
    source: "Pew, 2022",
  },
  {
    id: "p5",
    industry: "heat",
    media: { kind: "ai", key: "heat-drought" },
    headline: "2.4 billion exposed",
    stat: "2.4 billion workers are exposed to dangerous heat on the job.",
    source: "ILO, 2024",
  },
  {
    id: "p6",
    industry: "air",
    media: { kind: "ai", key: "air-plant" },
    headline: "up to 860,000 die a year",
    stat: "Up to 860,000 outdoor workers die each year from the air they breathe at work.",
    source: "ILO, 2024",
  },
  {
    id: "p7",
    industry: "logging",
    media: { kind: "ai", key: "cut-block" },
    headline: "110 per 100,000",
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
    headline: "63% of workplace deaths",
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
