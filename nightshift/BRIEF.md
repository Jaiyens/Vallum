# BRIEF.md

Context so agents understand the business. Read this before doing anything.

**This file contains no taglines and no existing site copy, deliberately.** You are not here to rearrange sentences that already exist. You derive voice from `research/VOICE.md`, which is derived from 15 real sites. If you reach for a phrase because it sounds like something the company would say, stop. You do not know what the company says, and that is the point.

---

## The business in five lines

1. Robotics and world-model teams need first-person video of humans doing physical work. It is the input their models train on and the thing they cannot generate.
2. Almost all existing supply is indoor: kitchens, warehouses, homes, factory floors. One competitor released a million hours of it under a permissive license, so generic indoor hours are now close to worthless.
3. Nobody is collecting outdoor manual work. Vines in the rain. A roof at 40 degrees. A rig deck. The environments are hostile, access is relationship-gated, consent is legally hard. That is why the supply does not exist.
4. Vallum Labs collects that. The moat is not the camera. It is trust-based access to real operations plus a consent and provenance stack that survives a buyer's legal review.
5. The product is licensed hours. Non-exclusive by default. Exclusivity is a paid premium.

## Who reads this site

One person, roughly. Head of data or a senior research engineer at a robotics lab or a world-model team. Technical. Reads papers. Has been pitched by five data vendors this quarter and did not reply to four.

They land from a cold email, on a phone, and give it under two minutes. In that window they answer three questions:

- What exactly would I be buying, in what format?
- Is the rights story clean enough that legal will not kill it?
- Is this person going to deliver, or is this a deck?

Every page either answers one of those or it is decoration.

Second reader: a pre-seed investor. Secondary. The site does not sell to them. No raise language anywhere.

Third reader, and this one is new and it matters: **a normal person.** A worker. A farm owner deciding whether to let Jay on the property. A journalist. Someone's parent. They are not the customer and they are not why the site exists, but if they read this page and come away thinking the company is ghoulish, the company has a problem that no buyer conversion rate fixes. See "The Palantir problem" below.

## Who the competitors are

Researched in Phase 1. Orientation only:

- **Claru** is the closest. Well funded, real scale, indoor and general. Their site is good.
- **Build AI** released Egocentric-1M free. They commoditized the generic tier.
- **XDOF** raised $70M, 20 frontier-lab customers, generic collection tier.
- **Encord** is an intermediary, and also a channel.
- **Scale AI** does everything and specializes in nothing here.

Every one is indoor-first. That gap is the entire position. The site makes the gap obvious without naming a competitor.

## What is actually true right now

Zero hours captured. Zero sites signed. Zero buyers. One person, in Cape Town as of today, with six phones in a suitcase.

Read `FACTS.md` before writing any claim. Binding, not negotiable.

## Where the site is now

Next.js App Router, TypeScript, Tailwind, shadcn/ui, GSAP ScrollTrigger, Lenis, react-three-fiber. Work happens on the `hero-rebuild` lineage. Assets route through `lib/assets.ts` so file swaps need no code changes.

Roughly six beats exist: hero film with a cursor lens and a line-wipe, the Helix problem section, a dataset annotation section, a rig explode sequence, a founder letter, a wordmark footer. It is thin and the middle does not hold together.

---

## The narrative problem, which is the real problem

The current sequence reads, honestly, like this: these workers should not be doing these jobs, then a claim about not building robots, then more people dying, then a camera appears from nowhere.

Those are four disconnected beats. A visitor cannot tell you what the argument is. `narrator` owns fixing this and owns `research/STORY.md`.

**Seeded spine. `narrator` may refine it against research but may not discard it without writing the reason in `DECISIONS.md`.**

| Beat | What it does | Surface |
|---|---|---|
| 1. The work | Establish the world. Outdoor manual work, real, dangerous. No claim, just fact and image | Ink |
| 2. What it costs | The Helix. Verified fatality rates by industry, attributed. **Last dark beat** | Ink |
| 3. The turn | Machines are coming for this work. They learn it by watching humans. The watching has been done in kitchens and warehouses. There is no footage of the work outside | Ink resolving to bone |
| 4. The method | So someone has to go and film it. Consent first, camera second | Bone |
| 5. What ships | The dataset. Schema, format, rights, provenance, the offer | Bone |
| 6. Why it is done this way | The workers are the source and they are not the subject. Consent, payment, blur, POPIA | Forest, full bleed |
| 7. Wordmark | | Bone |

Beat 3 is load-bearing. It is where the negation dies and where the camera stops being random. Beat 6 is where you leave the reader, and you leave them in light.

## The no-negation rule

**Never state what the company is not.**

