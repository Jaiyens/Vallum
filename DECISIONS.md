# DECISIONS.md

One line per taste call, `[agent] chose X over Y because Z`. Jay reviews the
set in the morning and reverses what he wants.

- [session] Rewrote hero beatTwo from the negation ("We do not build them...") to "Machines learn this work by watching it done. We film the people who still do it, so the machines can learn." because the no-negation rule in BRIEF.md kills every "we do not build" variant and the replacement states the same turn affirmatively.
- [session] Cut the rendered placeholder contact line and closed the page with "Vallum Labs Inc. Cape Town, South Africa." because FACTS.md has no contact email and the rule is to write a different sentence, never fill or leave a slot. Gap logged in findings/needs-fact.md.
- [session] Added three bone sections after the Helix (the turn, the method, what ships) mapping to BRIEF.md beats 3-5, because the luminance gate cannot pass on recoloring alone: the dark hero and Helix are ~4,900px, so the page needs real light-surface content below the fold, and all of it is writable from FACTS.md today.
- [session] Kept the existing type system (Archivo display, Inter body) in the new bone sections instead of introducing the serif from the visual direction, because a face migration belongs to the full art-direction pass, not a gate fix.
- [session] Chose bone over forest for the consent and provenance content (BRIEF beat 6 wants a forest full-bleed) because the forest section costs dark-band budget the page cannot spare until the founder letter and real footer exist; the full-bleed forest beat belongs to the composition pass.
- [session] Removed the rig section's "Concept. In development." eyebrow pill entirely rather than restyling it, because the status badge ban kills the pill form and the truth it carried already lives in the bridge sentence ("Today: commodity capture on refurbished iPhones...") and the caption.
- [session] Rewrote the rig headline "The rig we are building to capture the real world at scale" to "The rig we are building for the field" because "at scale" as a suffix is on the banned list in BRIEF.md's mechanical copy constraints.
- [session] Converted the rig section and the close to bone surfaces (text-black / forest-line secondary) over leaving them ink, because BRIEF.md's luminance law puts beats 4-7 on bone and the rig is the only below-fold section that existed.
- [session] Named Ego4D and NVIDIA GEAR in the turn section but not Build AI's Egocentric-1M, because BRIEF.md says the site makes the indoor gap obvious without naming a competitor; research datasets are not competitors, Build AI is.
- [foreman] scout-generalist first pass researched vallum.ai (unrelated AI-governance company) instead of Generalist AI. Cache file quarantined, scout re-dispatched once with explicit URL. date: 09:05 UTC
- [foreman] Machine baseline logged as F-0001..0003; BRIEF Helix defects seeded as F-0004..0007 so build-hero has a charter in iteration 1 regardless of critic noise.
- [foreman] Builders will run in the shared worktree with strictly disjoint file ownership instead of per-agent git worktrees: merging N worktrees unattended is a worse failure mode than the collision it prevents, ownership map enforces disjointness, and only the foreman runs npm build (once per iteration).
- [foreman] Port 3000 belongs to the main checkout, not this worktree; all prior crawl artifacts measured the wrong code (surveyor caught it). Worktree dev server now on 3001; every crawl runs with NS_BASE=http://localhost:3001. 09:29 UTC

## Phase 2 synthesis decisions (collated by foreman from research/*.md)

