"use client";

import dynamic from "next/dynamic";
import { SECTION_COPY } from "./callouts";
import { SECTION_IDS } from "@/lib/site";

// Reserved-height shell shown while the client chunk loads. It mirrors the
// section's real dimensions so the swap causes no layout shift.
function FutureRigFallback() {
  return (
    <section
      id={SECTION_IDS.rig}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
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
        <div className="mt-14 hidden aspect-[1200/680] lg:block" />
        <div className="mt-12 lg:hidden">
          <div className="mx-auto aspect-[740/600] max-w-xl" />
          <div className="mt-10 min-h-[52rem]" />
        </div>
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
