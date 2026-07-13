"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { AutoPauseVideo } from "@/components/media/auto-pause-video";
import { ShowcaseOverlay } from "@/components/sections/showcase-overlay";
import { SHOWCASE_VIDEO } from "@/lib/assets";
import { SECTION_IDS } from "@/lib/site";
import { MaskedRise } from "@/components/motion/masked-rise";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

export function Showcase() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: '[data-showcase="frame"]',
            start: "top 78%",
            end: "center 38%",
            scrub: 0.5,
          },
        });
        tl.from(
          '[data-anno="corners"] path',
          { scale: 0, autoAlpha: 0, transformOrigin: "center", stagger: 0.02, duration: 0.1 },
          0,
        )
          .from(
            '[data-anno^="box-"]',
            { scale: 0.65, autoAlpha: 0, transformOrigin: "center", stagger: 0.06, duration: 0.15 },
            0.12,
          )
          .to("polyline[data-traj]", { strokeDashoffset: 0, stagger: 0.08, duration: 0.25 }, 0.3)
          .from(
            '[data-anno="traj-ends"] circle',
            { scale: 0, autoAlpha: 0, transformOrigin: "center", stagger: 0.04, duration: 0.08 },
            0.52,
          )
          .from(
            '[data-anno="narration"] text',
            { y: 12, autoAlpha: 0, stagger: 0.05, duration: 0.1 },
            0.58,
          )
          .from(
            '[data-anno="chips"] g',
            { scale: 0.85, autoAlpha: 0, transformOrigin: "center", stagger: 0.05, duration: 0.12 },
            0.7,
          )
          .from('[data-anno="transition"]', { autoAlpha: 0, duration: 0.08 }, 0.82)
          .from('[data-anno="meta"] text', { autoAlpha: 0, stagger: 0.04, duration: 0.08 }, 0.86)
          .to({}, { duration: 0.02 }, 0.98); // pad total to 1
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        // overlay is authored fully visible; only the dash-hidden lines need resetting
        gsap.set("polyline[data-traj]", { strokeDashoffset: 0 });
      });
    },
    { scope },
  );

  return (
    <section
      id={SECTION_IDS.data}
      ref={scope}
      className="scroll-mt-14 py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        <div className="mb-4">
          <Badge
            variant="outline"
            translate="no"
            className="rounded-panel border-signal/30 bg-signal/5 font-mono font-normal text-signal"
          >
            dataset_sample / ego4d_format
          </Badge>
        </div>
        <MaskedRise className="max-w-3xl font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl">
          This is what training data looks like.
        </MaskedRise>
        <p className="mt-4 max-w-xl text-lg text-fog">
          First-person capture, action-labeled, consent-cleared.
        </p>

        <div className="mt-10 md:mt-14">
          <AspectRatio
            ratio={16 / 9}
            data-showcase="frame"
            translate="no"
            className="overflow-hidden rounded-panel border border-border bg-surface"
          >
            <AutoPauseVideo
              asset={SHOWCASE_VIDEO.farm}
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            />
            <ShowcaseOverlay />
          </AspectRatio>
        </div>
        <p className="sr-only">
          Annotated first-person clip. Green boxes track both hands and the pruning shears,
          polylines trace each hand path, and Ego4D-style labels mark the cut action from PRE
          to POST.
        </p>
      </div>
    </section>
  );
}
