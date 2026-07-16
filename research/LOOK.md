# LOOK.md

The surface spec. Every value here is final unless arbiter overrules it. Builders do not guess; if a value is missing, that is a defect in this file, not a license to invent.

The argument in one line: dark is the world as it is (beats 1 to 3), bone is the work (beats 4 to 7), forest is one full-bleed statement at beat 6 and the footer. The page turns on once and never turns back off.

## Light rhythm

Surface per beat, with heights at 1440 wide (1vh here means 1% of a 900px viewport). Total planned page height: 1010vh, roughly 9100px.

| Beat | Content | Surface | Height 1440 | Page share | Predicted bands (of 100) |
|---|---|---|---|---|---|
| 1 the work | hero film | ink | 100vh | 9.9% | 0 to 9, dark |
| 2 what it costs | the Helix | ink | 160vh | 15.8% | 10 to 25, dark |
| 3 the turn | the daylight cut | ink resolving to bone | 120vh, 50 ink + 70 bone | 11.9% | 26 to 30 dark, 31 to 37 light |
| 4 the method | consent, kit | bone | 160vh | 15.8% | 38 to 53, light |
| 5 what ships | schema, rights, offer | bone | 240vh | 23.8% | 54 to 77, light |
| 6 why this way | workers, POPIA | forest, full bleed | 110vh | 10.9% | 78 to 88, dark |
| 7 wordmark | | bone | 90vh | 8.9% | 89 to 97, light |
| footer | legal line | forest | 30vh | 3.0% | 98 to 99, dark |

Why: beats 1 and 2 are allowed to be dark and they carry the film and the Helix, the two media-heavy moments. Beat 3 is where ink dies; the cut boundary sits at 42% of the beat's height so the static full-page render samples it correctly. Beat 6 is the only dark below the fold and it is forest, not ink, because by then the darkness belongs to the company's answer, not the world's problem.

### Gate arithmetic

Gate: bands 35 to 99 allow at most 20 dark (<60 greyscale); whole page needs at least 45 light (>140). Ink samples at about 11 greyscale, forest at about 35 (both dark). Bone samples at about 237 (light).

- Last dark band of the top act: band 30. The unconstrained zone ends at band 34. Margin: 4 bands, about 40vh. Hard stop for narrator and cartographer: if the dark act grows, the cut boundary must still land at or before band 33.
- Dark bands in the lower 65: forest beat 6 gives 11, footer gives 2 to 3. Nominal 13 to 14. Worst case with image-heavy bands in beat 4 dipping under 60: 16. Budget is 20. Headroom: at least 4 bands.
- Light bands total: 7 (beat 3 bone) + 16 (beat 4) + 24 (beat 5) + 9 (beat 7) = 56 nominal. Worst case, imagery pulls up to 8 bone bands below 140: 48. Floor is 45. Headroom: 3 worst case, 11 nominal.

Imagery rule that protects the arithmetic: within beats 4 to 7, any full-width horizontal slice of the page keeps at least 55% of its width as bare bone. No full-bleed photography below the cut. Photos on bone sit in columns, not bleeds.

At 375 the beats stack in the same order with the same surfaces. Proportions shift slightly longer in beats 4 and 5 (text wraps); that only adds light bands, so the mobile profile passes with more headroom, not less.

## Tokens

Four tokens. The set is locked by BRIEF.md and nothing is added.

| Token | Hex | One job |
|---|---|---|
| `bone` | `#F2EEE5` | Dominant surface. Page background default, beats 4 to 7. Text color on ink and forest |
| `ink` | `#0C0B09` | Surface for beats 1 to 3 only. Body text on bone |
| `forest` | `#16281D` | Surface of beat 6 and the footer. Display type color on bone. Never a background anywhere else |
| `forest-line` | `#2C4436` | Hairlines, rules, borders, focus rings on bone, the Helix caret. Never fills, never text |

Derived alpha values, not new tokens. These are the only permitted transparencies:

- `ink` at 62%: `rgba(12,11,9,0.62)`. Secondary text on bone (captions, citations).
- `bone` at 72%: `rgba(242,238,229,0.72)`. Secondary text on ink and forest.
- `bone` at 24%: `rgba(242,238,229,0.24)`. Hairlines on ink and forest.
- `ink` at 35%: `rgba(12,11,9,0.35)`. The glass tint. See Materials. Used nowhere else.

