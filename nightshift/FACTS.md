# FACTS.md

The only source of truth for factual claims on vallumlabs.com.

**Rule for every agent:** if a claim is not in this file, it does not go on the site. No exceptions, no estimates, no rounding, no "approximately," no hedged version of a number you do not have.

**And no placeholder either.** A placeholder and a fabrication are the same failure: writing a sentence whose shape requires a fact you do not have. Do not fill the slot. Do not leave the slot. Write a different sentence.

No `TBD`, `TODO`, `[bracket]`, `lorem`, `coming soon`, `XX`, or `fill in later` ever reaches the rendered page. `verify.sh` greps for them and they are a P0. The page ships finished, using only true sentences. If a section feels thin without a number, the section is written wrong. Rewrite the section. Log the gap in `findings/needs-fact.md` for Jay's morning read, then ship the page complete without it.

Jay is the only person who may add to this file. Agents may read it. Agents may not edit it.

Last verified: 2026-07-15.

---

## Entity

- Legal name: Vallum Labs Inc.
- Delaware C-corp, filed via Stripe Atlas
- 10,000,000 shares authorized, wholly owned by Jaiyen Shetty
- Always written as two words, "Vallum Labs." Never "Vallum" alone. `vallum.ai` is an unrelated AI-governance company
- Domain: vallumlabs.com

## Founder

- Jaiyen Shetty. Goes by Jay
- 18 years old
- Studying at UC Berkeley, Haas and Computer Science
- From a Fresno, California farming family
- Sole founder as of July 2026
- Based in Cape Town, South Africa from 2026-07-16

## What the company does

- Collects consent-cleared, action-labeled egocentric video of outdoor manual work
- Licenses it to robotics and world-model teams
- Environments: agriculture first. Construction, rooftop solar, offshore rigs, wind turbines, and high-rise ironwork are stated direction, not current operations
- The differentiator is outdoor, high-fatality-rate work that indoor-focused collectors do not cover

## Current operation

- Cape Town, South Africa. Western Cape harvest season
- Window: July 2026 to approximately January 2027
- Capture hardware: 4 to 6 refurbished iPhones on head straps, carried in personally
- Format: 1080p minimum, 30fps, head-mounted

## The offer

- Paid pilot: $15,000 to $40,000 for 20 to 40 curated, annotated, consent-cleared hours
- Terms: 50% on signature, 50% on delivery and acceptance
- Licensing default: non-exclusive
- Time-boxed, task-boxed exclusivity available as a paid premium. Never perpetual, never blanket

## Annotation schema (what ships with every clip)

- Per-clip task label
- Environment and scene tag
- Geography tag
- Hand-visibility flag
- 21-keypoint hand-pose track where recoverable
- Object-in-hand label
- Action-segment start and stop timestamps
- Consent and provenance ID linking the clip to a signed release
- Compatible with the Ego4D and Ego-Exo4D annotation conventions

## Consent and provenance stack

- Written participant release in English, Afrikaans, and isiXhosa
- Site-owner authorization
- Face blur applied before export. Non-negotiable
- Per-clip provenance record: who, where, when, device, consent ID
- POPIA compliant, including Section 57 on biometric data export
- C2PA content-provenance signing where the pipeline supports it

## External facts (verified, citable, attribute the source)

These are facts about the world, not about Vallum Labs. They may be stated on the site with attribution.

- NVIDIA GEAR's EgoScale pretrained a VLA on 20,854 hours of action-labeled egocentric human video, reporting a 54% average performance gain over no pretraining. Source: NVIDIA GEAR
- Ego4D: 3,670 hours, 931 unique camera wearers, 74 locations, 9 countries
- Ego-Exo4D: 1,286.3 hours, 740 participants, 13 cities
- Generalist AI's GEN-0 blog (Nov 2025) cites over 270,000 hours of real-world manipulation data growing by roughly 10,000 hours per week, and references multiple data foundry partners
- Build AI published Egocentric-1M, approximately 1 million hours, Apache 2.0, April 2026
- US occupational fatality rates: logging over 110 per 100,000 workers. Roofing 48.7 per 100,000. NIOSH attributes roughly 130 deaths per year to tractor overturns
- Published work indicates pure synthetic training reaches roughly 78% real-world success versus roughly 92% for a 70/30 real-to-synthetic mix

