# BUILD ORDER, iteration 2

Arbiter ruling on the 29 new findings. Precedence ladder: 1 truth, 2 law/consent, 3 machine gate, 4 buyer comprehension, 5 civilian recoil, 6 narrative, 7 craft, 8 novelty.

Method note. F-0409 (Helix flat black under reduced motion, P0) is already being fixed by a dispatched agent working the `components/gallery/` tree. It is NOT re-ranked here and is not counted against tonight's two-item budget. The two ship items below were chosen to be disjoint from each other and from the gallery files that agent holds, so nothing collides in flight. Findings were read, not taken on their headline; where a fix is fact-blocked it is deferred with the fact named, because no fact absent from FACTS.md may be invented.

## Ruling on F-0709

Verdict. F-0709 does NOT stand as a P0 that pulls the hero film tonight. It becomes the single top judgment item of the morning report, with the film left standing overnight. The finding is logged at full weight, not dismissed.

The reasoning, in order.

1. Where it sits on the ladder. F-0709 is civilian recoil, rung 5. It states no untruth (rung 1) and, on its face, breaks no consent or law (rung 2). Rung 5 is real and is overridden by nothing shipping tonight, but the ladder also defines what "pull it now" is reserved for: rungs 1 to 3, a stated falsehood, a broken consent or law, or a failed machine gate. Recoil that is genuine but contestable does not by itself clear that bar.

2. The harm is real but not uncontestable. The civilian read, a specific person watched being erased into their own robot double, first interactive act, before one word of consent or pay or safety has landed, is legitimate and forceful. But it is one read. The site's whole thesis is the opposite claim: this is lethal work, and machines should learn it from footage so people stop dying doing it. The same shot can read as "the machine takes the danger," not "you are deleted." A pull-tonight P0 is for harm no reasonable viewer disputes. A reasonable viewer disputes this one. That contestability is exactly what makes it a morning judgment call rather than a settled defect.

3. There is no honest tonight-sized fix. The remedy F-0709 itself asks for is a change to the shape of the shot: establish real work, and separately establish that machines learn from footage like it, without ever placing one figure in one frame and then erasing that exact figure into their own robot twin. That is an asset re-cut, impossible tonight. The only action actually available tonight is to pull the film and ship the hero as a hole. Replacing the founder's signature centerpiece with nothing, overnight, is a larger harm to the page than leaving the standing film in place for one more night.

4. Authorship. The morph (human timeline above, robot twin below, the reveal) is the founder's own signature concept, shipped by him on 2026-07-15, analogous to the Helix as a fixed set piece. An arbiter deleting a founder's central creative act unilaterally, in the night, on a contestable rung-5 recoil call, with the founder absent and the correct fix requiring his authorship, is overreach. A call this large and this personal belongs in front of him first, with the finding stated plainly. That is what "top of the morning report" means: not a defer to nowhere, but the first thing he rules on.

The one condition that flips it to pull-immediately. Provenance. If the footage under the morph is stock, or a real worker from files Jay does not control, then it is no longer rung 5. It is rung 2, consent and law, the same open provenance question already attached to the hero b-roll (iteration-1 F-0101/F-0408), and it jumps to pull-tonight regardless of authorship. That answer is the gating variable and is a warden-and-Jay question I cannot resolve from artifacts.

Lighter mitigation to hand the founder in the morning, not ranked tonight. The finding notes the effect arms only when the cursor sits directly on a person, and that the film slows and pushes in on that specific figure. Disarming the cursor-targeting, so the film plays its established-work-then-machine sequence without hunting the human body, may lift most of the recoil short of a full re-cut. I do not rank it tonight because I cannot confirm it is a small isolated change and it touches the founder's signature interaction, which belongs to the same morning conversation.

## Ship tonight (beyond in-flight F-0409)

| Rank | Finding IDs | Scope of the one-builder job | Owner | Files (disjoint) | Ladder rung |
|---|---|---|---|---|---|
| 1 | F-0608 (P1), F-0609 (P2), F-0306 (P2) | Single-source the shared strings so `/` and `/dataset` read as one writer. Set the two divergent consent items and the capture-specs and offer paragraphs to one wording each, matching FACTS.md ("Site-owner authorization"; "Face blur applied before export. Non-negotiable"; keep "today" in capture specs; keep the fuller offer clause), used verbatim on both pages. Then add one inline `/dataset` link in the site's rule-not-card register at the close of beat 5. Content and one render edit only; near-zero risk. Also removes the trivial word divergences F-0305 cites (its restructure remedy is deferred). | build-strings (sonnet) | `src/content/sections.ts`, `src/content/dataset-page.ts`, `components/sections/dataset.tsx` | 4 buyer diligence + 6 voice |
| 2 | F-0412 (P1), F-0413 (P1), sweeps F-0410 for this one heading | Rig section. Make the "The rig we are building for the field" heading render unconditionally (the `MaskedRise` reveal leaves it invisible on a straight scroll, same reveal-gate class as F-0409); give it an initial visible state and set it in the beat 4/5 forest heading style (Newsreader forest per F-0410), closing the ~340px blank gap. Remove the banned radial glow/vignette under the rig render (the `rig-edge-blend` feathered edge): flat bone, hard 0-radius edge, no shadow or gradient. Move the low-contrast overlaid caption to ink-on-bone below the image. | build-rig (sonnet) | `components/future-rig/FutureRigSection.tsx`, `components/future-rig/FutureRigDynamic.tsx`, `components/future-rig/rig-static.tsx`, and the `rig-edge-blend` class in the global stylesheet | 7 craft, with F-0412 a render-absence defect |

