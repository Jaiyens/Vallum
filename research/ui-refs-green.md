# UI Refs: Deep Green + Cream Surfaces, Statistic Set-Pieces

Skeleton patterns only. Client context: bone #F2EEE5, forest #16281D, serif display, statistics with citations that must read grave not decorative.

## Sources scouted

Aesop (aesop.com, Work & Co case study, Awwwards "Taxonomy of Design" entry), Klim Type Foundry (klim.co.nz), Sotheby's (sothebys.com, Pentagram 2014 redesign via Fast Company / Fonts In Use), Rolex (rolex.com, newsroom.rolex.com, brand documentation), House of Honey by Réplica / Edoardo Lunardi (houseofhoney.com, Awwwards Site of the Day), Heritage Saunas by skyrocket (heritagesaunas.co.nz, Awwwards nominee, luxury collection), Best of the Bone (Awwwards nominee, secondary green data point). Note: aesop.com and rolex.com blocked live fetch (403 bot protection); those two entries are built from cached case-study documentation and are flagged inline as such, not observed live.

## 1. Cream-to-dark-green page rhythm

- **House of Honey**: alternates cream (#FFF8EF) and deep forest (#003933) section by section, not as one hero-to-body gradient.
  - Cream sections carry the imagery-heavy project grid (six project cards).
  - Dark-green sections are reserved for typography and navigation anchors: studio intro, editorial tease, footer CTA.
  - Working rule extracted: dark = voice/authority beat, cream = display/browse beat. Never stack two dark bands back to back.
- **Heritage Saunas**: hard cut between text sections, bridged by a decorative device instead of a background gradient.
  - The device is a hairline rule that itself fades from forest green to transparent, positioned above and below a section boundary. The color fields stay flat; only the rule gradients.
  - Second bridge type: a full-bleed photograph (timber, landscape) placed between a cream text block and the next section, so the color-field seam is absorbed into the image rather than exposed as a flat edge.
  - Product-sizing figures are cited directly next to the object they describe (a plan dimension beside its diagram), never abstracted into a stat block. Useful negative case: this is the "don't" for how NOT to present a client statistic (too embedded, no citation register).
- **Sotheby's** (Pentagram 2014 redesign): the bridging device is a solid horizontal bar used to organize the grid and set off headlines between full-bleed photography blocks.
  - Apply the same logic with forest #16281D standing in for the bar color: a bar-height dark band, sized to the headline it carries, not to the viewport, becomes the seam between two cream regions.
  - Homepage also runs full-bleed dramatic photography for auction/editorial highlights, cropped tight (macro-to-micro framing) so the image itself does the work a caption would otherwise do.
- **Band height logic**: dark bands are content-driven, not viewport-driven.
  - Value/authority statement or a stat set-piece: keep the band under one viewport height so it reads as punctuation, not a new page.
  - Full narrative moment (Aesop's formulation/ingredient storytelling, per Work & Co case study): let the band run 1 to 1.5x viewport height, since video or process content justifies the dwell time.
- **Aesop** (per Work & Co case study + Awwwards "Taxonomy of Design" entry; aesop.com itself blocked live): dark/black moments are deployed exactly where the brand wants a register shift, product formulation, ingredient origin story, never on generic marketing copy.
  - Transition into the dark moment is a hard cut, no gradient, but the moment is always framed by one desaturated product or process photograph occupying the full band, so the eye reads "different room," not "CSS changed."
  - The Taxonomy of Design microsite pairs black/white with a single warm gold accent (#ECD06F) rather than a second dark tone, confirming the one-accent discipline described in section 2.
- **Rule for this client**: reserve forest #16281D bands for (a) the statistic set-piece, (b) one long-form brand-voice/authority passage, (c) footer.
  - Do not copy House of Honey's every-other-section alternation; that cadence suits a portfolio-paced page, not a citation-driven editorial one where dark bands need to feel rare and earned.
  - Bridge every cream-to-forest seam with either a hairline gradient-fade rule (Heritage Saunas) or a full-bleed image (Aesop, Sotheby's). Never let two flat color fields meet at a hard, undecorated edge on both sides.

## 2. Keeping dark green expensive, not murky

- **Tonal contrast values**: House of Honey's forest (#003933) sits far enough from true black that cream text reads soft rather than high-vis; Best of the Bone's forest (#123A0A, near-black) is only ever paired with a lime accent (#C5FF54), never directly with cream, because near-black green against warm cream with no bridging light tone produces a murky midtone band.
  - Lesson for #16281D: if it renders closer to near-black on screen, do not set body copy in mid-gray on it. Jump straight from bone #F2EEE5 to a warm off-white ink on green, never pure white, never cool gray, to avoid the murky read.
- **Flatness over gradient**: every scouted dark-green surface is a flat, single-value color field. None use a vignette or radial darkening.
  - Depth comes from one soft image or one hairline rule, not a gradient wash. A vignette reads as a Photoshop trend layer in this bracket; a flat field with one restrained light source (a product photo, a single hairline) reads considered and intentional.
- **Hairline colors on green**: Heritage Saunas renders divider hairlines as a lightened, warmed step of the same green family (a green-to-gold fade), never as white or gray at low opacity.
  - Rule: hairlines on forest #16281D should be a tint step of the brand green itself or a muted gold, never a flat white rule at reduced opacity, which reads like an unstyled UI-kit default.
- **Serif display treatment on green**: Sotheby's system (Pentagram, Mercury as primary serif) runs the same display face on both dark and light grounds and earns contrast from scale and letterspacing, not color tricks.
  - Rolex pairs its green brand field exclusively with a confident serif wordmark (Adobe Garamond-derived logotype since the 2002 identity redesign, per brand documentation) plus gold, never a competing sans on the same field.
  - Build rule: on the forest band, run the serif display face at true display size (not a shrunk body serif), track it slightly open for headline-weight lines, and pair the field with exactly one ink accent (this client: bone) so the green band never carries more than field-plus-one-ink.
- **Texture**: none of the scouted sites add grain or noise to the green field itself. Where "texture" exists it is structural, the hairline rule or a single desaturated photograph, never a noise overlay. Skip film-grain treatments; they sit on top of the color rather than inside it.

## 3. Statistic set-piece anatomy

Cross-referenced from Klim's evidence-based proof pattern, Sotheby's estimate-figure presentation, and general annual-report/editorial convention for citation-grade numerals.

- **Numeral scale**: set the number at display scale, 6 to 12x the surrounding body copy, larger than any headline on the same page. It is the single largest character on its band.
  - Use tabular/lining figures, not proportional or oldstyle, so multi-digit numbers don't kern unevenly, and so animated digits don't shift width mid-count.
- **Placement logic** (generalized from Klim's "Fonts in Use"): Klim never asserts a quality claim without an adjacent, real, checkable instance shown in the same visual unit (client name plus typeface pairing, side by side).
  - Apply the same discipline to a statistic: the numeral is never alone on its band. It is always paired, in one visual unit, with (a) a short qualifying line of what it measures, set in body serif, and (b) a source line.
- **Source/citation treatment**: set the citation in small, tracked-out uppercase, a wall-label or footnote register, never a hyperlink-blue caption.
  - Separate it from the numeral with a single hairline rule above it, not whitespace alone. The hairline is what converts "we said a number" into "we are citing a number," visually echoing a footnote divider.
  - Keep the citation line at body-copy size or smaller so it never competes with the numeral for primary attention, but never hide it behind a hover/tooltip; it must stay always-visible to read as grave rather than decorative.
- **Motion rule, grave not decorative**: if the number counts up, trigger once on first scroll-into-view, never again on re-entry.
  - Duration short, 800 to 1200ms, a single ease-out curve decelerating into the final value. No bounce, no overshoot, no looping, no confetti or particle flourish on completion.
  - Digits resolve to final tabular position without horizontal jitter. Prefer a restrained cross-fade/count over an odometer-roll: the odometer read skews toward a dashboard widget, which undercuts the grave register this brief asks for.
- **Band context**: give the statistic its own forest #16281D band, full-bleed, with vertical whitespace above and below the numeral at least equal to the numeral's own cap-height, so it reads as a monument, not a KPI tile.
  - This matches Sotheby's practice of giving estimate values ("$150,000 to $220,000 USD") their own isolated line within a lot card, never folded into a paragraph, and Klim's practice of surfacing aggregated word-counts as a standalone figure rather than inline in body text.

## 4. Section order reference (homepage-level, for calibrating band count)

- **Sotheby's**: nav, three rotating hero banners, "Highlights Closing Soon" grid, tabbed regional auctions (Americas/Europe/Asia), category tiles, discovery feature, new arrivals, sell/consign CTA, featured editorial stories, private sales note, newsletter footer. Dark/editorial weight concentrates in the featured-stories block and full-bleed lot photography, not across the whole page.
- **Klim**: nav, featured-collection hero, collections grid, "Fonts in Use" case-study gallery embedded mid-page (the proof beat sits before the ask, not after it), blog/editorial, newsletter, footer. No dark sections at all; the equivalent gravity device is the embedded real-world proof gallery, not a color shift.
- **Aesop** (per case study, live site blocked): nav with hover-reveal shoppable menu, hero/featured product, seasonal showcase, category browse grid, editorial/content feature (The Fabulist / The Library), footer with philosophy line. Dark/black moments live inside product-formulation storytelling, framed by one process image, not deployed as alternating background bands across the page.
- **House of Honey**: nav, cream hero, dark-green studio-intro band, cream project grid, dark-green editorial tease, cream contact CTA, dark-green footer. Confirms alternation-per-beat works for a portfolio-paced page; this client's page, fewer and heavier sections, citation-bearing, should use forest more sparingly per section 1.

## 5. Interaction and motion mechanics worth reusing

- **Aesop's hover-reveal shoppable nav** (per case study): hovering a nav category exposes actual product thumbnails inline in the nav, collapsing browse-and-preview into one interaction. Buildable as a nav pattern if the client site has a citation index or source library to preview inline, not as decoration.
- **Klim's live type-testing tool**: on a typeface page, users can change alignment, columns, line-height, and OpenType features live against real specimen text. Generalizable mechanic: let a reader manipulate the thing being claimed, not just read a claim about it. For a stat-heavy site, an analogous move is letting a reader toggle the time range or unit on the same numeral rather than serving a static figure.
- **Sotheby's tabbed regional filter**: switches the auction grid by geography with no page reload, preserving scroll position and section context. Reusable for filtering statistics or citations by category/date without breaking the reading flow of the surrounding editorial band.
- **Heritage Saunas fade-line dividers**: implemented as a gradient background applied to a 1px (or hairline-weight) element, not as a box-shadow or blur. Cheap to build, reads expensive because it is precise.

## Build checklist for this client

1. Bone #F2EEE5 is the default canvas; forest #16281D is reserved for the statistic set-piece, one authority passage, and the footer, not a repeating alternation.
2. Bridge every seam with a hairline gradient-fade rule or a full-bleed image; never let two flat color fields touch edge to edge.
3. On forest bands: warm off-white ink (never pure white or gray), one accent ink maximum, serif display run at true display size and tracked open, no vignette, no grain.
4. Statistic block: tabular numerals at 6 to 12x body scale, a qualifying line in serif body copy, a hairline rule, a small always-visible tracked-caps source line, one ease-out count-up trigger on first view only, no looping or bounce.
5. Keep dark bands under one viewport height unless the content is a full narrative/video moment, in which case allow up to 1.5x viewport.