"We are not building the robots, we train them" is dead. Do not write it, do not paraphrase it, do not gesture at it. Naming the thing you are not doing plants the question of why you are not doing it, and invites the reader to answer it themselves, badly.

The replacement is not a better negation. It is beat 5. Describe the dataset with enough specificity that no reader could think this is a robotics company, because a robotics company would not talk like this. Schema fields, consent chain, export format, licensing terms. Depth does the work that denial was trying to do, and does it better.

This generalizes. Any sentence of the form "we are not X" or "unlike X" or "this is not a Y" is a P1 finding. Research how other companies establish position without contrast to a named other. That is a Phase 1 question, not a matter of taste.

## The Palantir problem

Vallum Labs films people doing work that sometimes kills them. There is a version of this site that reads as a company harvesting death for profit, and it is not far away. One current line, roughly "we record where people get killed," is already there.

Palantir is the cautionary case. Technically respected, commercially successful, and a name a lot of people flinch at. The flinch has design causes: darkness as default, the aesthetics of surveillance, and a tone that treats human subjects as inputs.

The tone target: **the fatality numbers are the reason for the company, not the marketing.** State them once, cited, at their real size, and do not linger. A number said once lands. A number said with relish is a tell.

Rules:
- Workers are the source of the data and are never the spectacle. They are not "subjects," "assets," "coverage," or "supply"
- Never a verb where the company is the actor and a death is the object. "We record where people get killed" fails this. The work is dangerous. The company films the work. Those are two sentences and neither one needs a body in it
- The fatality statistic appears at most twice on the whole site, cited, sourced, unornamented
- The reason a robot should do this job is the person who currently does it. That is the whole ethos and it is genuinely true, so say it plainly and stop
- `critic-civilian` owns this check and its P0s are real P0s

## The public benefit question, and a hard line

Jay wants the site to carry a public-benefit ethos. Correct instinct, and it is the most defensible thing about the company.

**Ship the ethos. Never the label.**

Vallum Labs Inc. is a Delaware C-corp. It is not a Delaware public benefit corporation. "Public benefit corporation," "PBC," "B-Corp," and "certified benefit" are legal statuses with filings behind them, and Delaware incorporation records are public. Any buyer's counsel pulls the certificate. Any investor doing diligence pulls the certificate. Writing the label is a false statement to a counterparty, and it is checkable in about ninety seconds.

The ethos needs no label. It is already in `FACTS.md` and all of it is real: written consent in three languages, face blur before export, POPIA Section 57 compliance, per-clip provenance, site-owner authorization, participants paid. That stack is a stronger claim than the badge, because the badge is an intention and the stack is a procedure.

`warden` blocks the label in every form. This is not appealable.

---

## Visual direction

A constraint, not a suggestion. Deviate and the gate fails.

### The light problem, which is the top complaint

The site is dark everywhere and it reads as a company doing something grim. The dark start is correct. The dark middle and dark end are the bug.

**Dark is an argument, not a default.** It is the world as it is. When the company enters the story, the page turns light and stays light. That is not decoration, that is the thesis rendered as luminance: the darkness is the problem, the light is the work.

Measured, and gated by `verify.sh` against `artifacts/luminance.json`:

- Top 35% of page height: unconstrained. Hero and Helix live here and are allowed to be dark
- Bottom 65%: at most 20 of 65 luminance bands may read dark. That is roughly one full-bleed forest section and nothing else
- Whole page: at least 45 of 100 bands must read light

This is deterministic. It is not a critic's opinion and you do not argue with it.

### Palette

| Token | Hex | Role |
|---|---|---|
| `bone` | `#F2EEE5` | **Dominant surface.** Most of the site is this. Beats 4 through 7 |
| `ink` | `#0C0B09` | Warm near-black. Beats 1 through 3 only. Body text on bone |
| `forest` | `#16281D` | Matte dark forest. One full-bleed section at beat 6, the footer, and as ink for display type on bone |
| `forest-line` | `#2C4436` | Hairlines, rules, borders, focus rings on bone |

**Green is matte and it is deep.** Forest, not emerald. `#16281D`, not `#2ECC71`. It has no shine, no glow, no gradient, no bloom. It never lights anything. If green is what makes the page interesting, the page is not interesting.

**The generated-design trap, read twice.** Near-black plus one bright accent green is one of three looks AI-produced design currently defaults to, regardless of subject. The audience for this site reads a lot of generated pages. Low-chroma structural green sitting near its background is the whole distance between this palette and that cliche.

**Amber, orange, and yellow are dead.** `#E8940C` was the old accent and is banned everywhere: components, styles, film grading, renders, the Helix caret, everything. `verify.sh` greps and exits 1.

### The register: old money

Jay's words: modern, strong, smart, sophisticated, old money. That is a real and specific thing, not a vibe. It decomposes:

