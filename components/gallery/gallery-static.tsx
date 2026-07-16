import {
  GALLERY_CENTERPIECE,
  GALLERY_PANELS,
  LEDGER_STATS,
  isStatPanel,
  panelLabel,
} from "@/src/content/gallery";
import { GALLERY_VIDEO } from "@/lib/assets";

// Static building blocks shared by the dynamic-import fallback shell, the
// reduced motion mode, and the no-JS path. Server-safe: no browser APIs.

// The centerpiece resolved to its first line, no typing, no caret. Set in the
// display face, never mono at display size (F-0404). Carries the same heading
// role and aria label as the helix centerpiece, so every mode keeps the
// section's only heading; aria-label is prohibited on a plain paragraph but
// valid on the heading role.
export function StaticCenterLine({ className = "" }: { className?: string }) {
  return (
    <p
      role="heading"
      aria-level={2}
      aria-label={GALLERY_CENTERPIECE.ariaLabel}
      className={`text-center font-display text-bone ${className}`}
      style={{ fontSize: "clamp(28px, 5vw, 44px)", lineHeight: 1.08 }}
    >
      <span aria-hidden="true">
        {GALLERY_CENTERPIECE.stem + GALLERY_CENTERPIECE.lines[0]}
      </span>
    </p>
  );
}

// The two ledgered statistics as always-visible caption text (F-0501). The
// argument of beat 2 lands here for a reader who never orbits: two cited
// numbers at their real size, stated once, unornamented.
export function GalleryLedger({ className = "" }: { className?: string }) {
  return (
    <dl
      className={`mx-auto grid max-w-2xl gap-6 sm:grid-cols-2 ${className}`}
      aria-label="Verified fatality rates for this work"
    >
      {LEDGER_STATS.map((panel) => (
        <div key={panel.id}>
          <dt className="text-sm text-bone">{panel.industry}</dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-bone">
            {panel.stat}
          </dd>
          <dd className="mt-1 font-mono text-xs text-bone-dim">{panel.source}</dd>
        </div>
      ))}
    </dl>
  );
}

// 2x4 poster grid. Interactive cells are buttons (Enter opens the takeover);
// the fallback shell renders inert cells with the same geometry, plus the
// per-panel copy that only no-JS visitors ever see.
export function PosterGrid({
  onOpen,
  withNoJsCopy = false,
}: {
  onOpen?: (panelId: string) => void;
  withNoJsCopy?: boolean;
}) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {GALLERY_PANELS.map((panel) => {
        const asset = GALLERY_VIDEO[panel.id as keyof typeof GALLERY_VIDEO];
        const image = (
          <span className="relative block aspect-[3/4] w-full overflow-hidden rounded-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.poster}
              alt={asset.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </span>
        );
        return (
          <li key={panel.id}>
            {onOpen ? (
              <button
                type="button"
                onClick={() => onOpen(panel.id)}
                aria-label={panelLabel(panel)}
                className="block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
              >
                {image}
              </button>
            ) : (
              image
            )}
            <p className="mt-2 text-sm text-bone-dim">{panel.industry}</p>
            {withNoJsCopy ? (
              <span className="gallery-nojs-copy mt-1 text-sm text-bone">
                {isStatPanel(panel) ? (
                  <>
                    {panel.stat}{" "}
                    <span className="font-mono text-xs text-bone-dim">
                      {panel.source}
                    </span>
                  </>
                ) : (
                  panel.description
                )}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
