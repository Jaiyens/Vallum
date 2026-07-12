import { CALLOUTS, CLUSTERS, SECTION_COPY, type Callout } from "./callouts";
import { FRAME_HEIGHT, FRAME_WIDTH, RIG_STILLS } from "./frames-manifest";

// Static markup shared between the live section and the SSR loading
// fallback. Both trees render these with identical classes, which is what
// guarantees zero layout shift and no flash when the client chunk hydrates.
//
// Visibility contract:
// - .rig-poster (closed still) shows by default, hides under reduced motion.
// - The exploded still is hidden except under reduced motion; the loading
//   fallback additionally unhides it from a <noscript> style block.
// - .rig-label blocks are authored visible; the live section hides them via
//   the anime scope only when it is about to animate them.
// - .rig-dot anchors are CSS-hidden while motion is allowed (they are only
//   valid on the exploded frame) and revealed by the scrub's last stretch.

export function RigClosedPoster() {
  return (
    <picture className="motion-reduce:hidden">
      <source type="image/webp" srcSet={RIG_STILLS.closed.webp} />
      <img
        src={RIG_STILLS.closed.png}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="rig-poster rig-edge-blend absolute inset-0 h-full w-full"
      />
    </picture>
  );
}

export function RigExplodedStill({
  pictureClassName,
  imgClassName,
  alt = "",
}: {
  pictureClassName?: string;
  imgClassName?: string;
  alt?: string;
}) {
  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={RIG_STILLS.exploded.webp} />
      <img
        src={RIG_STILLS.exploded.png}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        alt={alt}
        aria-hidden={alt === "" ? "true" : undefined}
        decoding="async"
        loading="lazy"
        className={`rig-edge-blend ${imgClassName ?? ""}`}
      />
    </picture>
  );
}

function LabelBlock({ c }: { c: Callout }) {
  return (
    <div
      className={`rig-label absolute inset-x-0 -translate-y-1/2 ${
        c.label.side === "left" ? "text-right" : "text-left"
      }`}
      data-cluster={c.cluster}
      style={{ top: `${c.label.yPct}%` }}
    >
      <p className="text-sm leading-tight font-semibold text-paper">{c.name}</p>
      <p className="mt-1 text-[11px] leading-snug text-fog">{c.support}</p>
    </div>
  );
}

function DotOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {CALLOUTS.map((c) => (
        <span
          key={c.id}
          className="rig-dot absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_6px_rgba(59,240,122,0.7)] motion-safe:opacity-0"
          data-cluster={c.cluster}
          style={{ left: `${c.dot.xPct}%`, top: `${c.dot.yPct}%` }}
        />
      ))}
    </div>
  );
}

// Desktop layout: a tall wrapper holds the viewport-pinned grid while the
// scrub plays. Under reduced motion the wrapper collapses and the grid is a
// plain static block showing the exploded still with everything visible.
export function RigPinnedGrid({ visual }: { visual?: React.ReactNode }) {
  return (
    <div className="rig-pin relative mt-14 hidden lg:block lg:h-[250vh] motion-reduce:lg:h-auto">
      <div className="rig-sticky sticky top-14 flex h-[calc(100svh-3.5rem)] items-center motion-reduce:static motion-reduce:h-auto">
        <div className="grid w-full gap-6 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
          <div className="relative">
            <p className="absolute inset-x-0 -top-7 text-right font-mono text-xs text-fog">
              Sensing
            </p>
            {CALLOUTS.filter((c) => c.label.side === "left").map((c) => (
              <LabelBlock key={c.id} c={c} />
            ))}
          </div>
          <div className="relative mx-auto w-full max-w-[128vh]">
            <div
              className="relative aspect-video w-full"
              role="img"
              aria-label={SECTION_COPY.visualLabel}
            >
              {visual}
              <RigExplodedStill
                pictureClassName="rig-exploded-static hidden motion-reduce:block"
                imgClassName="absolute inset-0 h-full w-full"
              />
              <DotOverlay />
              <p
                translate="no"
                className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[11px] text-fog/80"
              >
                {SECTION_COPY.caption}
              </p>
            </div>
          </div>
          <div className="relative">
            <p className="absolute inset-x-0 -top-7 font-mono text-xs text-fog">Trust</p>
            <p className="absolute inset-x-0 font-mono text-xs text-fog" style={{ top: "57%" }}>
              Endurance
            </p>
            {CALLOUTS.filter((c) => c.label.side === "right").map((c) => (
              <LabelBlock key={c.id} c={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tablet and mobile: static exploded still full width, then the plain
// cluster list. No frames, no pin, no dots at these widths.
export function RigMobileBlock() {
  return (
    <div className="mt-12 lg:hidden">
      <div className="relative aspect-video w-full">
        <RigExplodedStill
          imgClassName="absolute inset-0 h-full w-full"
          alt={SECTION_COPY.visualLabel}
        />
      </div>
      <p translate="no" className="mt-2 text-center font-mono text-[11px] text-fog/80">
        {SECTION_COPY.caption}
      </p>
      <div className="rig-callout-list mt-10 space-y-10">
        {CLUSTERS.map((cluster) => (
          <div key={cluster.key}>
            <p className="mb-4 font-mono text-xs text-fog">{cluster.label}</p>
            <ul className="space-y-5">
              {CALLOUTS.filter((c) => c.cluster === cluster.key).map((c) => (
                <li key={c.id} className="rig-callout-item border-l-2 border-border pl-4">
                  <p className="text-sm font-semibold text-paper">{c.name}</p>
                  <p className="mt-1 text-sm text-fog">{c.support}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
