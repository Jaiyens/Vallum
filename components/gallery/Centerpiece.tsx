"use client";

import { type RefObject } from "react";
import { GALLERY_CENTERPIECE } from "@/src/content/gallery";

// The typewriter line on the helix axis. A child of the ring at translateZ
// zero; the rotation controller counter-rotates it every frame from the same
// value source as the ring, so it always faces the viewer while panels orbit
// and briefly occlude it. That occlusion is intended and is the whole reason
// the legibility fix is glass, not a box.
//
// Recipe A glass band (LOOK.md): a full-canvas-width horizontal stripe riding
// the text block, backdrop-filter blur(24px) saturate(50%) over an ink-35
// tint, no border, no shadow, no radius. Panels in front still occlude it;
// panels crossing behind it are blurred, so bone text holds contrast against
// every frame.
//
// Zero layout shift with a proportional display face: all three full lines are
// stacked invisibly in one grid cell, so the box is pre-sized to the widest
// line by real font metrics, not by ch counting. The machine types into an
// overlay in the same cell; nothing reflows. The block caret is forest-line,
// never amber.
export function Centerpiece({
  rootRef,
  textRef,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  textRef: RefObject<HTMLSpanElement | null>;
}) {
  const { stem, lines, ariaLabel } = GALLERY_CENTERPIECE;
  const fontSize = "clamp(30px, 3.6vw, 56px)";

  return (
    <div
      ref={rootRef}
      data-centerpiece
      role="heading"
      aria-level={2}
      aria-label={ariaLabel}
      className="absolute left-0 right-0"
      style={{
        // Vertical center of the ring; CSS translate composes before the
        // GSAP-owned rotation, so the box is centered from first paint and the
        // per-frame rotationY write never disturbs it.
        top: "calc(50% + 3.5 * var(--helix-rise))",
        translate: "0 -50%",
      }}
    >
      <div
        aria-hidden="true"
        data-centerpiece-band
        className="w-full"
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          backgroundColor: "rgba(12,11,9,0.35)",
          WebkitBackdropFilter: "blur(24px) saturate(50%)",
          backdropFilter: "blur(24px) saturate(50%)",
        }}
      >
        <div
          data-centerpiece-textbox
          className="mx-auto grid w-fit font-display text-bone"
          style={{ fontSize, lineHeight: 1.08, fontWeight: 400 }}
        >
          {/* Ghosts reserve the widest line's box; never painted. */}
          {lines.map((line, i) => (
            <span
              key={i}
              className="invisible col-start-1 row-start-1 whitespace-pre"
            >
              {stem + line}
            </span>
          ))}
          {/* The typed overlay shares the cell, left-aligned so keystrokes
              grow rightward under the block caret. */}
          <span className="col-start-1 row-start-1 whitespace-pre">
            <span ref={textRef} data-centerpiece-text />
            <span
              className="gallery-caret inline-block w-[0.5ch] translate-y-[0.08em] bg-forest-line align-baseline"
              style={{ height: "0.92em" }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
