"use client";

import type { CSSProperties } from "react";
import { AutoPauseVideo } from "@/components/media/auto-pause-video";
import { GALLERY_VIDEO } from "@/lib/assets";
import { type GalleryPanelContent, panelLabel } from "@/src/content/gallery";
import { STEP_DEG } from "./gallery-config";

// One helix slot. The slot div carries the slot transform; the ring's
// rotation does the spinning. The only moving part is the wave: a vertical
// offset proportional to the cosine of the slot's angle from front, so a
// panel sinks to its lowest point as it passes in front of the centerpiece
// and climbs to its highest behind it. The
// inner leaf is the only element that takes brightness and scale, and it is
// the node the takeover Flip borrows. The poster img is a sibling of the
// leaf so the slot never goes black while the leaf is away, and it doubles
// as the guaranteed first paint under preload="none".
//
// The stat band (Recipe A, the same mechanism the centerpiece uses) rides the
// lower portion of every panel: backdrop-filter blur plus desaturate over an
// ink-tinted band, no border, no shadow. It is a sibling of the leaf, so it
// stays put when the leaf is borrowed by a takeover, and it holds the industry
// label (mono, small) and the headline number (bone, readable) legible while
// the panel orbits. The full stat and source ride the click takeover.
export function GalleryPanel({
  panel,
  index,
  onOpen,
  registerLeaf,
}: {
  panel: GalleryPanelContent;
  index: number;
  onOpen: (index: number) => void;
  registerLeaf: (index: number, el: HTMLDivElement | null) => void;
}) {
  const asset = GALLERY_VIDEO[panel.id as keyof typeof GALLERY_VIDEO];
  return (
    <div
      data-panel
      // pointer-events auto: the stage and the ring above it are none, so
      // a click reaches a back-half panel instead of the ring's own plane.
      className="pointer-events-auto absolute left-1/2 top-1/2 w-[clamp(190px,16vw,250px)]"
      style={
        {
          // --panel-wave is the cosine of this slot's angle from front,
          // written every frame by the controller; the inline value is the
          // pose at azimuth zero so the first paint already rides the wave.
          "--panel-wave": Math.cos((index * STEP_DEG * Math.PI) / 180).toFixed(4),
          transform: `translate(-50%, -50%) rotateY(${index * STEP_DEG}deg) translateZ(var(--helix-radius)) translateY(calc(${index} * var(--helix-rise) + var(--panel-wave) * var(--helix-wave) * var(--helix-radius)))`,
        } as CSSProperties
      }
    >
      <button
        type="button"
        aria-label={panelLabel(panel)}
        onClick={() => onOpen(index)}
        className="relative block aspect-[3/4] w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full rounded-panel object-cover"
        />
        {/* The leaf paints dimmed; the controller brightens the focused
            one once it takes over. */}
        <div
          ref={(el) => registerLeaf(index, el)}
          data-panel-leaf
          className="absolute inset-0 overflow-hidden rounded-panel"
          style={{ filter: "brightness(0.75)" }}
        >
          <AutoPauseVideo
            asset={asset}
            deferPlay
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        {/* Recipe A stat band. Sits above the leaf and poster so it reads while
            the panel orbits; sibling of the leaf so it stays when the takeover
            borrows the leaf. Ink tint carries the legibility even if a browser
            drops backdrop-filter inside the 3D subtree; the blur is polish. */}
        <div
          data-panel-band
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 rounded-b-panel px-3 pb-2.5 pt-2 text-left"
          style={{
            backgroundColor: "rgba(12,11,9,0.62)",
            WebkitBackdropFilter: "blur(20px) saturate(50%)",
            backdropFilter: "blur(20px) saturate(50%)",
          }}
        >
          <span className="block font-mono text-[10px] leading-none tracking-wide text-bone-dim">
            {panel.industry}
          </span>
          <span
            data-panel-headline
            className="mt-1.5 block font-display font-medium leading-tight text-bone"
            style={{ fontSize: "clamp(13px, 1.05vw, 16px)" }}
          >
            {panel.headline}
          </span>
        </div>
      </button>
    </div>
  );
}
