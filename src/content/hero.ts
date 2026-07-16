// UI copy for the hero experience. Every string ships verbatim. Never
// paraphrase here or at a call site. Content copy lives under src/content
// by design; the rest of the app lives at the repo root.

export const HERO_COPY = {
  wordmark: "VALLUM LABS",
  monoLine: "physical ai data for the outdoor economy",
  // Beat 1 (STORY.md). Display line: 8 words or fewer, concrete, about the
  // work itself, no verdict on the workers, no death. Sub line: 14 words or
  // fewer, naming what the company collects and licenses and to whom, no
  // temporal judgment on the people doing the work.
  beatOne: "Outdoor work. At height, in the weather.",
  beatTwo:
    "We collect consent-cleared, action-labeled egocentric video and license it to robotics and world-model teams.",
  stateTagHuman: "HUMAN CREW",
  stateTagRobot: "ROBOT TWIN",
} as const;
