// UI copy for the problem section gallery (beat 2). Every string ships
// verbatim. Never paraphrase here or at a call site. Real panels play
// finished human clips; AI panels play generated unpopulated environments
// and must never contain people.
//
// Fatality budget: FACTS.md caps fatality statistics at two site-wide, each
// cited with a real denominator. Exactly two panels carry one: the NIOSH
// tractor-overturn figure on agriculture, and the roofing rate on rooftop
// solar. Every other panel describes the work and its conditions in 15 to 30
// words, no body count. See STORY.md beat 2.

export type PanelMedia =
  | { kind: "real"; clip: "human-orchard" | "human-iron" | "human-solar" | "human-rig" }
  | { kind: "ai"; key: "fishing-deck" | "canoe-fishery" | "haze-yard" | "cut-block" };

export type StatPanel = {
  id: string;
  industry: string;
  media: PanelMedia;
  // A ledgered fatality statistic, worded off FACTS.md, with its source.
  stat: string;
  source: string;
};

export type ConditionPanel = {
  id: string;
  industry: string;
  media: PanelMedia;
  // 15 to 30 words on the work and its conditions. No body count.
  description: string;
};

export type GalleryPanelContent = StatPanel | ConditionPanel;

export function isStatPanel(p: GalleryPanelContent): p is StatPanel {
  return "stat" in p;
}

// The accessible name for a panel button and its takeover dialog.
export function panelLabel(p: GalleryPanelContent): string {
  return isStatPanel(p)
    ? `${p.industry}. ${p.stat} Source: ${p.source}.`
    : `${p.industry}. ${p.description}`;
}

export const GALLERY_PANELS = [
  {
    id: "p1",
    industry: "agriculture",
    media: { kind: "real", clip: "human-orchard" },
    stat: "Roughly 130 deaths a year are attributed to tractor overturns.",
    source: "NIOSH",
  },
  {
    id: "p2",
    industry: "high-rise ironwork",
    media: { kind: "real", clip: "human-iron" },
    description:
      "Ironworkers connect steel hundreds of feet up, walking open beams in wind and cold with nothing under them but the frame they are raising.",
  },
  {
    id: "p3",
    industry: "deep-sea fishing",
    media: { kind: "ai", key: "fishing-deck" },
    description:
      "Crews work sloping decks in heavy seas, hauling nets and gear through cold and spray on shifts that run for days far from any harbor.",
  },
  {
    id: "p4",
    industry: "small-boat fishery",
    media: { kind: "ai", key: "canoe-fishery" },
    description:
      "Fishers launch open boats through surf and work the water by hand, without decks, rails, or radios, hours from shore in whatever weather the day brings.",
  },
  {
    id: "p5",
    industry: "rooftop solar",
    media: { kind: "real", clip: "human-solar" },
    stat: "In the US, roofing has a fatality rate of 48.7 per 100,000 workers.",
    source: "BLS",
  },
  {
    id: "p6",
    industry: "port yards",
    media: { kind: "ai", key: "haze-yard" },
    description:
      "Dock crews work container yards in heat and diesel haze, guiding straddle carriers and cranes that swing steel boxes overhead through long shifts.",
  },
  {
    id: "p7",
    industry: "logging",
    media: { kind: "ai", key: "cut-block" },
    description:
      "Loggers fell timber on steep, broken ground, running saws beside trunks that can drop the wrong way in an instant, in fog, mud, and cold.",
  },
  {
    id: "p8",
    industry: "drilling rigs",
    media: { kind: "real", clip: "human-rig" },
    description:
      "Rig hands wrestle turning pipe and heavy tongs on an open deck, in noise, weather, and grease, where a slip has no small version.",
  },
] as const satisfies readonly GalleryPanelContent[];

// The two ledgered statistics, rendered as always-visible caption text so
// beat 2's argument lands for a reader who never orbits (F-0501).
export const LEDGER_STATS = (GALLERY_PANELS as readonly GalleryPanelContent[]).filter(
  isStatPanel,
);

// The typewriter centerpiece on the helix axis. The stem keeps its trailing
// space; each full line is stem + line, typed as one string. The three lines
// stay (defect 5); only the flattened accessible name shrinks to two Shape C
// fragments (F-0601). The third clause moves to beat 3's heading, which
// already carries the idea machines learn this work by watching.
export const GALLERY_CENTERPIECE = {
  stem: "the work ",
  lines: ["that kills.", "no one records.", "machines must learn."],
  ariaLabel: "The work that kills. The work no one records.",
} as const;
