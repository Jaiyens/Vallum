import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  RESEARCH_PAGE,
  RESEARCH_SECTIONS,
  type ResearchSectionId,
} from "@/src/content/research-page";
import { ETHOS_COPY } from "@/src/content/ethos";
import {
  PaperPage,
  PaperSection,
  bodyStep,
  bulletList,
  dataStep,
  link,
  muted,
  smallStep,
  title,
} from "@/components/paper/paper";

export const metadata: Metadata = {
  title: RESEARCH_PAGE.meta.title,
  description: RESEARCH_PAGE.meta.description,
  openGraph: {
    title: RESEARCH_PAGE.meta.title,
    description: RESEARCH_PAGE.meta.description,
  },
};

// Redesigned 2026-09-04 at the founder's request ("make it a normal white
// paper"). The document shell and its type steps live in
// components/paper/paper.tsx, shared with /dataset. Every string ships
// verbatim from research-page.ts (F-0013).
export default function ResearchPage() {
  // Keyed by section id so a section without a body is a type error.
  const bodies: Record<ResearchSectionId, ReactNode> = {
    team: <p className={bodyStep}>{RESEARCH_PAGE.team}</p>,

    hardware: <p className={bodyStep}>{RESEARCH_PAGE.hardware}</p>,

    operations: (
      <>
        <p className={bodyStep}>{RESEARCH_PAGE.operationsLead}</p>
        <ul className={bulletList}>
          {RESEARCH_PAGE.operationsTasks.map((task) => (
            <li key={task} className={bodyStep}>
              {task}
            </li>
          ))}
        </ul>
        <p className={`${smallStep} ${muted}`}>{RESEARCH_PAGE.operationsNext}</p>
      </>
    ),

    consent: <p className={bodyStep}>{RESEARCH_PAGE.consent}</p>,

    annotation: <p className={bodyStep}>{RESEARCH_PAGE.annotation}</p>,

    evaluation: <p className={bodyStep}>{RESEARCH_PAGE.evaluation}</p>,

    datasets: (
      <>
        <dl className="divide-y divide-forest-line/30 border-y border-forest-line/30">
          {RESEARCH_PAGE.datasets.map((set) => (
            <div
              key={set.name}
              className="grid gap-2 py-6 md:grid-cols-[120px_minmax(0,1fr)_84px] md:items-baseline md:gap-6"
            >
              <dt className={dataStep}>{set.name}</dt>
              <dd className={bodyStep}>{set.scope}</dd>
              <dd className={`${dataStep} ${muted} md:text-right`}>{set.due}</dd>
            </div>
          ))}
        </dl>
        <p className={`${smallStep} ${muted}`}>{RESEARCH_PAGE.datasetsNote}</p>
      </>
    ),

    farms: <p className={bodyStep}>{RESEARCH_PAGE.farms}</p>,

    labs: (
      <>
        <p className={bodyStep}>{RESEARCH_PAGE.labs}</p>
        <p className={bodyStep}>
          {RESEARCH_PAGE.askLead}{" "}
          <a href={`mailto:${RESEARCH_PAGE.askEmail}`} className={link}>
            {RESEARCH_PAGE.askEmail}
          </a>
          .
        </p>
      </>
    ),

    reading: (
      <ul className="space-y-2">
        {RESEARCH_PAGE.reading.map((paper) => (
          <li key={paper.href} className={bodyStep}>
            <a
              href={paper.href}
              target="_blank"
              rel="noreferrer"
              className={link}
            >
              {paper.title}
            </a>{" "}
            <span className={`${dataStep} ${muted}`}>{paper.year}</span>
          </li>
        ))}
      </ul>
    ),
  };

  return (
    <PaperPage
      colophon={RESEARCH_PAGE.colophon}
      links={[
        { href: "/", label: ETHOS_COPY.footer.homeLabel },
        { href: "/dataset", label: ETHOS_COPY.footer.datasetLabel },
      ]}
    >
      <h1 className={title}>{RESEARCH_PAGE.title}</h1>
      {/* One text node, so the served HTML carries the dateline whole. */}
      <p className={`mt-2 ${dataStep} ${muted}`}>
        {`${RESEARCH_PAGE.kicker} · ${RESEARCH_PAGE.version} · ${RESEARCH_PAGE.dateline}`}
      </p>

      {/* The thesis and the live window, as the opening paragraph. */}
      <p className={`mt-16 ${bodyStep}`}>
        {RESEARCH_PAGE.thesis} {RESEARCH_PAGE.status}
      </p>

      <div className="mt-16 space-y-16">
        {RESEARCH_SECTIONS.map((section) => (
          <PaperSection key={section.id} id={section.id} label={section.label}>
            {bodies[section.id]}
          </PaperSection>
        ))}
      </div>
    </PaperPage>
  );
}
