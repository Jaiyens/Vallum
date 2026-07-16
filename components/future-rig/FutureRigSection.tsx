"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, onScroll, type Scope } from "animejs";
import { MaskedRise } from "@/components/motion/masked-rise";
import { RigScrub, type RigScrubHandle } from "./RigScrub";
import { RigMobileBlock, RigPinnedStage } from "./rig-static";
import { SECTION_COPY } from "./callouts";
import { FRAME_COUNT } from "./frames-manifest";
import { SECTION_IDS } from "@/lib/site";

export function FutureRigSection() {
  const root = useRef<HTMLElement>(null);
  const scrub = useRef<RigScrubHandle>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    scope.current = createScope({
      root,
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isDesktop: "(min-width: 1024px)",
      },
    }).add((self) => {
      if (!self) return;
      const matches = self.matches as { reduceMotion: boolean; isDesktop: boolean };
      // Reduced motion and stacked layouts show static stills; nothing to do.
      if (matches.reduceMotion || !matches.isDesktop) return;

      const pin = root.current?.querySelector<HTMLElement>(".rig-pin");
      if (!pin) return;

      const frameObj = { frame: 0 };

      // Aria-style pacing over the pinned range (~200vh of scroll): the
      // scrub only starts once the stage is pinned under the nav, the
      // first 15% holds on the closed unit so you sit with the camera,
      // the explosion plays across the next 75%, and the last 10% rests
      // on the exploded frame before the pin releases. The pacing lives
      // in the ease (one always-active tween) because a positioned tween
      // does not re-render when the scrub seeks back before its start,
      // which would freeze the canvas mid-explosion during the hold.
      // container is omitted on purpose: it defaults to the window
      // scroll, which is what Lenis drives.
      animate(frameObj, {
        frame: FRAME_COUNT - 1,
        duration: 1000,
        ease: (t: number) => Math.min(1, Math.max(0, (t - 0.15) / 0.75)),
        onUpdate: () => scrub.current?.draw(frameObj.frame),
        autoplay: onScroll({
          target: pin,
          enter: "top+=56 top",
          leave: "bottom bottom",
          sync: true,
        }),
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <section
      ref={root}
      id={SECTION_IDS.rig}
      className="scroll-mt-14 border-t border-forest-line/30 bg-bone py-section-sm text-black md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        {/* header */}
        <MaskedRise className="max-w-3xl font-display text-3xl font-bold text-balance font-stretch-expanded md:text-5xl">
          {SECTION_COPY.headline}
        </MaskedRise>
        <p className="mt-4 max-w-xl text-lg text-forest-line">{SECTION_COPY.subline}</p>
        <p className="mt-2 max-w-xl text-sm text-forest-line">{SECTION_COPY.bridge}</p>

        {/* desktop: pinned, scroll-scrubbed explosion */}
        <RigPinnedStage visual={<RigScrub ref={scrub} />} />

        {/* tablet and mobile: static exploded still */}
        <RigMobileBlock />
      </div>
    </section>
  );
}
