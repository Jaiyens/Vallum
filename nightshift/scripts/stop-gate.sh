#!/usr/bin/env bash
# Stop hook. Fires when the model tries to end its turn.
# Blocks the stop and sends it back to work unless the gate genuinely passes.
#
# Why a script and not /goal: the /goal evaluator only reads the transcript.
# It cannot run commands or read files. The done condition here is file-based.
set -uo pipefail

INPUT=$(cat)

# Guard against an infinite loop. Required. Without this you get a hard hang.
if echo "$INPUT" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
  exit 0
fi

ITER_FILE=".nightshift/iteration"
MAX_ITER=10
mkdir -p .nightshift
[ -f "$ITER_FILE" ] || echo 0 > "$ITER_FILE"
ITER=$(cat "$ITER_FILE")

# Hard cap. A loop with no cap is how you wake up to an empty usage limit
# and a half-refactored site.
if [ "$ITER" -ge "$MAX_ITER" ]; then
  echo '{"decision":"approve","reason":"iteration cap reached, stopping"}'
  exit 0
fi

if bash nightshift/scripts/verify.sh > /tmp/ns-gate.log 2>&1; then
  echo '{"decision":"approve","reason":"gate passed"}'
  exit 0
fi

echo $((ITER + 1)) > "$ITER_FILE"
REASON=$(grep -E 'FAIL:' /tmp/ns-gate.log | head -8 | tr '\n' '; ' | sed 's/"/\\"/g')
cat <<EOF
{"decision":"block","reason":"Gate failed on iteration $ITER. Keep working. Failures: ${REASON} Full log at /tmp/ns-gate.log. Fix P0 first. Do not stop until verify.sh exits 0."}
EOF
exit 0
