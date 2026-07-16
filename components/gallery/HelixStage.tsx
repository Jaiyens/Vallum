"use client";

import type { RefObject } from "react";
import { GALLERY_PANELS } from "@/src/content/gallery";
import { Centerpiece } from "./Centerpiece";
import { GalleryPanel } from "./GalleryPanel";
import { PROXY_DROP_PX } from "./gallery-config";

// The 3D scene. DOM contract, in order: a flat clipping viewport (legal to
// clip, it carries no 3D transform, and panels at translateZ(--helix-radius)
// would otherwise overflow the page), a perspective wrapper, the tilted
// stage, the ring. PRESERVE-3D LAW: the stage and the ring never take
// overflow, opacity below 1, filter, or clip. Brightness and scale live on
// panel leaves only. The vignettes and the drag proxy are siblings of the
// perspective wrapper for the same reason.
export function HelixStage({
  stageRef,
  ringRef,
  proxyRef,
  centerRootRef,
  centerTextRef,
  onOpen,
  registerLeaf,
}: {
  stageRef: RefObject<HTMLDivElement | null>;
  ringRef: RefObject<HTMLDivElement | null>;
  proxyRef: RefObject<HTMLDivElement | null>;
  centerRootRef: RefObject<HTMLDivElement | null>;
  centerTextRef: RefObject<HTMLSpanElement | null>;
  onOpen: (index: number) => void;
  registerLeaf: (index: number, el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      data-helix-viewport
      className="relative overflow-clip"
      style={{ height: "clamp(560px, 78vh, 840px)" }}
    >
      <div className="absolute inset-0" style={{ perspective: "1900px" }}>
        <div
          ref={stageRef}
          data-helix-stage
          className="absolute inset-0 cursor-grab select-none"
          style={{
            // The -3.5 rise shift centers the spiral's vertical span in the
            // viewport; it collapses to zero with the flat-ring switch.
            transform:
              "translateY(calc(-3.5 * var(--helix-rise))) rotateX(-4deg)",
            transformStyle: "preserve-3d",
            touchAction: "pan-y",
          }}
        >
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
      {/* Side vignettes: green-deep fading to nothing masks panels rotating
          away so the object reads solid. Siblings of the 3D scene, never on
          the stage or ring. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[16%] bg-gradient-to-r from-green-deep/85 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[16%] bg-gradient-to-l from-green-deep/85 to-transparent"
      />
      {/* Invisible Draggable proxy. Its pivot sits far below the stage so a
          horizontal drag across the stage is a shallow, consistent arc. */}
      <div
        ref={proxyRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: `calc(100% + ${PROXY_DROP_PX}px)`,
          width: 1,
          height: 1,
          visibility: "hidden",
        }}
      />
    </div>
  );
}
