// UI copy for the bone sections: the turn, the method, what ships, and the
// close. Every string ships verbatim. Never paraphrase here or at a call
// site. Factual claims trace to nightshift/FACTS.md; external facts render
// with their attribution beside them.
//
// The consent-and-provenance stack, capture specs, and offer paragraph are
// authored once in dataset-page.ts and imported here (F-0608, F-0609) so
// / and /dataset render identical strings for the same facts.
import {
  CAPTURE_SPECS,
  CONSENT_PROVENANCE_STACK,
  OFFER_COPY,
} from "@/src/content/dataset-page";

export const TURN_COPY = {
  heading: "Machines are learning this work by watching",
  // 2026-07-16: the collect/license sentence moves here from hero.ts as the
  // section's lead positioning line (Jay's correction). It sits ahead of the
  // two fact paragraphs below.
  positioning:
    "We collect consent-cleared, action-labeled egocentric video and license it to robotics and world-model teams.",
  // Cut 2026-07-16: body trimmed from ~127 words to fit a hard 70-word cap
  // across the two paragraphs below (lead, indoor), each with its mono
  // source line. EgoScale and Ego4D facts kept with attribution; the
  // former "turn" paragraph is folded down to a short closing line so the
  // key stays populated without adding a third full paragraph.
  lead: "Robots and world models learn physical work from egocentric video: first-person footage of real tasks. NVIDIA GEAR's EgoScale pretrained a VLA on 20,854 hours of it, reporting a 54% gain over no pretraining.",
  leadSource: "Source: NVIDIA GEAR",
  indoor:
    "Almost all of that footage was shot indoors. Ego4D, the reference corpus, spans 3,670 hours from 931 wearers across 74 locations in 9 countries.",
  indoorSource: "Source: Ego4D",
  turn: "Outdoor work is missing from that record. Vallum Labs collects it.",
} as const;

export const METHOD_COPY = {
  heading: "Consent first, camera second",
  // Consent facts are stated here at framing level only; the itemized
  // six-item stack (exact language list, blur, POPIA, C2PA) is authored
  // once in dataset-page.ts as CONSENT_PROVENANCE_STACK and imported by
  // DATASET_COPY.stack below, per F-0303 and F-0608.
  //
  // Cut 2026-07-16: three steps, ~87 words down to 53, each with a 2-4 word
  // mono label added for the visual-steps render another agent is building.
  // Old flat keys (people, window, kit) stay populated so nothing importing
  // them breaks; the *Label keys are new.
  peopleLabel: "Consent first",
  people:
    "Every participant signs a release in their own language, and the site owner authorizes it.",
  windowLabel: "Harvest window",
  window:
    "The first window is the Western Cape harvest season, July 2026 to approximately January 2027.",
  kitLabel: "Capture kit",
  kit: CAPTURE_SPECS,
} as const;

export const DATASET_COPY = {
  // Renamed 2026-07-16 (Jay hates "What ships with every clip"). This
  // section is becoming a designed schema artifact, so the heading now
  // names the artifact itself rather than describing shipping contents.
  heading: "The record",
  lead: "Consent-cleared, action-labeled egocentric video of outdoor manual work, licensed to robotics and world-model teams. Every hour is annotated to conventions compatible with Ego4D and Ego-Exo4D, face-blurred before export, and delivered with a signed consent chain.",
  schemaTitle: "Annotation schema",
  schema: [
    "Per-clip task label",
    "Environment and scene tag",
    "Geography tag",
    "Hand-visibility flag",
    "21-keypoint hand-pose track where recoverable",
    "Object-in-hand label",
    "Action-segment start and stop timestamps",
    "Consent and provenance ID linking the clip to a signed release",
  ],
  stackTitle: "Consent and provenance",
  stack: CONSENT_PROVENANCE_STACK,
  offerTitle: "The offer",
  offer: OFFER_COPY,
} as const;

export const CLOSE_COPY = {
  line: "Vallum Labs Inc. Cape Town, South Africa.",
} as const;
