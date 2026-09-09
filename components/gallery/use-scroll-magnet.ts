"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis-ref";
import {
  MAGNET_ENTER_FRAC,
  MAGNET_GLIDE_S,
  MAGNET_LEAVE_FRAC,
  MAGNET_MIN_DELTA_PX,
} from "./gallery-config";

// The scroll magnet: the soft lock that frames the helix. The section is
// exactly one viewport tall, and between the hero unpin and the rig there is
// no landmark to settle on, so a scroll would otherwise idle with the spiral
// sliced by the viewport edge and a strip of the hero's last frame above the
// ink. When scrolling ends with enough of the section on screen, the page
// glides on until the section's top edge is flush with the viewport's.
//
// Four rules keep this a lock the visitor feels helped by, not hijacked by:
//   idle only    the magnet never grabs while the wheel or a finger is live;
//                it waits for ScrollTrigger's debounced scrollEnd, which with
//                Lenis fires only after the inertial glide has died
//   both ways    a section entered from above or below locks once
//                MAGNET_ENTER_FRAC of it is on screen (founder, 2026-09-04:
//                a soft auto lock; the old entry-only gate refused upward
//                entry and left the hero strip showing)
//   hysteresis   leaving needs MAGNET_LEAVE_FRAC still on screen before the
//                page is pulled back, so an exit half-way out is let go
//   yielding     the glide runs through Lenis without lock, so any input
//                during it hands the page straight back to the visitor
//
// The target is top-flush (the section is 100svh, so top-flush is also
// bottom-flush; on a window taller than the section it centres instead). The
// delta floor is 2px, so a sliver of the hero can never idle above the ink.
// The section starts exactly where the hero's pin spacer ends, so the target
// can never land inside the pin. Settled state is published as data-settled
// on the section for CSS and tests. lenis/snap stays unused: its proximity
// model has no hysteresis, so it would pull on every exit.

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function useScrollMagnet(
  stageRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    const section = stageRef.current?.closest<HTMLElement>("section");
    if (!section) return;

    let lastY = window.scrollY;
    let dir: 1 | -1 = 1; // 1 is scrolling down
    let pointerDown = false;

    const settle = () => {
      section.dataset.settled = "";
    };
    const unsettle = () => {
      delete section.dataset.settled;
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY) {
        dir = y > lastY ? 1 : -1;
        unsettle();
      }
      lastY = y;
    };

    const onScrollEnd = () => {
      // A held touch can go still long enough to read as an idle; snapping
      // the page out from under the finger is never acceptable.
      if (pointerDown) return;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const visible = clamp(Math.min(rect.bottom, vh) - Math.max(rect.top, 0), 0, vh);
      // Against the smaller of the two heights, so a section taller than a
      // short window can still count as framed.
      const frac = visible / Math.min(rect.height, vh);
      // Heading toward the section: it hangs below and the last move was
      // down, or it hangs above and the last move was up. Anything that
      // already fills the frame counts as entering.
      const entering =
        rect.top > 0 ? dir === 1 : rect.bottom < vh ? dir === -1 : true;
      const threshold = entering ? MAGNET_ENTER_FRAC : MAGNET_LEAVE_FRAC;
      if (frac < threshold) {
        unsettle();
        return;
      }
      const slack = vh - rect.height;
      const delta = slack > 0 ? rect.top - slack / 2 : rect.top;
      const max = document.documentElement.scrollHeight - vh;
      const target = Math.round(clamp(window.scrollY + delta, 0, max));
      if (Math.abs(target - window.scrollY) < MAGNET_MIN_DELTA_PX) {
        settle();
        return;
      }
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          duration: MAGNET_GLIDE_S,
          easing: easeOutCubic,
          onComplete: settle,
        });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
      // The glide itself ends in another scrollEnd, which lands under the
      // delta floor and settles.
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
      unsettle();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
    };
  }, [stageRef, enabled]);
}
