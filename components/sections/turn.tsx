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
// own forest set-piece block. Founder rule 2026-07-21: every section is a
// flat solid block with hard edges — no gradient seams — and the stat
// block fills the viewport on its own. One quiet discrete reveal on
// scroll, gated behind prefers-reduced-motion so reduced motion and no-JS
// both render the resolved, final state.
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
        <div className="mx-auto max-w-site px-4 py-section-sm md:px-6 md:py-44">
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

        {/* Stat set-piece: the section's one forest block, anatomy per
            ui-refs-green section 3: numeral, then a qualifying line kept
            verbatim from TURN_COPY (never paraphrased), then a hairline,
            then an always-visible tracked-caps source line. The numerals
            repeat the figures already inside each sentence below, pulled
            out to display scale so they read as citations rather than
            sitting buried in prose.

            Founder rule 2026-07-21: the block starts and ends on a hard
            edge and fills the viewport by itself, stats centered. This
            supersedes the earlier seam-gradient treatment and the
            oversized bone gap that fed the luminance probe's light-band
            floor. */}
        <div
          data-reveal
          className="flex min-h-svh items-center bg-forest px-4 py-20 text-bone-hi md:px-6"
        >
          <div className="mx-auto grid w-full max-w-site gap-16 md:grid-cols-2 md:gap-14">
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
        </div>
      </div>
    </section>
  );
}
