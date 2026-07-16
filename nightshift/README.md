# Nightshift

An autonomous multi-agent run that researches, critiques, and rebuilds the Vallum Labs site while you sleep. Drop this folder into the repo root, run `setup.sh`, paste `KICKOFF.md`, go to bed.

Budget: 5 hours. Target: a reviewable branch and a PR, not a merge.

---

## What I changed about your plan, and why

Your instinct was right on the big thing: cache the research once, then stop paying for it. Everything below is where this differs from what you asked for. The last five rows are from your second round of notes, and two of them are me reversing an earlier call or fixing a gap that was mine.

| You said | Nightshift does | Why |
|---|---|---|
| One swarm that scrolls, finds errors, fixes, repeats | Four phases with hard gates between them | Fixers that start before research lands will guess. Guessing at 2am is how you wake up to a rewritten site you hate. |
| Agent teams | Subagents plus a file-based queue | Agent teams are experimental. Teammate permission prompts surface in the lead session, and at 3am nobody is there to approve them. The run stalls and you lose four hours. |
| Agents browse the site | A Playwright script writes artifacts to disk, agents read files | Playwright MCP streams a full accessibility tree per page, often 50k tokens. Five hours of that is your entire usage limit spent on looking. |
| Copy the other website's UI, literally, with a reason | Take the skeleton, never the skin | You are more right than my first pass allowed, so this row changed. Layout, grid, scroll mechanics, section rhythm, interaction patterns: copy freely and cite the source in `DECISIONS.md`. Nobody owns a scroll pattern and every good site learned its structure from another site. What never gets copied: sentences, marks, assets, code. The twenty people you are emailing have read claru.ai, so wearing their phrasing makes you read as their clone to the exact audience that would notice. And lifting their code or images is infringement, not a shortcut. |
| If it doesn't know, fill it in, be dominant, no "fill in later" | No placeholders **and** no fabrications. A third option: rewrite the sentence | You get the thing you actually want, which is a finished page with nothing to fill in. `verify.sh` greps the rendered text for `TBD`, `TODO`, `[bracket]`, `lorem`, `coming soon` and fails the run. But a placeholder and a fabrication are the same failure: a sentence whose shape needs a fact that does not exist. "We captured [X] hours" and "we captured 500 hours" fail identically, and the second one fails in front of people who will ask. The fix is neither. Write a sentence that is true and complete: "every hour is annotated to the Ego4D schema, face-blurred before export, and delivered with a signed consent chain." Everything that is not a Vallum fact, design, copy, IA, naming, page count, gets decided dominantly with one line in `DECISIONS.md`. That is most of the site. |
| Push that we are a public benefit company | The ethos ships. The label never does | Vallum Labs Inc. is a Delaware C-corp. "Public benefit corporation" is a legal status with a public filing behind it, and any buyer's counsel or investor pulls the certificate in ninety seconds. `warden` blocks the label unappealably. You do not need it: consent forms in three languages, face blur before export, POPIA Section 57, per-clip provenance, participants paid. That stack is a stronger claim than the badge, because the badge is an intention and the stack is a procedure. If you want the label, it is an amended certificate of incorporation and you own 100% of the shares so there is no vote to lose. It also carries a biennial benefit report and a balancing duty some investors dislike. Worth a real conversation, not a 3am agent decision, and I am not your lawyer. |
| Do not be another Palantir | A `critic-civilian` agent, plus tone rules with numbers | The flinch has design causes: darkness as default, surveillance grammar, humans as inputs. So: the fatality stat appears at most twice, cited, at its real denominator. No sentence where the company is the actor and a death is the object, which kills "we record where people get killed." Workers are the source, never "subjects" or "assets" or "supply." `critic-civilian` is the only critic who never learns the jargon, and its severe tone findings open a real P0, because a ghoulish sentence costs you farm access and access is the only asset the company has. |
| Everything is too dark | Dark is beats 1 to 3 only, and the gate measures it | The luminance flip is the thesis, not decoration: dark is the world as it is, light is the work. `crawl.mjs` squashes each full-page screenshot to 100 greyscale bands and `verify.sh` fails the run if the bottom 65% has more than 20 dark bands or the whole page has fewer than 45 light ones. Your complaint is now a number, so no agent gets to argue with it at 4am. Also worth naming: two of the old craft scouts pointed at Vercel, Ramp and Cursor, all dark-mode dev sites. That is part of why it came out dark. They are gone. |
| Agents should have caught the invisible Helix text | `crawl.mjs` now captures interaction states | You are right and this was my gap. `critic-eyes` only ever saw pages at rest, which is exactly how the last build shipped this bug too. The crawler now drags the real canvas through 12 angles in a motion-enabled context, clicks panels, captures focus, and writes `artifacts/states/`. `build-hero` has to measure contrast at every angle and report the numbers, not look once. |
| Keep going until complete | A Stop hook script decides "complete", not the model | `/goal` looks good for this and is wrong here. Its evaluator only reads the transcript. It cannot run commands or read files. Your done condition is file-based, so it needs a script. |
| 15 research agents | 15 scouts, one wave, then never again | Cached research is the whole point. Re-researching is the whole cost. |

