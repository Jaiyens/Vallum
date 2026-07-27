"use client";

import type { RefObject } from "react";
import { GALLERY_PANELS } from "@/src/content/gallery";
import { Centerpiece } from "./Centerpiece";
import { GalleryPanel } from "./GalleryPanel";
import { FOCUS_BLUR_S } from "./gallery-config";

// The 3D scene. DOM contract, in order: a flat clipping viewport (legal to
// clip and to filter, it carries no 3D transform, and panels at
// translateZ(--helix-radius) would otherwise overflow the page), a perspective
// wrapper, the tilted stage, the ring. PRESERVE-3D LAW: the stage and the ring
// never take overflow, opacity below 1, filter, or clip. Brightness and scale
// live on panel leaves only. The vignettes are siblings of the perspective
// wrapper for the same reason.
//
// Full bleed: the viewport spans the whole width so the 3D world never reads as
// an embed inside a bordered rectangle. Focus (Recipe B): when a panel opens,
// the viewport takes blur(14px) saturate(35%), so the whole scene steps back
// while the panel resolves forward in the takeover layer above it. The filter
// sits on the flat viewport, never on the 3D stage, so the depth sort survives.
export function HelixStage({
  stageRef,
  ringRef,
  centerRootRef,
  centerTextRef,
  onOpen,
  registerLeaf,
  dimmed,
}: {
  stageRef: RefObject<HTMLDivElement | null>;
  ringRef: RefObject<HTMLDivElement | null>;
  centerRootRef: RefObject<HTMLDivElement | null>;
  centerTextRef: RefObject<HTMLSpanElement | null>;
  onOpen: (index: number) => void;
  registerLeaf: (index: number, el: HTMLDivElement | null) => void;
  dimmed: boolean;
}) {
  return (
    <div
      data-helix-viewport
      className="relative overflow-clip"
      style={{
        height: "clamp(560px, 78vh, 840px)",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        filter: dimmed ? "blur(14px) saturate(35%)" : "blur(0px) saturate(100%)",
        transition: `filter ${FOCUS_BLUR_S}s cubic-bezier(0.2,0,0,1)`,
      }}
    >
      <div className="absolute inset-0" style={{ perspective: "1900px" }}>
        <div
          ref={stageRef}
          data-helix-stage
          className="absolute inset-0 cursor-grab select-none"
          style={{
            // Vertical centering rides the CSS translate property, which
            // composes before the GSAP-owned transform; GSAP owns rotateX
            // (the polar tilt), so the two never fight.
            translate: "0 calc(-3.5 * var(--helix-rise))",
            transformStyle: "preserve-3d",
            touchAction: "pan-y",
          }}
        >
          {/* Orbital rings on two inclinations: Saturn plus atom, the coverage
              motif. Static guides on the stage (they tilt with the polar axis
              but do not spin), forest-line, quiet. Decorative, aria-hidden. */}
          <HelixRings />
          <div
            ref={ringRef}
            data-helix-ring
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* The heading reads first for assistive tech; paint order in
                preserve-3d is depth-based, so DOM order costs nothing. */}
            <Centerpiece rootRef={centerRootRef} textRef={centerTextRef} />
            {GALLERY_PANELS.map((panel, i) => (
              <GalleryPanel
                key={panel.id}
                panel={panel}
                index={i}
                onOpen={onOpen}
                registerLeaf={registerLeaf}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Side vignettes: ink fading to nothing masks panels rotating away so
          the object reads solid against the beat's ink surface. Siblings of the
          3D scene, never on the stage or ring. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[14%] bg-gradient-to-r from-black to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[14%] bg-gradient-to-l from-black to-transparent"
      />
    </div>
  );
}

function HelixRings() {
  const ring = (transform: string) => (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: "calc(2 * var(--helix-radius))",
        height: "calc(2 * var(--helix-radius))",
        translate: "-50% -50%",
        transform,
        border: "1px solid rgba(44,68,54,0.55)",
        transformStyle: "preserve-3d",
      }}
    />
  );
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      {ring("rotateX(76deg)")}
      {ring("rotateX(76deg) rotateZ(58deg)")}
    </div>
  );
}