- **Space is the flex.** Only people who need to sell fill the page. Generous margins are a status claim and they are free
- **Restraint over decoration.** Every element earns its place or leaves
- **Materials, not effects.** Paper, ink, glass, stone. Not gradients, not glows, not neon, not shadows pretending to be depth
- **Rules, not cards.** A hairline separates things. A rounded card with a drop shadow is a dashboard, and this is not a dashboard
- **Nothing pulses.** No breathing buttons, no shimmer, no attention-seeking motion. Motion is either narrative or it does not exist
- **Muted and desaturated.** No pure black, no pure white. Bone and ink, both warm, both already correct
- **Type has history.** A transitional or old-style serif for display, a plain grotesk for body and UI. Avoid Playfair Display, which is the template serif. Avoid Inter as a display face, which is the generated-design giveaway. Inter for body is fine. Free faces that carry the right weight: Newsreader, Source Serif 4, EB Garamond, Instrument Serif, Libre Caslon
- **Confidence is quiet.** No status pills, no "beta" badges, no mono-caps eyebrows announcing what a section is. See below

### The status badge ban

Mono-caps labels like `CONCEPT · IN DEVELOPMENT` are cut. Jay is right that they read as machine-made, because they are: generated designs reach for the status pill constantly, and it is one of the most reliable tells there is.

**But the honesty they were carrying does not get cut with them.** The rig does not physically exist. A render of hardware that does not exist, presented without qualification, is a product claim and it is false. Technical buyers pattern-match unqualified renders of nonexistent hardware to vaporware instantly, and it is worse for this company than any other because the entire pitch is provenance.

So: the badge dies, the truth moves into prose. One plain sentence in the copy, in the voice of the page, saying what the rig is and what is actually being used today. The real answer is disarming and it is a better story than the badge was: the capture kit today is refurbished iPhones on head straps, carried in a suitcase. That is not an embarrassment to be labeled around. It is the most credible sentence available, and it is true.

`warden` requires the honest sentence wherever the badge is removed.

### Glass, done correctly

Jay wants see-through glass. There are two things called that and only one is right.

**Wrong:** glassmorphism. A frosted rectangle with a white border and a soft shadow floating on a gradient. A 2021 trend, and the opposite of old money.

**Right:** glass as an optical property. The thing behind is genuinely behind, and you see it through the thing in front, refracted and blurred. Depth is real, not implied. Apple's material work is the reference and `scout-glass` studies it.

Concretely: `backdrop-filter` doing actual work over live media, with no visible border, no shadow, and a container shape that belongs to the composition rather than sitting on top of it as a card.

This matters beyond taste, because glass is also the fix for a real bug. See the Helix spec.

---

## The Helix

The Helix is beat 2. Panels of dangerous industries orbiting a typewriter centerpiece, drag to spin, each panel a video paired with one verified, cited fatality statistic. Panels pass in front of and behind the text, and the occlusion is the point. The centerpiece text counter-rotates by the ring's exact negative rotation each frame, so it always faces the viewer while depth sorting stays correct.

Jay likes it and it is close. `build-hero` owns it. Five defects, in priority order.

### 1. The centerpiece text is unreadable. P0.

The text sits over spinning video panels. Background luminance changes every frame. No fixed text color can survive that, which is why it is invisible.

**Do not fix this with a black box behind the text.** That is the ugly answer and it kills the occlusion, which is the best thing in the section.

Fix it with glass, which is the same mechanism as defect 4 and the same thing Jay already asked for aesthetically. A shaped `backdrop-filter` region riding the text block, blurring and desaturating whatever passes behind it, with no border and no shadow. Panels still occlude. Text stays legible against every frame. Three requirements collapse into one implementation.

Verify by extracting frames at multiple rotation angles and measuring contrast at each. Not by looking once at rest. `critic-eyes` owns the check and it failed to catch this, which is why its mandate is now explicit.

### 2. It is trapped in a box. P1.

Full bleed. The canvas spans the viewport. A 3D world inside a bordered rectangle reads as an embed, and an embed reads as a widget somebody installed.

### 3. It only spins on one axis. P1.

Currently azimuth only. Unlock polar. Full orbit.

- Damped orbit on both axes, `enableDamping`, damping factor around `0.05`
- Polar range roughly `0.15π` to `0.85π`. Unlocked, but not so far that the rings go edge-on and vanish
- Pan disabled. Zoom disabled or clamped hard
- Idle auto-rotate, slow, roughly `0.3` rad/s. Pointer down takes control. Ease back to auto after about 4 seconds idle
- Touch: single finger orbits, and the section must not eat vertical page scroll on mobile. Get this wrong and the phone visitor is trapped. Test at 375

