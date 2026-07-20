"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { HERO_COPY } from "@/src/content/hero";

// Shared wordmark geometry. The real wordmark and the overgrown lens
// variant must never drift apart, so both render from this one constant.
// Bottom-anchored so the wordmark sits right above the mono line (which
// lives at bottom-10); the extra offset below lg keeps the two from
// touching where the descent gap shrinks with the vw font size.
export const WORDMARK_CLASS =
  "absolute left-1/2 bottom-14 lg:bottom-10 -translate-x-1/2 font-display text-[8vw] leading-none font-bold tracking-[0.06em] whitespace-nowrap uppercase select-none font-stretch-expanded";

// The overgrown wordmark revealed inside the lens: the letters wrapped in
// vines and gears, cut out from the key art, revealed where the typed word
// drops out. The prior "VALLUM LABS" art was an opaque plate on pure black
// whose vine glyphs did not sit on the typed glyphs, so the lens showed a
// black hole (F-0902 reopened). This art is regenerated FROM the rendered
// typed wordmark: the bone-on-black h1 was screenshotted at 1440x900, restyled
// into vines and gears with its letter geometry preserved, then alpha-keyed so
// the background (and the letter counters and the word gap) reads through to
// the film. Canvas is a 2976x540 transparent strip; inside it the vine letters
// run "V" left to "S" right across px 106..2858 (2752px, 92.5% of the frame)
// and their caps sit at px 182..342.
//
// Alignment, all measured on the live page at 1440x900: the typed ink runs
// x 162..1267 (1105px, 76.74vw) with caps at y 797.5..871.5 (74px), and the
// shared bottom anchor leaves the wrapper content bottom at y 860. Displaying
// the strip at width 82.98vw makes its 92.5%-wide letter run equal the 76.74vw
// typed run, so the vine letters take the typed letters' width and spacing.
// translate-y 5.98vw drops the vine caps onto the typed caps; translate-x
// -0.21vw corrects the small offset between the art's optical centre and the
// wrapper's geometric centre. Re-derive the three numbers (width, translate-y,
// translate-x) if the art crop or the wordmark typography changes.
export const LENS_WORDMARK_SRC = "/hero/wordmark-vines-labs.webp";

// Entrance art direction. The wordmark types on letter by letter: each
// char lands whole, no fade, at a slow deliberate cadence. Total read is
// about two seconds. Client direction 2026-07-15: slow type preferred
// over the woven blur resolve.
const ENTRANCE = {
  charStagger: 0.26,
  startDelay: 0.4,
  fallbackFade: 1.2,
} as const;

// Wordmark, cue, beats, and state tags. The bottom mono line is gone (Jay's
// 2026-07-16 correction); its element is removed rather than rendered empty,
// and HeroExperience's monoline setter degrades to a no-op when the node is
// absent. The entrance fires on load only, never on scroll. The CSS initial
// state hides the wordmark only when motion is allowed, so reduced motion and
// no-JS render the resolved letters instantly with no flash.
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
        <span data-tag-human className="block text-bone-hi">
          {HERO_COPY.stateTagHuman}
        </span>
        <span
          data-tag-robot
          className="absolute inset-0 text-bone-hi opacity-0"
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
            loading="eager"
            decoding="async"
            className="h-auto w-[82.98vw] max-w-none -translate-x-[0.21vw] translate-y-[5.98vw] select-none"
          />
        </div>
      </div>
    </div>
  );
}
