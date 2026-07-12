"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  createScope,
  createTimeline,
  onScroll,
  stagger,
  utils,
  type Scope,
} from "animejs";
import { MaskedRise } from "@/components/motion/masked-rise";
import { RigScrub, type RigScrubHandle } from "./RigScrub";
import { RigMobileBlock, RigPinnedGrid } from "./rig-static";
import { CLUSTERS, SECTION_COPY } from "./callouts";
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
      // The static markup is authored fully visible on the exploded still,
      // so reduced motion needs no work at all. Skip every animation.
      if (matches.reduceMotion) return;

      if (matches.isDesktop) {
        const pin = root.current?.querySelector<HTMLElement>(".rig-pin");
        if (!pin) return;

        // Labels are authored visible for reduced motion and no-JS; hide
        // them only now that the scrub owns their reveal. Dots stay CSS
        // hidden under motion-safe, so their tween's inline opacity is the
        // only thing that ever shows them.
        utils.set(".rig-label", { opacity: 0, translateY: "0.75rem" });

        const frameObj = { frame: 0 };

        // One scrubbed timeline, 1000 units long: the frame sequence runs
        // edge to edge, cluster labels land sequentially across the last
        // 30%, dots only in the final 10% where their positions are valid
        // on the exploded frame. The scrub enters when the pin wrapper's
        // top reaches the viewport bottom and completes when its center
        // passes the viewport center, so the rest of the pin holds the
        // final frame. container is omitted on purpose: it defaults to the
        // window scroll, which is what Lenis drives.
        const tl = createTimeline({
          defaults: { ease: "inOutQuad" },
          autoplay: onScroll({
            target: pin,
            enter: "bottom top",
            leave: "center center",
            sync: true,
          }),
        });

        tl.add(
          frameObj,
          {
            frame: FRAME_COUNT - 1,
            duration: 1000,
            ease: "linear",
            onUpdate: () => scrub.current?.draw(frameObj.frame),
          },
          0,
        );
        CLUSTERS.forEach(({ key }, i) => {
          tl.add(
            `.rig-label[data-cluster="${key}"]`,
            {
              opacity: [0, 1],
              translateY: ["0.75rem", "0rem"],
              duration: 80,
              delay: stagger(15),
            },
            700 + i * 90,
          );
        });
        tl.add(".rig-dot", { opacity: [0, 1], duration: 60, delay: stagger(4) }, 900);
      } else {
        // Stacked layouts get a light staggered fade on enter. Set the
        // hidden state only now, so no JS or reduced motion always shows
        // the list.
        utils.set(".rig-callout-item", { opacity: 0, translateY: "1rem" });
        animate(".rig-callout-item", {
          opacity: [0, 1],
          translateY: ["1rem", "0rem"],
          duration: 500,
          ease: "outQuad",
          delay: stagger(60),
          autoplay: onScroll({
            target: root.current?.querySelector(".rig-callout-list") ?? root.current!,
            enter: "bottom top+=80",
          }),
        });
      }
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <section
      ref={root}
      id={SECTION_IDS.rig}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        {/* header */}
        <p className="mb-4 inline-flex items-center gap-2 rounded-panel border border-border px-2.5 py-1 font-mono text-xs text-paper/90">
          <span aria-hidden="true" className="size-1.5 bg-hazard" />
          {SECTION_COPY.eyebrow}
        </p>
        <MaskedRise className="max-w-3xl font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl">
          {SECTION_COPY.headline}
        </MaskedRise>
        <p className="mt-4 max-w-xl text-lg text-fog">{SECTION_COPY.subline}</p>
        <p className="mt-2 max-w-xl text-sm text-fog">{SECTION_COPY.bridge}</p>

        {/* desktop: pinned, scroll-scrubbed explosion */}
        <RigPinnedGrid visual={<RigScrub ref={scrub} />} />

        {/* tablet and mobile: static exploded still, then a plain list */}
        <RigMobileBlock />
      </div>
    </section>
  );
}
