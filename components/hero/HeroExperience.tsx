"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { RobotRevealCanvas } from "@/components/hero/RobotRevealCanvas";
import { LensRing } from "@/components/hero/LensRing";
import { readoutFor } from "@/components/hero/readout-map";

// Orchestrates the hero experience. The stage holds the mask variables:
// --lx and --ly place the cursor lens, --wipe drives the line wipe. The
// hero pins for one extra viewport height and the pin progress runs the
// whole conversion: wordmark out, beatOne in, sweep to the robot world,
// beatTwo in, settle. Every scroll and pointer driven value writes CSS
// variables or element styles through gsap setters; nothing on these
// paths touches React state.
//
// Pin progress map:
//   0.00-0.15 wordmark scales about 4 percent and fades, mono line and
//             cue fade with it
//   0.15      beatOne cuts in centered
//   0.15-0.22 the 1px green line sweeps down; the inset mask behind it
//             converts the frame to the robot layer
//   0.22-0.28 beatOne exits up, beatTwo lands
//   then      settled on the robot world
const ramp = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

export function HeroExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const root = rootRef.current;
      const video = videoRef.current;
      if (!stage || !root || !video) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          noMotion: "(prefers-reduced-motion: reduce)",
          fine: "(pointer: fine)",
        },
        (ctx) => {
          const { isDesktop, noMotion, fine } = ctx.conditions as {
            isDesktop: boolean;
            noMotion: boolean;
            fine: boolean;
          };

          const el = (sel: string) =>
            stage.querySelector<HTMLElement>(sel) ?? undefined;
          const wordmark = el("[data-wordmark]");
          const mono = el("[data-hero-monoline]");
          const cue = el("[data-hero-cue]");
          const beatOne = el("[data-beat-one]");
          const beatTwo = el("[data-beat-two]");
          const line = el("[data-wipe-line]");
          const treat = el("[data-hero-treat]");

          const setter = (target: HTMLElement | undefined, prop: string) =>
            target ? gsap.quickSetter(target, prop, prop === "y" ? "px" : undefined) : () => {};
          const wmScale = setter(wordmark, "scale");
          const wmAlpha = setter(wordmark, "opacity");
          const monoAlpha = setter(mono, "opacity");
          const cueAlpha = setter(cue, "opacity");
          const oneAlpha = setter(beatOne, "opacity");
          const oneY = setter(beatOne, "y");
          const twoAlpha = setter(beatTwo, "opacity");
          const twoY = setter(beatTwo, "y");
          const lineAlpha = setter(line, "opacity");
          const treatAlpha = setter(treat, "opacity");
          const setWipe = gsap.quickSetter(stage, "--wipe");

          ScrollTrigger.create({
            trigger: root,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onLeave: () => video.pause(),
            onEnterBack: () => {
              if (!noMotion) video.play().catch(() => {});
            },
            onUpdate: (self) => {
              const p = self.progress;
              const intro = ramp(p, 0, 0.15);
              if (noMotion) {
                // Reduced motion: opacity only. No scale, no sweep; the
                // robot world is a full frame opacity swap of the
                // treatment layer over the held poster.
                wmAlpha(1 - intro);
                monoAlpha(1 - intro);
                cueAlpha(1 - intro);
                oneAlpha(ramp(p, 0.12, 0.18) * (1 - ramp(p, 0.24, 0.3)));
                twoAlpha(ramp(p, 0.26, 0.32));
                treatAlpha(ramp(p, 0.15, 0.3));
                setWipe("0%");
                lineAlpha(0);
                return;
              }
              wmScale(1 + 0.04 * intro);
              wmAlpha(1 - intro);
              monoAlpha(1 - intro);
              cueAlpha(1 - intro);

              const wipe = ramp(p, 0.15, 0.22);
              setWipe(`${(wipe * 100).toFixed(2)}%`);
              lineAlpha(p > 0.15 && p < 0.23 ? 1 : 0);

              const exitOne = ramp(p, 0.22, 0.28);
              oneAlpha(p >= 0.15 ? 1 - exitOne : 0);
              oneY(-40 * exitOne);

              const inTwo = ramp(p, 0.26, 0.32);
              twoAlpha(inTwo);
              twoY(24 * (1 - inTwo));
            },
          });

          // Cursor lens: desktop, fine pointer, motion allowed. Touch
          // and small viewports never see the lens.
          if (isDesktop && !noMotion && fine) {
            const lxTo = gsap.quickTo(stage, "--lx", {
              duration: 0.35,
              ease: "power3",
            });
            const lyTo = gsap.quickTo(stage, "--ly", {
              duration: 0.35,
              ease: "power3",
            });
            const ring = el("[data-lens-ring]");
            const readout = el("[data-lens-readout]");

            const updateReadout = () => {
              if (readout) readout.textContent = readoutFor(video.currentTime);
            };
            updateReadout();
            video.addEventListener("timeupdate", updateReadout);

            const toLocal = (e: PointerEvent) => {
              const r = stage.getBoundingClientRect();
              return { x: e.clientX - r.left, y: e.clientY - r.top };
            };
            const onEnter = (e: PointerEvent) => {
              const { x, y } = toLocal(e);
              // Jump to the entry point so the lens never tweens across
              // the frame from its parked position.
              gsap.set(stage, { "--lx": `${x}px`, "--ly": `${y}px` });
              gsap.to(ring ?? null, { autoAlpha: 1, duration: 0.25 });
            };
            const onMove = (e: PointerEvent) => {
              const { x, y } = toLocal(e);
              lxTo(x);
              lyTo(y);
            };
            const onLeave = () => {
              gsap.to(ring ?? null, { autoAlpha: 0, duration: 0.25 });
              gsap.set(stage, { "--lx": "-9999px", "--ly": "-9999px" });
            };

            stage.addEventListener("pointerenter", onEnter);
            stage.addEventListener("pointermove", onMove);
            stage.addEventListener("pointerleave", onLeave);
            return () => {
              video.removeEventListener("timeupdate", updateReadout);
              stage.removeEventListener("pointerenter", onEnter);
              stage.removeEventListener("pointermove", onMove);
              stage.removeEventListener("pointerleave", onLeave);
            };
          }
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} data-hero-root className="relative">
      <div
        ref={stageRef}
        data-hero-stage
        className="relative isolate h-[100svh] overflow-hidden bg-black"
        style={
          {
            "--lx": "-9999px",
            "--ly": "-9999px",
            "--wipe": "0%",
          } as CSSProperties
        }
      >
        <HeroVideo videoRef={videoRef} />
        <RobotRevealCanvas videoRef={videoRef} />
        <div
          data-hero-treat
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        />
        <span
          data-wipe-line
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-10 h-px bg-green-signal opacity-0"
          style={{ top: "var(--wipe)" }}
        />
        <HeroCopy />
        <LensRing />
      </div>
    </section>
  );
}
