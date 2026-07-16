"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollTrigger } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis-ref";

// Site-wide inertial scrolling. Lenis animates the real window scroll, so
// position: sticky and every scroll-position observer keep working untouched.
// anchors: true makes hash links glide and honors each section's
// scroll-margin-top, which is how they clear the fixed nav.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // duration + easing (not lerp) gives the long, carried glide; the
    // reduced wheelMultiplier makes each wheel tick travel less page so
    // sections arrive slower.
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      duration: 1.6,
      wheelMultiplier: 0.8,
    });
    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;
    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
