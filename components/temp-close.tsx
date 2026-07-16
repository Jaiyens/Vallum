import { CLOSE_COPY } from "@/src/content/sections";

// TEMPORARY CLOSE: a single mono line on bone ends the page until the
// founder message and real footer arrive in later phases. Contact details
// are pending from Jay; see findings/needs-fact.md.
export function TempClose() {
  return (
    <footer className="border-t border-forest-line/30 bg-bone">
      <p className="mx-auto max-w-site px-6 py-24 font-mono text-sm text-forest-line">
        {CLOSE_COPY.line}
      </p>
    </footer>
  );
}
