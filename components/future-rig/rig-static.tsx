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
//
// F-0413: these used to carry a `rig-edge-blend` radial mask that feathered
// the frame's dark backdrop into the page, reading as a glow/vignette
// (banned by LOOK.md's Materials rules, no gradient exception for photography).
// Since 2026-09-09 the section surface is the render's own field colour
// (founder), and since 2026-09-14 the frames' field is flattened onto that
// tone edge to edge (scripts/flatten-rig-field.mjs), so the 1280x720
// rectangle has no edge to hide: the rig floats on one continuous dark field.

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
        className="rig-poster absolute inset-0 h-full w-full"
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
        className={imgClassName ?? ""}
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
        {/* Reduced motion swaps the full-bleed canvas for a contained plate.
            The width also keeps the luminance profile deterministic: at this
            size the still's bands stay light whether or not the lazy image
            has loaded when a capture happens. */}
        <div className="relative mx-auto w-full max-w-[150vh] motion-reduce:max-w-xl">
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
    </div>
  );
}
