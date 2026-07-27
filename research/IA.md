# IA.md

Surveyor output, 2026-07-16. Sources: all 15 research/cache scout files, nightshift/BRIEF.md, nightshift/FACTS.md, the live repo (app/, components/, src/content/, lib/), and artifacts/ baseline crawl. research/PATTERNS.md did not exist at time of writing; proceeded without it.

## Current state

The site is a single route. There is no navigation, no second page, and no way to reach anyone.

- `/` (app/page.tsx): the only route. Seven blocks render in order:
  - HeroExperience: hero film with cursor lens on ink. Works. Copy in src/content/hero.ts is negation-free and current.
  - GalleryDynamic (the Helix): 8 panels, each pairing media with a cited fatality statistic, typewriter centerpiece. Structurally close per the brief, but 9 of the 10 statistics it renders (ILO farming, construction, fishing, West Africa, heat, air, pattern, plus the police-comparison secondary) are not in FACTS.md, which permits only the logging, roofing, and tractor figures. Fails the fact ledger as it stands.
  - TurnSection: beat 3 on bone. Copy traces to FACTS external facts with attribution. Does its job.
  - MethodSection: beat 4. Carries the honest iPhone sentence, the consent-first framing, and the window. Does its job.
  - DatasetSection: beat 5, a compressed schema, consent stack, and offer. Correct copy, but it is a summary, not the document a buyer forwards to legal.
  - FutureRigDynamic: rig explode scrub. The status badge is gone and the bridge sentence is honest. Does its job.
  - TempClose: a single mono line, "Vallum Labs Inc. Cape Town, South Africa." Explicitly temporary. No contact, no links, no wordmark footer. Does not do its job yet, by design.
- The founder beat is an empty insertion point in page.tsx. The narrative currently ends without the person, which is the single most load-bearing omission given that the moat is the founder's access.
- lib/site.ts carries non-rendering placeholder values (SITE_URL, CAL_COM_LINK, CONTACT_EMAIL, socials). SITE_URL does reach rendered output through metadataBase in app/layout.tsx, so placeholder OG URLs would ship today.
- artifacts/ baseline (home.dom.txt) shows an older build with the negation line, a status badge, and a bracket placeholder contact. All three are already fixed in current code; the crawl is stale, not the code.

## Target sitemap

Three real pages plus a courtesy route. The reader is one buyer on a phone with two minutes; every page maps to exactly one of their three questions.

| Route | Job | The single question it answers | Audience | Priority |
|---|---|---|---|---|
| `/` | Carry the seven-beat argument from the work to the offer, dark to light, in under two minutes | Why does this dataset exist, and is it real? | Buyer from a cold email; civilian second reader | P1, exists, finish it |
| `/dataset` | Specify the product completely: schema, specs, format, consent and provenance stack, licensing terms, offer, window. Written so a head of data can forward it to counsel without a covering apology | What exactly would I be buying, and will legal kill it? | Head of data and their legal team | P1, new |
| `/founder` | Explain why the access exists: a Fresno farming family, 18, Berkeley, alone in Cape Town for harvest season with six phones. Not a bio, the provenance of the moat | Is this person going to deliver, or is this a deck? | The buyer deciding whether to reply; investor and civilian secondary | P1, new |
| `/not-found` | Catch dead links in the site's own register instead of the framework default | Where am I? | Anyone | P3 |

Structure to copy, cited: Claru's per-dataset spec pages for how /dataset documents schema and specs (structure only, never sentences); Getty's rights layout for how the licensing and indemnity story is sequenced for a legal reader; Klim and Sotheby's for proof-by-specificity on light pages. Skeleton, never skin.

## Gap list, ranked

- GAP-01 | page: /dataset | P1 | The page a buyer's legal team would review does not exist, so a buyer cannot tell what they would be buying. Done: a bone-surface page carrying all 8 annotation schema fields, the Ego4D and Ego-Exo4D compatibility line, the full 6-item consent and provenance stack including POPIA Section 57 and C2PA, capture specs (head-mounted, 1080p minimum, 30fps), the offer ($15,000 to $40,000, 20 to 40 hours, 50% on signature, 50% on delivery and acceptance), non-exclusive default with time-boxed task-boxed paid exclusivity, the collection window, every claim traceable to FACTS.md, zero hour counts, linked from the home dataset section.
- GAP-02 | page: /founder | P1 | The moat is trust-based access and the site never says whose trust or why it exists. Done: a first-person page built on FACTS founder facts only (Jaiyen Shetty, goes by Jay, 18, UC Berkeley Haas and CS, Fresno farming family, sole founder, Cape Town from 2026-07-16), framed as why farms let him in rather than as a resume, no team language, no photo of anyone but Jay from files Jay controls, linked from the home founder beat.
- GAP-03 | page: / (Helix) | P1 | 9 of 10 rendered fatality statistics are not in FACTS.md, and the ledger rule is that a claim not in the file does not go on the site. Done: every Helix stat either added to FACTS.md by Jay (log the request in findings/needs-fact.md) or replaced with the three ledgered figures (logging 110 per 100,000 BLS-attributable, roofing 48.7 per 100,000, NIOSH tractor overturns roughly 130 per year), each with citation and real denominator, panel count adjusted to match what the ledger supports.
- GAP-04 | page: / (founder beat) | P1 | The insertion point after the rig section is empty, so the story ends without the person who makes it credible. Done: a short founder passage in the beat 6 register, forest full bleed per the brief palette, linking to /founder, luminance gate still passing.
- GAP-05 | page: / (close) and /dataset (CTA) | P1, blocked on a fact | There is no contact path anywhere on the site, and the buyer who decides in two minutes has nowhere to land. Done: one real email (and optionally a cal.com link) from Jay wired into the footer and the /dataset offer block; until Jay supplies it, nothing ships (already logged in findings/needs-fact.md, and no placeholder is an acceptable interim).
- GAP-06 | page: / (footer) | P2 | TempClose is a placeholder for beat 7 and carries no wordmark, no links, no legal name context. Done: the wordmark footer on forest, links to /dataset and /founder, the legal entity line, contact only when GAP-05 unblocks.
- GAP-07 | page: all | P2 | metadataBase resolves against a placeholder domain, so OG URLs ship broken today, and the two new routes need their own titles and descriptions. Done: SITE_URL filled or the placeholder path removed from rendered metadata, per-page metadata for /dataset and /founder, no placeholder string in any rendered tag.
- GAP-08 | page: /not-found | P3 | Dead links fall to the framework default, which breaks the register. Done: a one-screen bone page with the wordmark and a link home.

