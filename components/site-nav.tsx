"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Cross-page affordance (F-0504), scroll-intent chrome per Jay 2026-07-19:
// hidden on load so the page opens flush with the hero film, revealed only
// when the reader scrolls up (the "take me somewhere" gesture), hidden again
// on downward scroll. Keyboard focus always reveals it, so the first tab
// stops never sit off screen. Reduced motion swaps the slide for an instant
// toggle via motion-reduce:transition-none.
const LINK_CLASS =
  "text-[14px] font-medium text-forest-line underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line";

// Ignore scroll jitter below this many pixels per event.
const INTENT_PX = 6;

export function SiteNav() {
  const [shown, setShown] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (delta < -INTENT_PX) setShown(true);
        else if (delta > INTENT_PX) setShown(false);
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-bone transition-transform duration-300 ease-out focus-within:translate-y-0 motion-reduce:transition-none ${
        shown ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-site items-center justify-between px-6 py-2 md:px-16"
      >
        <Link href="/" className={LINK_CLASS}>
          Vallum Labs
        </Link>
        <Link href="/dataset" className={LINK_CLASS}>
          Dataset
        </Link>
      </nav>
    </header>
  );
}
