# UI refs: method / process sections without paragraphs

Scope: how strong sites turn a written process into steps with visuals and motion. Skeleton only, no copy borrowed. Applied at the end to beat 4 (the method) on this site: bone surface, tokens `bone` `ink` `forest` `forest-line`, Newsreader display-2 section line, Inter body, JetBrains Mono reserved for data only per LOOK.md.

## 1. Step anatomy, five working patterns

**Linear method (linear.app/method).** Each step is a decimal address, not a step number: section digit plus subsection digit separated in the label, e.g. a "2.1" style pair sitting next to a short verb-phrase title. No card, no icon. A left rail lists every step as a link so the whole method is scannable as a table of contents before anyone reads a word. Hairline rules separate rail entries, not boxes around content. Body per step opens with one short sentence before any elaboration; the elaboration is optional depth, the one-liner is the anchor. Anatomy: `[decimal id] [short label] -> [one-line claim] -> (optional expandable body)`.

**Apple AirPods Pro highlights list (apple.com/airpods-pro).** Six-item vertical list, each item: bold single-line headline, one sentence of body, one image or video frame. No numbers at all; sequence is implied by vertical order, not enumeration. Images are column-scaled inside the list, not full-bleed, and reveal sequentially as the item scrolls into view rather than being scroll-scrubbed. A second section on the same page ("closer look" viewer) swaps to alternating left-text/right-image blocks per feature, each with a headline plus one paragraph, generous vertical rhythm (150px-class gaps) doing the separation work instead of rules or cards.

**OpenAI InstructGPT/RLHF explainer diagram (openai.com/index/instruction-following, widely reproduced from the 2022 paper).** Three-step horizontal pipeline: small stylized icon illustration per stage, a short stage label under each icon (not a sentence, a name), thin arrow connecting stage to stage left to right. The diagram is one visual object, not three cards; the arrows carry the sequence, not numbers. Caption text below the whole diagram does the explaining in one or two sentences total, not per stage.

**Anthropic "Tracing the thoughts of a large language model" (anthropic.com/research).** No numbered steps anywhere. Sequence is implied purely by image order down the page: a short question or scenario sentence, then one full-width centered image, then a caption below the image that extends the finding without repeating the body text above it. Mono type appears only inline for proper nouns (model names), never as a label or eyebrow. This is the closest external precedent for "no cards, hairline-adjacent restraint, sequence by position not number."

**Stripe product pages (stripe.com/connect, stripe.com/billing, stripe.com/radar and the wider Stripe marketing system).** The recurring convention documented across Stripe's own product pages and teardowns of them: a horizontal timeline of 3-4 small circular nodes connected by a single thin 1px line, read left to right like a subway map. Each node carries a short label above or below the line (a noun phrase, not a sentence) and a small UI screenshot or code panel as the visual, alternating above/below the line so labels never collide with the previous node's visual. The line itself is the only diagram chrome, no boxes, no drop shadow, no background fill behind a stage. Body copy per node stays to a single clause; Stripe leans on the screenshot or code panel to do the explaining a sentence would otherwise carry.

## 2. Scroll-triggered reveal mechanics (GSAP ScrollTrigger conventions)

Sourced from GSAP's own ScrollTrigger docs/forum patterns and the CSS-Tricks/GSAP Vault breakdowns of Apple's frame-sequence pages (css-tricks.com "fancy scrolling animations used on Apple product pages"; gsapvault.com scroll-image-sequence-tutorial). Two distinct mechanics, don't blend them in one section:

- **Scrub (tied to scroll position, no independent duration).** Use for a single visual that transforms across a step range: image sequence scrubbing through frames, a line drawing itself, a number counting. `scrub: true` or `scrub: 1-2` (1-2 seconds of catch-up smoothing) reads calmer than raw `scrub: true` on trackpads. Typical pinned distance per beat: 100-150vh of scroll mapped to one visual's full transform, so the visual has room to read before release.
- **Discrete reveal (fires once, plays out on its own timeline).** Use for text and step labels entering view. Convention: translateY 24-40px to 0, opacity 0 to 1, duration 0.5-0.8s, ease `power2.out` or `expo.out`. Stagger between sibling elements (a label then its body then its image): 0.06-0.12s per item, not more, so a three-part step finishes revealing inside about 1s total. Trigger point: element top hits 75-80% of viewport height, not the very bottom edge, so nothing feels late.

