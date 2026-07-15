"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { RobotRevealCanvas } from "@/components/hero/RobotRevealCanvas";
import { LensRing } from "@/components/hero/LensRing";
import { blockFor, readoutFor } from "@/components/hero/readout-map";

// Orchestrates the hero experience. The stage holds the mask variables:
// --lx and --ly place the cursor lens, --lr is the lens radius, --wipe
// drives the freeze-compare wipe. Every scroll and pointer driven value
// writes CSS variables or element styles through gsap setters; nothing on
// these paths touches React state.
//
// The lens lives only in beat 0 (pin progress near zero). Over worker
// blocks it engages: the film eases into slow motion and the circle shows
// the robot twin. Over drone establishers it dims to a small dormant ring
// with nothing to lock onto. Scrolling retires it.
//
// Pin progress map (end +=250%):
//   0.00-0.12 wordmark scales about 4 percent and fades, mono and cue fade
//   0.05      lens retires (restores under 0.04)
//   0.16-0.20 beatOne lands, holds to 0.40, exits 0.40-0.46
//   0.46-0.62 THE SWITCH: the film freezes on a worker frame; the
//             feathered wipe converts the frozen frame to the robot
//             world top to bottom; the state tag flips HUMAN CREW to
//             ROBOT TWIN; leaving the band resumes playback
//   0.62-0.70 beatTwo lands, then holds on the settled robot world
const ramp = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