- [cartographer] chose to count source files (15) rather than companies (24) for the 3-source threshold because the task text defines the threshold in sources; where a count leans on multiple companies inside one file, the entry says so.
- [cartographer] chose to classify claru /compare as a single hub rather than a page farm because its per-competitor child pages return 404, and let encord /alternatives carry the true farm shape.
- [cartographer] chose to treat orbit and glass primarily as mechanics references and drew page-architecture patterns from them only where a real marketing site was documented (Apple, Family, Lusion), because Igloo and the Codrops tutorial are not category sites.
- [cartographer] chose to rank claim-with-proof-in-one-block above hero conventions in What to steal because the brief's three buyer questions are all proof questions and the two-minute phone read leaves no time to hunt evidence.
- [cartographer] chose to include Position 3 (unproofed assertion) inside Proof placement rather than only in What to avoid because it is the modal pattern in the category and the file should show it as a placement choice with a failure cost, not just a vice.
- [cartographer] chose to fold the spec-page recommendation into a single dataset page rather than endorsing Claru's index-plus-leaf-pages farm because the client has one product and zero inbound search volume, and depth on one page serves the no-negation positioning strategy.
- [lexicon] chose to transcribe zero sentences from any scouted site and instead describe each move with site name and measurements, because agents write copy against this file and verbatim examples leak into output, which is the exact clone-risk the brief flags for Claru.
- [lexicon] scored pages rather than companies (Claru dataset cards strong, Claru homepage weak; NVIDIA EgoScale strong, Cosmos marketing weak), because the corpus shows register quality splits at the page level, and the actionable finding is to promote the spec register to the display surface.
- [lexicon] set the body sentence target at median 13 words with a 28-word cap, over the landing-page-only median near 9, because the buyer reads papers and the corpus's most credible proof sentences run 11-27 words.
- [lexicon] counted "X, not Y" contrasts as negations and banned them alongside identity negations, because they name the discarded alternative and invite the same comparison the no-negation rule exists to prevent.
- [lexicon] required even guarantee-shaped terms to take the positive rendering (state the bound, not the banned), extending hard rule 6 into licensing copy where FACTS.md itself uses never-phrasing internally.
- [lexicon] named scout-generalist the best writing in the corpus over the old-money set, because its properties (verb-early declaratives, artifact-borne qualification, unit-plus-rate numbers) transfer directly to a data vendor, while the old-money strengths are partly genre-bound to catalogs; Sotheby's and Patagonia are named runners-up and their moves are folded into the qualification section.
- [lexicon] capped headings at 8 words against a corpus median of 6, because 13 of the 14 headings above 9 words came from weak pages.
- [lexicon] set the rubric pass threshold at 10 of 12 applicable checks with five absolute gates, because the gates encode the brief's non-negotiables and the checks encode measured tendencies where one deliberate miss can be earned.
- [lexicon] exempted factual adjectives from the adjective budget, because the corpus's strongest copy (lot cards, schema enumerations) is dense with them and starving those would ban the register this file exists to produce.
- [surveyor] chose a 3-page target sitemap (home, dataset, founder) plus a 404 over the 6-to-10 page architectures the scouted competitors run because the client has zero hours, zero buyers, and one person, and thin pages would be caught by the exact reader the site targets.
- [surveyor] chose to fold pricing, licensing terms, and the consent stack into /dataset rather than give each a route because the buyer forwards one URL to legal, and Getty's rights layout shows the whole story reads better as one document.
- [surveyor] chose to flag the Helix statistics as a P1 fact-ledger gap (GAP-03) even though tone is another critic's beat, because 9 of 10 rendered stats are absent from FACTS.md and the ledger rule is binding on every claim, not just company claims.
- [surveyor] chose to cut a standalone ethics page despite the ethics scout showing procedure-based trust works, because Vallum's procedure already lives on /dataset and home beat 6, and a dedicated ethics page is the surface most likely to attract the forbidden PBC label.
- [surveyor] chose to keep the contact gap (GAP-05) at P1 while marking it blocked on Jay, rather than downgrade it, because the two-minute buyer with no reply path is a dead conversion regardless of how good the pages are.
- [surveyor] chose to rank the home founder beat (GAP-04) separately from the /founder page (GAP-02) because the home narrative must close with the person even if the deep page ships later in the night.
- [surveyor] proceeded without research/PATTERNS.md because it did not exist when the cache read finished, per the task instruction.
- [narrator] chose to keep the seeded spine at seven beats with the rig folded into beat 4 over a standalone rig beat because hardware is method and a post-offer render reads as a product pivot.
- [narrator] chose the NIOSH tractor-overturn figure and roofing 48.7 per 100,000 as the site's two fatality statistics over logging 110 per 100,000 because they map to stated environments (agriculture now, rooftop solar as direction); borrowing the deadliest-job number from an industry the company does not film invites the ghoulish reading.
- [narrator] cut six unledgered fatality statistics from the Helix because FACTS.md is binding, caps fatality statistics at two site-wide, and does not contain those numbers.
- [narrator] chose a thesis-forward hero, with the trade named in the sub line, over a pure world-establishing hero because the buyer gives the page under two minutes on a phone and must know what business they are standing in before the Helix asks for their attention.
- [narrator] moved the unrecorded-work claim from beat 2's heading to beat 3 because the current Helix heading pre-spends the turn.
- [narrator] cut the Egocentric-1M fact from beat 3 because attribution and competitor anonymity cannot both hold; the gap is provable without it.
- [narrator] placed the single full ask at the end of beat 5 with a one-line footer echo because the crawled page has no contact action anywhere, and the ask belongs where the offer is.
- [narrator] did not restore the founder letter because the ethos beat carries that voice and a letter after the offer reads as raise material.
- [narrator] flagged that "participants are paid" appears on the current site and in BRIEF.md but not in the FACTS.md consent stack; beats 4 and 6 exclude the payment claim unless Jay adds it to the ledger, per the FACTS-or-nothing rule.
- [narrator] cut the hero verdict line "This is the work humans were never meant to do" and specified a no-verdict display shape because the ethos, not pity, is the leave-behind.
- [art-director] chose the daylight cut over the Helix as the signature because the Helix argues the world's case and the cut argues the company's; the Helix spec was already fixed by the brief, so naming it would spend the boldness budget on a decision already made
- [art-director] chose Newsreader over Source Serif 4 and EB Garamond because its opsz axis gives true display cuts at 92px, and over Instrument Serif because Instrument is itself becoming a generated-design tell
- [art-director] dropped Archivo and reset the wordmark in Newsreader spaced caps because a second grotesk bought nothing and spaced serif caps is the old money wordmark grammar (Sotheby's, Aesop's Optima lockup)
- [art-director] set the typed Helix centerpiece in the display serif rather than mono because mono display is the generated-design tell; the jittered keystrokes and block caret carry the typewriter grammar on their own
- [art-director] gave the glass band a 35% ink tint as part of the recipe because blur alone cannot guarantee 4.5:1 against arbitrary video frames; a full-width tinted stripe is composition, not a box behind text
- [art-director] sized beat 6 forest at 110vh plus a 30vh footer to hold at least 4 dark bands of gate headroom; a taller forest section fails the gate at the first content growth
- [art-director] banned gradients with no scrim exception, putting hero legibility on film grade and glass, because a scrim ramp is the first shadow pretending to be depth that creeps back in
- [art-director] capped imagery in beats 4 to 7 at 45% of any horizontal page slice so photography cannot silently eat the light-band budget
- [art-director] declared alpha variants of ink and bone as derived values rather than new tokens, keeping the token count at four
- [art-director] set colorScheme light and themeColor to bone because the page is a light page with a dark opening, and dark browser chrome would re-argue the founder's complaint
- [art-director] placed the daylight cut boundary at 42% of beat 3's height in static render so the full-page luminance crawl samples the final state correctly without a pinned section
- [dreamer] chose mechanics and composition over generated imagery for three of four concepts because the provenance law forbids generating the one compelling thing, a person at work, so the boldness had to move into things that cost zero credits and carry zero integrity risk.
- [dreamer] chose to put the dreamer's one founder-level swing on beat 5 rather than compete with the Helix on beat 2 or the daylight cut on beat 3, because both of those beats already have their set piece and the light half of the page had none.
- [dreamer] chose the provenance specimen as the top concept over the aerial because it has perfect beat-fit, zero generation risk, zero fact risk, and is uniquely right for a company whose entire moat is a record that survives legal review.
- [dreamer] chose to rank the Western Cape aerial above the record-to-scale measure on beat-fit grounds, because beat 4 has an open lane while beat 3 already owns the site's signature, so a clean concept in an empty lane fits its beat better than a strong concept crowding a full one.
- [dreamer] chose language over image for the ethos beat because it is the only honest way to make the worker present without their body, and it turns the site's hardest constraint into its most human moment.
- [dreamer] chose to gate the bold multilingual tier of concept 2 behind a verified translation and log it rather than fabricate isiXhosa or Afrikaans text, because a fabrication and a placeholder are the same failure under the fact ledger.
- [dreamer] chose to flag the LOOK.md conflict in concept 1, that schema and provenance tables never move, in the open with a static fallback, rather than propose an animated table quietly, because the arbiter should decide the tension with the tension visible.

