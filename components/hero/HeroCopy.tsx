"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { HERO_COPY } from "@/src/content/hero";

// Shared wordmark geometry. The real wordmark and the overgrown lens
// variant must never drift apart, so both render from this one constant.
export const WORDMARK_CLASS =
  "absolute left-1/2 top-[72svh] -translate-x-1/2 -translate-y-1/2 font-display text-[13.5vw] leading-none font-bold tracking-[0.06em] whitespace-nowrap uppercase select-none font-stretch-expanded";

// The overgrown wordmark revealed inside the lens: the letters wrapped in
// vines and gears, cut out from the key art. The letterforms occupy 92.4%
// of the asset width, centered 0.67% left of the asset box (the vine
// overhang differs per side). The text renders at 76.9vw, so the image
// goes to 83.3vw (76.9 / 0.924) with a 0.56vw nudge to put the letter
// centers, not the box centers, in register.
export const LENS_WORDMARK_SRC = "/hero/wordmark-vines.webp";

// Entrance art direction. The wordmark types on letter by letter: each
// char lands whole, no fade, at a slow deliberate cadence. Total read is
// about two seconds. Client direction 2026-07-15: slow type preferred
// over the woven blur resolve.
const ENTRANCE = {
  charStagger: 0.26,
  startDelay: 0.4,
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
            // Typewriter: near-zero duration so each char lands whole;
            // the stagger alone carries the rhythm.
            tween = gsap.fromTo(
              split.chars,
              { autoAlpha: 0 },
              {
                autoAlpha: 1,
                duration: 0.01,
                ease: "none",
                delay: ENTRANCE.startDelay,
                stagger: { each: ENTRANCE.charStagger, from: "start" },
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
        <div className={WORDMARK_CLASS}>
          {/* lazy: skipped entirely where the container is display:none
              (mobile, reduced motion); in-viewport on desktop, so it
              still fetches ahead of the first hover. */}
          <img
            src={LENS_WORDMARK_SRC}
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
            className="h-auto w-[83.3vw] max-w-none translate-x-[0.56vw] select-none"
          />
        </div>
      </div>
    </div>
  );
}