Housekeeping that follows from the tokens: `<html>` background is `bone`, `themeColor` is `#F2EEE5`, `colorScheme` is `light`. The page is a light page with a dark opening, and the browser chrome should say so. Focus rings: 2px solid `forest-line` with 2px offset on bone; 2px solid `bone` with 2px offset on ink and forest.

## Type scale

Three families, all free, all via next/font/google:

- Display: **Newsreader**, variable, with the `opsz` axis. Transitional serif with real display cuts. Weights used: 400 and 500 only.
- Body and UI: **Inter**, already loaded. Weights used: 400 and 500 only.
- Data: **JetBrains Mono**, already loaded. Weight 400 only. Lowercase only. Never letter-spaced, never a label, never an eyebrow.

Archivo is removed from layout.tsx. The wordmark is reset in Newsreader (see below).

Six steps. Nothing renders at a size outside this table.

| Step | Face, weight | 1440 | 768 | 375 | Line height | Tracking |
|---|---|---|---|---|---|---|
| display-1 | Newsreader 400 | 92px | 64px | 44px | 1.02 | -0.015em |
| display-2 | Newsreader 400 | 56px | 44px | 32px | 1.08 | -0.01em |
| heading | Newsreader 500 | 26px | 24px | 22px | 1.3 | 0 |
| body | Inter 400 | 17px | 17px | 16px | 1.65 | 0 |
| small | Inter 400 | 14px | 14px | 14px | 1.5 | 0.01em |
| data | JetBrains Mono 400 | 13px | 13px | 12px | 1.7 | 0 |

Which step each beat's display line uses:

- Beat 1 hero line: display-1, `bone` on film.
- Beat 2 Helix centerpiece (the typed text): display-2, `bone`, on the glass band. Typed in Newsreader, not mono; the block caret carries the typewriter grammar (see Motion).
- Beat 3 the turn line: display-1, rendered across the cut boundary, `bone` above the edge and `forest` below it.
- Beat 4 and beat 5 section lines: display-2, `forest` on bone.
- Beat 6 line: display-1, `bone` on forest.
- Beat 7 wordmark: VALLUM in Newsreader 500, all caps, letter-spacing 0.32em, sized `clamp(64px, 11vw, 160px)`, `forest` on bone.

Body text on bone is `ink` at 100%; citations and sources are the data step in `ink` at 62%. Body on ink or forest is `bone` at 100%, secondary at 72%. Body column measure: max 640px. Display lines: max 1040px. Links: Inter 500, underline 1px, underline offset 3px. Buttons: Inter 500 at the small step, `ink` text.

## Space scale

Five values: **8, 24, 64, 128, 192**. Every margin, padding, and gap on the page is one of these. Nothing between.

- Section vertical padding: 192px at 1440, 128px at 768, 64px at 375.
- Page gutters: 64px at 1440, 64px at 768, 24px at 375.
- Display line to its body block: 64px.
- Paragraph to paragraph: 24px.
- Caption or citation to the thing it cites: 8px.
- Schema and provenance rows: 24px vertical padding per row.
- The glass band's internal padding: 24px top and bottom.

Space is the flex. When a section feels empty at 1440, it is correct. Builders do not fill it.

## Materials

Paper, ink, glass. Nothing else.

### Glass

Glass is optical, not glassmorphism. It appears only where live media is genuinely behind it, because backdrop-filter over a flat background renders as a faint grey rectangle with no depth (scout-glass confirmed none of Apple, Igloo, or Family ship the frosted-card pattern, and the failure mode is exactly blur over plain background). Therefore: **glass never appears over bone, ever.** Two recipes, no third.

Recipe A, the Helix centerpiece band:
- A horizontal band spanning the full canvas width, height = typed text block + 24px padding top and bottom. It is a stripe of the composition, not a card.
- `backdrop-filter: blur(24px) saturate(50%)`
- `background-color: rgba(12,11,9,0.35)` (the ink-35 tint; part of the glass, not a box)
- `border: none; border-radius: 0; box-shadow: none`
- Panels still pass in front of it; occlusion is preserved.
- Acceptance: bone text on this band measures at least 4.5:1 contrast on extracted frames at every 30 degrees of ring rotation, 12 samples minimum.

