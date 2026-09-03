"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TURN_COPY } from "@/src/content/sections";

// The turn, the opening argument of /white-paper. Moved off / on
// 2026-09-03 (founder) together with the method and the future rig. Bone
// opens the section; the two cited facts get their
// own forest set-piece slab. Redesign 2026-07-22 (redesign/blocks-v2):
// every section is a flat solid slab with hard edges, the stat slab fills
// the viewport by itself, and all type comes off the shared LOOK.md scale
// (display via --font-display, body 17px/1.65 at 640px measure, mono data
// step for source lines). One quiet discrete reveal on scroll, gated
// behind prefers-reduced-motion so reduced motion and no-JS both render
// the resolved, final state.
// headingAs lets the owning route pick the level for the section's first
// heading without restyling it. The turn now opens /white-paper, so that
// route passes "h1" and the document starts at level 1; the default stays
// "h2" for any page that mounts the turn below its own title.
export function TurnSection({
  headingAs: Heading = "h2",
}: {
  headingAs?: "h1" | "h2";
}) {
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
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 78%",
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
    <section className="bg-bone text-black">
      <div ref={rootRef}>
        <div className="mx-auto max-w-site px-6 py-16 md:px-16 md:py-32">
          <Heading className="font-display text-[22px] leading-[1.3] font-medium text-forest md:text-[26px]">
            {TURN_COPY.heading}
          </Heading>
          <p
            data-reveal
            className="mt-6 max-w-[1040px] font-display text-[44px] leading-[1.02] tracking-[-0.015em] text-balance md:text-[64px] lg:text-[92px]"
          >
            {TURN_COPY.positioning}
          </p>
          <p
            data-reveal
            className="mt-16 max-w-[640px] text-[17px] leading-[1.65]"
          >
            {TURN_COPY.turn}
          </p>
        </div>

        {/* Stat set-piece: the section's one forest slab, anatomy per
            ui-refs-green section 3: numeral, then a qualifying line kept
            verbatim from TURN_COPY (never paraphrased), then a hairline,
            then an always-visible mono source line. The numerals repeat
            the figures already inside each sentence below, pulled out to
            display scale so they read as citations rather than sitting
            buried in prose. The slab starts and ends on a hard edge and
            fills the viewport by itself, stats centered. */}
        <div
          data-reveal
          className="flex min-h-svh items-center bg-forest px-6 py-16 text-bone-hi md:px-16"
        >
          <div className="mx-auto grid w-full max-w-site gap-16 md:grid-cols-2">
            <div>
              <p
                className="font-display leading-none tracking-tight text-bone-hi"
                style={{ fontSize: "clamp(72px, 11vw, 132px)" }}
              >
                54%
              </p>
              <p className="mt-6 max-w-[640px] text-[17px] leading-[1.65] text-bone-hi/90">
                {TURN_COPY.lead}
              </p>
              <p className="mt-6 border-t border-bone/24 pt-2 font-mono text-[13px] leading-[1.7] text-bone/72">
                {TURN_COPY.leadSource}
              </p>
            </div>
            <div>
              <p
                className="font-display leading-none tracking-tight text-bone-hi"
                style={{ fontSize: "clamp(72px, 11vw, 132px)" }}
              >
                3,670
                <span className="ml-3 font-sans text-[17px] font-medium text-bone/72">
                  hours
                </span>
              </p>
              <p className="mt-6 max-w-[640px] text-[17px] leading-[1.65] text-bone-hi/90">
                {TURN_COPY.indoor}
              </p>
              <p className="mt-6 border-t border-bone/24 pt-2 font-mono text-[13px] leading-[1.7] text-bone/72">
                {TURN_COPY.indoorSource}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
