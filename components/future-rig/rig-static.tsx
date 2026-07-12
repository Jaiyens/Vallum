import { SECTION_COPY } from "./callouts";
import { FRAME_HEIGHT, FRAME_WIDTH, RIG_STILLS } from "./frames-manifest";

// Static markup shared between the live section and the SSR loading
// fallback. Both trees render these with identical classes, which is what
// guarantees zero layout shift and no flash when the client chunk hydrates.
//
// Visibility contract:
// - .rig-poster (closed still) shows by default, hides under reduced motion.
// - The exploded still is hidden except under reduced motion; the loading
//   fallback additionally unhides it from a <noscript> style block.

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

// Desktop: a tall wrapper pins the visual for two extra viewports of scroll.
// The rig rides in closed, the page appears to stop on it, and continued
// scrolling drives the explosion (the hold and pacing live in the timeline,
// FutureRigSection.tsx). Under reduced motion the wrapper collapses and the
// stage is a plain static block showing the exploded still.
export function RigPinnedStage({ visual }: { visual?: React.ReactNode }) {
  return (
    <div className="rig-pin relative mt-14 hidden lg:block lg:h-[300vh] motion-reduce:lg:h-auto">
      <div className="rig-sticky sticky top-14 flex h-[calc(100svh-3.5rem)] items-center justify-center motion-reduce:static motion-reduce:h-auto">
        <div className="relative mx-auto w-full max-w-[150vh]">
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
            <p
              translate="no"
              className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[11px] text-fog/80"
            >
              {SECTION_COPY.caption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tablet and mobile: the static exploded still full width. No frames, no pin.
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
    </div>
  );
}
