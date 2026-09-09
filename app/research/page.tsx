import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  RESEARCH_PAGE,
  RESEARCH_SECTIONS,
  type ResearchSectionId,
} from "@/src/content/research-page";
import { ETHOS_COPY } from "@/src/content/ethos";

export const metadata: Metadata = {
  title: RESEARCH_PAGE.meta.title,
  description: RESEARCH_PAGE.meta.description,
  openGraph: {
    title: RESEARCH_PAGE.meta.title,
    description: RESEARCH_PAGE.meta.description,
  },
};

// Redesigned 2026-09-04 at the founder's request ("make it a normal white
// paper") as a plain single-column document after build.ai and
// humanarchive.ai: one bone ground, one 640px measure, no bands, no display
// numerals, no photograph, no numbered gutter, no contents ledger. Type
// steps are shared with /dataset so the two secondary pages read as one
// system. Every string ships verbatim from research-page.ts (F-0013).
const bodyStep = "text-[16px] leading-[1.65] md:text-[17px]";
const smallStep = "text-[14px] leading-[1.5] tracking-[0.01em]";
const dataStep = "font-mono text-[13px] leading-[1.7] tabular-nums";
const heading =
  "font-display font-medium text-forest text-[22px] leading-[1.3] md:text-[24px] lg:text-[26px]";
const title =
  "font-display text-forest text-[32px] leading-[1.08] tracking-[-0.01em] md:text-[44px]";
const link =
  "font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line";
const muted = "text-black/62";

// One unnumbered section: heading, then its prose. Order and anchor ids
// come from RESEARCH_SECTIONS.
function Section({
  id,
  label,
  children,
}: {
  id: ResearchSectionId;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16">
      <h2 className={heading}>{label}</h2>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

export default function ResearchPage() {
  // Keyed by section id so a section without a body is a type error.
  const bodies: Record<ResearchSectionId, ReactNode> = {
    team: <p className={bodyStep}>{RESEARCH_PAGE.team}</p>,

    hardware: <p className={bodyStep}>{RESEARCH_PAGE.hardware}</p>,

    operations: (
      <>
        <p className={bodyStep}>{RESEARCH_PAGE.operationsLead}</p>
        <ul className="list-disc space-y-2 pl-5">
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
              className="grid gap-1 py-6 md:grid-cols-[120px_minmax(0,1fr)_84px] md:items-baseline md:gap-6"
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
    <div className="min-h-dvh bg-bone text-black">
      <main
        id="content"
        tabIndex={-1}
        className="mx-auto w-full max-w-[640px] px-6 pt-16 md:px-0 md:pt-32"
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
            <Section key={section.id} id={section.id} label={section.label}>
              {bodies[section.id]}
            </Section>
          ))}
        </div>
      </main>

      <footer className="mx-auto w-full max-w-[640px] px-6 pb-16 md:px-0">
        <div className="mt-16 border-t border-forest-line/30 pt-6 md:mt-32">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className={`${smallStep} ${muted}`}>{RESEARCH_PAGE.colophon}</p>
            <nav aria-label="Footer" className="flex gap-6">
              <Link href="/" className={`${smallStep} ${link}`}>
                {ETHOS_COPY.footer.homeLabel}
              </Link>
              <Link href="/dataset" className={`${smallStep} ${link}`}>
                {ETHOS_COPY.footer.datasetLabel}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
