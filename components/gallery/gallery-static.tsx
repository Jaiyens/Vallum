import {
  GALLERY_CENTERPIECE,
  GALLERY_PANELS,
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

// A visually hidden roll-up of every panel's industry, statistic, and source.
// The bottom ledger strip is gone (Jay's 2026-07-16 correction), so this is
// where a screen reader still gets all eight cited numbers as a single list,
// mounted once on the section for every mode.
export function StatsSummary() {
  return (
    <dl className="sr-only" aria-label="Verified fatality figures for this work">
      {GALLERY_PANELS.map((panel) => (
        <div key={panel.id}>
          <dt>{panel.industry}</dt>
          <dd>
            {panel.stat} Source: {panel.source}.
          </dd>
          {panel.secondary ? (
            <dd>
              {panel.secondary.stat} Source: {panel.secondary.source}.
            </dd>
          ) : null}
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
  showStat = false,
}: {
  onOpen?: (panelId: string) => void;
  withNoJsCopy?: boolean;
  // Reduced motion renders the full statistic and source under every card, so
  // all eight cited numbers read statically with no orbit and no click.
  showStat?: boolean;
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
            {/* The stat band, mirrored from the orbiting panel so the reduced
                motion and fallback grids carry the number on the card too. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 rounded-b-panel px-2.5 pb-2 pt-1.5 text-left"
              style={{
                backgroundColor: "rgba(12,11,9,0.62)",
                WebkitBackdropFilter: "blur(16px) saturate(50%)",
                backdropFilter: "blur(16px) saturate(50%)",
              }}
            >
              <span className="block font-mono text-[10px] leading-none tracking-wide text-bone-dim">
                {panel.industry}
              </span>
              <span
                className="mt-1 block font-display text-[13px] font-medium leading-tight text-bone"
              >
                {panel.headline}
              </span>
            </span>
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
            {showStat ? (
              <div className="mt-2">
                <p className="text-sm leading-snug text-bone">{panel.stat}</p>
                <p className="mt-1 font-mono text-xs text-bone-dim">
                  {panel.source}
                </p>
                {panel.secondary ? (
                  <>
                    <p className="mt-2 text-sm leading-snug text-bone">
                      {panel.secondary.stat}
                    </p>
                    <p className="mt-1 font-mono text-xs text-bone-dim">
                      {panel.secondary.source}
                    </p>
                  </>
                ) : null}
              </div>
            ) : null}
            {withNoJsCopy ? (
              <span className="gallery-nojs-copy mt-2 text-sm text-bone">
                {panel.stat}{" "}
                <span className="font-mono text-xs text-bone-dim">
                  {panel.source}
                </span>
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
