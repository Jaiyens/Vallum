import type { Metadata } from "next";
import Link from "next/link";
import { DATASET_PAGE } from "@/src/content/dataset-page";
import { ETHOS_COPY } from "@/src/content/ethos";
import { DormantAsk } from "@/components/sections/dormant-contact";

export const metadata: Metadata = {
  title: DATASET_PAGE.meta.title,
  description: DATASET_PAGE.meta.description,
  openGraph: {
    title: DATASET_PAGE.meta.title,
    description: DATASET_PAGE.meta.description,
  },
};

const bodyStep = "text-[16px] leading-[1.65] md:text-[17px]";
const smallStep = "text-[14px] leading-[1.5] tracking-[0.01em]";
const monoLabel = "font-mono text-[12px] uppercase tracking-[0.08em]";
const headingDark =
  "font-display text-forest text-[22px] leading-[1.3] md:text-[24px] lg:text-[26px]";
const headingLight =
  "font-display text-bone-hi text-[22px] leading-[1.3] md:text-[24px] lg:text-[26px]";

// /dataset, the specimen: a typeset provenance record. Page rhythm is
// forest, bone, forest, bone (LOOK.md, art-director correction): forest
// bands carry the entity's voice and the sequential consent stack as
// numbered plates, bone bands carry the designed schema plate and the
// compact spec ledger. Hairlines throughout, never cards, radius 2px max.
// Forest bands are flat and matte: no gradient, no vignette. Every string
// ships verbatim from DATASET_PAGE; nothing here is authored (F-0013).
export default function DatasetPage() {
  return (
    <main id="content" tabIndex={-1} className="min-h-dvh bg-bone text-black">
      {/* Forest band 1: identity. Generous height, flat forest, bone ink. */}
      <section className="bg-forest text-bone-hi">
        <div className="mx-auto max-w-site px-6 py-section-sm md:px-16 md:py-section lg:py-44">
          <h1 className="max-w-[1040px] font-display text-[40px] leading-[1.05] tracking-[-0.01em] md:text-[60px] lg:text-[76px]">
            {DATASET_PAGE.heading}
          </h1>
          <p className={`mt-5 max-w-[640px] ${smallStep} text-bone/72`}>
            {DATASET_PAGE.entityLine}
          </p>
          <p
            className={`mt-10 max-w-[640px] border-t border-bone/15 pt-8 ${bodyStep} text-bone-hi/94`}
          >
            {DATASET_PAGE.intro}
          </p>
        </div>
      </section>

      {/* Bone band: the annotation schema as numbered mono plates, not two
          plain text columns. */}
      <section className="bg-bone text-black">
        <div className="mx-auto max-w-site px-6 py-16 md:px-16 md:py-24">
          <h2 className={headingDark}>{DATASET_PAGE.schemaTitle}</h2>
          <ol className="mt-8 border-t border-forest-line/30">
            {DATASET_PAGE.schema.map((item, i) => (
              <li
                key={item}
                className="flex gap-6 border-b border-forest-line/30 py-5 md:gap-10"
              >
                <span className="w-6 shrink-0 font-mono text-[13px] tabular-nums text-forest-line">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={bodyStep}>{item}</span>
              </li>
            ))}
          </ol>
          <p className={`mt-6 ${smallStep} text-black/62`}>{DATASET_PAGE.schemaCompat}</p>
        </div>
      </section>

      {/* Forest band 2: consent and provenance, its own band. Sequential,
          escalating items read as numbered plates (ui-refs-spec section 6). */}
      <section className="border-t border-bone/24 bg-forest text-bone-hi">
        <div className="mx-auto max-w-site px-6 py-16 md:px-16 md:py-24">
          <h2 className={headingLight}>{DATASET_PAGE.stackTitle}</h2>
          <ol className="mt-8 border-t border-bone/15">
            {DATASET_PAGE.stack.map((item, i) => (
              <li
                key={item}
                className="flex gap-6 border-b border-bone/15 py-5 md:gap-10"
              >
                <span className="w-6 shrink-0 font-mono text-[13px] tabular-nums text-bone/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`${bodyStep} text-bone-hi/94`}>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bone band: capture specs and the collection window as a compact
          spec ledger, then the offer as one quiet block. */}
      <section className="border-t border-bone/24 bg-bone text-black">
        <div className="mx-auto max-w-site px-6 py-16 md:px-16 md:py-24">
          <dl className="divide-y divide-forest-line/30 border-y border-forest-line/30">
            <div className="grid gap-2 py-6 md:grid-cols-[200px_1fr] md:gap-10">
              <dt className={`${monoLabel} text-forest-line`}>
                {DATASET_PAGE.captureTitle}
              </dt>
              <dd className={bodyStep}>{DATASET_PAGE.captureSpecs}</dd>
            </div>
            <div className="grid gap-2 py-6 md:grid-cols-[200px_1fr] md:gap-10">
              <dt className={`${monoLabel} text-forest-line`}>
                {DATASET_PAGE.windowTitle}
              </dt>
              <dd className={bodyStep}>{DATASET_PAGE.window}</dd>
            </div>
          </dl>

          <div className="mt-16 max-w-[640px]">
            <h2 className={headingDark}>{DATASET_PAGE.offerTitle}</h2>
            <p className={`mt-6 ${bodyStep}`}>{DATASET_PAGE.offer}</p>
          </div>

          <div className="mt-16 flex max-w-[640px] flex-col gap-6 border-t border-forest-line/30 pt-6">
            <DormantAsk line={ETHOS_COPY.footer.askEcho} className={bodyStep} />
            <Link
              href="/"
              className="w-fit text-[14px] font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
            >
              {ETHOS_COPY.footer.homeLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
