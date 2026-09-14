import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DATASET_PAGE } from "@/src/content/dataset-page";
import { ETHOS_COPY } from "@/src/content/ethos";
import { DormantAsk } from "@/components/sections/dormant-contact";
import {
  PaperPage,
  PaperSection,
  bodyStep,
  bulletList,
  muted,
  smallStep,
  title,
} from "@/components/paper/paper";

export const metadata: Metadata = {
  title: DATASET_PAGE.meta.title,
  description: DATASET_PAGE.meta.description,
  openGraph: {
    title: DATASET_PAGE.meta.title,
    description: DATASET_PAGE.meta.description,
  },
};

// /dataset, the record. Redesigned 2026-09-14 at the founder's request
// ("make it like the other tab"): the same plain single-column document as
// the white paper at /research, shared through components/paper/paper.tsx.
// The forest bands, numbered plates and spec ledger are gone; the schema
// and the consent stack read as plain lists, the entity line moves to the
// colophon. Every string ships verbatim from DATASET_PAGE (F-0013).
const SECTIONS = [
  { id: "schema", label: DATASET_PAGE.schemaTitle },
  { id: "consent", label: DATASET_PAGE.stackTitle },
  { id: "capture", label: DATASET_PAGE.captureTitle },
  { id: "window", label: DATASET_PAGE.windowTitle },
  { id: "offer", label: DATASET_PAGE.offerTitle },
] as const;

type DatasetSectionId = (typeof SECTIONS)[number]["id"];

export default function DatasetPage() {
  // Keyed by section id so a section without a body is a type error.
  const bodies: Record<DatasetSectionId, ReactNode> = {
    schema: (
      <>
        <ul className={bulletList}>
          {DATASET_PAGE.schema.map((item) => (
            <li key={item} className={bodyStep}>
              {item}
            </li>
          ))}
        </ul>
        <p className={`${smallStep} ${muted}`}>{DATASET_PAGE.schemaCompat}</p>
      </>
    ),

    consent: (
      <ul className={bulletList}>
        {DATASET_PAGE.stack.map((item) => (
          <li key={item} className={bodyStep}>
            {item}
          </li>
        ))}
      </ul>
    ),

    capture: <p className={bodyStep}>{DATASET_PAGE.captureSpecs}</p>,

    window: <p className={bodyStep}>{DATASET_PAGE.window}</p>,

    offer: (
      <>
        <p className={bodyStep}>{DATASET_PAGE.offer}</p>
        <DormantAsk line={ETHOS_COPY.footer.askEcho} className={bodyStep} />
      </>
    ),
  };

  return (
    <PaperPage
      colophon={DATASET_PAGE.entityLine}
      links={[
        { href: "/", label: ETHOS_COPY.footer.homeLabel },
        { href: "/research", label: ETHOS_COPY.footer.whitePaperLabel },
      ]}
    >
      <h1 className={title}>{DATASET_PAGE.heading}</h1>

      <p className={`mt-16 ${bodyStep}`}>{DATASET_PAGE.intro}</p>

      <div className="mt-16 space-y-16">
        {SECTIONS.map((section) => (
          <PaperSection key={section.id} id={section.id} label={section.label}>
            {bodies[section.id]}
          </PaperSection>
        ))}
      </div>
    </PaperPage>
  );
}
