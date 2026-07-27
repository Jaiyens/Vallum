#!/usr/bin/env bash
# Generates the 15 Phase 1 scout agents from _scout-template.md
set -euo pipefail

TEMPLATE="$(dirname "$0")/../agents/_scout-template.md"
OUT="${1:-.claude/agents}"
mkdir -p "$OUT"

gen() {
  local slug="$1" name="$2" focus="$3"
  sed -e "s|TARGETSLUG|${slug}|g" \
      -e "s|TARGETNAME|${name}|g" \
      -e "s|TARGETFOCUS|${focus}|g" \
      "$TEMPLATE" > "$OUT/scout-${slug}.md"
  echo "  scout-${slug}"
}

echo "Generating 15 scouts into $OUT"

gen claru "Claru (claru.ai)" \
  "Closest competitor. Cover the homepage, /about, /compare and its child pages, and /glossary. The two page farms are the most interesting thing on the site: document their shape and note whether they look like they work. Pay close attention to how they qualify scale claims."

gen buildai "Build AI" \
  "An 18-year-old founder who released Egocentric-1M free and built a brand on one dataset. Focus on how a single artifact carries a whole company's positioning, and on how they handled being early."

gen encord "Encord" \
  "Data infrastructure for physical AI. Focus on how they name and claim a layer of the stack, and on the vocabulary they use for it."

gen scale "Scale AI, physical AI pages only" \
  "The enterprise incumbent. Focus on the conventions of a large data company, and be specific about which of them are wrong for a company of one. This scout is mostly collecting an anti-pattern."

gen pi "Physical Intelligence (physicalintelligence.company)" \
  "Research-first credibility with almost no commercial surface. Focus on how restraint reads as confidence, and on what they leave out."

gen 1x "1X Technologies" \
  "A buyer of this exact data. Focus on how a buyer describes what it needs, in its own words. That vocabulary is what the client should be answering."

gen figure "Figure AI" \
  "Humanoid lab. Focus on visual language, motion, and how hardware companies use imagery. Note what is expensive to imitate and what is not."

gen generalist "Generalist AI" \
  "Runs a wearable human-data engine at scale. Focus on how a data engine describes its own collection method and its partners."

gen nvidia-gear "NVIDIA GEAR and Cosmos" \
  "Focus on how a research team states a data thesis in public: the EgoScale and Cosmos pages, and the blog. Collect the exact sentence shapes used to state a scaling result."

gen getty "Getty Images and Shutterstock AI licensing pages" \
  "Licensing library structure. Focus on how rights, provenance, indemnity, and tiers get presented. This is the closest analogue to what the client actually sells and nobody in physical AI has copied it yet."

gen craft-a "Anthropic, Linear, and Stripe" \
  "Copy craft and typography. Do not analyze their businesses. Measure their writing: sentence length, heading grammar, how a claim gets stated, what they refuse to say. Collect more copy samples here than anywhere else."

gen oldmoney "Sotheby's, Aesop, and Klim Type Foundry" \
  "The register the founder asked for: modern, strong, smart, sophisticated, old money. All three are light-surfaced, restrained, and serif-led. Decompose it into values, not adjectives: margin sizes, type scale steps, how much of the viewport is empty, whether they use cards or rules, what their radius is, what motion exists. Klim especially, it is where sophisticated typography actually lives on the web. Answer one question with numbers: what exactly makes a light page read as expensive rather than cheap?"

gen glass "Apple product pages, Igloo Inc, and Family.co" \
  "Glass as an optical property, not glassmorphism. Look for real refraction and blur over live media, where what is behind is genuinely behind. Record backdrop-filter values, blur radii, saturation, and how they keep text legible over moving backgrounds. That last one is the client's live P0 bug, so collect every technique you find for it. Also record what the frosted-card-with-a-white-border trend does differently, because that is the failure mode to avoid."

gen orbit "Bruno Simon, Active Theory, Lusion, and Awwwards 3D sites of the day" \
  "WebGL craft for a 3D gallery you drag to spin. Collect the mechanics: orbit damping values, polar clamps, idle auto-rotate speeds, how they hand off between auto and user input, how they stop a canvas from eating page scroll on touch, focus and modal states over a live canvas, and what they do at prefers-reduced-motion. Numbers, not impressions. Note frame cost of any full-canvas blur."

gen ethics "Anduril, Palantir, Patagonia, and two Delaware PBCs of your choosing" \
  "How a company with an uncomfortable subject earns trust, and how it loses it. Anduril and Palantir are the two poles: one leans in, one is the name people flinch at. Work out what causes the flinch specifically, at the level of sentences and images, not vibes. Then the mission-forward companies: how do they state an ethos without sanctimony, and what is the difference between a procedure and an adjective? Also record exactly how a real PBC states its status, because the client is not one and must never imply it."

echo "Done. 15 scouts written."