**On "is there a GitHub for this":** partly. The primitives exist and are worth knowing.

- `claude --worktree <name>` is built in as of v2.1.50. Isolated checkout, own branch, main untouched.
- `isolation: worktree` in subagent frontmatter gives each builder its own copy of the repo so parallel edits cannot collide.
- Anthropic ships a Ralph Wiggum plugin (`--install-plugin ralph-wiggum`) that wraps the stop-hook loop. Nightshift uses a hand-rolled Stop hook instead because the completion condition is specific.
- `npx playwright init-agents --loop=claude` installs planner, generator, and healer subagents for test work.
- VoltAgent/awesome-claude-code-subagents is a 154-agent library worth skimming.

Nothing off the shelf does "persona critics find UX and copy failures, builders fix, verifier proves." That part is this bundle.

---

## The roster

31 agents. Names are kebab-case because they get grepped out of the finding queue.

### Phase 1: Recon. 15 scouts, read-only, Haiku, one shot each, never run again.

Each scout owns one target. It reads the live site, writes a cache file to `research/cache/<name>.md`, and returns a 10-line summary. It has WebFetch, WebSearch, and Write scoped to `research/cache/`. It cannot touch the repo.

| Agent | Target | What it is mining for |
|---|---|---|
| `scout-claru` | claru.ai | Closest competitor. Page architecture, the `/compare` farm, the `/glossary` farm, how they qualify scale claims |
| `scout-buildai` | Build AI | How an 18-year-old founder with one dataset built a brand around it |
| `scout-encord` | Encord | How infrastructure companies name a layer |
| `scout-scale` | Scale AI | Enterprise data-company conventions, and what to avoid |
| `scout-pi` | Physical Intelligence | Research-first credibility with no commercial page |
| `scout-1x` | 1X | How a buyer describes what it needs |
| `scout-figure` | Figure | Humanoid-lab visual language |
| `scout-generalist` | Generalist AI | How a data engine describes itself |
| `scout-nvidia-gear` | NVIDIA GEAR and Cosmos | How research teams state a data thesis |
| `scout-getty` | Getty and Shutterstock AI licensing | Licensing-library structure. Rights, provenance, tiers |
| `scout-craft-a` | Anthropic, Linear, Stripe | Typography, restraint, how a serious company writes a sentence |
| `scout-oldmoney` | Sotheby's, Aesop, Klim Type Foundry | The register you asked for, in numbers. What makes a light page read expensive rather than cheap |
| `scout-glass` | Apple, Igloo Inc, Family.co | Glass as an optical property, not glassmorphism. Every technique for text legibility over moving media, which is the live Helix P0 |
| `scout-orbit` | Bruno Simon, Active Theory, Lusion, Awwwards 3D | Orbit damping, polar clamps, auto-rotate handoff, touch versus page scroll, full-canvas blur frame cost |
| `scout-ethics` | Anduril, Palantir, Patagonia, two real PBCs | What causes the flinch, at sentence and image level. How an ethos gets stated without sanctimony. How a real PBC states its status |

### Phase 2: Synthesis. 6 agents. Read the cache, write the specs.

