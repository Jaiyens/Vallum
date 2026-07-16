# VOICE.md

Derived 2026-07-16 from the 15 scout files in research/cache/ (24 distinct sites: Claru, Build AI, Encord, Scale AI, Physical Intelligence, 1X, Figure, Generalist AI, NVIDIA GEAR and Cosmos, Getty Images, Shutterstock, Anthropic, Linear, Stripe, Sotheby's, Aesop, Klim, Apple, Igloo, Family, Bruno Simon, Active Theory, Lusion, Anduril, Palantir, Patagonia, Kickstarter, Warby Parker). Every agent scores copy against this file. Every rule below carries a source count. Nothing in it is a preference.

Method notes. Measurements are computed from the verbatim copy samples recorded in the caches, with N stated per table. Several sites were partially blocked during scouting (Aesop, Warby Parker, Shutterstock, Encord marketing pages), so their numbers come from captured samples only. Scouts oversampled notable claims, which biases sentence medians slightly long; true site medians are equal or shorter. No sentence from any scouted site is transcribed in this file. Every move is described and cited by site and measurement, because the agents reading this file write copy, and verbatim examples leak into output. Illustrations are built only from FACTS.md content and are marked as illustrations.

A finding that organizes everything below: quality splits by page, not by company. Inside the same company, the dataset card, the legal page, and the spec sheet consistently outscore the hero marketing (Claru's dataset pages beat Claru's homepage metrics; NVIDIA's EgoScale research page beats the Cosmos product page). The voice this site needs is the spec register promoted to the display surface.

## Hard rules

These override every measurement in this file, including any corpus habit that contradicts them.

1. No em dashes. Ever. In copy, headings, alt text, captions, comments, anything rendered or committed. Most of the corpus uses them. The answer is still no. Use a period, a comma, or a colon.
2. Sentence case headings. Never Title Case. (The weak half of the corpus title-cases: Scale, 1X, Getty. The strong half is mixed. Irrelevant: this is fixed.)
3. Banned words: revolutionize, unleash, empower, seamless, cutting-edge, AI-powered, platform, solutions, leverage as a verb. Corpus support: revolutionize and unleash appear 0 times in 24 sites; even the weak sites do not need them. Empower is Palantir's core verb and cutting-edge appears in Build AI and Anduril, all three in the weak set. Extend, from measurement: "at scale" with no object (2 sites, both unanchored), state-of-the-art, world-class, best-in-class, industry-leading (every occurrence in the corpus is in the weak set, Scale alone accounts for most).
4. Active voice by default. Passive is permitted only when the actor is genuinely unknown or when the object is the news (a legal page stating what is applied to a clip).
5. A button says what happens when pressed, as a verb phrase with a concrete object, and the confirmation uses the same word. Illustration, FACTS-true: a button reading "Request pilot terms" confirms with "Terms requested." The corpus's strong CTAs are 2-4 word verb phrases naming the action (shop, download, book, start, request a sample). The weak ones are generic (learn more, 5 sites) or coy (a two-word chat invitation with a missing apostrophe, Build AI).
6. No negation. Measured: identity negations per source ("we are not X," "unlike X," "this is not a Y," "X, not Y" as identity contrast) have a median of zero across the 15 files. Total is 8 across 24 sites: Scale 2, Claru 1, Lusion 1, Apple 1 (feature wordplay), Encord 1 (inside a press quote), Physical Intelligence 1 (a field-level "no prior system" claim), Kickstarter 1 (inside a statutory definition), everyone else 0. The zero-negation sites include every luxury source and every source rated strong. The median is zero. That is the answer. The replacement inventory is in "How a claim gets qualified," moves 1 through 5. Guarantee-shaped terms also get the positive rendering: state the bound, never the banned (exclusivity is time-boxed and task-boxed, rather than never perpetual).
7. No status badges, no mono-caps eyebrows announcing a section, no stage pills. Where a badge was carrying a truth, the truth becomes one plain sentence in the body voice. Illustration, FACTS-true: the capture kit today is 4 to 6 refurbished iPhones on head straps, carried in personally. That sentence replaces any concept badge and is stronger than the badge was.

## Measured baseline

### Sentence length distribution

N = 140 body and subhead sentences with word counts recorded in the caches, pooled across all 15 files.

| Words per sentence | Share |
|---|---|
| 1-6 | 10% |
| 7-12 | 32% |
| 13-18 | 29% |
| 19-28 | 23% |
| 29-40 | 6% |
| over 40 | 0% |

Median 13. p25 = 9, p75 = 20, p90 = 27, maximum observed 40 (a Physical Intelligence research sentence).

Where the long tail lives: every 26-40 word sentence that reads well is an explanation of a structure, a program, or a legal arrangement, and carries at least two numbers or named entities (Patagonia's ownership and giving copy at 26-28 words, Kickstarter's charter allocations at 26-31, Warby Parker's program scope at 38, Getty's ownership hedge at 27). The corpus's long sentences without numbers come only from the weak set (1X's 35-word mission, zero numbers, six abstractions). Length does not separate good from bad writing here. Noun quality and proof distance do. But the ceiling is real: nothing over 40, and over 28 only when the sentence is doing enumeration or legal work with numbers in it.

### Words per heading

N = 81 headings and display lines with counts recorded.

| Words | Share |
|---|---|
| 2-3 | 24% |
| 4-5 | 22% |
| 6-8 | 37% |
| 9-12 | 15% |
| 13+ | 2% |

Median 6. Modes at 3 and 7. Of the 14 headings above 9 words, 13 come from pages the corpus rates weak (Getty's 12-word hero with zero concrete nouns, Scale's 10-11 word heroes, Claru's 22-word datasets-page hero). Long headings correlate with abstraction, not with information.

### Paragraph length in sentences

Marketing surfaces (9 sources with paragraph data): median 2 sentences, range 0-3. Two strong sources (Apple, Family) run 0: everything is display fragments and one-sentence blocks. 1X and Figure run 1-2. Scale runs 2-3. Getty FAQ runs 2-4.

Research and legal surfaces: 3-8 sentences, 70-185 words per paragraph (Physical Intelligence research pages, NVIDIA blogs). This register is permitted only on a page that is explicitly a document, never on a selling surface.

### Claim and evidence proximity

Of 24 sites: 13 place evidence in the same sentence or the same block as the claim; 11 defer it to another page or omit it. The same-block group and the strong set overlap almost exactly. One instructive exception: Anthropic defers homepage proof to linked pages, and its own cache flags the homepage as claim-only. The weak set's pattern is Figure (performance metrics live in news articles, not on the product page) and Scale (a 90% market claim with no source anywhere). This is the single best predictor in the corpus of whether a page reads expensive. Rule: the evidence rides in the same block, or the claim does not run.

### Concrete versus abstract nouns

Counted on 30 sampled sentences, 15 from each set. Concrete means photographable or countable (mug, warehouse, roof, $95, 30fps, consent ID). Abstract means capability-class (intelligence, innovation, possibility, capability, solution, excellence).

Strong set: 3.2 concrete nouns per abstract noun. Claru's about-page sentence about what robots cannot learn from internet data contains five concrete nouns and zero abstract. Sotheby's lot line is entirely concrete: item, maker, estimate range, currency.

Weak set: 0.4 concrete per abstract. Palantir's mission sentence carries one semi-concrete noun against four abstractions. Getty's hero carries zero concrete nouns in 12 words.

Rule derived: at least 2 concrete nouns per abstract noun per paragraph, and the first noun of any display line is concrete.

### Secondary measurements

- Fragments: 52% of sampled display lines have no finite verb. Under 5% of body sentences do. Fragments are display furniture, not body prose.
- Verb position: strong display lines that contain a verb put it at word 1 or 2 in 17 of 21 samples. Weak lines bury it at word 4 or later in 9 of 13.
- First concrete noun: strong display lines reach one by word 2 (median), never later than word 5. 7 of 15 sampled weak display lines never reach one at all.
- Subheads: in 9 of 11 measured strong pairs, the subhead extends the headline with at least one new concrete noun or number and shares at most one content word with it. In 5 of 6 weak pairs the subhead restates the headline or stays abstract.
- Exclamation marks: 2 of 24 sites, both playful portfolio studios. Zero in every B2B, luxury, and research source. Zero here.

### Best writing in the corpus

scout-generalist (Generalist AI). Three mechanical properties make it the best, and they are properties, not vibes:

1. Subject and finite verb inside the first three words of every load-bearing line, with a concrete object. Their four-word tagline is a complete declarative: concrete subject, transitive verb, concrete object, one-word restrictive close.
2. Qualification attached to the artifact instead of the sentence. Their demo videos carry a caption asserting playback speed and full autonomy. The hedge lives on the evidence object, so the claim sentence stays clean and the proof is self-auditing.
3. Every scale number ships with a unit and a rate (hours, plus hours per week of growth).

Proof the property is mechanical and not brand halo: the same site's 17-word mission sentence stacks three abstractions before any concrete noun and is its weakest line. Runners-up: Sotheby's (metadata as copy: maker, estimate range, date, time, city, no adjectives), Patagonia (every self-claim carries a number and its denominator or a published median next to it).

## Heading grammar

Sentence case is a given. Four shapes account for nearly every strong heading in the corpus. Budget: 2-7 words, hard cap 8.

**Shape A. Noun phrase naming the thing.** 2-5 words. About 45% of sampled headings. Two subtypes: the job label (a section named for what it contains: what is closing soon, where the fonts are used) and the category claim (training data for a named field, a system for a named job). The head noun is concrete or a named category, never a virtue. Source count: 9 sites lead sections this way, including all three old-money sources.

**Shape B. Verb first, concrete object by word 3.** 3-7 words. About 25%. Linear's five task headings and Apple's imperatives. The verb is something the reader or the product actually does (define, review, shop, switch, request). The abstraction verbs (unlock, transform, experience, elevate) appear 5 times in the corpus, all in the weak set, and are banned by this shape's definition.

**Shape C. Fragment pair.** Two fragments split by a period, 4-8 words total. About 12%. The most website-native shape in the corpus (Claru's scale pair, Family's protection pair, Apple's range pair). The second fragment answers or extends the first; it never repeats it. Illustration, FACTS-true: "Written consent in three languages. Face blur before export."

**Shape D. Short declarative sentence.** Subject plus finite verb, 5-9 words. About 18%. Used when the heading itself is the claim and the body below it is the evidence (Getty's legal-protection heading, Anthropic's hard-questions line).

**Anti-shape: the gerund heading.** A heading whose first word is a gerund (powering, unlocking, transforming, scaling) appears 6 times in the corpus, 5 of them in the weak set. A gerund has no actor, so the claim has no owner. Never use it.

Additional rules from measurement:
- The display line is a claim or a noun phrase. If it is a claim, it must survive the scoring rubric like any sentence. If it is a noun phrase, its head noun is concrete.
- The subhead extends, never explains and never restates: at least one new concrete noun or number, at most one content word shared with the headline (9 of 11 strong pairs).
- No heading contains a superlative or an evaluative adjective. The old-money sources contain zero across all sampled labels.

## Sentence rules

Derived, each with its evidence. Not preferences.

1. **Target median 13 words, hard cap 28, absolute cap 40 for documentation pages only.** Evidence: pooled distribution above; p90 of the corpus is 27.
2. **One clause, at most one subordinate clause.** Evidence: Build AI's cache notes no sentence exceeds one compound clause; Figure's body runs 12-18 words single-clause; every readable 26+ word sentence is a flat enumeration, not nesting.
3. **Finite verb within the first five words.** Evidence: verb-position counts above. Short subjects are how the strong set does it: the company name, the product, the clip, the reader.
4. **A sentence over 28 words must contain at least two numbers or named entities.** Evidence: the entire well-functioning long tail (Patagonia, Kickstarter, Warby Parker, Getty legal) satisfies this; the failing long sentences (1X's mission) contain zero.
5. **Paragraphs of 1-3 sentences on any selling surface. One claim plus its evidence per paragraph.** Evidence: marketing median 2; the same-block proof rule.
6. **Fragments only in display lines, labels, and captions. Body copy is complete sentences.** Evidence: 52% display versus under 5% body.
7. **A concrete noun within the first five words of a display line and the first eight of a body sentence.** Evidence: first-concrete-noun counts above.
8. **Every number carries a unit, every comparison carries a named baseline, every external statistic carries its source.** Evidence: the corpus's most credible numbers are NVIDIA's 54% gain pinned to a no-pretraining baseline and Patagonia's audit score printed beside the published median. The least credible is Scale's 90% with no source. Illustration, FACTS-true: logging deaths run over 110 per 100,000 workers, attributed to US occupational fatality data, denominator included.
9. **Present tense states only what is true today. The future takes a date or a window.** Evidence: 1X frames aspiration as current capability and its cache flags every instance; Warby Parker states impact as historical totals with dates. FACTS.md gives a real window (July 2026 to approximately January 2027); use it.
10. **First person plural is the company voice and claims nothing about headcount.** Six sites open with a we-declarative of activity; it is the standard positive identity move. Never let it imply people who do not exist (FACTS.md rule).
11. **Adjective budget: at most one evaluative adjective per sentence, and none from the uninspectable class** (powerful, advanced, innovative, robust, comprehensive, high-quality, sophisticated). Evidence: Anduril and Palantir are built out of these and their caches read them as noise; Sotheby's sampled copy contains none at all.
12. **Second person appears only where the reader acts: instructions, the offer, the terms.** Evidence: the weak set uses second person for flattery (your vision, your journey); the strong set uses it for transactions (what you buy, what you receive, what you own, in Getty's license terms and Family's controls).

## How a claim gets qualified

The most important section. When a company cannot prove something, the strong sources do not hedge with adverbs and do not negate a competitor. They change what the sentence is about. Seven moves, collected from the corpus, ordered by how often they appear in the strong set.

**Move 1. The mechanism instead of the outcome.** (5 sources: Getty, Aesop, Patagonia, Kickstarter, Encord's better moments.) When the result is unprovable, state the procedure that produces it, in concrete steps. Getty cannot promise no IP ever leaks into an output, so it states what the generator is designed to prevent and names the training-data restriction and the partner. Patagonia cannot prove it saves anything, so it shows the trust structure and the money moved. This is the load-bearing move for a pre-launch company: the consent stack, the schema, the blur step, and the provenance record are all procedures, all true today, and all stronger than any outcome claim. Illustration, FACTS-true: every clip links to a signed release through a consent and provenance ID.

**Move 2. The floor number.** (6 sources: Patagonia, Warby Parker, NVIDIA, Kickstarter, Claru's dataset cards, Stripe.) "Over" or "more than" attached to a real, checkable figure. The hedge sets a floor, not a fog. A floor number with a unit reads as accounting; "many" or "significant" reads as marketing.

**Move 3. The named baseline.** (3 sources: NVIDIA, Patagonia, published synthetic-versus-real results.) A percentage means nothing until the sentence says over what. NVIDIA pins its 54% to a no-pretraining baseline. Patagonia prints the median score of ordinary businesses beside its own. Any improvement claim on this site names its comparison set in the same sentence or does not run.

**Move 4. The dated record.** (5 sources: Stripe, Kickstarter, Sotheby's, Warby Parker, Klim's build date in the footer.) A year or a date turns a claim into a record. Volume with a year, incorporation with a date, an auction with date, time, and city. Dates are cheap, verifiable, and the weak set almost never uses them.

**Move 5. The artifact caption.** (4 sources: Generalist AI, Klim, Physical Intelligence, Sotheby's.) Attach the qualification to the evidence object, not to the claim sentence. A video captioned with its playback speed and autonomy level. A case study labeled with client name and image count. The claim stays short because the artifact carries the fine print.

**Move 6. The limit stated before the promise.** (1 source, Getty, but legal-grade.) When the ground truth is genuinely unsettled, say the unsettled part first, then the commitment inside it. Getty's ownership sentence concedes the state of the law before granting the customer everything that exists to grant. This is the honest shape for anything this site cannot fully warrant.

**Move 7. The offer as terms.** (3 sources: Sotheby's, Warby Parker, Getty.) Prices with inclusions, ranges with conditions, splits with triggers. A number with its terms reads as a contract excerpt, and contract excerpts are the most trusted copy in the corpus. Illustration, FACTS-true: a paid pilot at $15,000 to $40,000 for 20 to 40 curated hours, half on signature, half on delivery and acceptance.

**The anti-moves, all measured in the weak set:**
- Superlative without scope (most capable, best in the business): Scale and Physical Intelligence's subheads. No comparison set, no metric.
- Aspiration in present tense: 1X, four flagged instances.
- Authority by accumulation: Figure's combined-years claim, repeated identically on three pages, never broken down.
- Leaderboard language without a link or date: NVIDIA's Cosmos blog names three benchmarks and links none.
- The maxim presented as discovered truth: Scale's shortcut aphorism. A maxim claims wisdom; a procedure claims work.

## Banned constructions

What the weak sources do that the strong ones never do. One contrast each, described, not transcribed.

1. **Identity negation.** Scale defines its data by what other data cannot do; Lusion defines itself by what it does not chase. Contrast: Claru's dataset cards define the product by enumerating clip counts, modalities, facility types, and quality thresholds, and no contrast is needed because nothing else could be mistaken for it. Depth does the work denial was attempting.
2. **Superlative without measurement.** Scale asserts rank in a five-word heading with no number anywhere on the page. Contrast: Patagonia prints its audit score next to the published median for ordinary businesses, and the reader ranks it themselves.
3. **The gerund hero.** Scale, Anduril, and Palantir open sections with actor-less gerunds (powering, transforming, unlocking). Contrast: Linear's section heads start with a bare verb and a concrete object, and the reader knows who does what.
4. **The abstract imperative.** Getty's hero commands the reader to unlock possibilities: 12 words, zero concrete nouns. Contrast: Apple's three-word imperative contains a product you can hold.
5. **Aspiration in present tense.** 1X describes future capability as a current shipping feature. Contrast: Warby Parker states an impact number as a dated historical total and lets the tense carry the honesty.
6. **Authority by accumulation.** Figure sums its team into one unverifiable combined-years figure and repeats it on three pages. Contrast: Klim shows a named client, an image count, and a named typeface per case, and each unit is checkable.
7. **Passive trust claims.** Scale is "trusted by" an unnamed ambitious audience. Contrast: Linear states a counted number of teams with an active verb.
8. **The maxim.** Scale ships an aphorism where evidence should be. Contrast: Stripe embeds uptime, volume with a year, and request rates in parentheses inside the claim sentence itself.
9. **Adjective-stack positioning.** Anduril and Palantir describe capability as chains of modified abstractions (advanced this, sophisticated that). Contrast: Sotheby's sampled copy contains no evaluative adjectives at all; the maker's name and the estimate range are the adjectives.
10. **The status badge.** Not directly observable in text extractions, but the corpus shows its replacement working: sites that state plain operational facts in body prose (Klim's build date, Kickstarter's filing dates) read more credible than any pill could. The badge's truth becomes one plain sentence, per hard rule 7.

## Register

Position: two thirds of the way from research paper to landing page in sentence economy, and all the way to research paper in evidence discipline. The working analogy is a catalog page or a spec sheet promoted to the display surface. Sotheby's lot card is the register artifact: item, maker, estimate range, date, time, city, and not one adjective.

Justification by the numbers:
- Research pages in the corpus run 120-185 words per paragraph and roughly 22-word sentences (Physical Intelligence, NVIDIA). Too slow for a reader who gives the site under two minutes on a phone (the brief's stated reader).
- Consumer landing pages run 0-1 sentence paragraphs and 3-8 word fragments (Apple, Family). Too thin for a technical buyer who needs format, rights, and delivery terms answered before replying to a cold email.
- The strong middle (Linear, Stripe, Klim, Sotheby's, Patagonia's disclosures, Getty's terms, Claru's dataset cards) runs median 12-14 word sentences, 1-3 sentence paragraphs, evidence in-block, and a higher number density than any landing page.

What the position implies mechanically:
- Fragments do landing-page work in display lines and labels. Numbers do research-paper work in the body. The two never swap places.
- The reader is assumed technical: schema names, format specs, and license terms appear without apology or simplification. Nothing is explained twice.
- No jokes, no exclamation marks, no flattery. Warmth comes from plainness and from the one place the corpus earns it: naming real people, real places, real dates.
- This register is also the fix for the client's stated complaint. "Not website-esque" decomposes into the measurables above: display lines were not fragments or short claims, verbs landed late, subheads restated, and concrete nouns arrived too slowly. The rubric below scores exactly those.

## Scoring rubric

Run any string through this. Definitions first, then gates, then checks.

Definitions:
- Sentence: split on . ! ? and ; A fragment is a unit with no finite verb.
- Word: whitespace-delimited token. Hyphenated compounds count as one word.
- Concrete noun: you could photograph it or count it (clip, roof, iPhone, $15,000, consent ID, 30fps). If you cannot, it is abstract (capability, intelligence, excellence, possibility).
- Evaluative adjective: an adjective asserting quality rather than fact (powerful, advanced, best, leading, remarkable, robust, comprehensive, sophisticated, high-quality). Factual adjectives (outdoor, head-mounted, refurbished, signed, non-exclusive, 21-keypoint) are exempt and unlimited.

Gates. Any failure scores the string 0. Fix and rescore.
- G1: contains an em dash.
- G2: contains a banned word (hard rule 3 list).
- G3: contains an identity negation or an "X, not Y" contrast (hard rule 6).
- G4: contains a status badge, stage label, or mono-caps eyebrow (hard rule 7).
- G5: contains a factual claim about Vallum Labs not present in FACTS.md, or any item from the FORBIDDEN list.

Checks. One point each. Score only the checks applicable to the string type (a button cannot fail the paragraph check).
- C1: every sentence is 28 words or fewer, and the median across the string is 16 or fewer.
- C2: every body sentence has a finite verb within its first five words.
- C3: a concrete noun appears within the first five words of a display line, or the first eight words of a body sentence.
- C4: every number has a unit; every comparative has a named baseline in the same sentence; every external statistic has an attributed source.
- C5: at most one evaluative adjective per sentence, none from the uninspectable class.
- C6: each paragraph is 1-3 sentences and contains at most one claim plus its evidence, in the same block.
- C7: each heading is 8 words or fewer, matches shape A, B, C, or D, and does not start with a gerund.
- C8: each subhead shares at most one content word with its headline and adds at least one new concrete noun or number.
- C9: at least 90% of sentences are active voice with an actor subject.
- C10: present tense is used only for what is true today; any future statement carries a date or window.
- C11: buttons are verb phrases naming the outcome, and the confirmation reuses the verb.
- C12: fragments appear only in display lines, labels, or captions; all body sentences are complete.

Pass threshold: all gates pass, and the string scores at least 10 of 12 applicable points (or at least 83% when fewer than 12 apply). Report the score as gates-pass plus points, for example "gates pass, 11/12."

Worked example (illustration, FACTS-true): a body sentence stating that every clip ships with a 21-keypoint hand-pose track where recoverable, action-segment start and stop timestamps, and a consent ID linking it to a signed release. 24 words, one clause with a flat enumeration (C1 pass). Verb at word three (C2 pass). Concrete noun at word two (C3 pass). The one number carries its unit inside a compound (C4 pass). Zero evaluative adjectives (C5 pass). Active voice, present tense, true today (C9, C10 pass). Gates all pass. Score: gates pass, 8/8 applicable.

## Decisions made

- [lexicon] chose to transcribe zero sentences from any scouted site and instead describe each move with site name and measurements, because agents write copy against this file and verbatim examples leak into output, which is the exact clone-risk the brief flags for Claru.
- [lexicon] scored pages rather than companies (Claru dataset cards strong, Claru homepage weak; NVIDIA EgoScale strong, Cosmos marketing weak), because the corpus shows register quality splits at the page level, and the actionable finding is to promote the spec register to the display surface.
- [lexicon] set the body sentence target at median 13 words with a 28-word cap, over the landing-page-only median near 9, because the buyer reads papers and the corpus's most credible proof sentences run 11-27 words.
- [lexicon] counted "X, not Y" contrasts as negations and banned them alongside identity negations, because they name the discarded alternative and invite the same comparison the no-negation rule exists to prevent.
- [lexicon] required even guarantee-shaped terms to take the positive rendering (state the bound, not the banned), extending hard rule 6 into licensing copy where FACTS.md itself uses never-phrasing internally.
- [lexicon] named scout-generalist the best writing in the corpus over the old-money set, because its properties (verb-early declaratives, artifact-borne qualification, unit-plus-rate numbers) transfer directly to a data vendor, while the old-money strengths are partly genre-bound to catalogs; Sotheby's and Patagonia are named runners-up and their moves are folded into the qualification section.
- [lexicon] capped headings at 8 words against a corpus median of 6, because 13 of the 14 headings above 9 words came from weak pages.
- [lexicon] set the rubric pass threshold at 10 of 12 applicable checks with five absolute gates, because the gates encode the brief's non-negotiables and the checks encode measured tendencies where one deliberate miss can be earned.
- [lexicon] exempted factual adjectives from the adjective budget, because the corpus's strongest copy (lot cards, schema enumerations) is dense with them and starving those would ban the register this file exists to produce.
