"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HERO_COPY } from "@/src/content/hero";

// Wordmark, mono line, and scroll cue. The one-time entrance fires on load
// only, never on scroll: a thin green-signal line passes down the wordmark
// in about 900ms while the letters resolve from bone-dim to bone-hi. The
// hidden initial state of the bright layer lives in CSS behind a motion
// media query, so reduced motion (and no JS) shows resolved letters with
// no scan and there is no first-frame flash either way.
export function HeroCopy() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          "[data-scan-line]",
          { top: "-6%", autoAlpha: 1 },
          { top: "104%", duration: 0.9 },
          0,
        )
          .to(
            "[data-wordmark-hi]",
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
            0,
          )
          .to("[data-scan-line]", { autoAlpha: 0, duration: 0.2 }, 0.9);
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-hero-copy className="absolute inset-0">
      <h1
        data-wordmark
        className="absolute left-1/2 top-[62svh] -translate-x-1/2 -translate-y-1/2 font-display text-[13.5vw] leading-none font-bold tracking-[0.06em] whitespace-nowrap uppercase select-none font-stretch-expanded"
      >
        <span className="text-bone-dim">{HERO_COPY.wordmark}</span>
        <span
          data-wordmark-hi
          aria-hidden="true"
          className="absolute inset-0 text-bone-hi"
        >
          {HERO_COPY.wordmark}
        </span>
        <span
          data-scan-line
          aria-hidden="true"
          className="absolute -inset-x-[3%] top-0 h-px bg-green-signal"
        />
      </h1>
      <p
        data-hero-monoline
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs whitespace-nowrap text-bone-dim sm:text-sm"
      >
        {HERO_COPY.monoLine}
      </p>
      <span
        data-hero-cue
        aria-hidden="true"
        className="hero-cue absolute bottom-3 left-1/2 h-6 w-px -translate-x-1/2 bg-bone/40"
      />
    </div>
  );
}
