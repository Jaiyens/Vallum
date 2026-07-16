# PATTERNS.md

Structural patterns extracted from the 15 Phase 1 scout files in research/cache/.
Threshold: a pattern needed support in at least 3 of the 15 source files to appear in a main section. Anything thinner is at the bottom under single-source observations.

Counting note: some files cover multiple companies (craft-a: Anthropic, Linear, Stripe. oldmoney: Sotheby's, Aesop, Klim. glass: Apple, Igloo, Family. orbit: Bruno Simon, Active Theory, Lusion. ethics: Anduril, Palantir, Patagonia, Kickstarter, Warby Parker). Counts below are source files, not companies. Where a count leans on companies inside one file, it says so.

The 15 sources: claru, buildai, encord, scale, pi, 1x, figure, generalist, nvidia-gear, getty, craft-a, oldmoney, glass, orbit, ethics.

---

## Page inventory

Page types that actually ship in this category, with source counts and the job each does.

| Page type | Sources | Job |
|---|---|---|
| Homepage | 15 of 15 | Identity claim plus routing. Every site treats it as an argument, not a catalog |
| Blog / news / editorial | 11 of 15 (claru, encord, scale, pi, figure, generalist, nvidia-gear, craft-a, oldmoney, glass, ethics) | Freshness signal and, for the research-led companies, the citable home of every number |
| About / company / mission | 10 of 15 (claru, encord, pi, 1x, figure, generalist, craft-a, oldmoney, ethics, scale) | One page that says who is behind this. Short everywhere. pi does it in two homepage sentences |
| Careers / jobs | 9 of 15 (claru, scale, pi, 1x, figure, generalist, craft-a, ethics, encord) | Existence proof and scale signal. Only works when there are roles to list |
| Product or spec detail page | 8 of 15 (claru, encord, scale, 1x, figure, nvidia-gear, getty, oldmoney) | The page that answers what exactly is sold, in what format, with what numbers. The most load-bearing page type for a technical buyer |
| Contact / demo booking | 8 of 15 (claru, buildai, encord, scale, generalist, getty, orbit, craft-a) | The single conversion endpoint. In the data-vendor subset it is always a conversation, never a checkout |
| Research pages (dated, citable) | 5 of 15 (pi, nvidia-gear, generalist, figure, craft-a) | Where quantitative claims live so the homepage does not have to carry them |
| Public pricing | 4 of 15 (encord, getty, 1x, oldmoney) | Only platforms and consumer products publish prices. The three pure data vendors (claru, scale, buildai) publish none: claru /pricing is a 404, scale has no pricing route, buildai has only a talk CTA. Custom pricing behind a call is the category convention for licensed data |
| Trust / governance / legal surface | 4 of 15 (getty, ethics, craft-a, encord) | A dedicated page where a checkable procedure sits: license terms, indemnity amounts, charters, compliance. Anthropic (craft-a) puts it in primary navigation |
| Comparison / alternatives pages | 2 of 15 (claru, encord) | Search capture. Below threshold as a convention. See the dedicated section |
| Glossary | 2 of 15 (claru, encord) | Category education and SEO. Below threshold. See the dedicated section |
| FAQ block or page | 3 of 15 (getty, encord, glass) | Objection handling after the pitch, before the ask |

Reading: the minimum viable serious site in this category is homepage, one spec page, one method or about page, and a contact path. Everything past that correlates with headcount and content velocity, not with credibility.

---

## Section order

Homepage sequence, distilled across the 13 sources with a legible homepage (encord and parts of ethics were partially blocked and inferred).

The canonical order, with counts:

1. Hero: one declarative identity claim, 3 to 12 words, median 6. 13 of 15 measured it (all except orbit's tutorial content and blocked ethics pages). No hero anywhere leads with a question or a metaphor.
2. One clarifying subhead or mission sentence directly under the hero. 12 of 15 (claru, buildai, pi, generalist, figure, scale, getty, craft-a x3, glass x2, encord, 1x).
3. What-it-is sections in the middle: capabilities, method, or product blocks, usually 3 to 5 of them. 12 of 15.
4. Proof sits after the capability sections and before the final ask, in every source that has proof at all: claru (metrics at position 5 of 7), scale (testimonials 7 of 11), encord (logos and case studies mid-page), craft-a (Linear social proof 8 of 9, Stripe metrics and case studies mid-page), glass (Family testimonials 9 of 11), getty (gallery 12 of 15). 6 of 15 explicitly mapped, zero counterexamples. Nobody opens with proof and nobody closes with it. Proof is the second-to-last beat.
5. Final CTA block, then footer. 13 of 15.

Secondary conventions:

- Blog or news cards on the homepage, bottom third: 6 of 15 (generalist, scale, craft-a, glass, pi, oldmoney). Correlates with publishing cadence the company actually keeps.
- Newsletter capture near the footer: 3 of 15 (1x, figure, oldmoney). Consumer-facing pattern, not a buyer pattern.
- Investor names as a homepage line: 2 of 15 (buildai, pi). Below threshold, and forbidden for this client anyway.
- Section labels that name the job in 2 to 4 plain words rather than marketing language: 4 of 15 (oldmoney all three companies, craft-a via Linear, glass via Apple and Family, scale partially). The oldmoney file identifies this as one of the things that makes a light page read expensive.

Structural rhythm: the credible sites run claim, unpacking, proof, ask. The sites the scouts flagged as noisy run claim, claim, claim, logos, ask.

---

## Proof placement

Where the evidence sits relative to the claim it supports. Four observed positions, ranked by how credible the scouts found the result.

**Position 1: inside the claim sentence or the same block, with source and denominator.** 7 of 15: nvidia-gear (result plus baseline in one sentence on the EgoScale page), craft-a (Stripe embeds stats parenthetically inside the claim, case study headlines carry the number), ethics (Patagonia states a third-party score next to the published median, Kickstarter states the exact percentage inside the commitment), getty (indemnity dollar amount in the hero subhead), oldmoney (Sotheby's puts the estimate on the lot card itself, Klim pairs each claim with a shipped example), pi (chart or video in the same section as the claim), figure (spec table on the product page). This is the pattern the buyer-facing scouts consistently rate as the credibility maker. The number arrives with its context and never has to be hunted.

**Position 2: qualitative claim on the homepage, quantitative proof one click away in a dated artifact.** 5 of 15: pi (homepage superlatives, evidence in research pages), nvidia-gear (capability language on the product page, numbers in papers and technical blogs), generalist (homepage assertion, numbers in dated blog posts), figure (performance metrics live in a dated news article, not on the product page), craft-a (Anthropic defers all proof to linked pages). This works for research organizations because the artifact is dated, authored, and citable. The homepage stays clean and the number has a permanent address.

**Position 3: claim with no evidence anywhere on the site.** 5 of 15: scale (headline market-share percentage with no citation), claru (homepage scale metrics repeated on the about page, never sourced), buildai (superlative subhead whose supporting evidence exists off-site but is not linked), figure (combined-experience claim repeated on three pages, never broken down), ethics (Anduril and Palantir run adjective stacks with no metrics). Every scout that hit this pattern filed it under noise or claim-qualification failure. It is common and it is the thing the target reader has learned to discount.

**Position 4: demonstration instead of assertion.** 5 of 15: generalist (real-speed autonomous video with an explicit honesty note), pi (video co-equal with text on every research page), glass (Igloo proves capability purely by execution), oldmoney (Klim shows the typeface in shipped client work inside the discovery flow), craft-a (Linear shows the workflow itself as five sections). The artifact does the arguing.

The rule the credible half of the corpus follows: a claim and its evidence are one unit of layout. If the evidence cannot sit in the same block, the claim gets rewritten smaller until it can, or it moves to where the evidence lives.

For Vallum specifically: the only numbers available are external research facts (FACTS.md external section) and the offer terms. Position 1 handles both. Position 2 becomes available later if a method or research page exists. Position 3 is the failure mode the whole fact ledger exists to prevent.

---

## How the honest ones handle a gap

Several of these companies were pre-scale, pre-customer, or pre-product when these pages were written, or are structurally unable to show certain proof. The moves, each with sources.

**Move 1: substitute the procedure for the traction number.** 4 of 15: ethics (Patagonia's legal trust structure and audited score instead of impact adjectives, Kickstarter's charter and annual statements instead of impact claims), getty (indemnity terms and license mechanics instead of quality superlatives), oldmoney (Aesop describes formulation process, not results), figure (machine specs instead of business metrics). A procedure is checkable today even when outcomes do not exist yet. The ethics file's own synthesis: the trusted companies use procedures, the flinch-inducing ones use adjectives. For Vallum this is the consent stack, the annotation schema, and the licensing terms doing the work traction cannot.

**Move 2: precision about what exists instead of volume about what does not.** 4 of 15: oldmoney (exact dates, named clients, exact estimates; the file concludes vague reads cheap and specific reads expensive), getty (exact dollar amounts and tier mechanics), 1x and figure (exact spec tables: weights, speeds, runtimes). Small true numbers stated exactly outperform large vague ones. Vallum's equivalents: 1080p 30fps, three languages of release, the 21-keypoint track, the exact pilot price band.

**Move 3: hedge inside the sentence, not around it.** 3 of 15: getty (tier-dependent qualifier inside the indemnity claim, design-intent qualifier inside the safety claim), ethics (Kickstarter's scope qualifiers inside commitments, Patagonia's mission framed as purpose rather than achieved outcome), nvidia-gear (result always carries its baseline). The honest qualifier is part of the claim's grammar, not a footnote. Vallum's schema already speaks this way: hand-pose track where recoverable.

**Move 4: attach an honesty flag to the demonstration.** 3 of 15: generalist (real-speed, fully-autonomous note pinned to the video), pi (claims scoped to what the embedded demo actually shows), ethics (Warby Parker states the exact mechanism of its give program rather than gesturing at goodness). Stating the unflattering constraint plainly is itself a credibility asset. Vallum's version: the capture kit today is refurbished iPhones on head straps, stated in prose, as the brief already requires.

**Move 5: let the offer be the specificity.** 3 of 15: claru (service framing with concrete delivery promise where portfolio proof is thin), buildai (single conversational CTA and nothing else, no fake depth behind it), getty (pricing tiers and license mechanics carry the page). When there is no track record, the terms of the deal are the most concrete thing available. Vallum has real terms: price band, 50/50 payment structure, non-exclusive default.

**Move 6: borrowed authority, used sparingly.** 4 of 15: buildai and pi (investor names as the only credibility line), generalist and figure (team pedigree as authority transfer). Note: this move is mostly unavailable to Vallum. FACTS.md forbids investor and team claims. The one borrowable form is citation of external published research, which nvidia-gear demonstrates from the publisher side and which FACTS.md explicitly permits with attribution.

**The anti-move, documented once but load-bearing:** ethics records that Warby Parker led its homepage with the social mission, customers did not respond, and the mission moved to secondary pages while product and price took the homepage. Mission-led homepages underperform even for mission-genuine companies. The ethos belongs in the fabric and in one dedicated beat, not in the hero.

What no honest source does: placeholder numbers, rounded estimates, or forward-dated promises. Across all 15 files there is not one observed instance of a credible site shipping a slot where a number should be. The gap is handled by writing a different sentence, which is exactly the FACTS.md rule.

---

## Comparison and glossary page architecture

Claru runs both. Documented shape, then a verdict.

**Claru /compare.** A single hub page positioning against 70+ competitors across categories, with a table or grid. Per-competitor child pages return 404, so this is one page, not a page-per-rival farm. The differentiation claims on it are architectural and categorical, with no comparative metrics. The page's central claim is an unhedged only-company absolute.

**Encord /alternatives.** The true page farm: 6 to 8 near-identical encord-vs-X pages, one per competitor. The scout classifies them as search-traffic capture routed to demo requests, and flags the structure as content repetition.

**Claru /glossary.** 56 terms in 7 categories, 40 to 60 words per definition. The scout's assessment: the definitions are standard category language that competitors use identically, so the glossary educates the market but differentiates nothing. Encord runs a glossary too, same shape.

**Claru /datasets and /training-data.** The third farm, and the only one with a lesson in it. A filterable index page fronting individual spec pages, each carrying clip counts, modalities, annotation layers, quality targets, and use cases. The structure is confident because it is specific. Related shape appears in oldmoney (Klim's font family pages, Sotheby's lot pages) and in 1x and figure (spec tables), so the underlying pattern, an index fronting per-item spec pages, has 4-source support even though the farming of it is Claru's alone.

**Does it work?** As search capture for a funded company with inbound volume and a content team, plausibly: the pages exist to be landed on, not read in sequence, and encord's whole alternatives strategy assumes search demand for the comparisons. As credibility for a reader already on the site, the scouts found both farms thin: unverified index counts on the datasets hub, absolutes on the compare page, generic definitions in the glossary. The farms are traffic infrastructure, not persuasion.

**For this client:** the comparison farm is doubly dead. It requires naming competitors, which the brief's no-negation rule forbids, and it serves search volume the site does not have. The glossary is maintenance weight that would read as SEO scaffolding on a one-person pre-launch site. The one transferable piece is the per-item spec page shape, applied not as a farm but as a single dataset page: schema fields, format, rights, provenance, terms. Depth in one page instead of breadth across forty.

---

## What to steal

Ranked. Source count on each.

1. **Claim and proof as one layout unit, with source and denominator.** 7 sources (nvidia-gear, craft-a, ethics, getty, oldmoney, pi, figure). The single highest-leverage pattern for a buyer who gives the site two minutes. Every external fact Vallum states gets its citation in the same block, sized honestly.
2. **The spec detail page: one page that fully answers what is sold, in what format, under what terms.** 5 sources (claru, 1x, figure, getty, oldmoney). Maps directly to beat 5. Schema fields, delivery format, licensing terms, consent chain, offer structure. This page does the positioning work the no-negation rule takes away from contrast copy.
3. **Short declarative hero plus one clarifying subhead.** 12 sources. Median heading 6 words. No questions, no metaphors, one claim.
4. **Plain 2-to-4-word section labels that name the job.** 4 sources (oldmoney, craft-a, glass, scale). Cheap to do, reads expensive, kills the eyebrow-badge urge.
5. **Procedure over adjective for every trust claim.** 4 sources (ethics, getty, oldmoney, figure). The consent stack presented as a numbered, checkable procedure rather than a values paragraph.
6. **Hedges inside the sentence.** 3 sources (getty, ethics, nvidia-gear). Where recoverable, with attribution, per clip. Precision qualifiers as grammar, not disclaimers.
7. **Demonstration with an honesty flag attached.** 3 sources (generalist, pi, ethics). Real footage, plainly captioned with what it is and is not. Pairs with the anti-AI director law.
8. **Proof late, ask last.** 6 sources mapped, zero counterexamples. Keep the evidence beat second-to-last on the page, ahead of the contact ask.
9. **Single conversational conversion path.** 3 sources (buildai, pi, orbit via Lusion). One ask, email or call, no fake product funnel. Matches a pre-launch reality where every deal is a conversation.
10. **Editorial restraint as the luxury signal.** 3 sources (oldmoney, glass via Apple and Family, craft-a). Few typefaces, labeled sections, high copy precision, no superlatives. The oldmoney file's summary of what makes a light page read expensive is effectively a checklist for this brief's register.

---

## What to avoid

Patterns that appeared often enough to look like conventions but are category noise, with the reason.

1. **Logo walls and customer carousels without attribution.** 3 sources (scale, encord, craft-a via Stripe's hero carousel). The scouts note that unattributed logos read as generic scale signaling. Also only works at a scale the client does not have, and FACTS.md forbids every form of it.
2. **Uncited superlatives.** 6 sources flagged them as noise (scale, buildai, claru, figure, ethics via Anduril and Palantir, getty via boilerplate feature headings). Best-in-class, world-class, largest-in-history. The exact reader this site targets has been pitched five times this quarter with these words.
3. **Aspiration in present tense.** 4 sources (1x, figure, generalist, ethics via Anduril). Future capability written as current fact. Technical buyers pattern-match it to vaporware, and for Vallum the same sentence shape would be outright fabrication.
4. **Team-credential accumulation.** 3 sources (figure, generalist, ethics). Combined-years claims and pedigree lists without breakdown. Unverifiable, repeated verbatim across pages, and unavailable to a sole founder anyway.
5. **Homepage news and blog card feeds.** 5 sources flagged as dilution (craft-a via Anthropic and Stripe, scale, glass via Family, generalist). A feed implies a publishing cadence. Shipping one implies a promise a one-person company will visibly break.
6. **Persistent announcement banners.** 3 sources (scale's repeated partnership banner, craft-a via Anthropic's releases block and Stripe's news section). News as permanent furniture stops being news.
7. **Comparison and alternatives page farms.** 2 sources run them (claru, encord), and both scouts filed the structure under repetition or unverified claims. Below the convention threshold, named-competitor by design, and dead under the no-negation rule.
8. **Recruitment callouts on the buyer path.** 3 sources (1x flagged as noise, pi, generalist). Open-roles counts on a homepage are internal metrics doing external work. Forbidden for this client regardless.
9. **Newsletter capture as the default footer ask.** 3 sources (1x, figure, oldmoney). The weakest possible ask for a cold-email visitor with two minutes. The ask here is a reply or a call.
10. **Frosted-card glassmorphism.** The glass file checked three sites specifically for it and found zero using backdrop-filter cards. Apple uses solid overlays, Igloo uses real rendered geometry, Family uses contrast on clean ground. The frosted rectangle with a border is a trend artifact, not a practice of the sites worth copying. Glass as a real optical property over live media is a different thing and the brief already specs it.

---

## Single-source observations

Below threshold, kept because they are useful. Each is one source.

- Linear numbers its homepage sections 1.0 through 5.0, turning a feature list into a visible system (craft-a). Adaptable to a narrative spine without the numerals.
- Generalist pins a real-speed, fully-autonomous caption to every demo video. One sentence of self-imposed constraint doing the work of a benchmark (generalist).
- NVIDIA GEAR publishes the scaling formula and goodness-of-fit alongside the claim, inviting verification instead of trust (nvidia-gear).
- Anthropic places its governance commitments in primary navigation at the same level as product (craft-a).
- Getty guarantees generated outputs are never shown to or licensed by anyone else, a structural privacy promise as differentiator (getty).
- Kickstarter publishes annual benefit statements as legal compliance documents, eleven years running (ethics).
- Warby Parker's documented retreat from a mission-led homepage after customers ignored it (ethics). Single source but it is the only observed A/B evidence on mission placement in the corpus.
- Claru attaches numeric quality targets to individual dataset pages, pushing specificity to the leaf pages rather than the homepage (claru).
- Sotheby's runs auction, fixed-price retail, and editorial on one homepage without the modes blurring (oldmoney).
- Stripe segments its CTAs by audience type instead of running one funnel (craft-a). Only relevant here if the site ever splits buyer and site-owner audiences.
- Build AI's inversion: the dataset, not the technology, is the brand (buildai). Closest structural precedent for a company whose product is hours.

---

## Decisions made

- [cartographer] chose to count source files (15) rather than companies (24) for the 3-source threshold because the task text defines the threshold in sources; where a count leans on multiple companies inside one file, the entry says so.
- [cartographer] chose to classify claru /compare as a single hub rather than a page farm because its per-competitor child pages return 404, and let encord /alternatives carry the true farm shape.
- [cartographer] chose to treat orbit and glass primarily as mechanics references and drew page-architecture patterns from them only where a real marketing site was documented (Apple, Family, Lusion), because Igloo and the Codrops tutorial are not category sites.
- [cartographer] chose to rank claim-with-proof-in-one-block above hero conventions in What to steal because the brief's three buyer questions are all proof questions and the two-minute phone read leaves no time to hunt evidence.
- [cartographer] chose to include Position 3 (unproofed assertion) inside Proof placement rather than only in What to avoid because it is the modal pattern in the category and the file should show it as a placement choice with a failure cost, not just a vice.
- [cartographer] chose to fold the spec-page recommendation into a single dataset page rather than endorsing Claru's index-plus-leaf-pages farm because the client has one product and zero inbound search volume, and depth on one page serves the no-negation positioning strategy.
