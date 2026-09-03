// UI copy for the /white-paper route.
//
// This route authors no facts. The page body is assembled entirely from
// strings that already exist elsewhere: TURN_COPY and METHOD_COPY in
// sections.ts, and SECTION_COPY in components/future-rig/callouts.ts. Per
// F-0608 and F-0609 those constants are imported, never re-typed, so the
// white paper and the rest of the site cannot diverge on the same fact.
//
// Only the route's own metadata lives here, which is chrome rather than
// body copy (same standing as DATASET_PAGE.meta).
export const WHITE_PAPER_PAGE = {
  meta: {
    title: "White paper | Vallum Labs",
    description:
      "Why robots and world models learn physical work from egocentric video, what is missing from that record, how Vallum Labs collects it consent-first, and the rig being built for the field.",
  },
} as const;
