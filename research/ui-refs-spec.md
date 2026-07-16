# UI Reference Scout: Spec / "What You Get" Sections as Designed UI

Sources checked live: stripe.com/payments/features, docs.stripe.com/api (product-feature, customers/object), stripe.com/pricing, linear.app/features, linear.app/method, linear.app/pricing, raycast.com/changelog, vercel.com/changelog, gettyimages.com/faq/licensing, rivian.com (Awwwards SOTD, rivian-automotive), plus Apple tech-specs pages and Linear's kbd shortcut convention as established industry reference points.

## 1. Anatomy of a spec item, site by site

**Stripe docs (docs.stripe.com/api/customers/object)**
- Icon: none.
- Label: mono field name in backticks (`address`), no background chip around it.
- Value/type: parenthetical sans-serif modifier right after the label (`object, nullable`, `expandable`).
- Rule: none between rows, whitespace alone separates them; nested fields (`address.city`) add one indent level per depth instead of a rule.
- Extra: enum values drop into a sub-list headed "Possible enum values." Page-level, it's a two-pane layout, prose/fields left, sticky JSON/code sample right; scrolling the left pane auto-highlights and scrolls the matching key in the right pane (Stripe's docs scrollspy, the same synced-highlight mechanic used by Twilio/Plaid docs).

**Stripe marketing (stripe.com/payments/features, stripe.com/pricing)**
- Icon: none, no cards either.
- Label: subheading (feature name) + one-line description + "Learn more" link, grouped under H2 category headers (Accept, Process, Settle, Manage).
- Value: bold mono-set numerals for fee percentages (2.9% + 30c) sit inline inside a sentence, not in their own column.
- Rule: thin hairline between feature blocks, no grid, no card border.
- Density move: long enumerations (135+ currencies, country lists) collapse to one linked count rather than listing every item flat, the flat list itself is what's hidden behind the click.

**Linear features (linear.app/features)**
- Icon: yes, top of card.
- Label: bold short heading directly under the icon.
- Value: one-sentence description under the label.
- Rule: none, uniform card silhouette repeated edge to edge instead, so the grid reads as one system, not a set of individually designed cards. Vertical rhythm between icon/label/description stays identical across every card.

**Linear method (linear.app/method)**
- Icon: none.
- Label: numeral prefix carries the structure, 1, 2, 3 at top level, 2.1, 2.2, 3.1, 3.2 for sub-items, each numbered entry is a short label + link.
- Value: none, this set is conceptual not data-bearing.
- Rule: none, no container at all; the number is the only grouping device. This is the "numbered plate" pattern applied to non-physical specs.

**Linear pricing table (linear.app/pricing)**
- Icon: none.
- Label: feature name in a comparison grid, organized by category (Core, AI/agents, Integrations, Security), plan cards above it show "All [tier] features +" incremental lists.
- Value/status: carried entirely by small text chips, "Beta," "Add-on," rather than icons or color.
- Rule: grid lines implied by category grouping; a linked "View docs" appears wherever a chip needs more explanation than the chip itself can carry, again hiding detail behind a click.

**Raycast changelog (raycast.com/changelog)**
- Icon: a single emoji per category (feature, improvement, experimental, fix) substitutes for iconography, an inexpensive way to add scan-lanes to a plain list.
- Label: version number as a large display heading, date in muted gray beside it.
- Value: 2-8 bullet items per category, tight spacing inside a category.
- Rule: none between bullets; instead a full-width screenshot resets the page rhythm after major entries, and a large gap separates version blocks.

**Vercel changelog (vercel.com/changelog)**
- Icon: two small circular contributor avatars beneath the title, standing in for authorship rather than category.
- Label: bold date stamp (day + month) in its own left column, title to its right.
- Value: none beyond the title itself, detail lives on the linked page.
- Rule: hairline between individual entries (not between date groups); whole row is one clickable hit target; "Show more" click-to-load at the bottom instead of full history on page load.

**Getty Images licensing (gettyimages.com/faq/licensing), anti-pattern worth citing directly**
- Icon/chip/table: none of the above. Three license tiers (RF, RM, RR) are explained in prose paragraphs under H2/H3 headers only.
- The tier comparison a buyer actually needs (what's included, what's restricted) is never assembled into a scannable ledger, it has to be read start to finish.
- Cite this as the failure mode to avoid: rights/tier data with zero visual structure forces linear reading of what should be a glanceable grid.

