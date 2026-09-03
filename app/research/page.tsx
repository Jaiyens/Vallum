import type { Metadata } from "next";
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

// Type steps are the /dataset steps verbatim, so the two secondary pages
// read as one system.
const bodyStep = "text-[16px] leading-[1.65] md:text-[17px]";
const smallStep = "text-[14px] leading-[1.5] tracking-[0.01em]";
const monoLabel = "font-mono text-[12px] uppercase tracking-[0.08em]";
const monoRow = "font-mono text-[13px] tabular-nums";
const headingDark =
  "font-display text-forest text-[22px] leading-[1.3] md:text-[24px] lg:text-[26px]";
const headingLight =
  "font-display text-bone-hi text-[22px] leading-[1.3] md:text-[24px] lg:text-[26px]";
const focusDark =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line";
const focusLight =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone";
const linkDark = `underline decoration-1 underline-offset-[3px] ${focusDark}`;
const linkLight = `underline decoration-1 underline-offset-[3px] ${focusLight}`;

// One measure for prose and for every ledger on the page, so headings,
// paragraphs, the dataset table and the reading list all hang off the same
// left edge and stop at the same right edge. A white paper is a document
// before it is a layout.
const BAND = "mx-auto max-w-site px-6 py-16 md:px-16 md:py-24";
const GRID = "md:grid md:grid-cols-[72px_minmax(0,680px)] md:gap-10";

type Tone = "forest" | "bone";

function sectionMeta(id: ResearchSectionId) {
  const index = RESEARCH_SECTIONS.findIndex((s) => s.id === id);
  return {
    number: String(index + 1).padStart(2, "0"),
    label: RESEARCH_SECTIONS[index].label,
  };
}

