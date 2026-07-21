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

// Beat 4, the method. Plain bone slab (redesign/blocks-v2: the tint
// surface is retired; slabs commit to one surface). The aerial anchors
// step 2 only, in a fixed column at 40% of the row (under the 45% cap),
// never full-bleed. Discrete stagger reveal on scroll, no scrub, no pin:
// three short rows and one photo is not a sequence long enough to justify
// scrubbing (section 6/7). Reduced motion renders every row and the photo
// at rest, no transform, no opacity ramp.
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
      className="scroll-mt-14 bg-bone text-black"
    >
      <div
        ref={rootRef}
        className="mx-auto max-w-site px-6 py-16 md:px-16 md:py-48"
      >
        <h2 className="max-w-[1040px] font-display text-[32px] leading-[1.08] tracking-[-0.01em] text-balance md:text-[44px] lg:text-[56px]">
          {METHOD_COPY.heading}
        </h2>

        <div className="mt-16 md:mt-32">
          {STEPS.map((step, i) => {
            const isWindow = i === 1;
            return (
              <div
                key={step.label}
                data-reveal
                className={`${i === 0 ? "" : "mt-16 md:mt-24"} border-b border-forest-line pb-16`}
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
                    <h3 className="mt-2 font-display text-[22px] leading-[1.3] font-medium md:text-[26px]">
                      {step.label}
                    </h3>
                    <p className="mt-6 max-w-[640px] text-[17px] leading-[1.65]">
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
