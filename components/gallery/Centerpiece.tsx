"use client";

import { useMemo, type RefObject } from "react";
import { GALLERY_CENTERPIECE } from "@/src/content/gallery";

// The typewriter line on the helix axis. A child of the ring at translateZ
// zero; the rotation controller counter-rotates it every frame from the
// same value source as the ring, so it always faces the viewer while
// panels orbit and briefly occlude it. That occlusion is intended.
//
// The box is pre-sized in ch units to the longest full line. JetBrains
// Mono is monospaced, so ch sizing is metric-exact and nothing shifts
// while the machine types into the span. The container is the section's
// only heading and carries the aria label; the churning characters stay
// hidden from assistive tech.
export function Centerpiece({
  rootRef,
  textRef,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  textRef: RefObject<HTMLSpanElement | null>;
}) {
  const widthCh = useMemo(() => {
    const longest = Math.max(
      ...GALLERY_CENTERPIECE.lines.map(
        (line) => (GALLERY_CENTERPIECE.stem + line).length,
      ),
    );
    return longest + 1.2; // room for the block caret
  }, []);

  return (
    <div
      ref={rootRef}
      data-centerpiece
      role="heading"
      aria-level={2}
      aria-label={GALLERY_CENTERPIECE.ariaLabel}
      className="absolute left-1/2"
      style={{
        top: "calc(50% + 3.5 * var(--helix-rise))",
        // CSS translate composes before the GSAP-owned transform, so the
        // box is centered from first paint and the per-frame rotationY
        // write never disturbs it.
        translate: "-50% -50%",
      }}
    >
      <div
        aria-hidden="true"
        className="whitespace-pre text-left font-mono text-bone"
        style={{
          fontSize: "clamp(20px, 2.2vw, 34px)",
          width: `${widthCh}ch`,
        }}
      >
        <span ref={textRef} data-centerpiece-text />
        <span
          className="gallery-caret inline-block w-[0.6ch] translate-y-[0.12em] bg-green-signal"
          style={{ height: "1em" }}
        />
      </div>
    </div>
  );
}
