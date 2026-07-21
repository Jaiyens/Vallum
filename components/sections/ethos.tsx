import { ETHOS_COPY } from "@/src/content/ethos";

// Beat 6, the ethos. Forest, full bleed: the one dark moment of the
// ending (LOOK.md). The reader leaves the argument here, not with a
// verdict on the workers but with the procedure that makes the record
// possible, said once and plainly, then the founder passage (F-0015,
// F-0402, F-0301). Server-safe, static, no motion: matte, calm, not grim.
// Redesign/blocks-v2: the authority slab — fills at least one viewport,
// content vertically centered, hard edges against the cream on both
// sides. The ethos and founder passages sit as two ruled columns so the
// slab owns its full width.
export function EthosFounderSection() {
  return (
    <section className="flex min-h-svh items-center bg-forest text-bone">
      <div className="mx-auto w-full max-w-site px-6 py-16 md:px-16 md:py-32">
        <h2 className="max-w-[1040px] font-display text-[44px] leading-[1.02] tracking-[-0.015em] md:text-[64px] lg:text-[92px]">
          {ETHOS_COPY.heading}
        </h2>

        {/* Concept 2: the three consent languages as a typographic triad,
            spanning the slab's width as one row. */}
        <div className="mt-16">
          <p className="font-sans text-[14px] font-medium leading-[1.5] text-bone/72">
            {ETHOS_COPY.languagesLabel}
          </p>
          <div className="mt-2 flex flex-col gap-6 md:flex-row md:justify-between md:gap-16">
            {ETHOS_COPY.languages.map((language) => (
              <span
                key={language}
                className="font-display text-[32px] leading-[1.08] tracking-[-0.01em] md:text-[44px] lg:text-[56px]"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-16">
          <div className="max-w-[640px] space-y-6">
            {ETHOS_COPY.passage.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[1.65]">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Home founder beat (GAP-04): why the access exists, in the
              company's own first-person voice. No link to /founder: that
              route is deferred to the morning (F-0014), and a link to a
              page that does not exist tonight would be a dead link. */}
          <div className="max-w-[640px] space-y-6 border-t border-bone/24 pt-8 md:border-t-0 md:border-l md:border-bone/24 md:pt-0 md:pl-16">
            {ETHOS_COPY.founder.passage.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[1.65]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
