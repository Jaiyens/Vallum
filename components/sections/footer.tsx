import {
  CAL_COM_LINK,
  CONTACT_EMAIL,
  LINKEDIN_URL,
  SECTION_ANCHORS,
  X_URL,
} from "@/lib/site";
import { Badge } from "@/components/ui/badge";

const ACTIONS = [
  { label: "Book a call", href: CAL_COM_LINK, external: true, accent: true },
  { label: "Email", href: `mailto:${CONTACT_EMAIL}`, external: false, accent: false },
  { label: "X", href: X_URL, external: true, accent: false },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true, accent: false },
];

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-site px-4 py-section-sm md:px-6 md:py-section">
        <div className="mb-8">
          <Badge
            variant="outline"
            translate="no"
            className="rounded-panel border-border bg-surface/40 font-mono font-normal text-fog"
          >
            vallum_labs / links
          </Badge>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 border-t border-l border-border md:grid-cols-4">
            {ACTIONS.map((action) => (
              <li key={action.label} className="border-r border-b border-border">
                <a
                  href={action.href}
                  {...(action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`group block px-5 py-8 font-display text-2xl font-bold transition-colors font-stretch-expanded md:text-3xl ${
                    action.accent
                      ? "text-hazard hover:bg-surface"
                      : "text-fog hover:bg-surface hover:text-paper"
                  }`}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    {action.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-2 border-l border-border md:grid-cols-3">
            {SECTION_ANCHORS.map((anchor) => (
              <li key={anchor.id} className="border-r border-b border-border">
                <a
                  href={`#${anchor.id}`}
                  className="group block px-5 py-6 font-display text-lg font-bold text-fog transition-colors font-stretch-expanded hover:bg-surface hover:text-paper md:text-xl"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    {anchor.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-md font-display text-xl font-bold text-paper font-stretch-expanded">
            Vallum.{" "}
            <span className="text-fog">
              The physical internet for dangerous outdoor work.
            </span>
          </p>
          <p className="font-mono text-xs text-fog tabular-nums">
            © {new Date().getFullYear()} Vallum Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
