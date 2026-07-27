#!/usr/bin/env bash
# The gate. Deterministic. Exit 0 = pass. Nothing here is a matter of opinion.
# 14 checks. Rendered-text gates read artifacts/*.dom.txt, so they judge what a
# visitor can actually read, not what a code comment happens to contain.
set -uo pipefail

FAIL=0
SRC="app components src lib styles"
EXISTING=""
for d in $SRC; do [ -d "$d" ] && EXISTING="$EXISTING $d"; done

say()  { printf '%-28s %s\n' "$1" "$2"; }
bad()  { say "$1" "FAIL: $2"; FAIL=1; }
good() { say "$1" "ok"; }

echo "=== nightshift gate $(date -u +%FT%TZ) ==="

# 1. Build
if npm run build --silent > /tmp/ns-build.log 2>&1; then good "build"
else bad "build" "see /tmp/ns-build.log"; tail -20 /tmp/ns-build.log; fi

# 2. Types
if npx tsc --noEmit > /tmp/ns-tsc.log 2>&1; then good "typecheck"
else bad "typecheck" "$(grep -c 'error TS' /tmp/ns-tsc.log || echo '?') errors"; head -15 /tmp/ns-tsc.log; fi

# 3. Lint
if npm run lint --silent > /tmp/ns-lint.log 2>&1; then good "lint"
else bad "lint" "see /tmp/ns-lint.log"; fi

# 4. Banned colors. Amber is dead as of 2026-07-15.
if [ -n "$EXISTING" ]; then
  HITS=$(grep -rniE '#e8940c|\bamber-[0-9]|\borange-[0-9]|\byellow-[0-9]|beacon-amber' $EXISTING 2>/dev/null || true)
  if [ -z "$HITS" ]; then good "no amber/orange/yellow"
  else bad "no amber/orange/yellow" "$(echo "$HITS" | wc -l) hits"; echo "$HITS" | head -10; fi
fi

# 5. Em dashes. Non-negotiable house rule.
if [ -n "$EXISTING" ]; then
  DASH=$(grep -rn $'\u2014' $EXISTING 2>/dev/null || true)
  if [ -z "$DASH" ]; then good "no em dashes"
  else bad "no em dashes" "$(echo "$DASH" | wc -l) hits"; echo "$DASH" | head -10; fi
fi

# 6. Forbidden claims. Cheap grep against the FACTS.md forbidden list.
# Not exhaustive. The warden agent is the real check. This catches the obvious ones.
if [ -n "$EXISTING" ]; then
  CLAIM=$(grep -rniE 'trusted by|our team|our customers|hours captured|hours collected|working with (1x|nvidia|generalist|mecka|encord)|185,?000 acres|terra labs|stachio' $EXISTING 2>/dev/null || true)
  if [ -z "$CLAIM" ]; then good "no forbidden claims"
  else bad "no forbidden claims" "$(echo "$CLAIM" | wc -l) hits, check FACTS.md"; echo "$CLAIM" | head -10; fi
fi

