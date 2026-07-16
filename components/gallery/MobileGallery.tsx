"use client";

import { GALLERY_PANELS, panelLabel } from "@/src/content/gallery";
import { GALLERY_VIDEO } from "@/lib/assets";
import { StaticCenterLine } from "./gallery-static";

// Under 1024px there is no 3D. The centerpiece is a static centered line above
// a horizontal snap-scroll row of poster cards; no video elements mount until a
// takeover opens. The row keeps touch-action auto: it scrolls horizontally
// because it overflows on x, and a vertical swipe falls through to page scroll
// because it has no vertical overflow. Forcing pan-x here would cancel a
// vertical gesture outright and trap the phone reader, so it is left off.
export function MobileGallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <div>
      <StaticCenterLine className="mb-8" />
      {/* data-lenis-prevent-wheel keeps Lenis from swallowing trackpad wheel
          gestures over the row, so horizontal wheel scrolling works on
          motion-enabled machines at sub-1024 widths. Lenis's stylesheet also
          stamps overscroll-behavior: contain on that attribute, which would
          trap a vertical touch inside the row; the override below lets a
          vertical swipe chain back to page scroll while keeping the horizontal
          axis contained. */}
      <div
        data-lenis-prevent-wheel
        style={{ overscrollBehaviorX: "contain", overscrollBehaviorY: "auto" }}
        className="gallery-row -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 pb-4"
      >
        {GALLERY_PANELS.map((panel, i) => {
          const asset = GALLERY_VIDEO[panel.id as keyof typeof GALLERY_VIDEO];
          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => onOpen(i)}
              aria-label={panelLabel(panel)}
              className="relative aspect-[3/4] w-[64vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.poster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute bottom-2 left-2 text-sm text-bone">
                {panel.industry}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