### 4. Rings, and a real focus state. P1.

Jay wants Saturn, or an atom. Rings on multiple inclinations reads as both, and it happens to mean something here: coverage, orbit, a world being circled. Use it.

Click a panel and:

- The scene canvas blurs and desaturates. The whole background, not a region. This is the "too much happening" fix and Jay asked for it directly
- Auto-rotate stops. Orbit input is released
- The panel resolves forward through glass and holds the detail: the clip, the industry, the statistic, the citation
- Escape, click-outside, and a real focus trap. Focus returns to the panel that opened it
- `prefers-reduced-motion`: no orbit, no auto-rotate, panels in a static readable arrangement, click still opens detail

Jay asked for something cooler than a modal, specifically a 3D render or the video. The video is the cooler thing and it is already there. The blur is what makes it feel expensive, because the blur is what makes it feel like the world stepped back rather than a dialog opening on top of it.

### 5. Everything types. Keep it.

The typing grammar is Jay's and he likes it. Preserve it and hold the craft bar: jittered keystroke intervals, a pause after punctuation, fast backspace, blinking block caret, pre-sized box so zero layout shift. The caret is `forest-line`, never amber.

`scout-orbit` and `scout-glass` inform this section. Read both before touching it.

---

## Copy on other websites, and where the line is

Jay's instruction: base the UI on other websites, copy the pattern, have a reason.

He is right, and more right than an earlier draft of this brief allowed. Here is the line, and it is not a matter of taste, it is roughly where the law is too.

**Copy freely, and cite the source in `DECISIONS.md`:**
- Layout, grid, section rhythm, scroll mechanics, nav behavior, reveal timing, spacing systems, interaction patterns, page architecture, how a dataset gets documented, how a rights story gets laid out

Nobody owns a scroll pattern. Every good site on the internet learned its structure from another site. This is how the craft works and refusing to do it is not integrity, it is just slower. If a competitor's dataset page answers the buyer's format question well, take the structure, cite it, move on.

**Never copy:**
- Sentences. Not their headline, not their subhead, not "the same but for us." The twenty people getting Jay's cold email have read Claru's site. Wearing their phrasing means being read as their clone by the exact audience most likely to notice
- Marks, logotypes, or brand identity
- Assets. Their images, their video, their licensed fonts, their source code. Lifting a layout idea is normal practice. Lifting their code or their assets is infringement, and it is a real risk, not a hypothetical one

Short version: **take the skeleton, never the skin.** Structure is shared craft. Voice is the only thing that is actually yours.

---

## Copy constraints (mechanical)

Hard rules. They override `VOICE.md`, which handles everything else.

- **No em dashes.** Anywhere. Copy, headings, alt text, comments. `verify.sh` greps
- Sentence case headings. Not Title Case
- No "revolutionize," "unleash," "empower," "seamless," "cutting-edge," "AI-powered," "platform," "solutions," "leverage" as a verb, "at scale" as a suffix on nothing
- No "we are not X," no "unlike X." See the no-negation rule
- No status badges, no mono-caps eyebrows announcing a section
- Active voice. A button says what happens when pressed, and the same word appears in the confirmation
- Specific beats clever, every time
- Errors do not apologize and are never vague. An empty state is an invitation, not a mood

## Autonomy

You will hit things this brief does not cover. Two rules. Which applies depends entirely on the kind of unknown.

**Design, structure, copy, IA, motion, page count, naming, everything that is a taste call: decide.** Do not ask. Do not stall. Do not leave a placeholder. Be dominant, ship it, and write one line in `DECISIONS.md` as `[agent] chose X over Y because Z`. Jay reviews the set in the morning and reverses what he wants. This is most of the site and it is the default.

**Factual claims about Vallum Labs: `FACTS.md` or nothing.** Never invent, never estimate, never round, never soften.

These do not conflict, and the way they do not conflict is the most important paragraph in this file:

**A placeholder and a fabrication are the same failure.** Both mean writing a sentence whose shape requires a fact you do not have. The fix is neither to fill the slot nor to leave it empty. The fix is to write a different sentence.

- Placeholder: "We have captured [X] hours across [Y] sites." Fails. Jay never wants to see this
- Fabrication: "We have captured 500 hours across 12 sites." Fails. Zero hours exist and this goes to people who will ask
- Correct: "Every hour is annotated to the Ego4D schema, face-blurred before export, and delivered with a signed consent chain." True today, needs no number, and it is better copy because it is specific about the thing that is actually differentiated

**No `TBD`, no `TODO`, no `[bracket]`, no `lorem`, no "coming soon," no "fill in later" reaches the rendered page. Ever.** `verify.sh` greps for them and they are a P0. The page ships finished. It just ships finished with true sentences.
