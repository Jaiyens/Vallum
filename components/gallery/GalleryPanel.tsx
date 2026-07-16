"use client";

import { AutoPauseVideo } from "@/components/media/auto-pause-video";
import { GALLERY_VIDEO } from "@/lib/assets";
import { type GalleryPanelContent, panelLabel } from "@/src/content/gallery";
import { STEP_DEG } from "./gallery-config";

// One helix slot. The slot div carries the static spiral transform; the
// ring's rotation does the spinning, so this transform never changes. The
// inner leaf is the only element that takes brightness and scale, and it is
// the node the takeover Flip borrows. The poster img is a sibling of the
// leaf so the slot never goes black while the leaf is away, and it doubles
// as the guaranteed first paint under preload="none".
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
      className="absolute left-1/2 top-1/2 w-[clamp(190px,16vw,250px)]"
      style={{
        transform: `translate(-50%, -50%) rotateY(${index * STEP_DEG}deg) translateZ(var(--helix-radius)) translateY(calc(${index} * var(--helix-rise)))`,
      }}
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
      </button>
    </div>
  );
}
