// UI copy for the hero experience. Every string ships verbatim. Never
// paraphrase here or at a call site. Content copy lives under src/content
// by design; the rest of the app lives at the repo root.

export const HERO_COPY = {
  wordmark: "VALLUM LABS",
  // Cut 2026-07-16 per Jay's morning correction: the bottom tagline is gone.
  // Component render of monoLine is removed by another agent; this string
  // stays exported and empty so nothing downstream breaks on the key.
  monoLine: "",
  // Beats 1 and 2 are Jay's lines verbatim (2026-07-19 correction). The
  // collect/license sentence stays in TURN_COPY.positioning in sections.ts.
  beatOne: "The most dangerous work on earth is still done by hand.",
  beatTwo: "We capture it, so robots can learn it.",
  stateTagHuman: "HUMAN CREW",
  stateTagRobot: "ROBOT TWIN",
} as const;
