"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { HERO_COPY } from "@/src/content/hero";

// Shared wordmark geometry. The real wordmark and the robotic lens
// variant must never drift apart, so both render from this one constant.
export const WORDMARK_CLASS =
  "absolute left-1/2 top-[62svh] -translate-x-1/2 -translate-y-1/2 font-display text-[13.5vw] leading-none font-bold tracking-[0.06em] whitespace-nowrap uppercase select-none font-stretch-expanded";

// Entrance art direction. The wordmark resolves letter by letter in a
// woven, tactile way: soft blur, small drift, long random stagger. Total
// read is about two seconds. Client will refine against a reference.
const ENTRANCE = {
  charDuration: 1.6,
  charStagger: 0.09,
  staggerFrom: "random" as const,
  blurPx: 8,
  driftPx: 6,
  ease: "power2.out",
  fallbackFade: 1.2,
} as const;

// Wordmark, mono line, cue, beats, and state tags. The entrance fires on
// load only, never on scroll. The CSS initial state hides the wordmark
// only when motion is allowed, so reduced motion and no-JS render the
// resolved letters instantly with no flash.
export function HeroCopy() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const target = rootRef.current?.querySelector<HTMLElement>(
          "[data-wordmark-text]",
        );
        if (!target) return;
        let split: SplitText | undefined;
        let tween: gsap.core.Tween | undefined;
        let cancelled = false;
        // Archivo expanded must be measured after fonts load or the char
        // boxes come out wrong.
        document.fonts.ready.then(() => {
          if (cancelled) return;
          try {
            split = new SplitText(target, { type: "chars", aria: "auto" });
            tween = gsap.fromTo(
              split.chars,
              {
                autoAlpha: 0,
                filter: `blur(${ENTRANCE.blurPx}px)`,
                y: ENTRANCE.driftPx,
              },
              {
                autoAlpha: 1,
                filter: "blur(0px)",
                y: 0,
                duration: ENTRANCE.charDuration,
                ease: ENTRANCE.ease,
                stagger: {
                  each: ENTRANCE.charStagger,
                  from: ENTRANCE.staggerFrom,
                },
                onComplete: () => {
                  if (split) gsap.set(split.chars, { clearProps: "filter,transform" });
                },
              },
            );
            // After the chars carry the hidden state, the container can
            // show without a flash.
            gsap.set(target, { opacity: 1 });
          } catch {
            tween = gsap.fromTo(
              target,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: ENTRANCE.fallbackFade, ease: "power2.out" },
            );
          }
        });
        return () => {
          cancelled = true;
          tween?.kill();
          split?.revert();
        };
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-hero-copy className="absolute inset-0">
      <div data-word-mask className="pointer-events-none absolute inset-0">
        <h1 data-wordmark className={WORDMARK_CLASS}>
          <span data-wordmark-text className="inline-block text-bone-hi">
            {HERO_COPY.wordmark}
          </span>
        </h1>
      </div>
      <p
        data-hero-monoline
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs whitespace-nowrap text-bone-dim sm:text-sm"
      >
        {HERO_COPY.monoLine}
      </p>
      <p
        data-beat-one
        className="hero-beat absolute top-1/2 left-1/2 w-[min(88vw,36rem)] -translate-x-1/2 -translate-y-1/2 text-center font-display text-2xl leading-tight font-bold text-bone-hi opacity-0 font-stretch-expanded sm:text-3xl lg:text-4xl"
      >
        {HERO_COPY.beatOne}
      </p>
      <p
        data-beat-two
        className="hero-beat absolute top-1/2 left-1/2 w-[min(88vw,40rem)] -translate-x-1/2 -translate-y-1/2 text-center font-display text-xl leading-tight font-bold text-bone-hi opacity-0 font-stretch-expanded sm:text-2xl lg:text-3xl"
      >
        {HERO_COPY.beatTwo}
      </p>
      <span
        data-hero-cue
        aria-hidden="true"
        className="hero-cue absolute bottom-3 left-1/2 h-6 w-px -translate-x-1/2 bg-bone/40"
      />
      <div
        data-state-tag
        aria-hidden="true"
        className="absolute bottom-8 left-6 font-mono text-[11px] tracking-wider whitespace-nowrap uppercase opacity-0 lg:left-10"
      >
        <span data-tag-human className="block text-mono-anno">
          {HERO_COPY.stateTagHuman}
        </span>
        <span
          data-tag-robot
          className="absolute inset-0 text-mono-anno opacity-0"
        >
          {HERO_COPY.stateTagRobot}
        </span>
      </div>
      <div
        data-lens-word
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:motion-safe:block"
      >
        <div data-lens-word-text className={WORDMARK_CLASS}>
          {HERO_COPY.wordmark}
        </div>
      </div>
    </div>
  );
}
