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

// The overgrown wordmark revealed inside the lens: the "VALLUM LABS" letters
// wrapped in vines and gears, alpha-keyed so the background, the letter
// counters and the word gap read through to the film, revealed where the
// typed word drops out (F-0902). The art is a stylised regeneration of the
// TYPED wordmark, so its ceramic letter-run keeps the type's proportions
// (verified: letter-run aspect 13.30 vs typed ink 13.31).
//
// PLACEMENT IS STRUCTURAL, not viewport-tuned. The <img> lives inside a
// wrapper that carries WORDMARK_CLASS AND an invisible copy of the wordmark
// string, so the wrapper box is byte-identical to the h1 box at every
// viewport. Every number below is a pure ratio (a percent of that twin box,
// or a multiple of the 8vw font-size fs); none of them touch viewport height
// or a fixed pixel, so vine-on-typed holds at every width by construction.
// The previous art placed the strip in its own vw-sized box
// (82.98vw wide, translate-y 5.98vw) whose only tie to the type was three
// magic numbers hand-fit at 1440x900. That decoupling meant a regenerated
// asset (whose letters sit differently inside the frame) left the vine word
// ~2.7vw too low and ~2vw too narrow at EVERY width: a constant vw error that
// scales up in pixels, so it read as tolerable near 1440 and gross past
// ~2000px. Full root-cause chain and the rejected options are in the fix
// report that shipped this change.
//
// ---- constants (re-derive after any art regen) ----
// A) Asset letter-run fractions, from cross-correlating a clean typed render
//    against the art's bright-ceramic mask (coverage 0.805; sharp script in
//    the fix report). The 2976x540 frame maps the typed ink to left 0.0497,
//    right 0.9483, capTop 0.326, baseline 0.698, hence
//      runWidthFrac RW = 0.8986, (1 - baselineFrac) = 0.3021,
//      centreXFrac    = 0.499 (~centred),  asset aspect H/W = 540/2976 = 0.18145.
// B) Typed metrics, measured live and constant across 1440..2560 (each a
//    multiple of fs = 8vw): ink width 9.590*fs; twin BOX width 9.7217*fs (ink
//    plus V/S side bearings); baseline 0.160*fs above the box bottom; ink
//    centre 0.0488*fs left of box centre (V/S side-bearing asymmetry).
// Applied to the <img> (see JSX below):
//   width%     = (inkWidth / RW) / twinBoxWidth
//              = (9.590/0.8986)/9.7217 = 1.0978        -> width: 109.78%
//   translateY = (1-baselineFrac)*imgHeight - baseline   (down, in fs)
//              = 0.3021*(1.0978*9.7217*0.18145) - 0.160
//              = 0.425*fs                               -> translateY 3.40vw
//   translateX = ink-centre-offset - (centreXFrac-0.5)*imgWidth   (in fs)
//              = (-0.0488 - (-0.0010)*10.672)           -> -0.0381*fs = -0.305vw
// Re-derive A) whenever the art is regenerated; re-derive B) only if the font,
// the string, or the tracking change.
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
          {/* Invisible twin of the typed wordmark. Same class and same
              string as the h1, so this wrapper's box is byte-identical to
              the h1 box at every viewport (same font, size, tracking,
              bottom anchor, centring). The art is positioned relative to
              THIS box, so the vine letters track the typed letters by
              construction rather than by viewport-tuned magic numbers. */}
          <span aria-hidden="true" className="invisible inline-block">
            {HERO_COPY.wordmark}
          </span>
          {/* eager: a lazy img inside a masked container never fetches in
              Chromium (F-0902); the container is display:none on mobile and
              reduced motion, so nothing is fetched there. See the constant
              block above LENS_WORDMARK_SRC for the width/translate math. */}
          <img
            src={LENS_WORDMARK_SRC}
            alt=""
            draggable={false}
            loading="eager"
            decoding="async"
            className="pointer-events-none absolute bottom-0 left-1/2 h-auto max-w-none select-none"
            style={{
              width: "109.78%",
              transform: "translateX(calc(-50% - 0.305vw)) translateY(3.40vw)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