Coverage: three P1s and two P2s across two builders, disjoint files, neither touching the gallery tree the F-0409 agent holds.

## Killed

| Finding | Why |
|---|---|
| F-0710 (as an isolated aria patch) | The remedy of quietly restoring or dropping "the work machines must learn" in the accessible name alone is the exact move the civilian names as fixing the finding, not the feeling. Killed as a standalone fix. The substantive decision, does the line survive for every visitor or come out for every visitor, rides with the F-0709 verdict-on-the-worker ruling in the morning, where it is decided once for both channels together. |

## Deferred to the morning report

| Finding | Sev | Why it waits |
|---|---|---|
| F-0709 | P0 | Ruled above. The morning's number-one judgment item; film stands overnight, provenance is the flip condition. |
| F-0106 | P1 | The rights the consent release grants are not in FACTS.md; stating them is a counsel question, not a night invention. |
| F-0108 | P1 | Codec, container, annotation file format, and delivery method are not ledgered (same block as iteration-1 F-0103); logged for Jay. |
| F-0205 | P1 | Connecting the access thesis to the Western Cape is a positioning copy pass; morning narrative work, not a 15-minute fix. |
| F-0206 | P1 | The "no way to respond" half is fact-blocked on the contact channel (iteration-1 F-0011/F-0105); the "restated twice" half is partly addressed by ship item 1 and otherwise waits with F-0305. |
| F-0305 | P1 | Its consistency complaint is served by ship item 1; its restructure remedy (compress beat 5, move the full schema to /dataset only) fights the narrator's beat-5 spec and is a structural morning call. |
| F-0307 | P1 | Expanding buyer Q3 beyond two sentences is copy depth work; morning. |
| F-0410 | P1 | Swept for the rig heading in ship item 2; the full beat 4/5 heading pass (Newsreader forest, same as deferred F-0403) stays a morning craft item. |
| F-0411 | P1 | Wordmark in two typefaces spans the hero and footer files; a clean craft pass for the morning, not tonight's disjoint budget. |
| F-0414 | P1 | Close-button rounded focus ring lives in `components/gallery/StatTakeover.tsx`, the tree the in-flight F-0409 agent holds. Defer to avoid a collision; dispatch right after F-0409 lands. |
| F-0415 | P1 | Takeover backdrop stops short of the viewport bottom; same StatTakeover file, same collision. Pair with F-0414 the moment F-0409 lands. |
| F-0507 | P1 | Tab skipping five beats needs focus-order work across several sections; a real a11y pass, too broad for 15 minutes. |
| F-0107 | P2 | Team size and who executes the work is not in FACTS.md; fact-blocked, logged for Jay. |
| F-0109 | P2 | No acceptance test stated; "delivery and acceptance" is ledgered but the acceptance criteria are not; fact-blocked. |
| F-0110 | P2 | POPIA bare self-declaration; substantiation is a counsel matter, not a night edit. |
| F-0204 | P2 | Founder never named; the name is a known fact and the fix is cheap, so this is a strong first morning copy add, but it is a copy-owner change outside tonight's two higher-coverage clusters. |
| F-0416 | P2 | /dataset has no footer; a build-page structural add, pairs with F-0508. |
| F-0417 | P2 | A heading sentence never renders; likely the same reveal-gate class as F-0409/F-0412, to verify in the morning and pair with the heading-reveal fix. |
| F-0508 | P2 | /dataset closing block has no nav landmark; morning, with F-0416. |
| F-0509 | P2 | Header nav sits outside the modal inert scope; a StatTakeover focus-trap change, same gallery collision as F-0414/F-0415. |
| F-0610 | P2 | Ethos closes on an unattributed maxim; copy polish, morning. |
| F-0611 | P2 | Founder passage closes abstract; copy polish, morning. |

## What I am least sure about

1. The F-0709 provenance gate. I routed it to the morning as a rung-5 recoil call, but the whole ruling hinges on the footage being consented and Jay-controlled. That is the same unresolved question as iteration-1 F-0101/F-0408, and I could not confirm it from artifacts. If the answer is "stock or not his," the finding was never rung 5, and leaving the film standing overnight was the wrong call. A reasonable arbiter could also decide the recoil is visceral and on-target enough for the exact audience that the cursor-targeting should be disarmed tonight even without a re-cut; I held off only because I could not scope that change as small and isolated.

2. String unification versus beat-5 compression. Ship item 1 makes the two pages more identical to kill the "two writers" complaint (F-0608/F-0609). It does not touch the "wastes the split" complaint (F-0305), which wants beat 5 compressed instead. A reviewer could argue the higher-value tonight move is to compress beat 5, not to unify strings. I chose unify because compression is a narrator-spec structural call, bigger and riskier than a 15-minute string pass, and unification does not block a later compression.

3. Takeover pair timing. F-0414 and F-0415 are two P1s and would be a natural third item on merit; they wait only on the file collision with the in-flight F-0409 gallery work, not on severity. If F-0409 lands quickly, the right move is to dispatch the takeover pair next rather than hold them to the morning.