Recipe B, the Helix focus state:
- The whole scene canvas takes `filter: blur(14px) saturate(35%)`. The entire background, not a region.
- The focused panel resolves forward unblurred; its detail text (industry at heading step, statistic at body step, citation at data step) sits on a Recipe A band.

### Rules

- Hairlines are 1px solid, `forest-line` on bone, bone-24 on ink and forest.
- Where: a full-width rule at the top of beats 4 and 5 content columns, between schema and provenance rows, above the footer line. Rules separate; they never enclose. No element is boxed on all four sides except buttons.
- Buttons: 1px `forest-line` border, radius 0, padding 8px 24px, bone fill, `ink` text.

### Banned

- `box-shadow`, any value, anywhere
- CSS gradients, any kind, anywhere, including legibility scrims over media. Legibility comes from film grade and glass, never from an overlay ramp
- `border-radius` above 0. The radius on this site is 0
- `text-shadow`, glow, bloom, `drop-shadow` filters
- backdrop-filter over any static surface
- Semi-transparent white borders (the glassmorphism tell)
- Duotone or color overlays on photography

## Motion

Motion is narrative or it does not exist. One entrance pattern, two set pieces, and stillness everywhere else.

| What moves | How | Duration | Easing | Reduced motion |
|---|---|---|---|---|
| Hero film | autoplay loop, muted | n/a | n/a | static poster frame, no autoplay |
| Hero line wipe | existing reveal, keep | 900ms | cubic-bezier(0.2, 0, 0, 1) | line renders visible, no wipe |
| Helix orbit | damped orbit both axes, dampingFactor 0.05, polar clamp 0.15pi to 0.85pi, pan off, zoom off | continuous | damping | no orbit, static readable arrangement, click still opens detail |
| Helix auto-rotate | 0.3 rad/s idle, pointer takes over, resume after 4s idle | continuous | linear | off |
| Helix focus | canvas to Recipe B blur, panel resolves forward | 500ms | cubic-bezier(0.2, 0, 0, 1) | instant swap, no transition |
| Typing (Helix centerpiece) | keystrokes 55 to 95ms jittered, 320ms pause after punctuation, backspace 28ms per char, block caret 0.5em wide, `forest-line`, blink 1.06s steps | per grammar | n/a | full line rendered at once, caret static |
| The daylight cut (beat 3) | scroll-scrubbed: bone field rises from the section's bottom edge with a hard 90 degree edge, boundary position mapped linearly to scroll progress through the section, no pin required, in-flow boundary rests at 42% of section height | scrub, no duration | linear scrub | no scrub; two static blocks, ink then bone, hard edge between, same copy |
| Section entrances (bone beats) | 12px translateY + fade, once, at 80% viewport; max 3 staggered siblings at 80ms | 600ms | cubic-bezier(0.2, 0, 0, 1) | content renders visible |
| Link and button hover | color and underline only, no movement | 150ms | ease-out | same, hover is not motion |

What never moves: hairlines, the schema and provenance tables, the wordmark, the footer, any text once revealed. Nothing pulses, breathes, shimmers, or floats. No hover scale on images or panels. No parallax on bone.

Touch rule for the Helix at 375: single finger orbits inside the canvas, vertical page scroll is never eaten outside it, and a two-finger or edge scroll always escapes. Test at 375 before calling it done.

## The signature

**The daylight cut.** The single scroll moment in beat 3 where the page turns on: a bone field rises under the reader with a hard edge, and the turn line's own glyphs flip at the boundary, bone above it, forest below it. No gradient, no fade, no dissolve. A knife edge, like a sheet of paper sliding over the dark.

Why this and not the Helix: the Helix is the set piece of the dark act and its spec is already fixed by the brief; it argues the world's case. The cut argues the company's. It is the founder's complaint answered as a mechanic, it is the thesis rendered as luminance, and it costs almost nothing to build. Every robotics data vendor can buy a 3D gallery. Nobody else's page visibly turns the lights on.

Everything else stays quiet in service of it: one entrance pattern, zero radius, zero shadows, four colors, six type steps, five spaces. The page whispers so the cut can speak once.

## Decisions made

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