| Agent | Writes | Job |
|---|---|---|
| `cartographer` | `research/PATTERNS.md` | Page architecture patterns across all 15. What page types exist, what order sections run in, where proof sits |
| `lexicon` | `research/VOICE.md` | A derived voice spec. Sentence length distribution, heading grammar, banned constructions, how good companies qualify a claim they cannot prove |
| `surveyor` | `research/IA.md` | Target sitemap and the gap list. What pages must exist that do not |
| `narrator` | `research/STORY.md` | **The book agent.** The argument in one sentence, then a beat sheet: what each beat does, how it earns the next, what surface it sits on. The current site goes workers-should-not-do-this, then a claim about not building robots, then people dying, then a camera from nowhere. Four disconnected beats. This is the highest-value fix tonight |
| `art-director` | `research/LOOK.md` | The visual system as values, not adjectives. Light rhythm predicted against the luminance gate, tokens, type scale in px, space scale, glass `backdrop-filter` values, motion, the one signature element |
| `dreamer` | `research/CONCEPTS.md` | **The creative one, opus, with the Higgsfield MCP.** The only agent whose job is to have an idea. You thought of the Helix yourself with nobody briefing you into it, and that is the standard. Also generates the missing assets, capped at 60% of your credit balance |

`lexicon` is the agent that fixes your "it's not very website-esque" problem. It derives rules from 15 real sites instead of taking them from you. That is why `BRIEF.md` has no catchphrases in it.

### Phase 3: The loop. Runs until the gate passes or the iteration cap hits.

| Agent | Job | Can it write code? |
|---|---|---|
| `foreman` | Orchestrator. Runs as the main session. Dispatches waves, owns the queue, never writes app code | No |
| `prowler` | Runs `scripts/crawl.mjs`. Produces screenshots, a11y JSON, console logs, link report, DOM text dumps | No |
| `critic-buyer` | The customer. Head of data at a robotics lab, 90 seconds, opened the link from a Slack DM. Can I tell what I would be buying, in what format, under what license, by when? | No |
| `critic-investor` | Pre-seed partner. Is the market real, is the wedge defensible, why this founder, what is the proof and what is the ask? | No |
| `critic-analyst` | Business analyst. Does the page structure map to the actual business model? Does the funnel have dead ends? | No |
| `critic-eyes` | Visual critic. Screenshots at 375, 768, 1440, **plus `artifacts/states/` and `artifacts/luminance.json`**. Hierarchy, spacing, type scale, light rhythm, glass done right, the signature element. A page at rest is not the page | No |
| `critic-flow` | UX and IA critic. Click paths, orphan pages, back-button behavior, what a scroll actually reveals | No |
| `critic-voice` | Copy critic. Scores every string against `research/VOICE.md` | No |
| `critic-civilian` | **The normal person.** Not technical, never learns the jargon, has no stake. Owns the not-Palantir check: the flinch test, who is the actor, people versus inputs, how many times the fatality number appears, and whether a farm owner would sign after reading. Its severe tone findings are real P0s | No |
| `arbiter` | **The master decider**, opus. Runs once per iteration after the critics have read each other. Resolves every conflict by a fixed precedence ladder and emits one ranked `BUILD-ORDER.md`. May rule against any critic or against `dreamer`. May not rule against `warden` or `verify.sh` | No |
| `warden` | The fact gate. Owns `FACTS.md`. Blocks any claim not in it. Runs before every commit | No. It only blocks |
| `build-page` | Creates and edits pages and routes | Yes, `isolation: worktree` |
| `build-copy` | Writes copy against VOICE.md and FACTS.md | Yes, `isolation: worktree` |
| `build-fix` | Small targeted fixes off the queue | Yes, `isolation: worktree` |
| `build-hero` | **The Helix and the hero**, opus. The only agent allowed to touch the canvas. Owns all five defects: invisible centerpiece text, the box, one-axis spin, rings and the blur-on-click focus state, and keeping your typing animation | Yes, `isolation: worktree` |
| `verifier` | Runs `scripts/verify.sh`. Proves the gate. Never fixes anything | No |

### Phase 4: Wrap.

| Agent | Job |
|---|---|
| `scribe` | Writes `MORNING-REPORT.md` and `DECISIONS.md`, pushes the branch, opens a draft PR |

**Not agents, on purpose:** accessibility, performance, broken links, type errors, lint, build. Those are scripts. Anything a script can decide, a script decides. Agents only do judgment. This is where most of the savings are.

---

