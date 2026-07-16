"use client";

import dynamic from "next/dynamic";
import { SECTION_IDS } from "@/lib/site";
import { GALLERY_PANELS } from "@/src/content/gallery";
import { GALLERY_VIDEO } from "@/lib/assets";
import { PosterGrid, StaticCenterLine } from "./gallery-static";

// Reserved shell shown while the client chunk loads, shaped per breakpoint
// so the hydration swap moves nothing: at lg and up it mirrors the helix
// viewport's reserved height with the poster grid inside; below lg it
// mirrors the mobile snap row's silhouette at natural height. Script-less
// visitors keep this shell forever; their noscript style swaps to the full
// grid with each panel's stat as static text, since the takeover can never
// open for them.
function GalleryFallback() {
  return (
    <section
      id={SECTION_IDS.problem}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <noscript>
        <style>{`
          .gallery-shell{height:auto!important;overflow:visible!important}
          .gallery-nojs-copy{display:block!important}
          .gallery-fallback-mobile{display:none!important}
          .gallery-fallback-grid{display:block!important}
        `}</style>
      </noscript>
      <div className="mx-auto max-w-site px-4 md:px-6">
        <div className="gallery-fallback-mobile lg:hidden">
          <StaticCenterLine className="mb-8" />
          <div className="-mx-4 flex gap-4 overflow-hidden px-4 pb-4">
            {GALLERY_PANELS.map((panel) => {
              const asset = GALLERY_VIDEO[panel.id];
              return (
                <div
                  key={panel.id}
                  className="relative aspect-[3/4] w-[64vw] max-w-[300px] shrink-0 overflow-hidden rounded-panel"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.poster}
                    alt={asset.label}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 font-mono text-xs text-bone/90">
                    {panel.industry}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="gallery-fallback-grid hidden lg:block">
          <div
            className="gallery-shell overflow-hidden"
            style={{ height: "clamp(560px, 78vh, 840px)" }}
          >
            <StaticCenterLine className="mb-10" />
            <PosterGrid withNoJsCopy />
          </div>
        </div>
      </div>
    </section>
  );
}

const GallerySection = dynamic(
  () => import("./GallerySection").then((m) => m.GallerySection),
  { ssr: false, loading: () => <GalleryFallback /> },
);

export function GalleryDynamic() {
  return <GallerySection />;
}
