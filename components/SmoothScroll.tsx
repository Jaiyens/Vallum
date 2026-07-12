"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Site-wide inertial scrolling. Lenis animates the real window scroll, so
// position: sticky and every scroll-position observer keep working untouched.
// anchors: true makes hash links glide and honors each section's
// scroll-margin-top, which is how they clear the fixed nav.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