**Rivian (rivian.com, Awwwards Site of the Day, awwwards.com/sites/rivian-automotive)**
- Icon: none, the anchor point on the product photo does the icon's job.
- Label: small caps/mono label under each numeral, or a margin label at the end of a leader line for physical dimensions.
- Value: large numeral (range, 0-60, payload) as the dominant visual weight, terse tiles run in a horizontally-scrollable strip over full-bleed photography.
- Rule: hairline or none between tiles, dark ground; physical specs (bed length, towing points) get dotted/thin leader lines from a point on the vehicle photo out to the margin label instead of a rule, converting a field list into a callout diagram. Jury scored it high on creativity/usability for this restrained, image-first spec presentation over a conventional table.

## 2. How 8-ish item lists get grouped (four visual strategies observed)

- **Chips/tags**: Linear pricing ("Beta," "Add-on") and Stripe payment-method enumerations. Best when items are optional/status flags rather than parallel peers, low visual weight, sits inline with other type.
- **Two-column ledger (label left, value right, hairline between rows)**: the Apple tech-specs convention, also implicit in Stripe's field-list (name left, description right conceptually). Best for 6-10 parallel fields of the same kind (name/type/value), reads top to bottom in one pass, no card chrome needed, the hairline alone does the separating work.
- **Numbered plates**: Linear Method's 1 / 2.1 / 2.2 scheme. Best when order or hierarchy matters (schema fields that build on each other, a consent stack that is sequential/escalating), the number carries both position and grouping.
- **Annotated diagram with callout lines**: Rivian's dimension diagrams. Best when the spec items are physically/spatially anchored to a subject (a frame, a device, an image) rather than abstract, converts a flat field list into a labeled illustration, forces restraint since only fields with a real anchor point qualify.

## 3. Schema/field list to diagram mechanics

- Anchor points on the image/frame get a small mark (dot, tick, or numeral in a thin circle), a thin rule (1px, often dotted for a "measurement" feel) runs from the mark out to open margin space where the mono label and value sit clear of the image (Rivian).
- Synced highlight: scrolling a left-hand prose/field list highlights and auto-scrolls the matching key/anchor in a fixed right-hand panel (Stripe API docs scrollspy). Applies directly to an 8-field annotation schema: field list on one side, annotated frame mockup pinned on the other, active field lights up its callout as you scroll.
- Long/optional detail collapses behind a link or a single aggregated count rather than being printed flat (Stripe's "full list of 135+ currencies," Linear's "View docs" beside Add-on chips). Use for schema metadata that's real but secondary (allowed value ranges, validation rules).

## 4. Hover / scroll reveal patterns

- Stripe docs: hover/scroll-position, not click, drives the code-panel highlight, passive reveal tied to reading position rather than an explicit interaction.
- Raycast: scroll-triggered full-width image breaks reset density every few categories, a rhythm device more than a reveal.
- Vercel: whole changelog row is one hit target (hover state on the full row, not just the title) despite the row containing three separate visual elements (date, title, avatars).
- Linear features grid: identical card silhouettes imply hover would be a uniform lift/border-brighten across all cards, not per-card bespoke treatment, keep hover feedback systemic, not decorative.

## 5. Information-density tricks (flat vs hidden)

- Show flat: the 5-8 fields that are the actual point of the section (Apple's core spec ledger, Rivian's headline numerals, Linear's per-card label+description).
- Hide behind interaction: anything that would be the 9th+ item, edge-case enum values, legal/restriction detail, integration lists (Stripe's currency count, Linear's "View docs," Getty's licensing prose that should have been collapsed rows).
- Category/emoji or numeral prefixes substitute for color-coding when the palette is restrained (Raycast's emoji lanes, Linear Method's numbering), directly usable on a bone/forest palette where you can't lean on a fifth accent color to separate groups.

## 6. Direct build notes for the client brief

- 8-field annotation schema: use the two-column ledger (label left in mono, value/description right) with a 1px hairline between rows, no card backgrounds, paired with an annotated frame mockup on bone or forest ground; leader lines from frame anchor points to margin labels per the Rivian mechanic; serif display for the section headline only, Inter for descriptions, mono strictly for field names/values/coordinates.
- 6-item consent stack: sequence it as numbered plates (Linear Method style, 01-06) rather than chips, since consent items are ordered/escalating, not parallel flags; each plate is number + short mono label + one-line Inter description, separated by hairlines not cards.
- Reserve chips only for status words (granted/revoked/pending) attached to a consent item, not for the item itself.
- Avoid the Getty failure mode: never let the 8-field schema or consent stack degrade into a paragraph, every field/consent item needs its own row and its own vertical rhythm even at maximum restraint.
