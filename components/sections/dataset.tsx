import Link from "next/link";
import { SECTION_IDS } from "@/lib/site";
import { DATASET_COPY } from "@/src/content/sections";

// Beat 5, "The record" (renamed from "What ships with every clip", Jay's
// correction: this is a designed schema artifact, not two text lists).
// Forest surface: feeds the cream-to-green rhythm into beat 6's ethos band
// (bone, forest, forest is fine per art-director, turn/method stay bone
// ahead of it). The 8-field schema renders as numbered mono plates at
// compact scale, matching /dataset's full treatment; the consent stack
// folds down to a quieter secondary list beneath it, not a second parallel
// column. Closes with a quiet in-place link to /dataset (F-0306): the
// moment interest in the schema and consent detail peaks, not a button.
export function DatasetSection() {
  return (
    <section
      id={SECTION_IDS.data}
      className="scroll-mt-14 border-t border-bone/24 bg-forest text-bone-hi"
    >
      <div className="mx-auto max-w-site px-4 py-section-sm md:px-6 md:py-44">
        <h2 className="max-w-3xl font-display text-3xl font-bold text-balance font-stretch-expanded md:text-5xl">
          {DATASET_COPY.heading}
        </h2>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone-hi/94 md:mt-14">
          {DATASET_COPY.lead}
        </p>

        <div className="mt-16 md:mt-20">
          <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] text-bone/60">
            {DATASET_COPY.schemaTitle}
          </h3>
          <ol className="mt-6 border-t border-bone/15 md:grid md:grid-cols-2 md:gap-x-10">
            {DATASET_COPY.schema.map((item, i) => (
              <li
                key={item}
                className="flex gap-5 border-b border-bone/15 py-4 leading-relaxed"
              >
                <span className="w-5 shrink-0 font-mono text-[13px] tabular-nums text-bone/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 max-w-2xl">
          <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] text-bone/60">
            {DATASET_COPY.stackTitle}
          </h3>
          <ul className="mt-5 space-y-2.5">
            {DATASET_COPY.stack.map((item) => (
              <li key={item} className="text-[15px] leading-relaxed text-bone-hi/76">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 max-w-2xl border-t border-bone/24 pt-10 md:mt-20">
          <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] text-bone/60">
            {DATASET_COPY.offerTitle}
          </h3>
          <p className="mt-6 text-lg leading-relaxed">{DATASET_COPY.offer}</p>
          <Link
            href="/dataset"
            className="mt-6 inline-block underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
          >
            Read the full dataset record
          </Link>
        </div>
      </div>
    </section>
  );
}
