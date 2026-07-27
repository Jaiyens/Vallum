import { CONTACT_EMAIL } from "@/lib/site";

// The single ask echo (STORY.md beat 5/7) reused wherever the site asks the
// reader to reply. No address may be invented (F-0011): while CONTACT_EMAIL
// in lib/site.ts is still the "example.com" placeholder, the line renders as
// plain text with no fake next step. The day a real address lands there,
// the same line becomes its own mailto link: nothing else about the string
// changes, so this component never writes copy, it only wires a state.
const CONTACT_IS_LIVE = !CONTACT_EMAIL.includes("example.com");

export function DormantAsk({
  line,
  className = "",
}: {
  line: string;
  className?: string;
}) {
  if (CONTACT_IS_LIVE) {
    return (
      <p className={className}>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
        >
          {line}
        </a>
      </p>
    );
  }
  return <p className={className}>{line}</p>;
}
