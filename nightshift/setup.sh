#!/usr/bin/env bash
# Nightshift setup. Run from the repo root. Read it before you run it.
set -euo pipefail

DATE=$(date -u +%Y-%m-%d)
BRANCH="build/nightshift-${DATE}"
WT="../$(basename "$PWD")-nightshift"

echo "=== nightshift setup ==="

# 1. Refuse to run on a dirty tree. This is the guardrail that keeps main safe.
if [ -n "$(git status --porcelain)" ]; then
  echo "FAIL: working tree is dirty. Commit or stash first."
  git status --short
  exit 1
fi
echo "[1/7] tree clean"

# 2. Worktree off main. Your main checkout is never touched and stays usable.
if [ -d "$WT" ]; then
  echo "  worktree already exists at $WT"
else
  git worktree add "$WT" -b "$BRANCH"
fi
echo "[2/7] worktree at $WT on $BRANCH"

# 3. Copy the bundle in
cp -r nightshift "$WT/"
cd "$WT"
mkdir -p .claude/agents research/cache findings artifacts .nightshift
echo 0 > .nightshift/iteration
echo "[3/7] bundle copied"

# 4. Agents. 18 hand-written plus 15 generated scouts.
cp nightshift/agents/*.md .claude/agents/
rm -f .claude/agents/_scout-template.md

# Higgsfield MCP, so dreamer can generate assets while you sleep.
# Claude Code reads .mcp.json from the repo root. Auth is interactive: run /mcp and
# approve BEFORE you go to bed, or dreamer stalls on an OAuth prompt at 3am.
if [ ! -f .mcp.json ]; then
  cat > .mcp.json << 'MCPEOF'
{
  "mcpServers": {
    "higgsfield": { "type": "http", "url": "https://mcp.higgsfield.ai/mcp" }
  }
}
MCPEOF
  echo "  wrote .mcp.json for Higgsfield. Run /mcp and authenticate before sleeping."
else
  echo "  .mcp.json exists, left alone. Confirm higgsfield is in it."
fi
bash nightshift/scripts/make-scouts.sh .claude/agents
echo "[4/7] $(ls .claude/agents | wc -l | tr -d ' ') agents installed"

# 5. Settings. Merge, do not clobber.
if [ -f .claude/settings.local.json ]; then
  cp .claude/settings.local.json .claude/settings.local.json.bak
  node -e '
    const fs=require("fs");
    const cur=JSON.parse(fs.readFileSync(".claude/settings.local.json","utf8"));
    const add=JSON.parse(fs.readFileSync("nightshift/settings.json","utf8"));
    delete add._comment;
    cur.permissions=cur.permissions||{};
    cur.permissions.allow=[...new Set([...(cur.permissions.allow||[]),...add.permissions.allow])];
    cur.permissions.deny =[...new Set([...(cur.permissions.deny ||[]),...add.permissions.deny ])];
    cur.hooks=Object.assign({},cur.hooks,add.hooks);
    fs.writeFileSync(".claude/settings.local.json",JSON.stringify(cur,null,2));
  '
  echo "  merged into existing settings, backup at .claude/settings.local.json.bak"
else
  node -e '
    const fs=require("fs");
    const add=JSON.parse(fs.readFileSync("nightshift/settings.json","utf8"));
    delete add._comment;
    fs.writeFileSync(".claude/settings.local.json",JSON.stringify(add,null,2));
  '
fi
echo "[5/7] settings written"

# 6. Deps. Playwright browser download is ~30s and 700MB. Do it now, not at 2am.
npm i -D @playwright/test @axe-core/playwright sharp --silent
npx playwright install chromium --with-deps > /dev/null 2>&1 || npx playwright install chromium
cat >> .gitignore << 'GI'

# nightshift
artifacts/
.nightshift/
.claude/worktrees/
GI
echo "[6/7] deps installed"

# 7. Baseline. If this fails you find out now, awake, not at 3am.
echo "[7/7] baseline crawl (starting dev server)"
npm run dev > /tmp/ns-dev.log 2>&1 &
DEV=$!
sleep 12
if node nightshift/scripts/crawl.mjs; then
  echo "  baseline ok. $(node -e 'const m=require("./artifacts/manifest.json");console.log(m.counts.routes+" routes, "+m.counts.axeCriticalSerious+" critical/serious a11y")')"
else
  echo "  WARNING: baseline crawl failed. Check /tmp/ns-dev.log before you sleep."
fi
kill $DEV 2>/dev/null || true

cat << 'DONE'

=== ready ===

  cd $WT
  claude --agent foreman --permission-mode acceptEdits

Then paste nightshift/KICKOFF.md.

Watch the first ten minutes. If the first two scouts return real cache files
and prowler produces screenshots, it will hold. If scout one returns nothing,
kill it and check network access before you sleep.

To throw the whole run away:
  git worktree remove --force $WT && git branch -D BRANCHNAME

DONE
echo "  worktree: $WT"
echo "  branch:   $BRANCH"
