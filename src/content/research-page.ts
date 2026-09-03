// UI copy for the /research route: the white paper. Source is Jay's own
// research page, handed over 2026-09-03. Every string below ships verbatim
// from that document; nothing here is authored, paraphrased, rounded or
// hedged, and no string may be paraphrased at a call site either (F-0013).
//
// LEDGER NOTE. nightshift/FACTS.md was last verified 2026-07-15 and does
// not yet carry this document's facts. Several supersede the July ledger:
// the collection window opens September 2026 (July in FACTS.md), rigs are
// head AND chest mounted with four in the field (4 to 6 head straps in
// FACTS.md), capture is stated as HEVC monocular RGB 1920x1080 (a codec
// claim FACTS.md does not hold), the annotation schema is Ego4D-narration
// shaped rather than the keypoint schema on /dataset, and the pilot is
// quantified again at 20 to 40 curated hours, a quantity Jay's 2026-07-16
// correction had removed site-wide. Founder-supplied copy wins over the
// stale ledger, so it ships; findings/needs-fact.md carries the request
// for Jay to ratify these into FACTS.md and to reconcile /dataset.

// Section order is the founder document's order. Numbers on the page and
// in the contents ledger are derived from this array, never typed twice,
// so the two cannot drift.
export const RESEARCH_SECTIONS = [
  { id: "team", label: "Team" },
  { id: "hardware", label: "Hardware" },
  { id: "operations", label: "Operations" },
  { id: "consent", label: "Consent and provenance" },
  { id: "annotation", label: "Annotation" },
  { id: "evaluation", label: "Evaluation" },
  { id: "datasets", label: "Datasets" },
  { id: "farms", label: "Farms" },
  { id: "labs", label: "Researchers and labs" },
  { id: "reading", label: "Reading" },
] as const;

export type ResearchSectionId = (typeof RESEARCH_SECTIONS)[number]["id"];

export const RESEARCH_PAGE = {
  meta: {
    title: "Research | Vallum Labs",
    description:
      "Vallum Labs collects consent-cleared, action-labeled, first-person video of real outdoor manual work and licenses it to robotics and world-model labs.",
  },

  // Masthead. The kicker and the version are the document's own words
  // ("Schema v0", "Not in v0"); the dateline is the stated window's first
  // month, not an invented publication date.
  kicker: "White paper",
  version: "v0",
  dateline: "September 2026",
  heading: "Research",
  thesis:
    "Vallum Labs collects consent-cleared, action-labeled, first-person video of real outdoor manual work and licenses it to robotics and world-model labs.",
  status: "Now collecting in the Western Cape, South Africa. September 2026 to January 2027.",

  contentsTitle: "Contents",

  team: "Founded in 2026 by Jaiyen Shetty. Grew up farming in Fresno, California. Computer science and business at Berkeley. Previously at Meta, the UN, the Gates Foundation and Amplitude. Based in Cape Town through January 2027, then the next region.",

  hardware:
    "Head and chest mounted iPhone rigs, four in the field. Monocular RGB at 1920x1080, 30 fps, HEVC at capture, camera settings locked for the whole shift. Not in v0: IMU, depth, wrist cameras, per-phone intrinsics. Each of those is a hardware decision that waits for a buyer to ask for it.",

  operationsLead:
    "Workers wear rigs during their normal paid shifts on commercial farms. Nobody is filmed doing anything they would not be doing anyway. Current tasks, Southern Hemisphere spring and summer:",
  operationsTasks: [
    "Valencia orange picking, Citrusdal and Piketberg, through October",
    "Blueberry picking, George, Paarl and Wellington, October to November",
    "Strawberry picking, Stellenbosch, September to December",
    "Vine suckering and shoot thinning, from October",
  ],
  operationsNext: "Next verticals: construction, mining, forestry.",

  consent:
    "Every worker signs a written consent form in English, Afrikaans or isiXhosa before the rig goes on, and is paid for wearing it. Every clip carries a consent ID and a SHA-256 hash of the raw file. Faces are blurred and audio is stripped before any file leaves the farm. Farms are coded; deliverables carry a region, never coordinates. Built to POPIA, South Africa's data protection law.",

  annotation:
    "Schema v0 follows Ego4D and Ego-Exo4D conventions so any lab can read it on sight: timestamped narrations at 8 to 13 per minute, verb and noun action segments per hand, and pre, point-of-no-return and post critical frames with hand and object boxes propagated with SAM 2. Each segment also carries the Gemini Robotics 2 ER benchmark fields (progress bucket, critical-moment timestamp, success or failure with a fault code). Delivery is one Ego4D-shaped JSON per clip, plus a datasheet, verb and noun lists, consent summary and lineage manifest per batch. Send us your schema before we film and we map it onto this instead of rebuilding.",

  evaluation:
    "Every seventh clip of every session is held out, annotated to the same schema, and never delivered or shown. Labs can score policies against it. Outdoor manual work has no sim-to-real benchmark yet. This is the start of one.",

  datasets: [
    {
      name: "Outdoor-20",
      scope: "Valencia citrus harvest, Western Cape, 20 curated hours",
      due: "Oct 2026",
    },
    {
      name: "Outdoor-200",
      scope: "Citrus, blueberries, strawberries, vines, 200 hours",
      due: "Feb 2027",
    },
    {
      name: "Outdoor-2K",
      scope: "Agriculture and construction, 2,000 hours",
      due: "2027",
    },
  ],
  datasetsNote: "Datasets are licensed. Research groups get gated samples first.",

  farms:
    "We pay your crew, blur every face, and send you a picking report and a three-minute first-person training film within a week of the shoot. The footage never carries your farm's name.",

  labs: "If you train on human video and your corpus has no outdoor work in it, we fill that gap to your spec. Tell us the fields you need before we film. Footage cannot be reshot to a different schema. Paid pilots run 20 to 40 curated hours, delivered with a datasheet and held-out scores.",

  // The document's own ask. Jay published this address himself, so it is
  // a ledgered contact fact now, not an invented one (needs-fact item 1).
  askLead: "Write to",
  askEmail: "jaiyen_shetty@berkeley.edu",

  // Prior work, cited as the document cites it. The two 2026 entries are
  // the only rows a reviewer cannot check against memory; the link check
  // is logged in findings/needs-fact.md.
  reading: [
    {
      title: "Ego4D: Around the World in 3,000 Hours of Egocentric Video",
      href: "https://arxiv.org/abs/2110.07058",
      year: "2021",
    },
    {
      title: "Ego-Exo4D: Understanding Skilled Human Activity",
      href: "https://arxiv.org/abs/2311.18259",
      year: "2023",
    },
    {
      title: "EgoMimic: Scaling Imitation Learning via Egocentric Video",
      href: "https://arxiv.org/abs/2410.24221",
      year: "2024",
    },
    {
      title:
        "EgoScale: Scaling Dexterous Manipulation with Diverse Egocentric Human Data",
      href: "https://arxiv.org/abs/2602.16710",
      year: "NVIDIA GEAR, 2026",
    },
    {
      title:
        "HumanScale: Egocentric Human Video Can Outperform Real-Robot Data for Embodied Pretraining",
      href: "https://arxiv.org/abs/2606.20521",
      year: "2026",
    },
  ],

  colophon: "Vallum Labs, Cape Town, 2026",
} as const;
