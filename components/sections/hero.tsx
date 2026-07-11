"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getRevealMode } from "@/lib/reveal-mode";
import { AutoPauseVideo } from "@/components/media/auto-pause-video";
import { Button } from "@/components/ui/button";
import { HERO_VIDEO } from "@/lib/assets";
import { CAL_COM_LINK } from "@/lib/site";

const HEADLINE_1 = "Humans were never meant to do this work.";
const SUB_1 = "Vallum captures it, so machines can learn it.";
const HEADLINE_2 =
  "The real world’s most dangerous work, captured for the machines learning to do it.";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const mode = getRevealMode();

        // initial states
        gsap.set('[data-hero="robot"]', {
          ...(mode === "clip"
            ? { autoAlpha: 1, clipPath: "circle(0% at 50% 45%)" }
            : { autoAlpha: 0, filter: "blur(12px)" }),
        });

        // load-in, plays once
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from('[data-hero="h1wrap"]', { autoAlpha: 0, y: 32, duration: 0.8 })
          .from('[data-hero="cta-row"]', { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.4")
          .from('[data-hero="cue"]', { autoAlpha: 0, duration: 0.6 }, "-=0.3");

        gsap.to('[data-hero="cue-line"]', {
          y: 6,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
        });

        // the hidden robot layer defers loading; start it as soon as the
        // scrub begins so it is already moving when the mask reveals it
        const robotVideo = scope.current?.querySelector<HTMLVideoElement>(
          '[data-hero="robot"] video',
        );
        let robotStarted = false;

        // scrubbed transformation; positions are fractions of a 1s timeline
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              if (!robotStarted && robotVideo && self.progress > 0.03) {
                robotStarted = true;
                robotVideo.dataset.started = "1";
                robotVideo.play().catch(() => {});
              }
            },
          },
        });
        tl.to('[data-hero="cue"]', { autoAlpha: 0, duration: 0.08 }, 0.02)
          .to('[data-hero="human"]', { scale: 1.06, duration: 0.3 }, 0.15)
          .to(
            '[data-hero="robot"]',
            mode === "clip"
              ? { clipPath: "circle(120% at 50% 45%)", duration: 0.3 }
              : { autoAlpha: 1, filter: "blur(0px)", duration: 0.3 },
            0.15,
          )
          .to('[data-hero="h1wrap"]', { autoAlpha: 0, y: -24, duration: 0.1 }, 0.35)
          .fromTo(
            '[data-hero="h2wrap"]',
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.12 },
            0.5,
          )
          .to({}, { duration: 0.38 }, 0.62); // pad total to 1 so positions read as progress
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
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40"
          />
        </div>
        <div data-hero="robot" className="absolute inset-0 opacity-0 motion-reduce:hidden">
          <AutoPauseVideo
            asset={HERO_VIDEO.robot}
            deferPlay
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40"
          />
        </div>

        {/* content */}
        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-site flex-col justify-end px-4 pb-24 md:px-6 md:pb-28 motion-reduce:relative motion-reduce:inset-auto motion-reduce:pt-28">
          <div className="relative">
            <div data-hero="h1wrap">
              <h1 className="max-w-4xl font-display text-4xl font-bold text-balance text-paper font-stretch-expanded md:text-6xl xl:text-7xl">
                {HEADLINE_1}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-paper/80">{SUB_1}</p>
            </div>
            <div
              data-hero="h2wrap"
              className="absolute inset-x-0 bottom-0 opacity-0 motion-reduce:static motion-reduce:mt-10 motion-reduce:opacity-100"
            >
              <p className="max-w-4xl font-display text-4xl font-bold text-balance text-paper font-stretch-expanded md:text-6xl xl:text-7xl">
                {HEADLINE_2}
              </p>
            </div>
          </div>
          <div data-hero="cta-row" className="mt-10">
            <Button asChild className="h-11 px-6 text-base">
              <a href={CAL_COM_LINK} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </Button>
          </div>
        </div>

        {/* scroll cue */}
        <div
          data-hero="cue"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 motion-reduce:hidden"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-fog">scroll</span>
          <span
            data-hero="cue-line"
            className="block h-8 w-px bg-gradient-to-b from-hazard to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
