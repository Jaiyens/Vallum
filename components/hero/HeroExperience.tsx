"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { RobotRevealCanvas } from "@/components/hero/RobotRevealCanvas";
import { LensRing } from "@/components/hero/LensRing";
import { readoutFor } from "@/components/hero/readout-map";

// Orchestrates the hero experience. The stage holds the mask variables:
// --lx and --ly place the cursor lens, --wipe drives the scroll wipe in
// the next phase. All pointer and scroll driven values write CSS
// variables through gsap; nothing on these paths touches React state.
export function HeroExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const video = videoRef.current;
      if (!stage || !video) return;

      const mm = gsap.matchMedia();

      // Cursor lens: desktop, fine pointer, motion allowed. Touch and
      // small viewports never see the lens.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const lxTo = gsap.quickTo(stage, "--lx", {
            duration: 0.35,
            ease: "power3",
          });
          const lyTo = gsap.quickTo(stage, "--ly", {
            duration: 0.35,
            ease: "power3",
          });
          const ring = stage.querySelector("[data-lens-ring]");
          const readout = stage.querySelector("[data-lens-readout]");

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
            gsap.to(ring, { autoAlpha: 1, duration: 0.25 });
          };
          const onMove = (e: PointerEvent) => {
            const { x, y } = toLocal(e);
            lxTo(x);
            lyTo(y);
          };
          const onLeave = () => {
            gsap.to(ring, { autoAlpha: 0, duration: 0.25 });
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
        },
      );
    },
    { scope: stageRef },
  );

  return (
    <section data-hero-root className="relative">
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
        <HeroCopy />
        <LensRing />
      </div>
    </section>
  );
}
