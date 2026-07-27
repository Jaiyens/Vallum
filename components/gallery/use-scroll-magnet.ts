"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis-ref";
import {
  MAGNET_GLIDE_S,
  MAGNET_MIN_DELTA_PX,
  MAGNET_MIN_VISIBLE_FRAC,
} from "./gallery-config";

// The scroll magnet. Between the hero unpin and the turn there is no landmark
// to settle on, so a scroll can idle with the spiral sliced by the viewport
// edge and nothing inviting a correction. When scrolling ends with the stage
// substantially, but not fully, on screen AND the last input was moving toward
// it, the page glides on until the stage is centered.
//
// Framing is judged on the section, not the stage: on a tall window the whole
// stage can sit on screen while the cream of the next beat leaks in under the
// section's bottom edge, and that leak is what reads as misframed. The target
// is a centered stage, capped so the section's bottom edge never rides up into
// the viewport; the slack always lands above, where the hero's black absorbs
// it invisibly.
//
// Three refusals keep this from reading as scroll-jacking:
//   idle only    the magnet never grabs while the wheel or a finger is live;
//                it waits for ScrollTrigger's debounced scrollEnd, which with
//                Lenis fires only after the inertial glide has died
//   entry only   a stage cut off at the bottom is entered by scrolling down,
//                one cut off at the top by scrolling up; idling there while
//                headed the other way means the visitor is leaving, and
//                pulling them back is exactly the hijack this must never be.
//                A stage wholly on screen is exempt: the visitor is AT the
//                spiral, and a reframe there fights nobody
//   yielding     the glide runs through Lenis without lock, so any input
//                during it hands the page straight back to the visitor
//
// This is why lenis/snap stays unused here: its proximity model is
// direction-blind, so it would commit the third refusal's sin on every exit.
export function useScrollMagnet(
  stageRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    const viewport = stageRef.current?.closest<HTMLElement>(
      "[data-helix-viewport]",
    );
    if (!viewport) return;
    const section = viewport.closest<HTMLElement>("section");

    let lastY = window.scrollY;
    let dir: 1 | -1 = 1; // 1 is scrolling down
    let pointerDown = false;

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY) dir = y > lastY ? 1 : -1;
      lastY = y;
    };

    const onScrollEnd = () => {
      // A held touch can go still long enough to read as an idle; snapping
      // the page out from under the finger is never acceptable.
      if (pointerDown) return;
      const vh = window.innerHeight;
      const rect = viewport.getBoundingClientRect();
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      // Against the smaller of the two heights, so a stage taller than a
      // short window can still count as settled.
      const frac = visible / Math.min(rect.height, vh);
      if (frac < MAGNET_MIN_VISIBLE_FRAC) return;
      if (rect.top < 0 && rect.bottom > vh) return; // already fills the window
      const whole = rect.top >= 0 && rect.bottom <= vh;
      if (!whole && (rect.top >= 0 ? 1 : -1) !== dir) return; // entry only
      let delta = rect.top - (vh - rect.height) / 2; // center the stage
      if (section) {
        // Cream leaks under the section's bottom edge for any delta past
        // flush; capping there trades a perfectly centered stage for an
        // unbroken ink frame, which is the better deal on every window.
        const flush = section.getBoundingClientRect().bottom - vh;
        delta = Math.min(delta, flush);
      }
      const max = document.documentElement.scrollHeight - vh;
      const target = Math.min(Math.max(window.scrollY + delta, 0), max);
      if (Math.abs(target - window.scrollY) < MAGNET_MIN_DELTA_PX) return;
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(target, { duration: MAGNET_GLIDE_S });
      else window.scrollTo({ top: target, behavior: "smooth" });
      // The glide itself ends in another scrollEnd, which lands in the
      // settled band or under the delta floor and goes quiet.
    };

    const onPointerDown = () => {
      pointerDown = true;
    };
    const onPointerUp = () => {
      pointerDown = false;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
    };
  }, [stageRef, enabled]);
}
