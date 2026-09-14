import type { ReactNode } from "react";
import Link from "next/link";

// The plain single-column document the two secondary tabs share. Designed
// 2026-09-04 for /research at the founder's request ("make it a normal white
// paper") after build.ai and humanarchive.ai: one bone ground, one 640px
// measure, no bands, no display numerals, no photograph, no numbered gutter,
// no contents ledger. /dataset moved onto it 2026-09-14 (founder: "make it
// like the other tab"), so the steps live here once and the two pages
// cannot drift. Nothing here carries copy; call sites pass verbatim strings
// (F-0013).
export const bodyStep = "text-[16px] leading-[1.65] md:text-[17px]";
export const smallStep = "text-[14px] leading-[1.5] tracking-[0.01em]";
export const dataStep = "font-mono text-[13px] leading-[1.7] tabular-nums";
export const heading =
  "font-display font-medium text-forest text-[22px] leading-[1.3] md:text-[24px] lg:text-[26px]";
export const title =
  "font-display text-forest text-[32px] leading-[1.08] tracking-[-0.01em] md:text-[44px] lg:text-[56px]";
export const link =
  "font-medium underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line";
export const muted = "text-black/62";
export const bulletList = "list-disc space-y-2 pl-6";

// One unnumbered section: heading, then its prose.
export function PaperSection({
  id,
  label,
  children,
}: {
  id: string;
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

// The page shell: the measure, then a hairline footer with the colophon on
// the left and the routes onward on the right.
export function PaperPage({
  colophon,
  links,
  children,
}: {
  colophon: string;
  links: readonly { href: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-bone text-black">
      <main
        id="content"
        tabIndex={-1}
        className="mx-auto w-full max-w-[640px] px-6 pt-16 md:px-0 md:pt-32"
      >
        {children}
      </main>

      <footer className="mx-auto w-full max-w-[640px] px-6 pb-16 md:px-0">
        <div className="mt-16 border-t border-forest-line/30 pt-6 md:mt-32">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className={`${smallStep} ${muted}`}>{colophon}</p>
            <nav aria-label="Footer" className="flex gap-6">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${smallStep} ${link}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
