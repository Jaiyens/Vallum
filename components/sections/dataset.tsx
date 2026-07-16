import Link from "next/link";
import { SECTION_IDS } from "@/lib/site";
import { DATASET_COPY } from "@/src/content/sections";

// Beat 5, what ships. The dataset: schema, rights, and the offer. This is
// where specificity does the positioning work. Bone surface, server-safe.
// Closes with a quiet in-place link to /dataset (F-0306): the moment
// interest in the schema and consent detail peaks, not a button.
export function DatasetSection() {
  return (
    <section
      id={SECTION_IDS.data}
      className="scroll-mt-14 border-t border-forest-line/30 bg-bone text-black"
    >
      <div className="mx-auto max-w-site px-4 py-section-sm md:px-6 md:py-44">
        <h2 className="max-w-3xl font-display text-3xl font-bold text-balance font-stretch-expanded md:text-5xl">
          {DATASET_COPY.heading}
        </h2>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed md:mt-14">
          {DATASET_COPY.lead}
        </p>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
          <div>
            <h3 className="font-mono text-sm text-forest-line">
              {DATASET_COPY.schemaTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {DATASET_COPY.schema.map((item) => (
                <li
                  key={item}
                  className="border-t border-forest-line/30 pt-4 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-sm text-forest-line">
              {DATASET_COPY.stackTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {DATASET_COPY.stack.map((item) => (
                <li
                  key={item}
                  className="border-t border-forest-line/30 pt-4 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 max-w-2xl">
          <h3 className="font-mono text-sm text-forest-line">
            {DATASET_COPY.offerTitle}
          </h3>
          <p className="mt-6 text-lg leading-relaxed">{DATASET_COPY.offer}</p>
          <Link
            href="/dataset"
            className="mt-6 inline-block underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
          >
            Read the full dataset record
          </Link>
        </div>
      </div>
    </section>
  );
}