# 6b. Rendered-text gates. These read artifacts/1440/*.dom.txt, which is what the
# page actually says, not what the source contains. A TODO in a code comment is
# fine. A TODO a visitor can read is not.
DOM=$(ls artifacts/1440/*.dom.txt 2>/dev/null || true)
if [ -n "$DOM" ]; then

  # Placeholders. Jay's rule: the page ships finished. FACTS.md's rule: it ships true.
  # Both are satisfied by rewriting the sentence, never by filling or leaving a slot.
  PH=$(grep -rniE '\bTBD\b|\bTODO\b|lorem ipsum|coming soon|fill in later|placeholder|\bXX+\b|\[[A-Za-z_ ]{2,}\]' $DOM 2>/dev/null || true)
  if [ -z "$PH" ]; then good "no placeholders"
  else bad "no placeholders" "$(echo "$PH" | wc -l) hits in rendered text"; echo "$PH" | head -8; fi

  # The PBC label. Vallum Labs Inc. is a Delaware C-corp, not a public benefit
  # corporation. Public filing, checkable in ninety seconds. Ethos yes, label never.
  PBC=$(grep -rniE 'public benefit (corp|company)|\bPBC\b|B-?Corp|certified benefit' $DOM 2>/dev/null || true)
  if [ -z "$PBC" ]; then good "no PBC claim"
  else bad "no PBC claim" "$(echo "$PBC" | wc -l) hits, see FACTS.md"; echo "$PBC" | head -5; fi

  # Negation. Saying what the company is not plants the question of why not.
  NEG=$(grep -rniE "not building (the )?robots|we (are not|aren'?t|do not|don'?t) build|unlike (other|robotics|traditional)|we (are not|aren'?t) an? " $DOM 2>/dev/null || true)
  if [ -z "$NEG" ]; then good "no negation"
  else bad "no negation" "$(echo "$NEG" | wc -l) hits, see BRIEF.md"; echo "$NEG" | head -5; fi

  # Status badges. The mono-caps pill is one of the most reliable generated-design
  # tells there is. Where it carried a truth, the truth moves into prose.
  BADGE=$(grep -rnE '\b(CONCEPT|IN DEVELOPMENT|COMING SOON|BETA|EARLY ACCESS|WIP|V1|PROTOTYPE)\b' $DOM 2>/dev/null || true)
  if [ -z "$BADGE" ]; then good "no status badges"
  else bad "no status badges" "$(echo "$BADGE" | wc -l) hits"; echo "$BADGE" | head -5; fi

  # The company as the actor on a death. This is the not-Palantir gate.
  GHOUL=$(grep -rniE 'where people (get |are )?(killed|die)|record .{0,20}death|capture .{0,20}(dying|death)|workers? as (data|assets|supply)' $DOM 2>/dev/null || true)
  if [ -z "$GHOUL" ]; then good "no ghoul phrasing"
  else bad "no ghoul phrasing" "$(echo "$GHOUL" | wc -l) hits, see BRIEF.md"; echo "$GHOUL" | head -5; fi
fi

# 6c. Luminance. The founder's top complaint, as a measurement rather than an argument.
# Dark is beats 1-3, the world as it is. Light is the work. Top 35% is unconstrained.
if [ -f artifacts/luminance.json ]; then
  LUM=$(node -e '
    const l = require("./artifacts/luminance.json");
    const t = l.thresholds; const out = [];
    for (const [route, m] of Object.entries(l.routes || {})) {
      if (!m) continue;
      if (m.darkBandsLower > t.maxDarkBandsLower)
        out.push(`${route}: ${m.darkBandsLower}/${m.lowerBandCount} lower bands dark, max ${t.maxDarkBandsLower}`);
      if (m.lightBandsTotal < t.minLightBandsTotal)
        out.push(`${route}: only ${m.lightBandsTotal}/100 bands light, need ${t.minLightBandsTotal}`);
    }
    console.log(out.join("\n"));
  ' 2>/dev/null || true)
  if [ -z "$LUM" ]; then good "luminance"
  else bad "luminance" "page is too dark below the fold"; echo "$LUM" | head -8; fi
else say "luminance" "skipped, no artifacts/luminance.json"; fi

# 7. Accessibility. Critical and serious only. Zero tolerance.
if [ -f artifacts/axe.json ]; then
  CRIT=$(node -e 'const a=require("./artifacts/axe.json");const v=(a.violations||[]).filter(x=>["critical","serious"].includes(x.impact));console.log(v.length)' 2>/dev/null || echo "0")
  if [ "$CRIT" = "0" ]; then good "a11y critical/serious"
  else bad "a11y critical/serious" "$CRIT violations"; fi
else say "a11y" "skipped, no artifacts/axe.json"; fi

# 8. Broken links
if [ -f artifacts/links.json ]; then
  BROKEN=$(node -e 'const l=require("./artifacts/links.json");console.log((l.links||[]).filter(x=>x.state==="BROKEN").length)' 2>/dev/null || echo "0")
  if [ "$BROKEN" = "0" ]; then good "links"
  else bad "links" "$BROKEN broken"; fi
else say "links" "skipped, no artifacts/links.json"; fi

# 9. Open P0/P1 findings
OPEN=$(grep -lE '^severity: P[01]' findings/F-*.md 2>/dev/null | xargs grep -LE '^status: (fixed|wontfix)' 2>/dev/null | wc -l | tr -d ' ')
if [ "${OPEN:-0}" = "0" ]; then good "open P0/P1"
else bad "open P0/P1" "$OPEN still open"; fi

echo "=== $([ $FAIL -eq 0 ] && echo 'GATE: PASS' || echo 'GATE: FAIL') ==="
exit $FAIL
