"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { getRevealMode } from "@/lib/reveal-mode";
import { AutoPauseVideo } from "@/components/media/auto-pause-video";
import { Button } from "@/components/ui/button";
import { HERO_VIDEO } from "@/lib/assets";
import { CAL_COM_LINK } from "@/lib/site";

const HEADLINE_1 = "Humans were never meant to do this work.";
const HEADLINE_2 =
  "The real world’s most dangerous work, captured for the machines learning to do it.";

const HEADLINE_CLASS =
  "max-w-4xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-paper font-stretch-expanded md:text-6xl xl:text-7xl";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const mode = getRevealMode();

        gsap.set('[data-hero="robot"]', {
          ...(mode === "clip"
            ? { autoAlpha: 1, clipPath: "circle(0% at 50% 45%)" }
            : { autoAlpha: 0, filter: "blur(12px)" }),
        });

        // kinetic type: split everything into masked units up front
        const wordmark = SplitText.create('[data-hero="wordmark"]', {
          type: "chars",
          mask: "chars",
        });
        const h1 = SplitText.create('[data-hero="h1"]', { type: "words", mask: "words" });
        const h2 = SplitText.create('[data-hero="h2"]', { type: "words", mask: "words" });

        // headlines are CSS-hidden (opacity-0 class) until JS owns them, so
        // the load view is only video + wordmark with no flash
        gsap.set(h1.words, { yPercent: 130, opacity: 0, filter: "blur(8px)" });
        gsap.set(h2.words, { yPercent: 130, opacity: 0, filter: "blur(8px)" });
        gsap.set('[data-hero="h1"], [data-hero="h2"]', { autoAlpha: 1 });

        // load-in: the wordmark rises out of its masks, char by char. The
        // tiny delay keeps the scrub's overwrite able to kill it if the user
        // scrolls immediately.
        gsap.from(wordmark.chars, {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          stagger: { each: 0.04, from: "center" },
          delay: 0.05,
        });

        gsap.to('[data-hero="cue-line"]', {
          y: 6,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
        });

        const robotVideo = scope.current?.querySelector<HTMLVideoElement>(
          '[data-hero="robot"] video',
        );
        let robotStarted = false;

        // scrub choreography; positions are fractions of a 1s timeline:
        // wordmark scatters out -> h1 assembles word by word -> world turns
        // robot -> h1 breaks apart -> h2 assembles over the robot layer
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              if (!robotStarted && robotVideo && self.progress > 0.25) {
                robotStarted = true;
                robotVideo.dataset.started = "1";
                robotVideo.play().catch(() => {});
              }
            },
          },
        });
        tl.to(
          wordmark.chars,
          {
            yPercent: -130,
            opacity: 0,
            stagger: { each: 0.006, from: "center" },
            duration: 0.08,
            ease: "power2.in",
            overwrite: "auto",
          },
          0.02,
        )
          .to('[data-hero="wordmark-dot"]', { autoAlpha: 0, duration: 0.05 }, 0.03)
          .to('[data-hero="cue"]', { autoAlpha: 0, duration: 0.05 }, 0.02)
          .to(
            h1.words,
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              stagger: 0.009,
              duration: 0.14,
              ease: "power2.out",
            },
            0.13,
          )
          .to('[data-hero="cta-row"]', { autoAlpha: 1, y: 0, duration: 0.08 }, 0.27)
          .to('[data-hero="human"]', { scale: 1.06, duration: 0.3 }, 0.34)
          .to(
            '[data-hero="robot"]',
            mode === "clip"
              ? { clipPath: "circle(120% at 50% 45%)", duration: 0.28 }
              : { autoAlpha: 1, filter: "blur(0px)", duration: 0.28 },
            0.36,
          )
          .to(
            h1.words,
            {
              yPercent: -120,
              opacity: 0,
              stagger: { each: 0.006, from: "end" },
              duration: 0.1,
              ease: "power2.in",
            },
            0.52,
          )
          .to(
            h2.words,
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              stagger: 0.008,
              duration: 0.16,
              ease: "power2.out",
            },
            0.64,
          )
          .to({}, { duration: 0.08 }, 0.92); // pad total to 1

        return () => {
          wordmark.revert();
          h1.revert();
          h2.revert();
        };
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-label="Introduction"
      className="relative h-[250svh] motion-reduce:h-auto"
    >
      {/* hoisted to <head>; only the hero poster is preloaded */}
      <link
        rel="preload"
        as="image"
        href={HERO_VIDEO.human.poster}
        fetchPriority="high"
      />
      {/* without JS the scrub never reveals the headlines; unhide them */}
      <noscript>
        <style>{`[data-hero="h1"],[data-hero="h2"],[data-hero="cta-row"]{opacity:1!important}`}</style>
      </noscript>
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:static motion-reduce:flex motion-reduce:h-auto motion-reduce:min-h-svh motion-reduce:flex-col motion-reduce:justify-end">
        {/* video layers */}
        <div data-hero="human" className="absolute inset-0">
          <AutoPauseVideo
            asset={HERO_VIDEO.human}
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/35"
          />
        </div>
        <div data-hero="robot" className="absolute inset-0 opacity-0 motion-reduce:hidden">
          <AutoPauseVideo
            asset={HERO_VIDEO.robot}
            deferPlay
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <div aria-hidden="true" className="scanlines absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/35"
          />
        </div>

        {/* load view: just the wordmark over the video */}
        <div className="absolute inset-0 z-10 grid place-items-center motion-reduce:relative motion-reduce:inset-auto motion-reduce:pt-32 motion-reduce:pb-4">
          {/* the split target is an inline span: SplitText inside a flex
              container turns each char into a flex item and drops word gaps */}
          <div
            translate="no"
            className="flex items-baseline gap-2 px-4 font-display text-4xl font-bold tracking-tight text-paper font-stretch-expanded md:gap-3 md:text-7xl xl:text-8xl"
          >
            <span data-hero="wordmark">Vallum Labs</span>
            <span
              data-hero="wordmark-dot"
              aria-hidden="true"
              className="size-2 bg-hazard md:size-3"
            />
          </div>
        </div>

        {/* scroll-revealed headlines */}
        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-site flex-col justify-end px-4 pb-24 md:px-6 md:pb-28 motion-reduce:relative motion-reduce:inset-auto motion-reduce:pt-0 motion-reduce:pb-16">
          <div className="relative">
            <h1
              data-hero="h1"
              className={`${HEADLINE_CLASS} opacity-0 motion-reduce:opacity-100`}
            >
              {HEADLINE_1}
            </h1>
            <p
              data-hero="h2"
              className={`${HEADLINE_CLASS} absolute inset-x-0 bottom-0 opacity-0 motion-reduce:static motion-reduce:mt-10 motion-reduce:opacity-100`}
            >
              {HEADLINE_2}
            </p>
          </div>
          <div
            data-hero="cta-row"
            className="mt-10 translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
          >
            <Button asChild className="h-12 px-7 text-base">
              <a href={CAL_COM_LINK} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </Button>
          </div>
        </div>

        {/* scroll cue: a single thin line, nothing else */}
        <div
          data-hero="cue"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 motion-reduce:hidden"
        >
          <span
            data-hero="cue-line"
            className="block h-10 w-px bg-gradient-to-b from-hazard to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
