"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

// Single registration point. registerPlugin is idempotent, so strict-mode
// double-invocation and Turbopack HMR re-evaluation are safe. InertiaPlugin
// must register before any Draggable.create({ inertia: true }) or its
// velocity tracking throws.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
}

export { gsap, ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip, useGSAP };
