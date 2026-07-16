# Nightshift, 2026-07-16

## Read this first

The deterministic gate (nightshift/scripts/verify.sh, 15 checks) passes in full on both `/` and `/dataset`, confirmed twice: iteration 1 at 12:20 UTC (commit e8d61c7) and iteration 2 at 13:45 UTC (commit 068b67b). Two commits are on `build/nightshift-2026-07-16`, nothing else.

Three things need your call this morning, in order. First, F-0709: the hero scroll morphs a real worker into a robot in the same shot, a normal person can read that as "filming people to replace them," and the arbiter left the film standing overnight rather than cut your signature concept unilaterally, this is the number one item below. Second, the contact channel: `CONTACT_EMAIL` in lib/site.ts is still `hello@example.com` and `CAL_COM_LINK`/`X_URL`/`LINKEDIN_URL` are still placeholders, so the site's one conversion action is dormant until you fill one constant. Third, a real pile of deferred P1s, mostly `/dataset` legal-diligence gaps (rights scope, codec, delivery, acceptance test) and craft items (daylight cut, wordmark unification, sitewide serif headings) that a time-boxed night could not reach; all listed in Not fixed below.

## Machine findings, fixed

| Finding | Page | What changed |
|---|---|---|
| F-0008 | / | Six unledgered Helix fatality stats (farming, construction, fishing, West Africa, heat, air) replaced with the two figures FACTS.md actually ledgers: NIOSH tractor-overturn on the agriculture panel, roofing 48.7 per 100,000 on the rooftop panel. Every other panel now carries a plain condition description, no body count. `src/content/gallery.ts`. |
| F-0009 | / | "Participants are paid." removed from the method copy; it is not in the FACTS.md consent stack. Sentence rewritten around the ledgered items (trilingual release, site-owner authorization, face blur before export). Logged as needs-fact item 2 in case it's true. |
| F-0010 | / | "v-next concept, subject to change" status-badge pill removed from the rig section; the truth now lives in a plain today/tomorrow sentence instead of a badge. |
| F-0012 | / | `lib/site.ts` `SITE_URL` changed from a placeholder to `https://vallumlabs.com`; `metadataBase` and OG/meta URLs now resolve to the real domain. |
| F-0018 | / | Hero readout tag (`HeroCopy.tsx`) and `LensRing.tsx` recolored off forest-line (measured 1.86:1 against dark hero footage) onto the bone/bone-hi family; forest-line is a hairline color, never a workhorse text color on ink. |
| F-0019 | / | `StatTakeover.tsx` stat numeral recolored from green-signal to bone-hi; LOOK.md forbids forest-line as text outside the Helix caret exception. |
| F-0409 | / | Helix section and its intro copy no longer render as flat black. Root cause: an untracked GSAP tween frozen at near-zero opacity under StrictMode's double-mount, with no reduced-motion fallback. Fix: unconditional `gsap.set` initial state, mobile fade changed to `fromTo` with explicit bounds, close path made instant under reduced motion. Caught by iteration-2 critics as P0 F-0409 after shipping broken in iteration 1. |
| F-0901 | / (footer) | Footer wordmark changed from bare "VALLUM" (the page's largest type, `components/sections/footer.tsx`) to "Vallum Labs." Bare "Vallum" risks confusion with the real, unrelated company vallum.ai. |
| F-0902 | / (hero h1) | `HERO_COPY.wordmark` in `src/content/hero.ts` changed from "VALLUM" to "VALLUM LABS." This was a pre-existing violation, not touched by either wave's diff, caught by warden anyway; no grandfather clause on the entity rule. |
| (no ID, luminance trim) | / | The whole-page light-band floor passed iteration 1's build with zero margin, then failed by one band on the next measurement. Fixed by trimming the hero's GSAP ScrollTrigger pin from `+=300%` to `+=240%`. Final margin: 47/100 bands against the 45 floor. |

## Judgment findings, fixed

These came from a model producing plausible critic-sounding text; some are right; read the diff.

| Finding | Critic | Page | What changed |
|---|---|---|---|
| F-0201 | critic-investor | / | Added a first-person founder passage that makes the trust-based access claim legible in a person instead of a bare assertion. |
| F-0301 | critic-analyst | / | Built beat 6 (ethos/founder) as its own section; it no longer cedes its structural position to the rig-hardware section. |
| F-0303 | critic-analyst | / | Trimmed beat 4's consent paragraph so it stops restating beat 5's consent list almost verbatim. |
| F-0306 | critic-analyst | / | Added one inline `/dataset` link at the close of beat 5, in the site's rule-not-card register, per IA.md's plan. |
| F-0402 | critic-eyes | / | Built the beat 6 full-bleed forest surface and the forest footer band; previously the entire back half of the page rendered bone with no forest anywhere. |
| F-0404 | critic-eyes | / | Helix section heading recut from JetBrains Mono at display size (a banned pattern) to the Newsreader heading step. |
| F-0405 | critic-eyes | / | Replaced an undocumented bright green (`#3E9B6B`) doing decorative work in the hero highlight and the Helix focus ring with the spec'd tokens (bone focus rings; forest-line only where the system permits it). |
| F-0407 | critic-eyes | / | Added the Recipe A glass band (blur + scrim) behind the Helix typed centerpiece so text holds 4.5:1 contrast regardless of the video frame behind it. |
| F-0408 | critic-eyes | / | Rotation-capture step repointed at the Helix's own rotation control instead of the hero's; open-state captures added so the 12-angle contrast check has real evidence. |
| F-0412 | critic-eyes | / | "The rig we are building for the field" heading now renders unconditionally; it previously sat invisible under the same reveal-gate class as F-0409, leaving a blank 340px gap. |
| F-0413 | critic-eyes | / | Removed the banned radial glow/vignette under the rig render; flat bone, hard 0-radius edge, caption moved off the photo to ink-on-bone below it. |
| F-0501 | critic-flow | / | One fatality stat per Helix panel now renders as visible caption text; previously the numbers only existed inside the click-triggered takeover. |
| F-0503 | critic-flow | / | Added a real interactive landmark in the back half of the page so keyboard tab order doesn't dead-end at the gallery. |
| F-0504 | critic-flow | / | Added the header nav (wordmark link home + Dataset link) as the shared cross-page affordance the layout had none of before `/dataset` shipped. |
| F-0601 | critic-voice | / | Gallery h2 rewritten from a 14-word run-on to the spec'd three fragments (VOICE.md heading grammar). |
| F-0602 | critic-voice | / | The pivotal turn paragraph recut from four sentences with a body fragment to one claim per sentence. |
| F-0603 | critic-voice | / | "Never perpetual, never blanket" rewritten to the positive rendering hard rule 6 requires. |
| F-0604 | critic-voice | / | "Stated direction, not current operations," a literal X-not-Y identity contrast, rewritten to remove the contrast. |
| F-0605 | critic-voice | / | Meta and OpenGraph descriptions corrected from "Vallum" to "Vallum Labs." |
| F-0606 | critic-voice | / | Rig section alt text and aria-label corrected from bare "Vallum" to "Vallum Labs." |
| F-0607 | critic-voice | / | Hero's unattributed opening maxim rewritten to a procedural line, matching the "a maxim claims wisdom, a procedure claims work" rule. |
| F-0608 | critic-voice | /dataset | Consent-and-provenance wording (two divergent items) unified between `/` and `/dataset`, single-sourced in `dataset-page.ts`, matching FACTS.md verbatim. |
| F-0609 | critic-voice | /dataset | Capture-specs and offer paragraph unified to one wording each across both pages; kept "today" in capture specs and the fuller offer clause. |
| F-0701 | critic-civilian | / | "This is the work humans were never meant to do" removed; hero copy no longer frames the work itself as a mistake filmed only to train its replacement. |
| F-0702 | critic-civilian | / | The eight-stat interactive death gallery reworked so it stops reading as a decorative highlight reel. |
| F-0703 | critic-civilian | / | Death-toll stats now get the same sourcing treatment as the footage-hour stats, instead of being the only unsourced numbers on the page. |
| F-0707 | critic-civilian | / | Hero framing revised (paired with F-0701) so the plain one-sentence summary of the company no longer reads as "filming people to replace them." |

## Pages created

| Route | Job | Single question it answers | Who decided |
|---|---|---|---|
| /dataset | The one document a buyer forwards to legal: schema, consent stack, capture specs, the offer, in full. | What exactly would I buy, and is the rights story clean enough to forward to legal? | IA.md GAP-01 (surveyor: folded the spec page into one route rather than an index-plus-leaf farm) plus the iteration-1 arbiter, who dispatched the build. |
| Home beat 6, ethos plus founder passage | Closes the page on the person, not on unbuilt hardware. | Will this person deliver, and why does this access exist? | STORY.md beat 6 (narrator) plus critic-analyst F-0301 plus the iteration-1 arbiter. |
| Footer (beat 7) | Wordmark, entity line, dormant ask echo, nav to Home and Dataset. | Who is this, legally, and where else can I go? | STORY.md beat 7 (narrator) plus foreman's GAP-06 plus warden (F-0901 fixed the bare wordmark inside it). |
| Header nav on / | Minimal cross-page affordance: wordmark link home, Dataset link. | How do I get back or across once /dataset exists? | critic-flow F-0504 plus the iteration-1 arbiter. |

## Decisions made

**Copy and voice.** Rewrote hero beat two from a negation to an affirmative turn, because the no-negation rule kills every "we do not build" variant. Cut the rendered contact placeholder and closed the page on the entity line instead of inventing an address. Removed the "v-next concept" status badge; the truth already lives in the honest kit sentence. Rewrote the rig headline to drop the banned "at scale" suffix. Named Ego4D and NVIDIA GEAR (research datasets, not competitors) but not Build AI's Egocentric-1M, per the anonymity rule.

**Visual system and tokens.** Kept the existing Archivo/Inter system in the new bone sections rather than introducing the serif; a face migration belongs to the full art-direction pass, not a gate fix. Chose bone over forest for the consent/provenance content; the full-bleed forest beat stays a composition-pass item. Converted the rig section and the close to bone surfaces per the luminance law. Art-director calls carried into the build: daylight cut over the Helix as the site's signature; Newsreader chosen over Source Serif 4, EB Garamond, and Instrument Serif; Archivo dropped from the wordmark, reset in Newsreader spaced caps; Helix typed centerpiece set in the display serif, not mono; glass band gets a 35% ink tint; beat 6 forest sized 110vh plus a 30vh footer for gate headroom; gradients banned with no scrim exception; imagery capped at 45% of any horizontal slice in beats 4 to 7; ink/bone alpha variants declared derived, not new tokens; colorScheme and themeColor set to bone; daylight-cut boundary placed at 42% of beat 3's height.

**Structure and IA.** Added three bone sections after the Helix (turn, method, what ships) because the luminance gate cannot pass on recoloring alone. Cartographer counted source files, not companies, for the 3-source threshold, and folded the spec-page recommendation into one /dataset page rather than an index-plus-leaf farm. Surveyor chose a 3-page sitemap (home, dataset, founder) plus a 404 over a 6-to-10 page architecture, folded pricing and consent into /dataset, flagged the Helix stats as a P1 fact-ledger gap, cut a standalone ethics page, and ranked the home founder beat separately from the deeper /founder page. Narrator kept the seeded 7-beat spine with the rig folded into beat 4, chose the NIOSH and roofing figures as the site's two fatality statistics, cut six unledgered ones, chose a thesis-forward hero, moved the unrecorded-work claim from beat 2 to beat 3, cut the Egocentric-1M fact for the anonymity rule, placed the single full ask at the end of beat 5, did not restore a separate founder letter, flagged "participants are paid" as unledgered, and cut the hero verdict line.

**Process (foreman).** scout-generalist's mis-researched pass on vallum.ai was quarantined and re-dispatched. Machine baseline logged as F-0001 to F-0003; Helix defects seeded as F-0004 to F-0007 so build-hero had a charter regardless of critic noise. Builders ran in a shared worktree with disjoint file ownership rather than per-agent git worktrees, because merging N worktrees unattended is worse than the collision it prevents. The port 3000/3001 worktree mismatch was caught and fixed. Iteration 1: hero b-roll provenance traced to Jay's controlled workspace via cutlist.json; the token migration in globals.css assigned to build-fix; dreamer staged the Western Cape aerial only, placement deferred; the build wave sequenced copy-first; F-0202 and F-0502 (an arbiter oversight) were given an honest wontfix disposition; wordmark-vines.webp flagged as bare-VALLUM key art needing a redo. Iteration 2 ran without a rebuttal round, the first thing cut when the schedule is tight, never independence.

**Dreamer and assets.** Chose mechanics and composition over generated imagery for three of four concepts, because the provenance law forbids generating the one compelling thing, a person at work. Put the dreamer's one founder-level swing on beat 5 (the provenance specimen) rather than compete with beats 2 or 3's existing set pieces. Ranked the specimen top, the Western Cape aerial second (staged, not yet placed), language over image for the ethos beat, and the record-drawn-to-scale measure last, unbuilt, because it risked crowding beat 3's existing signature. Gated the bold multilingual consent tier behind a verified translation rather than fabricate isiXhosa or Afrikaans text. Flagged the LOOK.md "tables never move" tension openly with a static fallback rather than hide it.

Full one-line detail for all of the above, plus the iteration-2 foreman digest, is in DECISIONS.md.

## NEEDS-FACT

Verbatim from findings/needs-fact.md:

1. **Contact channel. TOP PRIORITY.** The site has one conversion action and no real address behind it. lib/site.ts CONTACT_EMAIL is "hello@example.com", CAL_COM_LINK / X_URL / LINKEDIN_URL are placeholder URLs, and FACTS.md contains no contact fact. Nothing was invented. The contact section was rewritten around the offer and the window. Fill CONTACT_EMAIL (one constant) and the CTA is live.

2. **"Participants are paid."** Currently renders in the method section and appears in BRIEF.md, but it is not in the FACTS.md consent stack. Removed from copy tonight per FACTS-or-nothing. If true, add it to FACTS.md and the sentence can return; it is one of the strongest lines available.

3. **Helix fatality statistics.** Six statistics on the live Helix (farming one-in-three, construction 108,000, fishing 100,000+, West Africa one-in-a-hundred, heat 2.4 billion, air 860,000) are not in FACTS.md and were replaced with the two ledgered figures (NIOSH tractor overturns, roofing 48.7 per 100,000). If you want any of the others back, add them to FACTS.md with source and denominator; note FACTS.md caps fatality stats at two site-wide.

4. **Rig framing.** "v-next concept, subject to change" was removed as a status badge. The honest kit sentence carries the truth. If you want a named rig generation line, add the naming to FACTS.md.

Plus, added tonight:

5. **Verified isiXhosa and Afrikaans consent-line translations.** Dreamer's ethos-triad concept (concept 2, "the source in its own tongue") has a bold multilingual tier that sets the same short consent line in all three languages at once. It shipped only the safe tier (English, named triad, no translated text) because inventing the isiXhosa and Afrikaans lines would be a fabrication under FACTS-or-nothing. Supply a real, verified line in each language and the bold tier is a one-line swap.

6. **Codec, container, and delivery mechanism for /dataset.** F-0108 (and F-0103 on home): capture specs state resolution and frame rate but nothing states the video codec/container, the annotation payload's file format, or how a buyer actually receives it (bucket, drive, API, SFTP). This is the dedicated transactional page and it still can't answer "what exactly would I be buying."

7. **A real Jay-controlled sample frame.** F-0102: the page asks a buyer to license hours of footage sight-unseen, with no frame anywhere showing the head-mounted POV, hand-pose keypoints, or the face-blur pass. A gated sample frame or clip, sourced from your own controlled footage, would answer "will this person deliver" in one screenshot. Deferred specifically because generating one carries provenance risk; it has to be real.

## Not fixed

Every finding below is either still open or was ruled wontfix-and-deferred this run (not killed, not a stale-crawl artifact). Grouped for reading, not by severity.

**The hero film, the biggest open call.**

| Finding | Sev | Critic | Page | Status |
|---|---|---|---|---|
| F-0709 | P0 | critic-civilian | / | The hero scroll morphs a real worker into a robot mid-shot. Arbiter ruling: film stands tonight, provenance checked and cleared, remedy is a founder-level re-cut. Morning judgment item number one. |
| F-0101 | P1 | critic-buyer | / | Hero b-roll shows wind/solar/construction work the copy admits isn't operating yet (Western Cape agriculture only). Same re-cut decision as F-0709. |
| F-0202 | P1 | critic-investor | / | Eight-industry Helix implies a scale the current-operations section retracts four sections later. Same re-cut/sequencing decision. |
| n/a | n/a | n/a | / | wordmark-vines.webp (public/hero/wordmark-vines.webp, the lens-hover asset) is still bare-VALLUM key art. Needs the art redone; flagged in code comment as a morning asset task. |
| n/a | n/a | dreamer | n/a | Concept 4, "the record, drawn to scale" (research/CONCEPTS.md), never built. Ranked last of four dreamer concepts because it risked crowding beat 3, which already owns the daylight cut as its signature, and that signature itself (F-0401 below) never shipped either. |

**Founder route and founder legibility.**

| Finding | Sev | Critic | Page | Status |
|---|---|---|---|---|
| F-0014 | P1 | foreman (IA.md GAP-02) | /founder | The dedicated founder page never got built; deferred on capacity. |
| F-0204 | P2 | critic-investor | / | Founder passage never names Jay by name anywhere on the page. |
| F-0205 | P1 | critic-investor | / | Founder passage asserts a Fresno-to-Western-Cape access thesis it never actually connects. |
| F-0307 | P1 | critic-analyst | / | Buyer question 3, "will this person deliver," gets two sentences and no dedicated page; this is /founder's job, unbuilt. |

**Buyer legal-depth gaps on /dataset.**

| Finding | Sev | Critic | Page | Status |
|---|---|---|---|---|
| F-0106 | P1 | critic-buyer | /dataset | Consent release never states what rights it actually grants (commercial use, geographic scope, sublicensing, term). Counsel question, not a night invention. |
| F-0108 | P1 | critic-buyer | /dataset | The offer never states codec, annotation file format, or delivery method. Same fact gap as F-0103. |
| F-0107 | P2 | critic-buyer | /dataset | Page never discloses who executes the work or team size. |
| F-0109 | P2 | critic-buyer | /dataset | "Delivery and acceptance" milestone payment has no stated acceptance test. |
| F-0110 | P2 | critic-buyer | /dataset | POPIA "compliant" is a bare self-declaration with no stated basis; a counsel matter. |
| F-0103 | P2 | critic-buyer | / | Open. File format/codec and delivery mechanism never stated (home-page instance of F-0108). |
| F-0102 | P1 | critic-buyer | / | No frame of the actual product exists anywhere on the page; needs a real sample frame (needs-fact item 7). |

**Funnel and structure.**

| Finding | Sev | Critic | Page | Status |
|---|---|---|---|---|
| F-0206 | P1 | critic-investor | / | Site closes on an offer restated twice with no way to respond; half fact-blocked on contact, half addressed by the string-unification fix. |
| F-0305 | P1 | critic-analyst | / | Home beat 5 duplicates /dataset's schema and consent stack almost verbatim, wasting the two-route split. Structural morning call, not tonight's disjoint budget. |

**Craft and visual system remainder.**

| Finding | Sev | Critic | Page | Status |
|---|---|---|---|---|
| F-0401 | P1 | critic-eyes | / | The daylight cut, the page's named signature two-tone turn, does not exist in the render. The luminance gate passes; the signature mechanic itself never shipped. |
| F-0403 | P1 | critic-eyes | / | Section headings sitewide render in heavy grotesk sans at ink, never Newsreader/forest. |
| F-0410 | P1 | critic-eyes | / | Same defect scoped to beats 4/5 specifically; only the rig heading (F-0412) got swept out of this one tonight, the rest of the pass remains. |
| F-0411 | P1 | critic-eyes | / | "VALLUM LABS" wordmark renders in two unrelated typefaces on the same page (hero grotesk vs. footer Newsreader). |
| F-0414 | P1 | critic-eyes | / | Stat-panel close button focus ring has visible rounded corners; radius is banned sitewide. Deferred to avoid a file collision with the in-flight F-0409 fix. |
| F-0415 | P1 | critic-eyes | / | Stat takeover's blur/dim backdrop stops short of the viewport bottom, text bleeds through. Same file collision as F-0414. |
| F-0416 | P2 | critic-eyes | /dataset | /dataset has no footer; page ends on a bare "Home" link, unlike /. |
| F-0417 | P2 | critic-eyes | / | Heading's second sentence, "The work no one records," never appears in any render; likely the same reveal-gate class as F-0409/F-0412, unverified. |
| F-0406 | P2 | critic-eyes | / | Open. "ROBOT TWIN"/"HUMAN CREW" mono, uppercase, letter-spaced tag in the hero is the banned eyebrow shape. |
| F-0706 | P2 | critic-civilian | / | Open. West Africa singled out for a death stat with no stated operations there. |

**Flow and accessibility.**

| Finding | Sev | Critic | Page | Status |
|---|---|---|---|---|
| F-0502 | P1 | critic-flow | / | Section links (#data, #how-it-works, #rig) land short because the hero's scroll pin inflates after hydration. |
| F-0507 | P1 | critic-flow | / | Tab order jumps from the last gallery button straight to the footer, skipping five beats including the offer itself. |
| F-0508 | P2 | critic-flow | /dataset | /dataset's closing block has no Footer nav landmark, unlike home's. |
| F-0509 | P2 | critic-flow | / | Stat-panel dialog marks main inert but leaves the header nav reachable by screen-reader browse mode. |
| F-0017 | P3 | foreman | /not-found | Open. No custom 404; framework default breaks the site's register. |
| F-0505 | P2 | critic-flow | / | Open. A dead or mistyped link falls to the framework's stock 404 with no way back. |
| F-0506 | P2 | critic-flow | / | Open. Named outside sources (NVIDIA GEAR, Ego4D) render as plain text, not links; not fact-blocked, just undone. |

**Voice polish.**

| Finding | Sev | Critic | Page | Status |
|---|---|---|---|---|
| F-0610 | P2 | critic-voice | / | Ethos section closes on an unattributed maxim, the same pattern already flagged once tonight (F-0607). A house-habit risk, not a one-off. |
| F-0611 | P2 | critic-voice | / | Founder passage closes on an abstract line with no concrete noun in its first eight words. |

## What did not work

1. scout-generalist's first pass researched vallum.ai, an unrelated AI-governance company, instead of Generalist AI. Quarantined and re-dispatched once; the second pass was correct.

2. The setup baseline crawl and the first fresh crawl measured the wrong code: port 3000 belongs to the main checkout, not this worktree. Three seeded machine P0s (placeholder, negation, luminance, F-0001 to F-0003) were stale-crawl artifacts, caught by surveyor. The worktree server was moved to :3001; all later crawls are correct. Every baseline artifact from before 09:27 UTC is invalid.

3. The iteration-2 arbiter died mid-response on an API connection error. Resumed once with a compact charter; succeeded on the second attempt.

4. The iteration-1 token migration introduced two contrast regressions on dark surfaces (hero readout/LensRing at 1.86:1, StatTakeover numeral). Caught by build-fix's own verification and fixed in the same iteration (F-0018, F-0019).

5. Warden blocked twice on a bare "VALLUM": the new footer wordmark and the pre-existing hero h1. Both fixed to "Vallum Labs" (F-0901, F-0902). The lens-hover asset public/hero/wordmark-vines.webp is still bare-VALLUM key art; it needs the art redone, a morning asset task.

6. The reduced-motion Helix detail takeover shipped broken in iteration 1: an untracked GSAP tween frozen at near-zero opacity under StrictMode's double-mount. It rendered the entire Helix section and its intro copy as flat black on a normal scroll-through. Caught by iteration-2 critics as P0 F-0409, root-caused and fixed in iteration 2.

7. The whole-page light-band luminance floor passed with zero margin right after iteration 1's build, then failed by one band on the next measurement. Fixed by trimming the hero's scroll pin from 300% to 240% of viewport height. Final margin: 47/100 bands against the 45 floor.

## Cost

Two full iterations plus one invalidated baseline pass. Wall clock approximately 5h 10m from T0 (08:50:54 UTC) to final gate and commit. Subagent token usage ran roughly 6M tokens across the run (haiku scouts approximately 0.6M, synthesis approximately 0.8M, iteration-1 critique approximately 1.5M, iteration-1 build approximately 1.3M, iteration-2 critique approximately 0.9M, plus builders and fixes on top); `/cost` was not readable programmatically in this environment, so these are subagent-reported totals, not a metered figure. Higgsfield: 4 of a 262-credit cap spent (balance 438 to 434), all on the Western Cape aerial (public/method/western-cape-aerial.jpg, staged in lib/assets.ts as METHOD_AERIAL, not yet placed in a component, a morning task). One of two generated frames was discarded because it hid a human figure; provenance law held.
