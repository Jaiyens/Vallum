// UI copy for the hero experience. Every string ships verbatim. Never
// paraphrase here or at a call site. Content copy lives under src/content
// by design; the rest of the app lives at the repo root.

export const HERO_COPY = {
  wordmark: "VALLUM LABS",
  // Cut 2026-07-16 per Jay's morning correction: the bottom tagline is gone.
  // Component render of monoLine is removed by another agent; this string
  // stays exported and empty so nothing downstream breaks on the key.
  monoLine: "",
  // Beat 1 (2026-07-16 correction, overrides the prior STORY.md ruling):
  // Jay's verdict line returns. Display line states the danger of the work
  // itself, no body count, no negation of Vallum Labs' identity. Beat 2 is a
  // new short, grave, forward-leaning companion line; it no longer carries
  // the collect/license sentence, which is now TURN_COPY.positioning in
  // sections.ts.
  beatOne: "This work was never meant for humans.",
  beatTwo: "Someone still has to be there. So are we.",
  stateTagHuman: "HUMAN CREW",
  stateTagRobot: "ROBOT TWIN",
} as const;