Pin usage: pin the step label or step counter while its body/visual scrolls past beneath or beside it, release the pin once the next step's trigger fires. `pinSpacing: false` when a fixed sidebar shouldn't push page content down.

**Awwwards-class implementation (madewithgsap.com, a collection built by developers with 27 Awwwards Site-of-the-Day awards combined; also the GSAP forum's own Locomotive Scroll + ScrollTrigger threads).** The recurring process-section convention across this tier: a fixed step counter (e.g. "01/04") pinned in a corner while the step content scrolls past in the main column, a thin progress line or single dot indicator that fills or moves proportionally to scroll progress through the section, and horizontal scroll nested inside vertical scroll for a step gallery only when there are 4+ visual steps to browse (not for 3 or fewer, where vertical stacking with discrete reveals is the norm). Smooth-scroll libraries (Lenis or Locomotive Scroll) sit underneath GSAP so the scrub tracks a damped scroll value instead of the raw wheel event, which is what produces the "expensive" felt weight rather than a raw 1:1 scrub.

Reduced motion: gate the whole ScrollTrigger registration behind `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. When true, skip pin/scrub entirely and set every element to its end state directly (opacity 1, no transform) on mount; render the image at rest, not mid-sequence-frame. Do not attempt a "shorter" animation as the reduced variant, static is the only correct reduced state.

## 3. A single photograph/aerial as method anchor

Three placement modes observed, ranked by how much weight the photo claims:

- **Full-bleed hero moment.** Apple uses this for its own product renders inside feature deep-dives (airpods-pro alternating sections) but never for a supporting/explanatory photo; full-bleed is reserved for the hero object itself.
- **Column-width, paired with text.** Apple's alternating left-text/right-image rows are the clean precedent: the photo sits in a fixed column next to the copy, same vertical rhythm as the text block beside it, no caption needed because the headline above does that job.
- **Full-width, centered, captioned below.** Anthropic's pattern: the image spans the content column (not full-bleed to viewport edge), sits alone with breathing room above and below, and a one-line caption underneath extends meaning rather than describing the obvious. This is the mode to use when the photo needs to carry evidentiary weight ("we were actually there") rather than illustrate a mechanism.

Client fit: this project's own CONCEPTS.md already resolves this correctly for beat 4, one aerial (Western Cape harvest ground, unpopulated) in a **column beside the method copy**, not full-bleed. That decision matches LOOK.md's hard constraint that beats 4-7 keep at least 55% bare bone across any horizontal slice: a column photo protects the arithmetic, a full-bleed one would violate it outright. Keep the aerial in that single column slot; do not let it migrate to full-bleed or split across multiple steps as three thumbnails, one anchor photo carries all three steps.

## 4. Diagram style with hairlines and mono labels, no cards

Linear is the only source here with a real hairline system: thin 1px rules divide list rows and rail entries, no border ever wraps a content block, no drop shadow, no fill color change on the label itself, only spacing and a rule to separate. Anthropic's mono usage is the other data point: mono appears sparingly and only for literal names/identifiers, never as a decorative label, eyebrow, or step tag. Combined rule for a hairline-and-mono system: the hairline is the only divider (`forest-line` here), mono is reserved for actual data values, and the step index itself should be set in the body/heading face at reduced size or weight rather than in mono, since mono-as-label is not supported by either precedent and conflicts with this project's own rule that JetBrains Mono is "never a label, never an eyebrow." Use a plain numeral in Inter or Newsreader at the `small` step for the index, hairline rule beneath each step, no card, no icon tile.

## 5. Cutting body text under 20 words per step

Pattern across all four sources: one factual sentence stating the mechanism or benefit, full stop, nothing else at the primary layer. Depth (the second paragraph, the elaboration) either doesn't exist (Apple highlights list) or is demoted to a caption/expandable secondary layer read only on demand (Linear's expandable body, Anthropic's caption-under-image). None of the four sources put two ideas in one sentence; each sentence carries exactly one claim, one subject, one mechanism. Cutting method: identify the single verb each paragraph is actually doing (signs, waits, wears) and build the sentence around that verb with only the object and constraint attached; drop rationale, drop qualifiers, drop anything a caption or a hover state could carry instead.

## 6. Applying this to beat 4 (the method)

Map the three source paragraphs to three steps by their governing verb, each one sentence, each under 20 words:

1. **Consent**: signed release, in the participant's own language (per the existing multilingual-consent beat-6 pairing, do not duplicate that language detail here, just state the release exists and is signed first).
2. **Window**: the harvest window as a place and a date range, this is the step the aerial photo sits beside, column-width, not full-bleed.
3. **Kit**: the iPhone head-strap rig named as a fact, one sentence, no spec dump.

Layout: three rows, each row a numeral (Inter small, not mono) plus one-line label plus one-sentence body, hairline (`forest-line`, `bone` at 24% equivalent used on ink/forest, solid `forest-line` on bone per LOOK.md) beneath each row. The aerial photo occupies a fixed column beside step 2 only, sized to preserve the 55%-bone rule; steps 1 and 3 run text-only, full measure (max 640px per LOOK.md body column). Motion: steps reveal as discrete staggered entries (translateY 32px, opacity 0 to 1, 0.6s, `power2.out`, 0.1s stagger) as beat 4 enters the 75% viewport line; no scrub, no pin, this beat has one photo and three short rows, not a sequence long enough to justify scrubbing. On `prefers-reduced-motion: reduce`, render all three rows and the photo at rest state with no transform, no opacity ramp.

## 7. Anti-patterns that break this look

- A card or bordered box around a step. None of the five sources use one; a hairline beneath the row is the only permitted divider on bone.
- Mono set as the step label or eyebrow. Every source that uses mono at all (Anthropic, and this project's own LOOK.md rule) reserves it for literal data or names, never a decorative tag.
- A second sentence at the primary layer. If a step needs two ideas, that is a sign the verb was chosen wrong, not a sign the sentence needs a comma and a conjunction.
- Full-bleed photography used to illustrate a step rather than to be the hero. Apple never does this; it costs the 55%-bone floor on this project specifically.
- Scrubbing a section that has no single visual worth scrubbing. A three-row, one-photo beat like this one is a discrete-reveal case, not a pinned-scrub case; reserve scrub for beats with a real transforming visual (the Helix, the film).
- Animating the reduced-motion path instead of setting it static. A faster or shorter tween is still a tween; the accessible state is the end state with zero transform.

## Sources consulted

- linear.app/method (step anatomy, decimal numbering, hairline rail, expandable body)
- apple.com/airpods-pro (highlights list anatomy, alternating text/image rows, column vs full-bleed image use)
- stripe.com/connect, stripe.com/billing, stripe.com/radar (horizontal node-and-line diagram convention)
- anthropic.com/research/tracing-thoughts-language-model (image-order sequencing, caption convention, sparse mono use)
- openai.com/index/instruction-following (three-step icon-and-arrow pipeline diagram convention)
- madewithgsap.com and the GSAP ScrollTrigger forum/docs (gsap.com/community) (pinned counter, progress indicator, scrub vs discrete-reveal conventions)
- css-tricks.com "Let's Make One of Those Fancy Scrolling Animations Used on Apple Product Pages" and gsapvault.com scroll-image-sequence-tutorial (frame-sequence scrub mechanics)
- This project's own research/LOOK.md and research/CONCEPTS.md (token names, space scale, the 55%-bone constraint, the existing beat 4 aerial decision)
