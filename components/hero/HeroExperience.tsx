"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { RobotRevealCanvas } from "@/components/hero/RobotRevealCanvas";
import { LensRing } from "@/components/hero/LensRing";
import {
  CUTLIST_BLOCKS,
  blockFor,
  readoutFor,
} from "@/components/hero/readout-map";
import { circleOverFigure } from "@/components/hero/hotspots";

// Orchestrates the hero experience. The stage holds the mask variables:
// --lx and --ly place the lens, --lr is its radius; the same circle
// expands past the corners during the scroll conversion. Every scroll and
// pointer driven value writes CSS variables or element styles through
// gsap setters; nothing on these paths touches React state.
//
// Lens states, desktop fine-pointer motion only, beat 0 only:
//   passive  small dim ring over drone establishers, nothing to lock onto
//   armed    full ring over worker shots, off the figures
//   engaged  over a worker figure: ring grows and the film eases into
//            slow motion; leaving the figure eases it back out
//
// Pin progress map (end +=240%):
//   0.00-0.08 wordmark, mono line, cue, and lens wordmark fade out
//   0.05      lens retires (restores under 0.04)
//   0.12-0.22 beatOne lands, holds to 0.34
//   0.34-0.60 THE CONVERSION: the lens circle expands from its last
//             position past the corners, the ring rides the edge, the
//             film eases to half speed, HUMAN CREW flips to ROBOT TWIN
//   0.60-0.72 beatTwo lands, then holds on the settled robot world
const ramp = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

