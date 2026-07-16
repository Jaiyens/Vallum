// UI copy for the bone sections: the turn, the method, what ships, and the
// close. Every string ships verbatim. Never paraphrase here or at a call
// site. Factual claims trace to nightshift/FACTS.md; external facts render
// with their attribution beside them.

export const TURN_COPY = {
  heading: "Machines are learning this work by watching",
  lead: "Robots and world models learn physical work from egocentric video: first-person footage of people doing real tasks. NVIDIA GEAR's EgoScale pretrained a VLA on 20,854 hours of action-labeled egocentric human video and reported a 54% average performance gain over no pretraining.",
  leadSource: "Source: NVIDIA GEAR",
  indoor:
    "Nearly all of that footage was shot under a roof: kitchens, warehouses, homes, factory floors. Ego4D, the reference corpus, spans 3,670 hours from 931 camera wearers across 74 locations in 9 countries.",
  indoorSource: "Source: Ego4D",
  turn: "Outdoor manual work is missing from the record: vines in the rain, a roof pitched at 40 degrees, a deck in weather. The environments are hostile, access runs on trust, and consent has to survive a buyer's legal review. That is why nobody collects it, and it is exactly what Vallum Labs collects.",
} as const;

export const METHOD_COPY = {
  heading: "Consent first, camera second",
  // Consent facts are stated here at framing level only; the itemized
  // six-item stack (exact language list, blur, POPIA, C2PA) lives once in
  // DATASET_COPY.stack and on /dataset, per F-0303.
  people:
    "Every capture starts with a signed release in the person's own language, before a camera turns on. The site owner authorizes it, and faces blur before any clip leaves the pipeline.",
  window:
    "The first collection window is the Western Cape harvest season, July 2026 to approximately January 2027, agriculture first. Construction, rooftop solar, offshore rigs, wind turbines, and high-rise ironwork are the stated direction beyond agriculture.",
  kit: "The capture kit today is 4 to 6 refurbished iPhones on head straps, carried in personally. Every clip is head-mounted, 1080p minimum, 30fps.",
} as const;

export const DATASET_COPY = {
  heading: "What ships with every clip",
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
  stack: [
    "Written participant release in English, Afrikaans, and isiXhosa",
    "Site-owner authorization for every location",
    "Face blur applied before export",
    "Per-clip provenance record: who, where, when, device, consent ID",
    "POPIA compliant, including Section 57 on biometric data export",
    "C2PA content-provenance signing where the pipeline supports it",
  ],
  offerTitle: "The offer",
  offer:
    "A paid pilot runs $15,000 to $40,000 for 20 to 40 curated, annotated, consent-cleared hours: 50% on signature, 50% on delivery and acceptance. Licensing is non-exclusive by default. Time-boxed, task-boxed exclusivity is available as a paid premium.",
} as const;

export const CLOSE_COPY = {
  line: "Vallum Labs Inc. Cape Town, South Africa.",
} as const;
