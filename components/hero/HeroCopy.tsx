"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { HERO_COPY } from "@/src/content/hero";

// Shared wordmark geometry. The real wordmark and the overgrown lens
// variant must never drift apart, so both render from this one constant.
// Bottom-anchored so the wordmark sits right above the mono line (which
// lives at bottom-10); the extra offset below lg keeps the two from
// touching where the descent gap shrinks with the vw font size.
// Kerning is off on purpose: see the KERNING note above LENS_WORDMARK_SRC.
export const WORDMARK_CLASS =
  "absolute left-1/2 bottom-14 lg:bottom-10 -translate-x-1/2 font-display text-[8vw] leading-none font-bold tracking-[0.06em] [font-kerning:none] whitespace-nowrap uppercase select-none font-stretch-expanded";

// The overgrown wordmark revealed inside the lens: the "VALLUM LABS" letters
// wrapped in vines and gears, alpha-keyed so the background, the letter
// counters and the word gap read through to the film, revealed where the
// typed word drops out (F-0902). The art was regenerated from the OLD typed
// wordmark (Archivo expanded, 2026-07-20), so its ceramic letter-run keeps
// that face's proportions (letter-run aspect 13.30). The typed wordmark is
// now Newsreader bold caps (ink aspect 10.79), so no uniform scale can land
// both the run width and the cap height. The art is therefore sized on BOTH
// axes so its letter faces fill the typed ink box exactly, which stretches
// the vines and gears 1.233x vertically. Letter-for-letter coincidence
// (serif V on serif V) needs the art regenerated from the Newsreader render;
// until then the ink box is what aligns.
//
// PLACEMENT IS STRUCTURAL, not viewport-tuned. The <img> lives inside a
// wrapper that carries WORDMARK_CLASS AND an invisible copy of the wordmark
// string, so the wrapper box is identical to the h1 box at every viewport.
// Every number below is a multiple of the font size (em on the <img>, which
// inherits the 8vw); none of them touch viewport height or a fixed pixel,
// so vine-on-typed holds at every width by construction.
//
// KERNING. SplitText splits the h1 into one inline-block per character for
// the typewriter entrance and never reverts, so the visible wordmark is laid
// out WITHOUT kerning (each glyph is its own box). An unsplit twin kerns
// (VA, LA, ...) and comes out 0.14em narrower, which is what pulled the art
// off the letters before 2026-09-03 on top of the font change. WORDMARK_CLASS
// disables kerning on both, so h1 and twin agree in every state: split,
// unsplit, reduced motion, no JS.
//
// ---- constants (re-derive after any art regen or type change) ----
// A) Asset letter-run fractions of the 2976x540 frame, from cross-correlating
//    a clean typed render against the art's bright-ceramic mask (2026-07-21):
//    left 0.0497, right 0.9483, capTop 0.326, baseline 0.698, hence
//      runWidthFrac RW = 0.8986, faceHeightFrac FH = 0.372,
//      belowBaselineFrac = 0.302, centreXFrac = 0.4990.
// B) Typed metrics, Newsreader 700 caps, tracking 0.06em, kerning off,
//    pixel-scanned at 2x across 1440/1710/1920/2560 (2026-09-03), each a
//    multiple of fs = 8vw: ink width 8.480*fs; cap height 0.7855*fs; ink
//    bottom 0.2345*fs above the box bottom; ink centre 0.0614*fs left of the
//    box centre (trailing tracking plus V/S side bearings).
// Applied to the <img> (see JSX below):
//   width      = inkWidth / RW              = 8.480 / 0.8986 = 9.437em
//   height     = capHeight / FH             = 0.7855 / 0.372 = 2.112em
//   translateY = 0.302 * height - 0.2345    = 0.403em (down)
//   translateX = -0.0614 - (0.4990 - 0.5) * 9.437 = -0.052em (after the -50%)
// Re-derive A) whenever the art is regenerated; re-derive B) whenever the
// font, the string, the tracking or the kerning change.
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

// Wordmark, cue, beats, and state tags. The bottom mono line is gone (Jaiyen's
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
        // The display face must be loaded before the split or the char
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
              string as the h1, so this wrapper's box is identical to the
              h1 box at every viewport (same font, size, tracking, bottom
              anchor, centring, and kerning off so the split h1 and this
              unsplit twin lay out alike). The art is positioned relative
              to THIS box, so the vine letters track the typed letters by
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
            className="pointer-events-none absolute bottom-0 left-1/2 max-w-none select-none"
            style={{
              width: "9.437em",
              height: "2.112em",
              transform: "translateX(calc(-50% - 0.052em)) translateY(0.403em)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
