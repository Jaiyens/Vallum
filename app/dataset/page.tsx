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

const headingStep =
  "font-display font-medium text-forest text-[22px] leading-[1.3] md:text-[24px] lg:text-[26px]";
const bodyStep = "text-[16px] leading-[1.65] md:text-[17px]";
const smallStep = "text-[14px] leading-[1.5] tracking-[0.01em]";
const rowRule = "border-t border-forest-line py-6 first:border-t-0 first:pt-0";

// /dataset, the specimen (Concept 1): the typeset provenance record a head
// of data forwards to counsel. Bone surface, rules and hairlines, never
// cards. Schema and provenance rows are static: they never move (F-0013).
// Every string ships verbatim from DATASET_PAGE; nothing here is authored.
export default function DatasetPage() {
  return (
    <main id="content" tabIndex={-1} className="min-h-dvh bg-bone text-black">
      <div className="mx-auto max-w-site px-6 py-16 md:px-16 md:py-32 lg:py-48">
        <h1 className="max-w-[1040px] font-display text-forest text-[32px] leading-[1.08] tracking-[-0.01em] md:text-[44px] lg:text-[56px]">
          {DATASET_PAGE.heading}
        </h1>
        <p className={`mt-2 ${smallStep} text-black/62`}>{DATASET_PAGE.entityLine}</p>
        <p className={`mt-16 max-w-[640px] ${bodyStep}`}>{DATASET_PAGE.intro}</p>

        <div className="mt-16 grid gap-16 md:grid-cols-2">
          <section className="border-t border-forest-line pt-6">
            <h2 className={headingStep}>{DATASET_PAGE.schemaTitle}</h2>
            <ul className="mt-6">
              {DATASET_PAGE.schema.map((item) => (
                <li key={item} className={`${rowRule} ${bodyStep}`}>
                  {item}
                </li>
              ))}
            </ul>
            <p className={`mt-6 ${smallStep} text-black/62`}>{DATASET_PAGE.schemaCompat}</p>
          </section>

          <section className="border-t border-forest-line pt-6">
            <h2 className={headingStep}>{DATASET_PAGE.stackTitle}</h2>
            <ul className="mt-6">
              {DATASET_PAGE.stack.map((item) => (
                <li key={item} className={`${rowRule} ${bodyStep}`}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-16 max-w-[640px] border-t border-forest-line pt-6">
          <h2 className={headingStep}>{DATASET_PAGE.captureTitle}</h2>
          <p className={`mt-6 ${bodyStep}`}>{DATASET_PAGE.captureSpecs}</p>
        </section>

        <section className="mt-16 max-w-[640px] border-t border-forest-line pt-6">
          <h2 className={headingStep}>{DATASET_PAGE.windowTitle}</h2>
          <p className={`mt-6 ${bodyStep}`}>{DATASET_PAGE.window}</p>
        </section>

        <section className="mt-16 max-w-[640px] border-t border-forest-line pt-6">
          <h2 className={headingStep}>{DATASET_PAGE.offerTitle}</h2>
          <p className={`mt-6 ${bodyStep}`}>{DATASET_PAGE.offer}</p>
        </section>

        <div className="mt-16 flex max-w-[640px] flex-col gap-6 border-t border-forest-line pt-6">
          <DormantAsk line={ETHOS_COPY.footer.askEcho} className={bodyStep} />
          <Link
            href="/"
            className="w-fit text-[14px] font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
          >
            {ETHOS_COPY.footer.homeLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