const LENS_RETIRE = 0.05;
const LENS_RESTORE = 0.04;
const BAND_IN = 0.34;
const BAND_OUT = 0.6;
const EPS = 0.015;
// 0.5x is the floor of acceptability on a 24fps source: below that the
// held frames read as stutter no matter the dressing (research verified).
const RATE_SLOW = 0.5;
const ENGAGE_DUR = 0.35;
const RELEASE_DUR = 0.55;
const RATE_CONVERT = 0.5;
// The hit test uses a small center probe, deliberately much smaller than
// the visible ring: engagement means the lens is centered ON a figure,
// not grazing its neighborhood. Constant so the hit area never feeds
// back from the animating --lr; the release boundary is the rect
// expanded by the margin.
const LR_HIT = 16;
const HYST_MARGIN = 20;
const RING = {
  passive: { r: 44, alpha: 0.6 },
  armed: { r: 60, alpha: 1 },
  engaged: { r: 68, alpha: 1 },
} as const;
const RING_R_DUR = 0.35;
const RING_ALPHA_DUR = 0.25;
const RING_FLIP_DUR = 0.2;
// Magnification inside the lens while engaged: reads as optics, small
// enough that the parallax against the base layer stays comfortable.
const MAG_ENGAGED = 1.08;
// Feather constants must move together with --lens-mask in globals.css.
const FEATHER_IN = 6;
const COVER_PAD = FEATHER_IN + 2;
const MOBILE_ORIGIN = { x: 0.5, y: 0.72 };

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

      const bandEase = gsap.parseEase("power1.inOut");
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
          const lensWord = el("[data-lens-word]");
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
          const lensWordAlpha = setter(lensWord, "opacity");
          const ringAlpha = setter(ring, "opacity");
          const setLr = gsap.quickSetter(stage, "--lr", "px");

          // ---- shared interaction state ----
          let lensEligible = true;
          let pointerInside = false;
          let everHovered = false;
          let slowmo = false;
          let ringState: "hidden" | "passive" | "armed" | "engaged" = "hidden";
          let converting = false;
          let lastX = 0;
          let lastY = 0;
          let ox = 0;
          let oy = 0;
          let coverR = 0;
          let lastP = 0;

          const veil = el("[data-focus-veil]");

          // The wordmark box is carved out of the figure hit test: slow
          // motion, the focus veil, and magnification belong to the
          // worker figures only. Over the letters the lens reveals the
          // overgrown variant through the mask at the full engaged
          // radius, but never triggers slow motion.
          // Measured after fonts load (Archivo expanded reflows) and on
          // resize; stage-relative, so pinning does not skew it.
          let wmBox: { l: number; t: number; r: number; b: number } | undefined;
          const measureWordmark = () => {
            if (!wordmark) return;
            const s = stage.getBoundingClientRect();
            const r = wordmark.getBoundingClientRect();
            wmBox = {
              l: r.left - s.left,
              t: r.top - s.top,
              r: r.right - s.left,
              b: r.bottom - s.top,
            };
          };
          measureWordmark();
          document.fonts.ready.then(measureWordmark);

          // ---- slow motion, eased both ways, never snapping ----
          // The focus veil rides the same clock as the rate: the state
          // change reads through the grade shift even while the source
          // holds frames.
          const engageSlowmo = () => {
            slowmo = true;
            gsap.to(video, {
              playbackRate: RATE_SLOW,
              duration: ENGAGE_DUR,
              ease: "power3.out",
              overwrite: "auto",
              onComplete: syncLens,
            });
            if (veil) {
              gsap.to(veil, {
                autoAlpha: 1,
                duration: ENGAGE_DUR,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
            gsap.to(stage, {
              "--mag": MAG_ENGAGED,
              duration: ENGAGE_DUR,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          // Never calls play(): a paused video must stay paused.
          const releaseSlowmo = () => {
            slowmo = false;
            gsap.to(video, {
              playbackRate: 1,
              duration: RELEASE_DUR,
              ease: "power2.inOut",
              overwrite: "auto",
              onComplete: () => {
                video.playbackRate = 1;
                syncLens();
              },
            });
            if (veil) {
              gsap.to(veil, {
                autoAlpha: 0,
                duration: RELEASE_DUR,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }
            gsap.to(stage, {
              "--mag": 1,
              duration: RELEASE_DUR,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          };
          const releaseSlowmoInstant = () => {
            slowmo = false;
            gsap.killTweensOf(video, "playbackRate");
            video.playbackRate = 1;
            if (veil) {
              gsap.killTweensOf(veil);
              gsap.set(veil, { autoAlpha: 0 });
            }
            gsap.killTweensOf(stage, "--mag");
            gsap.set(stage, { "--mag": 1 });
          };

          // Single writer for the ring and the shared radius variable.
          const ringTo = (
            state: "hidden" | "passive" | "armed" | "engaged",
          ) => {
            if (state === ringState || !ring) return;
            const prev = ringState;
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
                    "--rx": "-9999px",
                    "--ry": "-9999px",
                    "--lr": `${RING.armed.r}px`,
                  });
                },
              });
              return;
            }
            const { r, alpha } = RING[state];
            const flip =
              (prev === "passive" && state === "armed") ||
              (prev === "armed" && state === "passive");
            gsap.to(stage, {
              "--lr": `${r}px`,
              duration: prev === "hidden" ? 0.45 : RING_R_DUR,
              // Arrival pops in with a slight overshoot; state changes
              // settle without one.
              ease: prev === "hidden" ? "back.out(1.6)" : "power2.out",
              overwrite: "auto",
            });
            gsap.to(ring, {
              autoAlpha: alpha,
              duration: flip ? RING_FLIP_DUR : RING_ALPHA_DUR,
              overwrite: "auto",
            });
          };

          // Reconciles pointer, eligibility, block kind, and the figure
          // hit test. Slow motion engages ONLY over a worker figure.
          const syncLens = () => {
            if (!hasLens || converting) return;
            if (!pointerInside || !lensEligible) {
              if (slowmo) releaseSlowmo();
              ringTo("hidden");
              return;
            }
            // Over the letters the lens takes the full engaged radius, the
            // same circle as the figure reveal, so the vine wordmark reads
            // through a big window (Jay 2026-07-22). Slow motion, the focus
            // veil, and magnification still belong to the figures only, so
            // this rung sets the ring alone and returns before the figure
            // hit test. Checked before the block kind so the name gets the
            // big circle over establishers too.
            const overWordmark =
              wmBox !== undefined &&
              lastX >= wmBox.l &&
              lastX <= wmBox.r &&
              lastY >= wmBox.t &&
              lastY <= wmBox.b;
            if (overWordmark) {
              if (slowmo) releaseSlowmo();
              ringTo("engaged");
              return;
            }
            const kind = blockFor(video.currentTime).kind;
            const hot = kind === "real" || kind === "twin";
            if (!hot) {
              if (slowmo) releaseSlowmo();
              ringTo("passive");
              return;
            }
            const over = circleOverFigure(
                lastX,
                lastY,
                LR_HIT,
                video.currentTime,
                stage.clientWidth,
                stage.clientHeight,
                slowmo ? HYST_MARGIN : 0,
              );
            if (over && !slowmo) engageSlowmo();
            if (!over && slowmo) releaseSlowmo();
            ringTo(over ? "engaged" : "armed");
          };

          // ---- conversion band bookkeeping ----
          const measureBand = () => {
            const r = stage.getBoundingClientRect();
            if (hasLens && everHovered) {
              ox = lastX;
              oy = lastY;
            } else if (isDesktop) {
              ox = r.width / 2;
              oy = r.height / 2;
            } else {
              ox = r.width * MOBILE_ORIGIN.x;
              oy = r.height * MOBILE_ORIGIN.y;
            }
            coverR =
              Math.ceil(
                Math.hypot(
                  Math.max(ox, r.width - ox),
                  Math.max(oy, r.height - oy),
                ),
              ) + COVER_PAD;
          };

          // The conversion must convert something that differs between
          // the timelines. Establishers are identical in both halves, so
          // entering the band over one cuts to the next worker shot,
          // in the film's own hard-cut grammar.
          const seekToWorkerBlock = () => {
            const t = video.currentTime;
            const cur = blockFor(t);
            if (cur.kind === "real" || cur.kind === "twin") return;
            const isWorker = (k: string) => k === "real" || k === "twin";
            const next =
              CUTLIST_BLOCKS.find((b) => b.in > t && isWorker(b.kind)) ??
              CUTLIST_BLOCKS.find((b) => isWorker(b.kind));
            if (next && video.readyState >= 1) {
              video.currentTime = next.in + 0.35;
            }
          };

          const enterBand = () => {
            converting = true;
            releaseSlowmoInstant();
            gsap.killTweensOf(stage, "--lr");
            if (ring) {
              gsap.killTweensOf(ring);
              ring.setAttribute("data-converting", "");
              gsap.set(ring, { visibility: "inherit" });
            }
            measureBand();
            gsap.set(stage, {
              "--lx": `${ox}px`,
              "--ly": `${oy}px`,
              "--rx": `${ox}px`,
              "--ry": `${oy}px`,
            });
            seekToWorkerBlock();
            gsap.to(video, {
              playbackRate: RATE_CONVERT,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          const exitBand = (dir: "forward" | "back") => {
            converting = false;
            gsap.to(video, {
              playbackRate: 1,
              duration: 0.4,
              ease: "power2.inOut",
              overwrite: "auto",
            });
            if (dir === "back") {
              ring?.removeAttribute("data-converting");
              if (ring) gsap.set(ring, { autoAlpha: 0 });
              gsap.set(stage, {
                "--lx": "-9999px",
                "--ly": "-9999px",
                "--rx": "-9999px",
                "--ry": "-9999px",
                "--lr": `${RING.armed.r}px`,
              });
            }
          };

          const onResize = () => {
            measureWordmark();
            if (lastP < BAND_IN && !converting) return;
            measureBand();
            gsap.set(stage, {
              "--lx": `${ox}px`,
              "--ly": `${oy}px`,
              "--rx": `${ox}px`,
              "--ry": `${oy}px`,
            });
            setLr(
              Math.round(bandEase(ramp(lastP, BAND_IN, BAND_OUT)) * coverR * 2) /
                2,
            );
          };
          window.addEventListener("resize", onResize);

          ScrollTrigger.create({
            trigger: root,
            start: "top top",
            // 240%, not 300%: the pin spacer is scroll-scrub distance, not
            // visible content, so trimming it shrinks the page's ink
            // footprint without touching the beat sequence (every ramp()
            // breakpoint below is a fraction of progress, unaffected by
            // this). Needed to clear the whole-page light-band luminance
            // floor (LOOK.md).
            end: "+=240%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onLeave: () => video.pause(),
            onEnterBack: () => {
              if (!noMotion) {
                video.playbackRate = 1;
                video.play().catch(() => {});
              }
            },
            onUpdate: (self) => {
              const p = (lastP = self.progress);
              const intro = ramp(p, 0, 0.08);

              if (noMotion) {
                // Reduced motion: opacity only over the held poster.
                wmAlpha(1 - intro);
                monoAlpha(1 - intro);
                cueAlpha(1 - intro);
                const inOne = ramp(p, 0.12, 0.22);
                oneAlpha(inOne * (1 - ramp(p, 0.34, 0.44)));
                treatAlpha(ramp(p, 0.34, 0.6));
                tagBoxAlpha(ramp(p, 0.38, 0.44));
                const flipR = ramp(p, 0.45, 0.5);
                tagHumanAlpha(1 - flipR);
                tagRobotAlpha(flipR);
                twoAlpha(ramp(p, 0.6, 0.72));
                return;
              }

              // Lens retirement with hysteresis: beat 0 only.
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
                      "--rx": `${lastX}px`,
                      "--ry": `${lastY}px`,
                    });
                    syncLens();
                  }
                }
              }

              // Conversion band, edge triggered with hysteresis.
              if (!converting && p >= BAND_IN && p <= BAND_OUT) {
                enterBand();
              } else if (
                converting &&
                (p > BAND_OUT + EPS || p < BAND_IN - EPS)
              ) {
                exitBand(p < BAND_IN ? "back" : "forward");
              }

              wmScale(1 + 0.04 * intro);
              wmAlpha(1 - intro);
              monoAlpha(1 - intro);
              cueAlpha(1 - intro);
              lensWordAlpha(1 - intro);

              if (converting || p >= BAND_IN) {
                const frac = bandEase(ramp(p, BAND_IN, BAND_OUT));
                setLr(Math.round(frac * coverR * 2) / 2);
                ringAlpha(ramp(p, 0.34, 0.38) * (1 - ramp(p, 0.58, 0.62)));
              }

              const inOne = ramp(p, 0.12, 0.22);
              const exitOne = ramp(p, 0.34, 0.44);
              oneAlpha(inOne * (1 - exitOne));
              oneY(16 * (1 - inOne) - 40 * exitOne);

              tagBoxAlpha(ramp(p, 0.4, 0.46));
              const flip = ramp(p, 0.52, 0.56);
              tagHumanAlpha(1 - flip);
              tagRobotAlpha(flip);

              const inTwo = ramp(p, 0.6, 0.72);
              twoAlpha(inTwo);
              twoY(24 * (1 - inTwo));
            },
          });

          // ---- cursor lens wiring ----
          let cleanupLens: (() => void) | undefined;
          let cleanupDebug: (() => void) | undefined;
          if (hasLens) {
            const lxTo = gsap.quickTo(stage, "--lx", {
              duration: 0.35,
              ease: "power3",
            });
            const lyTo = gsap.quickTo(stage, "--ly", {
              duration: 0.35,
              ease: "power3",
            });
            // The ring chrome lags a touch more than the mask: the glass
            // feels heavier than the light, which is what makes the lens
            // read as a physical instrument.
            const rxTo = gsap.quickTo(stage, "--rx", {
              duration: 0.5,
              ease: "power3",
            });
            const ryTo = gsap.quickTo(stage, "--ry", {
              duration: 0.5,
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
            const place = (x: number, y: number) => {
              gsap.set(stage, {
                "--lx": `${x}px`,
                "--ly": `${y}px`,
                "--rx": `${x}px`,
                "--ry": `${y}px`,
              });
            };
            const onEnter = (e: PointerEvent) => {
              const { x, y } = toLocal(e);
              lastX = x;
              lastY = y;
              pointerInside = true;
              everHovered = true;
              if (!lensEligible || converting) return;
              place(x, y);
              syncLens();
            };
            const onMove = (e: PointerEvent) => {
              const { x, y } = toLocal(e);
              lastX = x;
              lastY = y;
              // A move over the stage implies inside: recovers the lens
              // after window blur, where pointerenter never re-fires
              // because the pointer never left the element.
              const wasInside = pointerInside;
              pointerInside = true;
              if (!lensEligible || converting) return;
              if (!wasInside) {
                place(x, y);
                syncLens();
                return;
              }
              lxTo(x);
              lyTo(y);
              rxTo(x);
              ryTo(y);
              syncLens();
            };
            const onLeave = () => {
              pointerInside = false;
              syncLens();
            };
            const onPointerCancel = () => {
              pointerInside = false;
              syncLens();
            };
            const onDocMouseLeave = () => {
              pointerInside = false;
              syncLens();
            };
            const onBlur = () => {
              // rAF driven tweens stall in hidden tabs; never leave a
              // slow rate pending.
              pointerInside = false;
              releaseSlowmoInstant();
              syncLens();
            };
            const onTime = () => {
              updateReadout();
              if (pointerInside && lensEligible) syncLens();
            };

            stage.addEventListener("pointerenter", onEnter);
            stage.addEventListener("pointermove", onMove);
            stage.addEventListener("pointerleave", onLeave);
            stage.addEventListener("pointercancel", onPointerCancel);
            document.documentElement.addEventListener(
              "mouseleave",
              onDocMouseLeave,
            );
            window.addEventListener("blur", onBlur);
            video.addEventListener("timeupdate", onTime);
            cleanupLens = () => {
              stage.removeEventListener("pointerenter", onEnter);
              stage.removeEventListener("pointermove", onMove);
              stage.removeEventListener("pointerleave", onLeave);
              stage.removeEventListener("pointercancel", onPointerCancel);
              document.documentElement.removeEventListener(
                "mouseleave",
                onDocMouseLeave,
              );
              window.removeEventListener("blur", onBlur);
              video.removeEventListener("timeupdate", onTime);
            };

            if (
              process.env.NODE_ENV !== "production" &&
              new URLSearchParams(window.location.search).has("hotspots")
            ) {
              import("./hotspot-debug").then((m) => {
                cleanupDebug = m.mountHotspotDebug(stage, video);
              });
            }
          }

          return () => {
            releaseSlowmoInstant();
            window.removeEventListener("resize", onResize);
            cleanupLens?.();
            cleanupDebug?.();
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
            "--rx": "-9999px",
            "--ry": "-9999px",
            "--lr": "60px",
            "--mag": "1",
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
        <div
          data-focus-veil
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
        />
        <HeroCopy />
        <LensRing />
      </div>
    </section>
  );
}