## Phases and time budget

```
00:00  Phase 0  Setup            10 min   You are awake. Watch this part. Auth /mcp now.
00:10  Phase 1  Recon            45 min   15 scouts, one wave, parallel, Haiku
00:55  Phase 2  Synthesis        30 min   6 agents read the cache
01:25  Phase 3  Loop           3h 10m    critique -> rebut -> rule -> fix -> verify
04:35  Phase 4  Wrap             15 min   report, branch, draft PR
04:50           Buffer           10 min
```

Gate between every phase. Phase 2 will not start until 15 cache files exist. Phase 3 will not start until all six synthesis specs exist.

Each loop iteration:

```
prowler crawls        -> artifacts/ + artifacts/states/ + luminance.json
7 critics read        -> findings/F-####.md      (parallel, independent, blind)
7 critics rebut       -> rebuttals/R-<agent>.md  (now they read each other)
arbiter rules         -> findings/BUILD-ORDER.md (one ranked list, conflicts resolved)
foreman triages       -> queue, P0/P1/P2/P3
builders fix          -> code               (parallel, worktree-isolated)
warden checks claims  -> block or pass
verifier proves       -> scripts/verify.sh
Stop hook decides     -> loop or exit
```

Roughly 30 to 40 minutes per iteration. Expect 5 to 7.

**The three-step round is the answer to "all these agents talking to each other, and then a master agent making a decision."** The order is the whole design. Independent first, or you get seven agents agreeing because they read each other, which is worth nothing. Cross-talk second, or you get seven contradicting findings and nobody reconciling them. `arbiter` last, with a fixed precedence ladder: truth, then law and consent, then the machine gate, then buyer comprehension, then civilian recoil, then narrative, then craft, then novelty. It can overrule any critic and it can overrule `dreamer`. It cannot overrule `warden` or `verify.sh`, because those are measurements and it has no jurisdiction over a measurement.

If the run falls behind, the rebuttal round is the first thing to cut. It is the most expensive part of the loop and the least load-bearing. Independence is the part you never cut.

---

## The rule that matters most

Two kinds of unknown. The agents get different instructions for each.

**Design unknowns.** Section order, spacing, what the fifth page should be, whether the dataset page needs a table or a diagram. The agent decides, writes one line into `DECISIONS.md`, and moves on. It does not ask. You review in the morning.

**Factual claims about Vallum Labs.** Hours captured, farms signed, buyers, pilots, revenue, team size, funding, legal status. The agent may only use what is in `FACTS.md`. It does not estimate, does not round up, does not write "hundreds of hours" because that sounds better than nothing.

**And it does not leave a placeholder either, because you are right that those are awful.** The two rules meet here, and this is the paragraph that matters: a placeholder and a fabrication are the same failure. Both mean writing a sentence whose shape needs a fact that does not exist. "We captured [X] hours" and "we captured 500 hours" fail identically. The fix is neither filling the slot nor leaving it. **The fix is to write a different sentence.** "Every hour is annotated to the Ego4D schema, face-blurred before export, and delivered with a signed consent chain" is true today, needs no number, and is better copy than either, because it is specific about the thing that is actually differentiated. `verify.sh` greps the rendered text for `TBD`, `TODO`, `[bracket]`, `lorem`, and `coming soon`, and fails the run.

This is not a style preference. You are pre-revenue with zero delivered footage and you are about to send this URL to the people who would notice. A hallucinated traction number on a site you are using to raise money is a securities problem, and it is also just the fastest way to lose a buyer who checks. The `warden` exists to make this mechanical rather than a matter of the model remembering.

---

## Guardrails

**Never touches main.** Setup creates a worktree on `build/nightshift-<date>`. Your main checkout is untouched and stays usable. If the whole run is bad, `git worktree remove --force` and it never happened.

**Amber is dead and the gate enforces it.** `verify.sh` greps for `E8940C`, `e8940c`, `amber`, and `orange` in `app/`, `components/`, and `styles/` and exits 1 on a hit. Not a suggestion to the model, a build failure.

**Dark green has a trap.** Near-black plus one bright accent green is one of the three looks that AI-generated design defaults to right now. It will read as generated to anyone who looks at a lot of these. `BRIEF.md` tells the design agents: dark green as a low-chroma structural element, sitting close to the background, not a glowing accent. Spend the boldness in one place and let the rest stay quiet.

