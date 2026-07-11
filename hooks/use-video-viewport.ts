"use client";

import { useEffect, type RefObject } from "react";

// Plays a video only while it is on screen. Under prefers-reduced-motion the
// video never autoplays and the poster stays up. With defer, the observer
// only manages pausing; playback must be started externally (the element's
// data-started flag records that it has been), so the video does not load
// until something actually reveals it.
export function useVideoViewport(
  ref: RefObject<HTMLVideoElement | null>,
  { defer = false }: { defer?: boolean } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.removeAttribute("autoplay");
      el.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!defer || el.dataset.started === "1") {
            el.play().catch(() => {});
          }
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, defer]);
}
