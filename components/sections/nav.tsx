import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CAL_COM_LINK, SECTION_IDS } from "@/lib/site";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-ink/70 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-50 focus:block focus:bg-hazard focus:px-4 focus:py-2 focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-site items-center justify-between px-4 md:px-6"
      >
        <Link
          href="/"
          translate="no"
          className="group flex items-baseline gap-1.5 font-display text-lg font-bold tracking-tight text-paper font-stretch-expanded"
        >
          Vallum
          <span
            aria-hidden="true"
            className="size-1.5 bg-hazard transition-colors group-hover:bg-paper"
          />
        </Link>
        <div className="flex items-center gap-1 md:gap-5">
          <a
            href={`#${SECTION_IDS.howItWorks}`}
            className="px-2 py-2 text-sm text-fog transition-colors hover:text-paper"
          >
            How it works
          </a>
          <Button asChild className="h-10 px-4 max-md:h-11">
            <a href={CAL_COM_LINK} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
