"use client";

import dynamic from "next/dynamic";
import { SECTION_COPY } from "./callouts";
import { RigClosedPoster, RigMobileBlock, RigPinnedGrid } from "./rig-static";
import { SECTION_IDS } from "@/lib/site";

// Reserved-height shell shown while the client chunk loads. It renders the
// same static markup with the same classes as the live section, so the
// hydration swap moves nothing. Script-less visitors keep this shell
// forever: the <noscript> block collapses the pin, swaps the closed poster
// for the exploded still, and unhides the anchor dots.
function FutureRigFallback() {
  return (
    <section
      id={SECTION_IDS.rig}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <noscript>
        <style>{`
          .rig-pin{height:auto!important}
          .rig-sticky{position:static!important;height:auto!important}
          .rig-poster{display:none!important}
          .rig-exploded-static{display:block!important}
          .rig-dot{opacity:1!important}
        `}</style>
      </noscript>
      <div className="mx-auto max-w-site px-4 md:px-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-panel border border-border px-2.5 py-1 font-mono text-xs text-paper/90">
          <span aria-hidden="true" className="size-1.5 bg-hazard" />
          {SECTION_COPY.eyebrow}
        </p>
        <h2 className="max-w-3xl font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl">
          {SECTION_COPY.headline}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-fog">{SECTION_COPY.subline}</p>
        <p className="mt-2 max-w-xl text-sm text-fog">{SECTION_COPY.bridge}</p>

        <RigPinnedGrid
          visual={
            <div className="absolute inset-0 motion-reduce:hidden">
              <RigClosedPoster />
            </div>
          }
        />
        <RigMobileBlock />
      </div>
    </section>
  );
}

const FutureRigSection = dynamic(
  () => import("./FutureRigSection").then((m) => m.FutureRigSection),
  { ssr: false, loading: () => <FutureRigFallback /> },
);

export function FutureRigDynamic() {
  return <FutureRigSection />;
}
