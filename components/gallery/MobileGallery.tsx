"use client";

import { GALLERY_PANELS } from "@/src/content/gallery";
import { GALLERY_VIDEO } from "@/lib/assets";
import { StaticCenterLine } from "./gallery-static";

// Under 1024px there is no 3D. The centerpiece is a static centered line
// above a horizontal snap-scroll row of poster cards; no video elements
// mount until a takeover opens.
export function MobileGallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <div>
      <StaticCenterLine className="mb-8" />
      {/* data-lenis-prevent-wheel keeps Lenis from swallowing trackpad
          wheel gestures over the row, so horizontal wheel scrolling works
          on motion-enabled machines at sub-1024 widths. */}
      <div
        data-lenis-prevent-wheel
        className="gallery-row -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
      >
        {GALLERY_PANELS.map((panel, i) => {
          const asset = GALLERY_VIDEO[panel.id as keyof typeof GALLERY_VIDEO];
          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`${panel.industry}. ${panel.stat}`}
              className="relative aspect-[3/4] w-[64vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-panel"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.poster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute bottom-2 left-2 font-mono text-xs text-bone/90">
                {panel.industry}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
