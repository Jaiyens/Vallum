"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { METHOD_AERIAL } from "@/lib/assets";
import { SECTION_IDS } from "@/lib/site";
import { METHOD_COPY } from "@/src/content/sections";

// Three rows mapped to their governing verb (research/ui-refs-method.md
// section 6): consent, window, kit. Numeral is set in the body face at
// reduced size, never mono (mono is reserved for literal data values per
// LOOK.md and section 4's combined rule), no card, no icon tile, a
// hairline beneath each row is the only divider.
const STEPS = [
  { n: "01", label: METHOD_COPY.peopleLabel, body: METHOD_COPY.people },
  { n: "02", label: METHOD_COPY.windowLabel, body: METHOD_COPY.window },
  { n: "03", label: METHOD_COPY.kitLabel, body: METHOD_COPY.kit },
] as const;

// Beat 4, the method. Bone surface, tinted slightly toward forest
// (surface-bone-forest-tint, globals.css day-op block) so the turn-to-method
// run carries a second, quieter step of green rhythm without a full dark
// band. The aerial anchors step 2 only, in a fixed column at 40% of the row
// (under the 45% cap), never full-bleed. Discrete stagger reveal on scroll,
// no scrub, no pin: three short rows and one photo is not a sequence long
// enough to justify scrubbing (section 6/7). Reduced motion renders every
// row and the photo at rest, no transform, no opacity ramp.
export function MethodSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets =
          rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!targets || !targets.length) return;
        const tween = gsap.fromTo(
          targets,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 75%",
              once: true,
            },
          },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="surface-bone-forest-tint scroll-mt-14 border-t border-forest-line/30 text-black"
    >
      <div
        ref={rootRef}
        className="mx-auto max-w-site px-4 py-section-sm md:px-6 md:py-44"
      >
        <h2 className="max-w-3xl font-display text-3xl font-bold text-balance font-stretch-expanded md:text-5xl">
          {METHOD_COPY.heading}
        </h2>

        <div className="mt-20 md:mt-32">
          {STEPS.map((step, i) => {
            const isWindow = i === 1;
            return (
              <div
                key={step.label}
                data-reveal
                className={`${i === 0 ? "" : "mt-20 md:mt-28"} border-b border-forest-line pb-12 md:pb-16`}
              >
                <div
                  className={
                    isWindow
                      ? "grid gap-8 md:grid-cols-[3fr_2fr] md:items-center md:gap-10"
                      : undefined
                  }
                >
                  <div className="max-w-[640px]">
                    <span className="font-sans text-sm text-forest-line tabular-nums">
                      {step.n}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold md:text-2xl">
                      {step.label}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-lg leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                  {isWindow ? (
                    <div className="overflow-hidden rounded-panel">
                      <img
                        src={METHOD_AERIAL.src}
                        alt={METHOD_AERIAL.label}
                        width={2400}
                        height={1018}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
