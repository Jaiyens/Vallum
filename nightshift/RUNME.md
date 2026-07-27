# RUNME

Six steps. Do them in order. Everything else in this folder is for the agents to read, not you.

The only two files you touch are this one and `KICKOFF.md`. `KICKOFF.md` is the prompt.

---

## 1. Put the folder in your repo root

Unzip so that `nightshift/` sits next to `package.json`.

```bash
cd ~/path/to/vallum-site
ls
# you should see: package.json  app/  components/  nightshift/
```

Your tree has to be clean or setup refuses to run. That refusal is deliberate, it is what keeps `main` safe.

```bash
git status
git add -A && git commit -m "wip before nightshift"
```

## 2. Run setup

```bash
bash nightshift/setup.sh
```

Takes about 3 minutes. It creates a worktree on a new branch, installs 33 agents, writes `.mcp.json`, merges settings, installs Playwright and sharp, then runs a baseline crawl to prove the whole pipeline works while you are still awake.

It ends by printing the worktree path. Note it.

**If the baseline crawl fails, stop and fix it now.** That is the entire point of running it while you are awake.

## 3. Open the session

```bash
cd ../vallum-site-nightshift        # the path setup.sh printed
claude --agent foreman --permission-mode acceptEdits
```

## 4. Authenticate Higgsfield

In that session:

```
/mcp
```

Approve it. **Do this now.** OAuth needs a human. At 3am there is not one, and `dreamer` will stall on the prompt and generate nothing.

Then check it worked:

```
/cost
```

Note the number. You will compare against it in step 6.

## 5. Start the run

Type exactly this:

```
Read nightshift/KICKOFF.md end to end and execute it now. Do not summarize it back to me. Do not ask me anything. Start with date -u.
```

That is the prompt. `KICKOFF.md` contains the rest.

**Optional, only if you are not sleeping about 5 hours.** Open `nightshift/KICKOFF.md`, find the line marked `EDIT THIS`, change `4 hours 45 minutes` to whatever you have. If you are sleeping a normal night, leave it alone.

## 6. Watch ten minutes, then go to bed

Do not watch the whole thing. Watch for three signals:

| Signal | Means |
|---|---|
| Scouts 1 and 2 return real files in `research/cache/` | Network works, the wave holds |
| `/cost` at 20 minutes is under a quarter of your budget | It will finish |
| `prowler` produces screenshots in `artifacts/` | The crawler works |

If scout one returns nothing, kill the run and check network access.

If `/cost` is running hot at 20 minutes, type: `cut the scouts to 8 and continue`.

Then sleep.

---

## In the morning

```bash
cd ../vallum-site-nightshift
cat MORNING-REPORT.md
cat DECISIONS.md
npm run dev
```

`MORNING-REPORT.md` separates machine findings from judgment findings. Machine findings are facts. Judgment findings are a model producing plausible critic-sounding text, and some of it is noise. Read the labels.

`DECISIONS.md` is every call an agent made without you. That is where you reverse things.

## To throw the entire run away

```bash
git worktree remove --force ../vallum-site-nightshift
git branch -D build/nightshift-YYYY-MM-DD
```

Your `main` was never touched. Nothing to undo.
