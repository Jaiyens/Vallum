import Link from "next/link";
import { SECTION_IDS } from "@/lib/site";
import { DATASET_COPY } from "@/src/content/sections";

// Beat 5, "The record" (renamed from "What ships with every clip", Jay's
// correction: this is a designed schema artifact, not two text lists).
// Cream spec slab (redesign/blocks-v2): forest is rationed to the stat
// slab, the ethos slab, and the footer strip, so the record reads as a
// datasheet on bone — hairline-ruled rows, mono indices, no cards. The
// 8-field schema renders as numbered rows at compact scale, matching
// /dataset's full treatment; the consent stack folds down to a quieter
// secondary list beneath it, not a second parallel column. Closes with a
// quiet in-place link to /dataset (F-0306): the moment interest in the
// schema and consent detail peaks, not a button.
export function DatasetSection() {
  return (
    <section
      id={SECTION_IDS.data}
      className="scroll-mt-14 bg-bone text-black"
    >
      <div className="mx-auto max-w-site px-6 py-16 md:px-16 md:py-48">
        <h2 className="max-w-[1040px] font-display text-[32px] leading-[1.08] tracking-[-0.01em] text-balance md:text-[44px] lg:text-[56px]">
          {DATASET_COPY.heading}
        </h2>
        <p className="mt-16 max-w-[640px] text-[17px] leading-[1.65]">
          {DATASET_COPY.lead}
        </p>

        <div className="mt-16 md:mt-24">
          <h3 className="font-sans text-[14px] font-medium leading-[1.5] text-black/62">
            {DATASET_COPY.schemaTitle}
          </h3>
          <ol className="mt-6 border-t border-forest-line md:grid md:grid-cols-2 md:gap-x-16">
            {DATASET_COPY.schema.map((item, i) => (
              <li
                key={item}
                className="flex gap-6 border-b border-forest-line/40 py-6 text-[17px] leading-[1.65]"
              >
                <span className="w-6 shrink-0 font-mono text-[13px] leading-[1.9] tabular-nums text-black/62">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 max-w-[640px]">
          <h3 className="font-sans text-[14px] font-medium leading-[1.5] text-black/62">
            {DATASET_COPY.stackTitle}
          </h3>
          <ul className="mt-6 space-y-2">
            {DATASET_COPY.stack.map((item) => (
              <li key={item} className="text-[15px] leading-[1.65] text-black/76">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 max-w-[640px] border-t border-forest-line pt-8 md:mt-24">
          <h3 className="font-sans text-[14px] font-medium leading-[1.5] text-black/62">
            {DATASET_COPY.offerTitle}
          </h3>
          <p className="mt-6 text-[17px] leading-[1.65]">{DATASET_COPY.offer}</p>
          <Link
            href="/dataset"
            className="mt-6 inline-block font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
          >
            Read the full dataset record
          </Link>
        </div>
      </div>
    </section>
  );
}