---

## FORBIDDEN. Do not write these in any form.

As of 2026-07-15 none of the following exist. An agent that writes any of them has failed the run.

- **Any number of hours captured.** Zero hours have been captured. Not "our first hours," not "hours in progress," not a range
- **Any farm, site, or operator signed.** None are signed
- **Any buyer, customer, client, pilot, contract, or LOI.** None exist
- **Any logo wall, "trusted by," "working with," or "partners include."** Naming 1X, NVIDIA, Generalist AI, Mecka, or Encord anywhere that implies a relationship is forbidden. They may be described as the category of buyer for this data. That is the only permitted framing, and it must be unambiguous
- **Any revenue, ARR, or bookings.** Zero
- **Any team, "we," headcount, advisors, or plural first person implying more than one person.** Jay is the only person. First-person plural is acceptable as a company voice. Any claim about people is not
- **Any funding, round, raise, investor, or valuation.** The site is buyer-facing. Raise language belongs in investor emails only, never on the site
- **The 185,000 acres.** Those were prior letters of interest for a retired product. Never revenue, never Vallum Labs, never on this site
- **Any dataset size, clip count, or annotation count for Vallum Labs**
- **Any accuracy, benchmark, or model-performance claim attributable to Vallum Labs data**
- **Any Terra Labs, Terra, Stachio, "Palantir for farms," Brain/Eyes, or farm energy, payroll, or meter software reference.** That company is retired. It does not appear on this site in any form
- **Any date, deadline, or availability that is not in the Current Operation section**
- **"Public benefit corporation," "PBC," "B-Corp," "certified benefit," or any equivalent.** Vallum Labs Inc. is a Delaware C-corp. It is not a public benefit corporation. These are legal statuses backed by public filings that any counsel or investor pulls in about ninety seconds. Ship the ethos, never the label. The consent stack below is real, is stronger, and needs no badge. Not appealable
- **Any status badge implying stage.** No `CONCEPT`, `IN DEVELOPMENT`, `BETA`, `COMING SOON`, `V1`, or mono-caps pill announcing what something is. Where a badge is removed and it was carrying a truth, the truth moves into a plain sentence in the copy. It does not just disappear

## Forbidden phrasings

Not facts, but they fail for the same reason: they say something untrue or they say something true in a way that damages.

- **"We are not building the robots," "we train them, we don't build them," "unlike robotics companies," and every variant.** Stating what the company is not plants the question of why not. Dead. Replace with specificity about the dataset, never with a better negation
- **"We record where people get killed" and every variant where the company is the actor and a death is the object.** The work is dangerous. The company films the work. Two sentences, no body in either
- **"Subjects," "assets," "coverage," or "supply" applied to workers.** Workers are the source of the data. They are never the spectacle
- **Any fatality statistic more than twice on the entire site,** and never without its citation and its real denominator

## Footage and image provenance

The anti-AI director law is a fact rule, not a style rule. It is the provenance spine of the company and the site is the worst place to break it.

- **No AI-generated human may appear anywhere on the site.** Not in the hero, not in a Helix panel, not in a texture, not blurred in a background plate
- AI-generated imagery is permitted **only** for unpopulated environments: aerials, terrain, structures, empty decks, weather, haze
- Real footage of people is permitted only from files Jay shot or licensed. If it did not come from a directory Jay controls, it is not real footage and it does not go on the site
- No stock photograph or stock clip of a worker, ever. A company whose entire claim is that it films workers cannot illustrate itself with someone else's photograph of a worker. This is the single most checkable lie available and it would be caught
- Empty dangerous places next to a cited fatality number read as haunting and cost nothing. That is the intended register where real footage does not exist

## How to write around the gaps

The site is allowed to be a pre-launch site. That is not a weakness to be papered over, and papering over it is exactly what gets caught.

Permitted: state the thesis, state the method, state the annotation schema, state the consent stack, state the offer, state the window, state who the data is for, cite external research. All of that is real and all of it is verifiable.

Not permitted: implying any of it has already produced a delivered dataset.

If a section feels thin without a traction number, the section is wrong, not the fact ledger. Rewrite the section.
