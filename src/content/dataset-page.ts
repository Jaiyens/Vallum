// UI copy for the /dataset route. The specimen register: a typeset
// provenance record, the receipt over the pitch. Every string ships
// verbatim. Never paraphrase here or at a call site. Factual claims trace
// to nightshift/FACTS.md, ledgered numbers only, no delivery-mechanism or
// codec claims (absent from FACTS.md).
//
// CONSENT_PROVENANCE_STACK, CAPTURE_SPECS, and OFFER_COPY are the single
// authored source for facts that also render on / (F-0608, F-0609).
// sections.ts imports these; it does not re-author them, so the two pages
// cannot diverge again.

export const CONSENT_PROVENANCE_STACK = [
  "Written participant release in English, Afrikaans, and isiXhosa",
  "Site-owner authorization",
  "Face blur applied before export. Non-negotiable",
  "Per-clip provenance record: who, where, when, device, consent ID",
  "POPIA compliant, including Section 57 on biometric data export",
  "C2PA content-provenance signing where the pipeline supports it",
] as const;

export const CAPTURE_SPECS =
  "The capture kit today is 4 to 6 refurbished iPhones on head straps, carried in personally. Every clip is head-mounted, 1080p minimum, 30fps.";

export const OFFER_COPY =
  "A paid pilot licenses 20 to 40 curated, annotated, consent-cleared hours for $15,000 to $40,000: 50% on signature, 50% on delivery and acceptance. Licensing defaults to non-exclusive. Time-boxed, task-boxed exclusivity is available as a paid premium, scoped to one task and one window.";

export const DATASET_PAGE = {
  meta: {
    title: "The dataset | Vallum Labs",
    description:
      "Vallum Labs licenses consent-cleared, action-labeled egocentric video of outdoor manual work: schema, provenance, and pilot terms for robotics and world-model teams.",
  },

  heading: "The dataset",
  intro:
    "Vallum Labs collects consent-cleared, action-labeled egocentric video of outdoor manual work and licenses it to robotics and world-model teams. This page states the schema, the consent and provenance stack, the capture specs, and the offer exactly as they stand today.",

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
  schemaCompat: "Compatible with the Ego4D and Ego-Exo4D annotation conventions.",

  stackTitle: "Consent and provenance",
  stack: CONSENT_PROVENANCE_STACK,

  captureTitle: "Capture specs",
  captureSpecs: CAPTURE_SPECS,

  windowTitle: "Collection window",
  window:
    "The first collection window is the Western Cape harvest season, July 2026 to approximately January 2027, agriculture first. Construction, rooftop solar, offshore rigs, wind turbines, and high-rise ironwork are the stated direction beyond agriculture.",

  offerTitle: "The offer",
  offer: OFFER_COPY,

  entityLine: "Vallum Labs Inc. is a Delaware C-corp, filed via Stripe Atlas.",
} as const;
