"use client";

import dynamic from "next/dynamic";
import { SECTION_COPY } from "./callouts";
import { rigDisplayFont } from "./rig-font";
import { RigClosedPoster, RigMobileBlock, RigPinnedStage } from "./rig-static";
import { SECTION_IDS } from "@/lib/site";

// Reserved-height shell shown while the client chunk loads. It renders the
// same static markup with the same classes as the live section, so the
// hydration swap moves nothing. Script-less visitors keep this shell
// forever: the <noscript> block collapses the pin and swaps the closed
// poster for the exploded still.
function FutureRigFallback() {
  return (
    <section
      id={SECTION_IDS.rig}
      className="scroll-mt-14 border-t border-forest-line/30 bg-bone py-section-sm text-black md:py-section"
    >
      <noscript>
        <style>{`
          .rig-pin{height:auto!important}
          .rig-sticky{position:static!important;height:auto!important}
          .rig-poster{display:none!important}
          .rig-exploded-static{display:block!important}
        `}</style>
      </noscript>
      <div className="mx-auto max-w-site px-4 md:px-6">
        <h2
          className={`${rigDisplayFont.className} max-w-[1040px] text-balance text-forest text-[32px] leading-[1.08] tracking-[-0.01em] md:text-[44px] lg:text-[56px]`}
        >
          {SECTION_COPY.headline}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-forest-line">{SECTION_COPY.subline}</p>
        <p className="mt-2 max-w-xl text-sm text-forest-line">{SECTION_COPY.bridge}</p>

        <RigPinnedStage
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
