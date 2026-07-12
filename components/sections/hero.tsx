"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { getRevealMode } from "@/lib/reveal-mode";
import { AutoPauseVideo } from "@/components/media/auto-pause-video";
import { Button } from "@/components/ui/button";
import { HERO_VIDEO } from "@/lib/assets";
import { CAL_COM_LINK } from "@/lib/site";

const HEADLINE_1 = "Humans were never meant to do this work.";
const SUB_1 = "Vallum captures it, so machines can learn it.";
const HEADLINE_2 =
  "The real world’s most dangerous work, captured for the machines learning to do it.";

const HEADLINE_CLASS =
  "max-w-5xl font-display text-[2.6rem] leading-[0.98] font-bold text-balance tracking-tight text-paper font-stretch-expanded md:text-7xl xl:text-8xl";

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

        // load-in: headline rises line by line out of masks, then the rest
        const split = SplitText.create('[data-hero="h1"]', {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.09,
              ease: "power3.out",
              delay: 0.15,
            }),
        });
        gsap
          .timeline({ defaults: { ease: "power3.out" }, delay: 0.5 })
          .from('[data-hero="sub"]', { autoAlpha: 0, y: 24, duration: 0.7 })
          .from('[data-hero="cta-row"]', { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.35")
          .from(
            '[data-hero="hud"] > *',
            { autoAlpha: 0, y: 8, duration: 0.5, stagger: 0.08 },
            "-=0.3",
          );
        // the cue is deliberately NOT in this timeline: the scrub timeline is
        // its only opacity owner, so a mid-intro scroll can never revive it

        // ambient loops
        gsap.to('[data-hero="cue-line"]', {
          y: 6,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
        });
        gsap.to('[data-hero="rec-dot"]', {
          autoAlpha: 0.15,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
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
        // overwrite kills the intro's cue fade-in if the user scrolls mid-intro;
        // without it the intro re-renders the cue after this tween already ended
        tl.to('[data-hero="cue"]', { autoAlpha: 0, duration: 0.08, overwrite: "auto" }, 0.02)
          .to('[data-hero="human"]', { scale: 1.06, duration: 0.3 }, 0.15)
          .to(
            '[data-hero="robot"]',
            mode === "clip"
              ? { clipPath: "circle(120% at 50% 45%)", duration: 0.3 }
              : { autoAlpha: 1, filter: "blur(0px)", duration: 0.3 },
            0.15,
          )
          .to('[data-hero="h1wrap"]', { autoAlpha: 0, y: -32, duration: 0.1 }, 0.35)
          .to('[data-hero="src-human"]', { autoAlpha: 0, duration: 0.06 }, 0.42)
          .to('[data-hero="src-robot"]', { autoAlpha: 1, duration: 0.06 }, 0.48)
          .fromTo(
            '[data-hero="h2wrap"]',
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 0.14 },
            0.5,
          )
          .to({}, { duration: 0.36 }, 0.64); // pad total to 1 so positions read as progress

        return () => split.revert();
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
          <div aria-hidden="true" className="scanlines absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40"
          />
        </div>

        {/* capture HUD */}
        <div
          data-hero="hud"
          aria-hidden="true"
          translate="no"
          className="pointer-events-none absolute inset-0 z-10 font-mono text-[11px] tracking-[0.18em] text-paper/70 max-md:hidden"
        >
          <div className="absolute top-20 left-6 flex items-center gap-2.5">
            <span data-hero="rec-dot" className="size-2 rounded-full bg-hazard" />
            REC
          </div>
          <div className="absolute top-20 right-6 text-right">
            <span data-hero="src-human" className="block">
              src: human_worker
            </span>
            <span data-hero="src-robot" className="block opacity-0 motion-reduce:opacity-100">
              src: robot_policy
            </span>
          </div>
          <div className="absolute bottom-6 right-6">fov: 120 · fps: 30 · consent: cleared</div>
          {/* viewfinder corners */}
          <span className="absolute top-[4.2rem] left-4 h-5 w-5 border-t border-l border-paper/25" />
          <span className="absolute top-[4.2rem] right-4 h-5 w-5 border-t border-r border-paper/25" />
          <span className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-paper/25" />
          <span className="absolute right-4 bottom-4 h-5 w-5 border-r border-b border-paper/25" />
        </div>

        {/* content */}
        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-site flex-col justify-end px-4 pb-24 md:px-6 md:pb-28 motion-reduce:relative motion-reduce:inset-auto motion-reduce:pt-28">
          <div className="relative">
            <div data-hero="h1wrap">
              <h1 data-hero="h1" className={HEADLINE_CLASS}>
                {HEADLINE_1}
              </h1>
              <p
                data-hero="sub"
                className="mt-6 max-w-xl text-lg text-paper/80 md:text-xl"
              >
                {SUB_1}
              </p>
            </div>
            <div
              data-hero="h2wrap"
              className="absolute inset-x-0 bottom-0 opacity-0 motion-reduce:static motion-reduce:mt-10 motion-reduce:opacity-100"
            >
              <p className={HEADLINE_CLASS}>{HEADLINE_2}</p>
            </div>
          </div>
          <div data-hero="cta-row" className="mt-10">
            <Button asChild className="h-12 px-7 text-base">
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
