"use client";

import { useEffect, useRef, type RefObject } from "react";
import { HERO } from "@/lib/assets";
import { ScrollTrigger } from "@/lib/gsap";

// The one video element. The desktop file is a 1280x1440 vertical stack,
// human timeline on the top half, robot timeline on the bottom half; only
// the top half is visible in this layer. Small viewports get a separate
// human-only 720p file, so the tall file never ships to phones. Never add
// a second video element for this footage: every other layer must reuse
// this element's decode.
//
// Source selection happens in JS because the media attribute on a source
// element is ignored inside a video element. On a breakpoint crossing the
// sources swap and the element reloads; every other resize is ignored.
//
// Desktop framing math: the video is sized so the 16:9 top sub-frame
// covers the stage, then shifted up by a quarter of its own height, which
// centers the human sub-frame on the stage center.
export function HeroVideo({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const posterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduced.matches) {
      // Reduced motion holds the poster. No sources attach, nothing
      // downloads, nothing plays; the cover poster layer stays up.
      v.autoplay = false;
      return;
    }

    // The cover poster layer hides once real frames are painting. The
    // poster attribute alone letterboxes inside the tall stack framing,
    // so a full-bleed image carries the pre-play state instead.
    const hidePoster = () => posterRef.current?.classList.add("opacity-0");
    v.addEventListener("playing", hidePoster, { once: true });

    const attach = () => {
      const mode = desktop.matches ? "desktop" : "mobile";
      if (v.dataset.mode === mode) return;
      v.dataset.mode = mode;
      while (v.firstChild) v.removeChild(v.firstChild);
      const sources =
        mode === "desktop"
          ? [
              { src: HERO.stackWebm, type: "video/webm" },
              { src: HERO.stackMp4, type: "video/mp4" },
            ]
          : [{ src: HERO.mobileMp4, type: "video/mp4" }];
      for (const { src, type } of sources) {
        const el = document.createElement("source");
        el.src = src;
        el.type = type;
        v.appendChild(el);
      }
      v.load();
      v.play().catch(() => {
        // Autoplay refusals leave the poster up, which is acceptable.
      });
      ScrollTrigger.refresh();
    };

    attach();
    desktop.addEventListener("change", attach);
    return () => {
      desktop.removeEventListener("change", attach);
      v.removeEventListener("playing", hidePoster);
    };
  }, [videoRef]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster={HERO.poster}
        webkit-playsinline=""
        className="absolute max-lg:inset-0 max-lg:h-full max-lg:w-full max-lg:object-cover lg:left-1/2 lg:top-1/2 lg:aspect-[1280/1440] lg:w-[max(100%,calc(100svh*16/9))] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/4"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={posterRef}
        src={HERO.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
      />
    </div>
  );
}
