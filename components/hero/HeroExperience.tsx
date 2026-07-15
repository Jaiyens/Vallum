"use client";

import { useRef } from "react";
import { HeroVideo } from "@/components/hero/HeroVideo";
import { HeroCopy } from "@/components/hero/HeroCopy";

// Orchestrates the hero experience. This phase ships the single video with
// the human half framed, the wordmark entrance, the mono line, and the
// scroll cue. The cursor lens, scroll pin, and line wipe mount here in the
// next phases.
export function HeroExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section data-hero-root className="relative">
      <div
        data-hero-stage
        className="relative isolate h-[100svh] overflow-hidden bg-black"
      >
        <HeroVideo videoRef={videoRef} />
        <HeroCopy />
      </div>
    </section>
  );
}