// A numbered paper section: rule, number in the gutter, heading and prose
// in the one measure. Flat on its band, hairline only, radius 0.
function Block({
  id,
  tone,
  children,
}: {
  id: ResearchSectionId;
  tone: Tone;
  children: React.ReactNode;
}) {
  const { number, label } = sectionMeta(id);
  const rule = tone === "forest" ? "border-bone/15" : "border-forest-line/30";
  const numberInk = tone === "forest" ? "text-bone/55" : "text-forest-line";
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t pt-8 md:pt-10 ${rule} ${GRID}`}
    >
      <p className={`${monoRow} ${numberInk}`}>{number}</p>
      <div className="mt-3 md:mt-0">
        <h2 className={tone === "forest" ? headingLight : headingDark}>
          {label}
        </h2>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <main id="content" tabIndex={-1} className="min-h-dvh bg-bone text-black">
      {/* Masthead, forest. Mono dateline ledger over the title, the thesis
          sentence as the standfirst, the live window last. */}
      <section className="bg-forest text-bone-hi">
        <div className="mx-auto max-w-site px-6 py-section-sm md:px-16 md:py-section lg:py-44">
          <div className="flex items-baseline justify-between gap-6 border-b border-bone/15 pb-5">
            <p className={`${monoLabel} text-bone/62`}>{RESEARCH_PAGE.kicker}</p>
            <p className={`${monoLabel} text-bone/62`}>
              {RESEARCH_PAGE.version} · {RESEARCH_PAGE.dateline}
            </p>
          </div>
          <h1 className="mt-10 max-w-[1040px] font-display text-[40px] leading-[1.05] tracking-[-0.01em] md:text-[60px] lg:text-[76px]">
            {RESEARCH_PAGE.heading}
          </h1>
          <p className="mt-8 max-w-[720px] font-display text-[21px] leading-[1.4] text-bone-hi/94 md:text-[24px]">
            {RESEARCH_PAGE.thesis}
          </p>
          <p className={`mt-8 max-w-[640px] ${smallStep} text-bone/72`}>
            {RESEARCH_PAGE.status}
          </p>
        </div>
      </section>

      {/* Bone: contents ledger, then the first three sections. */}
      <section className="bg-bone text-black">
        <div className={BAND}>
          <div className={GRID}>
            <p className={`${monoLabel} text-forest-line`}>
              {RESEARCH_PAGE.contentsTitle}
            </p>
            <ol className="mt-4 border-t border-forest-line/30 md:mt-0 md:columns-2 md:gap-10">
              {RESEARCH_SECTIONS.map((section, i) => (
                <li
                  key={section.id}
                  className="flex items-baseline gap-4 border-b border-forest-line/30 py-2.5"
                >
                  <span className={`${monoRow} text-forest-line`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a href={`#${section.id}`} className={`${smallStep} ${linkDark}`}>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 flex flex-col gap-14 md:mt-24 md:gap-16">
            <Block id="team" tone="bone">
              <p className={bodyStep}>{RESEARCH_PAGE.team}</p>
            </Block>

            <Block id="hardware" tone="bone">
              <p className={bodyStep}>{RESEARCH_PAGE.hardware}</p>
            </Block>

            <Block id="operations" tone="bone">
              <p className={bodyStep}>{RESEARCH_PAGE.operationsLead}</p>
              <ul className="mt-6 border-t border-forest-line/30">
                {RESEARCH_PAGE.operationsTasks.map((task) => (
                  <li
                    key={task}
                    className={`border-b border-forest-line/30 py-3.5 ${bodyStep}`}
                  >
                    {task}
                  </li>
                ))}
              </ul>
              <p className={`mt-6 ${smallStep} text-black/62`}>
                {RESEARCH_PAGE.operationsNext}
              </p>
            </Block>
          </div>
        </div>
      </section>

      {/* Forest: consent and provenance stands alone. It is the record the
          company is actually selling, so it gets its own slab. */}
      <section className="bg-forest text-bone-hi">
        <div className={BAND}>
          <Block id="consent" tone="forest">
            <p className={`${bodyStep} text-bone-hi/94`}>{RESEARCH_PAGE.consent}</p>
          </Block>
        </div>
      </section>

      {/* Bone: schema, held-out set, the dataset ledger, the farm offer. */}
      <section className="bg-bone text-black">
        <div className={BAND}>
          <div className="flex flex-col gap-14 md:gap-16">
            <Block id="annotation" tone="bone">
              <p className={bodyStep}>{RESEARCH_PAGE.annotation}</p>
            </Block>

            <Block id="evaluation" tone="bone">
              <p className={bodyStep}>{RESEARCH_PAGE.evaluation}</p>
            </Block>

            <Block id="datasets" tone="bone">
              <dl className="border-t border-forest-line/30">
                {RESEARCH_PAGE.datasets.map((set) => (
                  <div
                    key={set.name}
                    className="grid gap-1 border-b border-forest-line/30 py-4 md:grid-cols-[120px_minmax(0,1fr)_84px] md:items-baseline md:gap-6"
                  >
                    <dt className={`${monoRow} text-forest-line`}>{set.name}</dt>
                    <dd className={bodyStep}>{set.scope}</dd>
                    <dd
                      className={`${monoRow} text-black/62 md:text-right`}
                    >
                      {set.due}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className={`mt-6 ${smallStep} text-black/62`}>
                {RESEARCH_PAGE.datasetsNote}
              </p>
            </Block>

            <Block id="farms" tone="bone">
              <p className={bodyStep}>{RESEARCH_PAGE.farms}</p>
            </Block>
          </div>
        </div>
      </section>

      {/* Forest: the ask. One slab, one address, nothing else in it. */}
      <section className="bg-forest text-bone-hi">
        <div className={BAND}>
          <Block id="labs" tone="forest">
            <p className={`${bodyStep} text-bone-hi/94`}>{RESEARCH_PAGE.labs}</p>
            <p className={`mt-6 ${bodyStep} text-bone-hi`}>
              {RESEARCH_PAGE.askLead}{" "}
              <a
                href={`mailto:${RESEARCH_PAGE.askEmail}`}
                className={linkLight}
              >
                {RESEARCH_PAGE.askEmail}
              </a>
              .
            </p>
          </Block>
        </div>
      </section>

      {/* Bone: prior work, cited. Titles link out, years hang right. */}
      <section className="bg-bone text-black">
        <div className={BAND}>
          <Block id="reading" tone="bone">
            <ul className="border-t border-forest-line/30">
              {RESEARCH_PAGE.reading.map((paper) => (
                <li
                  key={paper.href}
                  className="grid gap-1 border-b border-forest-line/30 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-6"
                >
                  <a
                    href={paper.href}
                    className={`${bodyStep} ${linkDark}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {paper.title}
                  </a>
                  <span className={`${monoRow} text-black/62 md:text-right`}>
                    {paper.year}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </section>

      {/* Closing forest strip, same grammar as the home footer: colophon
          left, the site's real routes right. Hard edge, no seam. */}
      <div className="bg-forest text-bone">
        <div className="mx-auto flex max-w-site flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-16">
          <p className={`${smallStep} text-bone/72`}>{RESEARCH_PAGE.colophon}</p>
          <nav aria-label="Footer" className="flex gap-6">
            <Link href="/" className={`text-[14px] font-medium ${linkLight}`}>
              {ETHOS_COPY.footer.homeLabel}
            </Link>
            <Link
              href="/dataset"
              className={`text-[14px] font-medium ${linkLight}`}
            >
              {ETHOS_COPY.footer.datasetLabel}
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
