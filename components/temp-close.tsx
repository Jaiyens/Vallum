import { HERO_COPY } from "@/src/content/hero";

// TEMPORARY CLOSE: a single mono contact line ends the page until the
// founder message and real footer arrive in later phases.
export function TempClose() {
  return (
    <footer className="border-t border-hairline">
      <p className="mx-auto max-w-site px-6 py-16 font-mono text-sm text-bone-dim">
        {HERO_COPY.tempContact}
      </p>
    </footer>
  );
}
