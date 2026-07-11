"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

// Media on the page all has fixed aspect ratios, so late-arriving web fonts
// are the only thing that can move ScrollTrigger start/end positions.
export function ScrollRefresh() {
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}
