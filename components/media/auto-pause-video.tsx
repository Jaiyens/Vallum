"use client";

import { useRef } from "react";
import type { VideoAsset } from "@/lib/assets";
import { useVideoViewport } from "@/hooks/use-video-viewport";

type AutoPauseVideoProps = {
  asset: VideoAsset;
  // Skip autoplay entirely; playback starts when the owner flags
  // el.dataset.started = "1" and calls play(). Keeps hidden layers from
  // downloading at page load.
  deferPlay?: boolean;
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "poster" | "src">;

// Shared <video> wrapper: webm+mp4 sources, poster, off-screen pause,
// reduced-motion gate. Containers must give it a fixed aspect or absolute
// fill so it never shifts layout.
export function AutoPauseVideo({ asset, className, deferPlay, ...rest }: AutoPauseVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  useVideoViewport(ref, { defer: deferPlay });
  return (
    <video
      ref={ref}
      className={className}
      autoPlay={!deferPlay}
      muted
      loop
      playsInline
      preload="none"
      poster={asset.poster}
      {...rest}
    >
      {asset.webm ? <source src={asset.webm} type="video/webm" /> : null}
      <source src={asset.mp4} type="video/mp4" />
    </video>
  );
}