## Cut list

The patterns from 15 sites suggest most of these. This company should build none of them tonight. Zero hours captured and one person is the reality; a site shaped like a twenty-person company gets caught by exactly the reader it targets.

- /compare (Claru compares against 70+ vendors): a comparison needs something to compare, and Vallum has zero delivered hours against a competitor's free million. Worse, comparison pages run on named-competitor contrast, which the no-negation rule bans. Cut.
- /datasets directory with per-dataset pages (Claru's page farm): a directory of one prospective dataset is an empty shelf with a spotlight on it. The documentation structure folds into /dataset. Cut.
- /glossary (Claru, 56 terms): the reader reads papers and does not need VLA defined. Glossary farms are SEO scaffolding, and generated-looking reference content is the tell this audience is most primed to catch. Cut.
- /blog or /research (Physical Intelligence, Generalist, Figure, Anthropic all lead with it): a publication cadence needs material, and there are no findings, no field notes, no delivered data. A blog with one post dated July 2026 reads abandoned by the time the cold email lands. Revisit when there is footage worth writing about. Cut.
- /customers, /case-studies, testimonials, logo walls (Encord, Scale, Stripe): every version requires a buyer, pilot, contract, or LOI, all of which FACTS.md forbids because none exist. Rule 1 cut, not a judgment call.
- /careers (Claru jobs, 1X shouts 67 roles, Generalist lists 18): a careers page for a company of one is a false headcount claim rendered as a page. Own goal. Cut.
- /pricing (Getty and Shutterstock tier tables): the entire offer is one paragraph with two numbers. It belongs next to the specs on /dataset where legal reads it, not costumed as a catalog. Cut as a route.
- /about or /company: with a sole founder, /about duplicates /founder, and two pages saying the same thing read as padding. Entity facts live in the footer and on /dataset for counsel. Cut.
- /rig hardware page (1X and Figure product-page pattern): the rig physically does not exist, and a spec page for a render is the vaporware pattern technical buyers pattern-match instantly, worst of all for a company whose entire pitch is provenance. The honest sentence already lives in the method section. Cut.
- /ethics or /mission standalone (Patagonia, Kickstarter): those pages work because they publish legal filings and audited numbers; Vallum has a procedure, not a filing, and a standalone ethics page is where PBC-shaped label language sneaks in, which FACTS bans without appeal. The consent stack ships as procedure on /dataset and as ethos in home beat 6, which the ethics scout shows is the stronger form anyway. Cut.
- /contact page or form: no contact fact exists in FACTS.md, and a form backend for one person is overhead. A real mailto in the footer does the whole job the day the fact arrives. Cut as a route.
- /faq (Getty's 12+ pairs): an FAQ invents questions nobody asked yet. The three real buyer questions each already have a page. Cut.
- /press, /investors: raise language is banned from the site, and the investor is a reader, not a customer. Cut.

## Decisions made

- [surveyor] chose a 3-page target sitemap (home, dataset, founder) plus a 404 over the 6-to-10 page architectures the scouted competitors run because the client has zero hours, zero buyers, and one person, and thin pages would be caught by the exact reader the site targets.
- [surveyor] chose to fold pricing, licensing terms, and the consent stack into /dataset rather than give each a route because the buyer forwards one URL to legal, and Getty's rights layout shows the whole story reads better as one document.
- [surveyor] chose to flag the Helix statistics as a P1 fact-ledger gap (GAP-03) even though tone is another critic's beat, because 9 of 10 rendered stats are absent from FACTS.md and the ledger rule is binding on every claim, not just company claims.
- [surveyor] chose to cut a standalone ethics page despite the ethics scout showing procedure-based trust works, because Vallum's procedure already lives on /dataset and home beat 6, and a dedicated ethics page is the surface most likely to attract the forbidden PBC label.
- [surveyor] chose to keep the contact gap (GAP-05) at P1 while marking it blocked on Jay, rather than downgrade it, because the two-minute buyer with no reply path is a dead conversion regardless of how good the pages are.
- [surveyor] chose to rank the home founder beat (GAP-04) separately from the /founder page (GAP-02) because the home narrative must close with the person even if the deep page ships later in the night.
- [surveyor] proceeded without research/PATTERNS.md because it did not exist when the cache read finished, per the task instruction.
