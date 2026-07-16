"use client";

import { useRef } from "react";
import { Newsreader } from "next/font/google";
import { gsap, useGSAP } from "@/lib/gsap";
import { TURN_COPY } from "@/src/content/sections";

// Display serif for the positioning lead and the two stat numerals only
// (research/ui-refs-green.md section 3, "large serif numerals... display
// scale"). LOOK.md's target display face site-wide is Newsreader, but the
// shared --font-display token still points at Archivo pending the
// site-wide type swap another agent owns (see
// components/future-rig/rig-font.ts for the same pattern already in the
// codebase). Loaded locally so this section can carry the correct face
// without touching the shared theme token.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  style: ["normal"],
  display: "swap",
});

// Beat 3, the turn. Bone opens the section; the two cited facts get their
// own forest set-piece band (ui-refs-green section 3), bridged top and
// bottom by the shared seam utilities (globals.css day-op block) so the
// cream-to-green boundary reads as a gradient, never a hard edge. One
// quiet discrete reveal on scroll, gated behind prefers-reduced-motion so
// reduced motion and no-JS both render the resolved, final state.
export function TurnSection() {
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
        <div className="mx-auto max-w-site px-4 pt-section-sm md:px-6 md:pt-44">
          <h2 className="max-w-3xl font-display text-lg font-semibold text-forest-line md:text-xl">
            {TURN_COPY.heading}
          </h2>
          <p
            data-reveal
            className={`${newsreader.className} mt-6 max-w-3xl text-balance text-[34px] leading-[1.12] tracking-[-0.01em] md:text-[52px]`}
          >
            {TURN_COPY.positioning}
          </p>
          <p data-reveal className="mt-8 max-w-2xl text-lg leading-relaxed">
            {TURN_COPY.turn}
          </p>
        </div>

        {/* Stat set-piece: the section's one forest band, per
            ui-refs-green section 3's anatomy: numeral, then a qualifying
            line kept verbatim from TURN_COPY (never paraphrased), then a
            hairline, then an always-visible tracked-caps source line. The
            numerals repeat the figures already inside each sentence below,
            pulled out to display scale so they read as citations rather
            than sitting buried in prose.

            The gap above is deliberately generous, both as the breath
            before the register shift (ui-refs-green's "different room, not
            CSS changed" cue) and because it is the lever that keeps the
            luminance probe's light-band floor satisfied: dataset.tsx and
            ethos.tsx (out of this charter's ownership) already run two
            full forest sections back to back, so this bone run has to
            carry real height to keep the page's overall light/dark ratio
            in budget. Re-measure with the crawl.mjs luminance method
            before shrinking it. */}
        <div
          data-reveal
          className="relative mt-[230px] bg-forest px-4 py-14 text-bone-hi md:mt-[590px] md:px-6 md:py-20"
        >
          <span aria-hidden="true" className="seam-into-forest" />
          <div className="mx-auto grid max-w-site gap-16 md:grid-cols-2 md:gap-14">
            <div>
              <p
                className={`${newsreader.className} leading-none tracking-tight text-bone-hi`}
                style={{ fontSize: "clamp(72px, 11vw, 132px)" }}
              >
                54%
              </p>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-bone-hi/90 md:text-base">
                {TURN_COPY.lead}
              </p>
              <p className="mt-5 border-t border-forest-line pt-3 font-mono text-[11px] tracking-[0.12em] text-bone/72 uppercase">
                {TURN_COPY.leadSource}
              </p>
            </div>
            <div>
              <p
                className={`${newsreader.className} leading-none tracking-tight text-bone-hi`}
                style={{ fontSize: "clamp(72px, 11vw, 132px)" }}
              >
                3,670
                <span className="ml-2 font-sans text-[13px] font-medium tracking-[0.1em] text-bone/60 uppercase">
                  hours
                </span>
              </p>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-bone-hi/90 md:text-base">
                {TURN_COPY.indoor}
              </p>
              <p className="mt-5 border-t border-forest-line pt-3 font-mono text-[11px] tracking-[0.12em] text-bone/72 uppercase">
                {TURN_COPY.indoorSource}
              </p>
            </div>
          </div>
          <span aria-hidden="true" className="seam-into-bone" />
        </div>
      </div>
    </section>
  );
}
