# KICKOFF

Paste everything below the line into a `claude --agent foreman --permission-mode acceptEdits` session started inside the worktree that `setup.sh` created.

Before you paste, do three things:

1. Edit the one line marked `EDIT THIS`
2. Run `/mcp` and authenticate Higgsfield. **The OAuth flow needs a human and at 3am there will not be one.** An unauthenticated MCP means `dreamer` stalls and generates nothing
3. Check `/cost` at the 20 minute mark. If Phase 1 alone ate a quarter of your budget, tell the foreman to cut the scouts to 8. This run is bigger than the last one: six Phase 2 agents, seven critics, a rebuttal round, and three opus agents

---

You are running Nightshift. I am going to sleep and will not answer questions. Nobody will approve a prompt. If you stop to ask something, the run is over and five hours are gone.

Run `date -u` right now and write the result down. That timestamp is T0. **EDIT THIS:** stop no earlier than T0 plus 4 hours 45 minutes. Do not estimate elapsed time. You are bad at it. Run `date -u` at the start of every phase and every loop iteration and compare against T0. Your sense of how long something took is not evidence.

## Read these first, in this order, completely

1. `nightshift/README.md` for what this run is
2. `nightshift/BRIEF.md` for what the company is, what it looks like, and what the Helix has to become. This one is long and all of it is load-bearing
3. `nightshift/FACTS.md` for what you are allowed to say. This one is binding
4. `nightshift/agents/foreman.md` for your own job

Do not skim. If you have not read `FACTS.md` end to end you cannot write a single string of copy.

## The two rules

**Design, structure, copy, IA, motion, naming, page count: decide.** Be dominant. Do not ask, do not stall, do not leave a placeholder. Log one line in `DECISIONS.md` and keep moving. I reverse what I want in the morning.

**Factual claims about Vallum Labs: `FACTS.md` or nothing.** Never invent, never estimate, never round.

These do not conflict. A placeholder and a fabrication are the same failure: a sentence whose shape needs a fact that does not exist. Do not fill the slot and do not leave it. **Write a different sentence.** No `TBD`, no `TODO`, no `[bracket]`, no "coming soon" reaches the rendered page. `verify.sh` greps the rendered text for them and they are P0.

## Phase 1: Recon. 45 minutes.

Dispatch all 15 scouts in one wave, in the background. Each writes `research/cache/<n>.md` and returns a short summary.

Four of them are new and they exist because of specific defects: `oldmoney` and `glass` because the site is too dark and reads cheap, `orbit` because the Helix only spins on one axis, `ethics` because one line on the site currently reads like a company that enjoys this.

Gate: 15 files in `research/cache/`, none under 40 lines. If a scout returns thin, re-dispatch once with a narrower target. Fails twice, note the gap in `DECISIONS.md`, continue with 14. One dead scout does not hold the run.

Do not read the cache files yourself. That is what Phase 2 is for and your context is not for holding 15 research dumps.

## Phase 2: Synthesis. 30 minutes.

Dispatch six in parallel. They read the cache. You do not.

| Agent | Writes | Owns |
|---|---|---|
| `cartographer` | `research/PATTERNS.md` | structure patterns |
| `lexicon` | `research/VOICE.md` | register, measured off 15 sites |
| `surveyor` | `research/IA.md` | pages and gaps |
| `narrator` | `research/STORY.md` | the argument and the beat sheet |
| `art-director` | `research/LOOK.md` | palette, type, light rhythm, materials |
| `dreamer` | `research/CONCEPTS.md` | ideas nobody asked for |

Gate: all six files exist. Read only `IA.md`, `STORY.md`, and `CONCEPTS.md` yourself. Turn the gap list into the initial finding queue.

`narrator` is why this phase grew. The current site goes: workers should not do these jobs, then a claim about not building robots, then people dying, then a camera from nowhere. Four disconnected beats. Fixing that is the single highest-value thing tonight.

## Phase 3: The loop. Until the gate passes or 10 iterations.

Each iteration, in this order:

1. `date -u`. Log iteration number and elapsed to `findings/log.md`
2. `prowler` crawls. Artifacts land in `artifacts/`, including `artifacts/states/` and `artifacts/luminance.json`
3. `bash nightshift/scripts/verify.sh`. Every failure is a P0. These are machine facts. Do not ask a critic about them
4. **Round 1, independent.** Dispatch all 7 critics in one background wave. They write `findings/F-####.md`. They do not read each other. That independence is the whole value
5. **Round 2, rebuttal.** Re-dispatch the same 7. Each now reads the pooled findings and writes `rebuttals/R-<agent>.md`: what they disagree with, what they want amplified, what conflicts with their read. One pass, bounded. This is the cross-talk
6. **Round 3, the ruling.** Dispatch `arbiter`. It reads everything and writes `findings/BUILD-ORDER.md`. It resolves conflicts by a fixed precedence ladder. You do not overrule it and it does not overrule `warden` or `verify.sh`
7. Dispatch builders from `BUILD-ORDER.md` only. Each in its own worktree. Never two on the same file. `build-hero` owns the canvas and nobody else touches it
8. `warden` reviews every changed string against `FACTS.md`. A block is not negotiable and not appealable. Blocked copy gets rewritten without the claim, not softened
9. `verifier` runs the gate and prints the result. `verifier` never fixes anything
10. Commit. One per iteration, `nightshift: iteration N, <what changed>`

If you are behind schedule, **cut round 2 first.** The rebuttal round is the most expensive thing here and the least load-bearing. Independent findings plus `arbiter` still works. Independence is what you never cut.

Exit when `verify.sh` exits 0 and no P0 or P1 is open. Not when you feel done. The Stop hook checks and will send you back.

## Phase 4: Wrap. 15 minutes.

Dispatch `scribe`. It writes `MORNING-REPORT.md`, finalizes `DECISIONS.md`, pushes the branch, opens a draft PR.

`MORNING-REPORT.md` separates two things and labels them clearly:

- **Machine findings.** Build, types, lint, a11y, contrast, luminance, banned colors, em dashes, placeholders, broken links. Facts
- **Judgment findings.** Anything a critic said. A model producing plausible critic-sounding text. Some are right, some are noise, and I need to know which bucket I am reading

Also, honestly: every page created, every decision, every fact gap, every P2 and P3 left alone, every credit spent by `dreamer`, and anything tried that did not work. No victory lap. If iteration 5 made the hero worse and 6 reverted it, say so.

## Standing rules

- Never touch `main`. Never force push. Never `git reset --hard`
- Never edit `FACTS.md`
- Amber, orange, yellow are banned. Including the Helix caret
- No em dashes anywhere
- No AI-generated human anywhere on the site. No stock photo of a worker, ever. This is the provenance law and it is the one lie that ends the company
- "Public benefit corporation," "PBC," "B-Corp" never appear. Vallum Labs Inc. is a C-corp and the filing is public. Ship the ethos, never the label
- No sentence saying what the company is not
- Do not write app code yourself. You dispatch, triage, and gate. That is the whole job
- If your context is filling with critic findings, you are reading bodies you should not read. Read headers, dispatch on headers
- If something is genuinely blocking, for example the dev server will not start, spend one iteration diagnosing, write it at the top of the morning report, continue with what you can do

Start with `date -u`, then Phase 1.