const LENS_RETIRE = 0.05;
const LENS_RESTORE = 0.04;
const BAND_IN = 0.46;
const BAND_OUT = 0.62;
const EPS = 0.015;
// Freeze moment: inside the LOAD-BEARING iron block, where the two plates
// differ the most. Alternatives if taste changes: 17.5 solar, 20.5 turbine.
const HOLD_T = 11.5;
const RATE_SLOW = 0.3;
const LR_BASE = 90;
const LR_ENGAGED = 102;
const LR_DORMANT = 72;

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
          const hasLens = isDesktop && !noMotion && fine;

          const el = (sel: string) =>
            stage.querySelector<HTMLElement>(sel) ?? undefined;
          const wordmark = el("[data-wordmark]");
          const mono = el("[data-hero-monoline]");
          const cue = el("[data-hero-cue]");
          const beatOne = el("[data-beat-one]");
          const beatTwo = el("[data-beat-two]");
          const treat = el("[data-hero-treat]");
          const tagBox = el("[data-state-tag]");
          const tagHuman = el("[data-tag-human]");
          const tagRobot = el("[data-tag-robot]");
          const ring = el("[data-lens-ring]");
          const readout = el("[data-lens-readout]");

          const setter = (target: HTMLElement | undefined, prop: string) =>
            target
              ? gsap.quickSetter(target, prop, prop === "y" ? "px" : undefined)
              : () => {};
          const wmScale = setter(wordmark, "scale");
          const wmAlpha = setter(wordmark, "opacity");
          const monoAlpha = setter(mono, "opacity");
          const cueAlpha = setter(cue, "opacity");
          const oneAlpha = setter(beatOne, "opacity");
          const oneY = setter(beatOne, "y");
          const twoAlpha = setter(beatTwo, "opacity");
          const twoY = setter(beatTwo, "y");
          const treatAlpha = setter(treat, "opacity");
          const tagBoxAlpha = setter(tagBox, "opacity");
          const tagHumanAlpha = setter(tagHuman, "opacity");
          const tagRobotAlpha = setter(tagRobot, "opacity");
          const setWipe = gsap.quickSetter(stage, "--wipe");

          // ---- shared interaction state ----
          let holdState: "playing" | "frozen" = "playing";
          let lensEligible = true;
          let pointerInside = false;
          let slowmo = false;
          let ringState: "hidden" | "dormant" | "engaged" = "hidden";
          let lastX = 0;
          let lastY = 0;

          // ---- slow motion, motion-graphics eased ----
          const engageSlowmo = () => {
            slowmo = true;
            gsap.to(video, {
              playbackRate: RATE_SLOW,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          // Never calls play(): a paused video must stay paused.
          const releaseSlowmo = () => {
            slowmo = false;
            gsap.to(video, {
              playbackRate: 1,
              duration: 0.5,
              ease: "power2.inOut",
              overwrite: "auto",
              onComplete: () => {
                video.playbackRate = 1;
              },
            });
          };
          const releaseSlowmoInstant = () => {
            slowmo = false;
            gsap.killTweensOf(video, "playbackRate");
            video.playbackRate = 1;
          };

          // Single writer for the ring and the shared radius variable, so
          // ring and mask hole always move together.
          const ringTo = (state: "hidden" | "dormant" | "engaged") => {
            if (state === ringState || !ring) return;
            ringState = state;
            if (state === "hidden") {
              gsap.to(stage, {
                "--lr": "0px",
                duration: 0.3,
                ease: "power2.in",
                overwrite: "auto",
              });
              gsap.to(ring, {
                autoAlpha: 0,
                duration: 0.3,
                overwrite: "auto",
                onComplete: () => {
                  gsap.set(stage, {
                    "--lx": "-9999px",
                    "--ly": "-9999px",
                    "--lr": `${LR_BASE}px`,
                  });
                },
              });
            } else {
              const lr = state === "engaged" ? LR_ENGAGED : LR_DORMANT;
              gsap.to(stage, {
                "--lr": `${lr}px`,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
              gsap.to(ring, {
                autoAlpha: state === "engaged" ? 1 : 0.4,
                duration: 0.25,
                overwrite: "auto",
              });
            }
          };

          // Reconciles pointer, eligibility, and the current film block.
          const syncLens = () => {
            if (!hasLens) return;
            if (!pointerInside || !lensEligible) {
              if (slowmo) releaseSlowmo();
              ringTo("hidden");
              return;
            }
            const kind = blockFor(video.currentTime).kind;
            const hot = kind === "real" || kind === "twin";
            if (hot && !slowmo) engageSlowmo();
            if (!hot && slowmo) releaseSlowmo();
            ringTo(hot ? "engaged" : "dormant");
          };

          ScrollTrigger.create({
            trigger: root,
            start: "top top",
            end: "+=250%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onLeave: () => video.pause(),
            onEnterBack: () => {
              if (!noMotion && holdState === "playing") {
                video.playbackRate = 1;
                video.play().catch(() => {});
              }
            },
            onUpdate: (self) => {
              const p = self.progress;
              const intro = ramp(p, 0, 0.12);

              if (noMotion) {
                // Reduced motion: opacity only over the held poster. No
                // scale, no sweep, no freeze; the robot world is a full
                // frame opacity swap of the treatment layer.
                wmAlpha(1 - intro);
                monoAlpha(1 - intro);
                cueAlpha(1 - intro);
                const inOne = ramp(p, 0.16, 0.2);
                const outOne = ramp(p, 0.4, 0.46);
                oneAlpha(inOne * (1 - outOne));
                twoAlpha(ramp(p, 0.62, 0.7));
                treatAlpha(ramp(p, 0.46, 0.62));
                tagBoxAlpha(ramp(p, 0.46, 0.5));
                const flip = ramp(p, 0.53, 0.55);
                tagHumanAlpha(1 - flip);
                tagRobotAlpha(flip);
                setWipe("-3%");
                return;
              }

              // Lens retirement with hysteresis: the lens belongs to
              // beat 0 only.
              if (hasLens) {
                if (lensEligible && p > LENS_RETIRE) {
                  lensEligible = false;
                  syncLens();
                } else if (!lensEligible && p < LENS_RESTORE) {
                  lensEligible = true;
                  if (pointerInside) {
                    gsap.set(stage, {
                      "--lx": `${lastX}px`,
                      "--ly": `${lastY}px`,
                    });
                    syncLens();
                  }
                }
              }

              // Freeze-compare switch, edge triggered with hysteresis so
              // scrub jitter at the band edges cannot flap states.
              if (holdState === "playing" && p >= BAND_IN && p <= BAND_OUT) {
                holdState = "frozen";
                releaseSlowmoInstant();
                video.pause();
                if (
                  video.readyState >= 1 &&
                  Math.abs(video.currentTime - HOLD_T) > 0.05
                ) {
                  // Plain assignment, never fastSeek: keyframe snapping
                  // would break the twin registration.
                  video.currentTime = HOLD_T;
                }
              } else if (
                holdState === "frozen" &&
                (p > BAND_OUT + EPS || p < BAND_IN - EPS)
              ) {
                holdState = "playing";
                video.playbackRate = 1;
                video.play().catch(() => {});
              }

              wmScale(1 + 0.04 * intro);
              wmAlpha(1 - intro);
              monoAlpha(1 - intro);
              cueAlpha(1 - intro);

              const inOne = ramp(p, 0.16, 0.2);
              const exitOne = ramp(p, 0.4, 0.46);
              oneAlpha(inOne * (1 - exitOne));
              oneY(16 * (1 - inOne) - 40 * exitOne);

              const frac = ramp(p, 0.48, 0.6);
              setWipe(`${(-3 + frac * 106).toFixed(2)}%`);

              tagBoxAlpha(ramp(p, 0.46, 0.5));
              const flip = ramp(p, 0.585, 0.605);
              tagHumanAlpha(1 - flip);
              tagRobotAlpha(flip);

              const inTwo = ramp(p, 0.62, 0.7);
              twoAlpha(inTwo);
              twoY(24 * (1 - inTwo));
            },
          });

          // If the page loads or refreshes inside the switch band before
          // metadata exists, the seek above is skipped; catch up here.
          const onMeta = () => {
            if (
              holdState === "frozen" &&
              Math.abs(video.currentTime - HOLD_T) > 0.05
            ) {
              video.currentTime = HOLD_T;
            }
          };
          video.addEventListener("loadedmetadata", onMeta);

          // ---- cursor lens wiring ----
          let cleanupLens: (() => void) | undefined;
          if (hasLens) {
            const lxTo = gsap.quickTo(stage, "--lx", {
              duration: 0.35,
              ease: "power3",
            });
            const lyTo = gsap.quickTo(stage, "--ly", {
              duration: 0.35,
              ease: "power3",
            });

            const updateReadout = () => {
              if (readout) readout.textContent = readoutFor(video.currentTime);
            };
            updateReadout();

            const toLocal = (e: PointerEvent) => {
              const r = stage.getBoundingClientRect();
              return { x: e.clientX - r.left, y: e.clientY - r.top };
            };
            const onEnter = (e: PointerEvent) => {
              const { x, y } = toLocal(e);
              lastX = x;
              lastY = y;
              pointerInside = true;
              if (!lensEligible) return;
              // Jump to the entry point so the lens never tweens across
              // the frame from its parked position.
              gsap.set(stage, { "--lx": `${x}px`, "--ly": `${y}px` });
              syncLens();
            };
            const onMove = (e: PointerEvent) => {
              const { x, y } = toLocal(e);
              lastX = x;
              lastY = y;
              if (!lensEligible) return;
              lxTo(x);
              lyTo(y);
            };
            const onLeave = () => {
              pointerInside = false;
              syncLens();
            };
            const onTime = () => {
              updateReadout();
              if (pointerInside && lensEligible) syncLens();
            };

            stage.addEventListener("pointerenter", onEnter);
            stage.addEventListener("pointermove", onMove);
            stage.addEventListener("pointerleave", onLeave);
            video.addEventListener("timeupdate", onTime);
            cleanupLens = () => {
              stage.removeEventListener("pointerenter", onEnter);
              stage.removeEventListener("pointermove", onMove);
              stage.removeEventListener("pointerleave", onLeave);
              video.removeEventListener("timeupdate", onTime);
            };
          }

          return () => {
            video.removeEventListener("loadedmetadata", onMeta);
            cleanupLens?.();
          };
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
            "--lr": "90px",
            "--wipe": "-3%",
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
        <HeroCopy />
        <LensRing />
      </div>
    </section>
  );
}
