// UI copy for beat 6 (the ethos, forest, full bleed) and beat 7 (the
// wordmark footer). Every string ships verbatim. Never paraphrase here or
// at a call site. Factual claims trace to nightshift/FACTS.md.

export const ETHOS_COPY = {
  // Shape A job label, matching STORY.md's own name for this beat.
  heading: "Why it is done this way",

  // Concept 2, safe tier (research/CONCEPTS.md): the three consent
  // languages as a typographic triad, set in the display serif per
  // hard rule 7 (plain sentence voice, no badge). languagesLabel is the
  // short lead-in fragment that introduces the triad; languages is the
  // triad itself.
  languagesLabel: "Consent, signed in",
  languages: ["English", "Afrikaans", "isiXhosa"],

  // 60 to 90 word ethos passage, first-person company voice, procedures not
  // adjectives. Items drawn strictly from the FACTS.md consent stack. No
  // payment claim, no fatality numbers, no benefit-corporation vocabulary.
  passage: [
    "We ask before we film. Every participant signs a release in English, Afrikaans, or isiXhosa, whichever they read, before a camera turns on. The site owner authorizes the ground first.",
    "We blur faces before any clip leaves the pipeline. A provenance record ties every clip to that signature: who, where, when, device, consent ID. POPIA governs how we handle it, Section 57 included.",
    "The record is why the work exists at all.",
  ],

  // Home-founder passage. Framed around why the access exists.
  // Facts only: nightshift/FACTS.md, Founder section.
  founder: {
    passage: [
      "I grew up in a farming family outside Fresno, California. I am 18, studying at UC Berkeley, Haas and Computer Science. I am the only person at Vallum Labs.",
      "I came to Cape Town on July 16, 2026, for the Western Cape harvest. The access this work needs starts with someone who already knows a farm.",
    ],
    // 2-word verb phrase naming the destination, per VOICE's CTA shape.
    linkLabel: "Meet Jay",
  },

  // Beat 7, wordmark footer. Entity line and a one-line echo of beat 5's
  // offer, no invented email or URL. Nav labels point at real routes only.
  footer: {
    entityLine: "Vallum Labs Inc. Cape Town, South Africa.",
    // Rewritten 2026-07-16: price line removed (Jay's morning correction).
    // States the pilot is open and points at the existing "Meet Jay" route
    // above; no invented email or URL.
    askEcho: "A paid pilot is open. Reach Jay to start one.",
    homeLabel: "Home",
    datasetLabel: "Dataset",
  },
} as const;
