"use client";

import { PosterGrid, StaticCenterLine } from "./gallery-static";
import { GALLERY_PANELS } from "@/src/content/gallery";

// Reduced motion: no typing anywhere, no autorotate, no inertia. The
// centerpiece resolves to stem plus line one, and the panels sit in a
// static keyboard-focusable grid; Enter opens the takeover.
export function ReducedGallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <div>
      <StaticCenterLine className="mb-10" />
      <PosterGrid
        showStat
        onOpen={(panelId) =>
          onOpen(GALLERY_PANELS.findIndex((p) => p.id === panelId))
        }
      />
    </div>
  );
}
