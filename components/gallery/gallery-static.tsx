import { GALLERY_CENTERPIECE, GALLERY_PANELS } from "@/src/content/gallery";
import { GALLERY_VIDEO } from "@/lib/assets";

// Static building blocks shared by the dynamic-import fallback shell, the
// reduced motion mode, and the no-JS path. Server-safe: no browser APIs.

// The centerpiece resolved to its first line, no typing, no caret. Carries
// the same heading role and aria label as the helix centerpiece, so every
// mode keeps the section's only heading; aria-label is prohibited on a
// plain paragraph but valid on the heading role.
export function StaticCenterLine({ className = "" }: { className?: string }) {
  return (
    <p
      role="heading"
      aria-level={2}
      aria-label={GALLERY_CENTERPIECE.ariaLabel}
      className={`text-center font-mono text-bone ${className}`}
      style={{ fontSize: "clamp(20px, 2.2vw, 34px)" }}
    >
      <span aria-hidden="true">
        {GALLERY_CENTERPIECE.stem + GALLERY_CENTERPIECE.lines[0]}
      </span>
    </p>
  );
}

// 2x4 poster grid. Interactive cells are buttons (Enter opens the takeover);
// the fallback shell renders inert cells with the same geometry, plus the
// per-panel stat copy that only no-JS visitors ever see.
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
        const asset = GALLERY_VIDEO[panel.id];
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
                aria-label={`${panel.industry}. ${panel.stat}`}
                className="block w-full cursor-pointer"
              >
                {image}
              </button>
            ) : (
              image
            )}
            <p className="mt-1 font-mono text-xs text-bone-dim">{panel.industry}</p>
            {withNoJsCopy ? (
              <span className="gallery-nojs-copy mt-1 text-sm text-bone">
                {panel.stat}{" "}
                <span className="font-mono text-xs text-bone-dim">{panel.source}</span>
                {"secondary" in panel ? (
                  <>
                    {" "}
                    {panel.secondary.stat}{" "}
                    <span className="font-mono text-xs text-bone-dim">
                      {panel.secondary.source}
                    </span>
                  </>
                ) : null}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
