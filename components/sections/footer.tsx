import Link from "next/link";
import { ETHOS_COPY } from "@/src/content/ethos";
import { DormantAsk } from "./dormant-contact";

// Beat 7, the wordmark. Bone surface, forest display type (STORY.md): the
// name and the place, signed in light. A quiet forest strip closes the
// document underneath it with the entity line and the two real routes on
// the site, which is also the LOOK.md "forest at the footer" luminance
// budget line and the back half's last keyboard tab stops (F-0503).
export function SiteFooter() {
  return (
    <footer className="bg-bone text-black">
      <div className="mx-auto max-w-site px-6 py-16 text-center md:px-16 md:py-32 lg:py-48">
        {/* Spaced serif caps (LOOK.md wordmark grammar); "Vallum Labs"
            stays two words per FACTS.md. */}
        <p className="font-display font-medium uppercase leading-[1.05] tracking-[0.16em] text-forest text-[clamp(40px,10vw,144px)]">
          Vallum Labs
        </p>
        <div className="mx-auto mt-16 max-w-[640px]">
          <DormantAsk
            line={ETHOS_COPY.footer.askEcho}
            className="text-[16px] leading-[1.65] md:text-[17px]"
          />
        </div>
      </div>

      {/* Closing forest strip. Hard edge against the bone wordmark block
          above — founder rule 2026-07-21: no gradient seams anywhere. */}
      <div className="bg-forest text-bone">
        <div className="mx-auto flex max-w-site flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-16">
          <p className="text-[14px] leading-[1.5] tracking-[0.01em] text-bone/72">
            {ETHOS_COPY.footer.entityLine}
          </p>
          <nav aria-label="Footer" className="flex gap-6">
            <Link
              href="/"
              className="text-[14px] font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
              {ETHOS_COPY.footer.homeLabel}
            </Link>
            <Link
              href="/research"
              className="text-[14px] font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
              {ETHOS_COPY.footer.researchLabel}
            </Link>
            <Link
              href="/white-paper"
              className="text-[14px] font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
              {ETHOS_COPY.footer.whitePaperLabel}
            </Link>
            <Link
              href="/dataset"
              className="text-[14px] font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
            >
              {ETHOS_COPY.footer.datasetLabel}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