**The provenance law.** No AI-generated human appears anywhere on the site. Not a silhouette, not a hand, not a figure at distance. No stock photograph or clip of a worker, ever. The company whose entire claim is that it films real workers cannot illustrate itself with somebody else's photograph of one, and that is the single most checkable lie available. `dreamer` generates unpopulated environments only: aerials, terrain, empty decks, weather, haze. Empty dangerous places next to a cited fatality number read as haunting and cannot be questioned by anyone.

**The status badge, and what happens to the truth it was carrying.** `CONCEPT · IN DEVELOPMENT` is gone. You are right that it reads machine-made, because generated designs reach for the status pill constantly and it is one of the most reliable tells there is. But that badge was doing a real job: the rig does not physically exist, and an unqualified render of hardware you do not have is a product claim that technical buyers pattern-match to vaporware instantly. So the badge dies and the truth moves into prose, and `warden` requires it. The honest sentence is a better story than the badge was: the capture kit today is refurbished iPhones on head straps, carried in a suitcase. That is the most credible line available to you and it is true.

**Model routing.** Haiku for the 15 scouts. Sonnet for critics, synthesis, and most builders. Opus for `foreman`, `arbiter`, `dreamer`, and `build-hero`. Set in each agent's frontmatter. Without this the scouts alone cost more than the actual work.

**Credits.** `dreamer` runs `balance` first, computes a budget, logs it, and stops at 60% of what you have. You said spend it all, and the reason it does not is that running dry at 4am means a Helix with three panels and a hole, and you are asleep and cannot top up. MCP calls burn credits even on the unlimited plan, and the free web-UI lane needs a human, so tonight it is MCP or nothing.

**Iteration cap.** 10. Hard-coded in the Stop hook. A loop with no cap is how you wake up to an empty limit and a half-refactored site.

**Deny list.** No `git push --force`, no `git reset --hard`, no push to main, no `rm -rf`, no writes outside the worktree.

---

## Setup

```bash
# from your repo root, with a clean tree
cp -r nightshift .
bash nightshift/setup.sh
```

That script does the following. Read it before you run it.

1. Confirms the working tree is clean and refuses to continue if not
2. Creates the worktree and branch off `main`
3. Copies the agent files into `.claude/agents/`
4. Merges `settings.json` permissions and hooks into `.claude/settings.local.json`
5. Installs `@playwright/test`, `@axe-core/playwright`, `linkinator` as dev deps and downloads the Chromium binary
6. Runs a baseline crawl so iteration 1 has something to compare against
7. Prints the exact `claude` command to run

Then:

```bash
cd ../vallum-nightshift
claude --agent foreman --permission-mode acceptEdits
```

Paste `KICKOFF.md`. Watch the first ten minutes. If the first two scouts return sane cache files and `prowler` produces screenshots, it will hold. If the first scout returns nothing, kill it and check network access before you sleep.

---

## Risks, honestly

**Usage limits.** 15 scouts plus 8 loop iterations across 6 critics and 3 builders is a real spend. On a Max plan this fits. On Pro it will not. Check `/cost` at the 20-minute mark. If Phase 1 alone cost more than a fifth of your headroom, cut the scouts to 8 and restart.

**The critics will be wrong sometimes.** A persona critic writing "an investor would want to see traction here" is not a fact about investors, it is a model producing plausible investor-sounding text. Treat the finding queue as a list of things to look at, not a list of things that are true. The morning report separates deterministic findings (build, a11y, links, contrast) from judgment findings for exactly this reason.

**Six hours of autonomous copywriting will drift.** By iteration 6 the voice will have wandered from the VOICE.md spec even with the spec in context. `critic-voice` re-scores every string every iteration to fight this, and it mostly works. Read the copy in the morning with fresh eyes anyway.

**It will build pages you did not ask for.** `surveyor` decides the sitemap from research. You asked for a dataset page and a founder page. It may also decide you need a provenance page, a comparison page, and a methods post. That is the deal you made when you said "decide for itself." The PR is where you say no.

**Don't merge it half-asleep.** The point of the branch is that you get to reject it. Read `MORNING-REPORT.md` first, then the diff, then the site. Three separate passes.