## Iteration 1 (foreman)
- [foreman] Arbiter's least-sure item resolved: hero b-roll provenance traces to Jay's film workspace (~/Desktop/shift) via cutlist.json mirrored in components/hero/readout-map.ts; real/twin blocks are Jay's graded worker footage, est blocks are drone establishers from the same controlled directory; gallery AI panels (p3/p4/p6/p7) are declared unpopulated environments in lib/assets.ts. No stock-worker evidence. F-0101 stays a morning re-cut question (scope oversell), not a provenance P0.
- [foreman] globals.css still carried the retired palette (green-signal #3e9b6b, old bone/ink); token VALUE migration to the LOOK.md set assigned to build-fix with names kept stable so components need no edits.
- [foreman] Dreamer generates and stages the Western Cape aerial + lib/assets.ts entry only; placement into the method column deferred to iteration 2 by build-page, to avoid cross-owner file timing inside one wave.
- [foreman] Build wave sequenced copy-first because three owners consume src/content exports; hero/page/fix/dreamer then run parallel on disjoint files.
- [foreman] F-0202 and F-0502 were absent from every arbiter table (oversight). Disposition: F-0202 substantively mitigated by rank 1 (two stats, condition descriptions); its scale-implication remainder joins F-0101 on the morning list. F-0502 impact shrank because the anchor nav is not rendered; deep-link precision goes to the morning craft list. Both marked wontfix-tonight, honestly labeled.
- [foreman] wordmark-vines.webp is bare VALLUM key art; lens hover shows the wrong word until the art is redone. Morning asset task, flagged in code comment.

## Iteration 2 (foreman digest)

- [arbiter] F-0709: film stands tonight; morning item number one; flip condition (provenance) checked and cleared.
- [build-strings] dataset-page.ts is now the canonical source for consent stack, capture specs, offer; sections.ts imports; drift is structurally impossible.
- [build-rig] rig heading now renders unconditionally (MaskedRise dropped for parity with sibling static sections); Newsreader loaded locally for the rig heading pending sitewide --font-display migration.
- [fix-f0409] reduced-motion crossfade replaced with unconditional gsap.set; mobile fade now fromTo with explicit bounds; close path instant under reduced motion.
- [foreman] iteration 2 ran without a rebuttal round (schedule cut per KICKOFF rule: independence is never cut, cross-talk is the first cut).
