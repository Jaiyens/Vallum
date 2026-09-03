import type { Metadata } from "next";
import Link from "next/link";
import { FutureRigDynamic } from "@/components/future-rig/FutureRigDynamic";
import { DormantAsk } from "@/components/sections/dormant-contact";
import { MethodSection } from "@/components/sections/method";
import { TurnSection } from "@/components/sections/turn";
import { ETHOS_COPY } from "@/src/content/ethos";
import { WHITE_PAPER_PAGE } from "@/src/content/white-paper";

export const metadata: Metadata = {
  title: WHITE_PAPER_PAGE.meta.title,
  description: WHITE_PAPER_PAGE.meta.description,
  openGraph: {
    title: WHITE_PAPER_PAGE.meta.title,
    description: WHITE_PAPER_PAGE.meta.description,
  },
};

// /white-paper, the argument. Moved off the home page 2026-09-03 (founder):
// the thesis, the two cited figures, the method, and the unbuilt rig are the
// reasoning behind the company, not the front door, so they read as one
// document on their own route while / stays film, faces, record, person.
//
// The four blocks ship as the same components they were on /, unaltered:
// TurnSection (the thesis plus its forest stat slab), MethodSection, and
// FutureRigDynamic. Nothing is re-typed here, so the flat-block grammar,
// the reveal timings, and the reduced-motion and no-JS resting states all
// come across intact. Section ids travel with them: #how-it-works and #rig
// now resolve on this route.
//
// Page rhythm reads bone, forest, bone, bone: the turn opens light, its
// stat slab is the one full-viewport forest interruption, and the method
// and rig run out on bone to the closing hairline. Every band is a flat
// solid slab with hard edges (founder rule 2026-07-21, no gradient seams).
export default function WhitePaperPage() {
  return (
    <main id="content" tabIndex={-1} className="bg-bone text-black">
      {/* The turn owns the document title, so it heads at level 1 here. */}
      <TurnSection headingAs="h1" />
      <MethodSection />
      {/* The rig closes the argument: a running method implies its kit. */}
      <FutureRigDynamic />

      {/* Close: the one ask echo and the real routes, matching /dataset's
          tail so the two secondary pages end the same way. */}
      <section className="bg-bone text-black">
        <div className="mx-auto max-w-site px-6 pb-16 md:px-16 md:pb-24">
          <div className="flex max-w-[640px] flex-col gap-6 border-t border-forest-line/30 pt-6">
            <DormantAsk
              line={ETHOS_COPY.footer.askEcho}
              className="text-[16px] leading-[1.65] md:text-[17px]"
            />
            <nav aria-label="Continue" className="flex gap-6">
              <Link
                href="/"
                className="text-[14px] font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
              >
                {ETHOS_COPY.footer.homeLabel}
              </Link>
              <Link
                href="/dataset"
                className="text-[14px] font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
              >
                {ETHOS_COPY.footer.datasetLabel}
              </Link>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
