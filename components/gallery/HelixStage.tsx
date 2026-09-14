"use client";

import type { CSSProperties, RefObject } from "react";
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
      className="relative select-none overflow-clip"
      style={{
        // Fills the section, which is exactly 100svh in helix mode: the
        // stage owns the whole screen instead of a clamped inner band.
        height: "100%",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        filter: dimmed ? "blur(14px) saturate(35%)" : "blur(0px) saturate(100%)",
        transition: `filter ${FOCUS_BLUR_S}s cubic-bezier(0.2,0,0,1)`,
      }}
    >
      {/* Orbital rings on two inclinations: Saturn plus atom, the coverage
          motif. They get their own 3D context under the same camera, painted
          before the scene, instead of living on the stage: every ring box is
          a painted plane through the ring centre, and inside the scene's
          sort Chrome dropped whatever half of the centerpiece fell behind
          one (the typed line lost its top half once the flat ring put it on
          the centre line). Static guides (they tilt with the polar axis via
          the controller but do not spin), forest-line, quiet. */}
      <div className="absolute inset-0" style={CAMERA}>
        <div
          data-helix-guides
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <HelixRings />
        </div>
      </div>
      <div className="absolute inset-0" style={CAMERA}>
        <div
          ref={stageRef}
          data-helix-stage
          // pointer-events none: this box is a full-viewport plane at z=0
          // and, from the top view, its hit box sits in front of every
          // back-half panel. The flat viewport is the drag surface instead
          // (the controller's `input`); panels re-enable pointer events.
          className="pointer-events-none absolute inset-0"
          style={{
            // No translate here: GSAP owns this element's transform (rotateX,
            // the polar tilt) and would strip it. Framing is on the wrapper.
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={ringRef}
            data-helix-ring
            className="pointer-events-none absolute inset-0"
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
      {/* No side vignettes: LOOK.md bans CSS gradients everywhere and the
          slab rule wants hard edges — panels hard-clip at the viewport
          edge, which reads as the full-bleed 3D world continuing past the
          frame. */}
    </div>
  );
}

// The camera. Vertical framing lives on the perspective wrappers, which GSAP
// never touches: GSAP clears the CSS translate property on every element it
// transforms (CSSPlugin sets style.translate = "none"), so a translate on the
// stage silently never applied. Shifting a wrapper moves the camera and the
// scene together, a pure 2D shift of the rendered image: -3.5 rises re-centres
// a spiral's mean rise (zero while the ring is flat), --helix-lift raises the
// whole scene because the front panel dips low and projects large while the
// back panel rises and shrinks. --helix-fit zooms the rendered scene out on
// short windows; see the token block in globals.css. Shared by the scene and
// the guide rings so the two contexts can never drift apart.
const CAMERA: CSSProperties = {
  perspective: "1900px",
  translate: "0 calc(-3.5 * var(--helix-rise) - var(--helix-lift))",
  scale: "var(--helix-fit)",
};

function HelixRings() {
  const ring = (height: string, transform: string) => (
    <div
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: "calc(2 * var(--helix-radius))",
        height,
        translate: "-50% -50%",
        transform,
        border: "1px solid rgba(44,68,54,0.55)",
      }}
    />
  );
  return (
    <>
      {/* Saturn: the wave's own orbit. Panel centres ride the plane
          y = --helix-wave * z, an ellipse whose front-to-back axis is
          hypot(1, wave) times the radius, so this ring traces exactly the
          path the panels travel. */}
      {ring(
        "calc(2 * var(--helix-radius) * hypot(1, var(--helix-wave)))",
        "rotateX(calc(90deg - atan(var(--helix-wave))))",
      )}
      {ring("calc(2 * var(--helix-radius))", "rotateX(76deg) rotateZ(58deg)")}
    </>
  );
}
