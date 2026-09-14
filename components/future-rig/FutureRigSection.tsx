"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, onScroll, type Scope } from "animejs";
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
    // The slab is the render's own field. The frames ship as the source
    // video's colour render on its charcoal studio field (founder,
    // 2026-09-09: "find the normal video and put it back in", and the
    // section "has to match the same color as the black rig explosion"),
    // so the surface is that field's tone as the browser draws the encoded
    // frames (25,27,31; scripts/flatten-rig-field.mjs flattens the whole
    // field onto it), not the site's ink.
    <section
      ref={root}
      id={SECTION_IDS.rig}
      className="scroll-mt-14 bg-[#191b1f] py-section-sm text-bone md:py-section"
    >
      <div className="mx-auto max-w-site px-6 md:px-16">
        {/* header: plain and always visible (F-0412). A masked scroll-reveal
            here previously depended on an IntersectionObserver trigger that
            could leave the heading permanently translated out of view; every
            other bone slab on the site (/dataset, /research, the footer
            wordmark) renders its heading the same static way, so this matches
            house style rather than reintroducing a JS-gated reveal for a
            single line of type. */}
        <h2
          className="max-w-[1040px] font-display text-balance text-bone text-[32px] leading-[1.08] tracking-[-0.01em] md:text-[44px] lg:text-[56px]"
        >
          {SECTION_COPY.headline}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-bone/72">{SECTION_COPY.subline}</p>

        {/* desktop: pinned, scroll-scrubbed explosion */}
        <RigPinnedStage visual={<RigScrub ref={scrub} />} />

        {/* tablet and mobile: static exploded still */}
        <RigMobileBlock />
      </div>
    </section>
  );
}
