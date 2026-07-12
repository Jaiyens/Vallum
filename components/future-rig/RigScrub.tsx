"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { FRAME_COUNT, FRAME_WIDTH, framePath } from "./frames-manifest";
import { RigClosedPoster } from "./rig-static";

export type RigScrubHandle = {
  // Request a frame by index. Safe to call before frames are decoded; the
  // latest request is painted as soon as they are.
  draw: (index: number) => void;
};

// The scrubbed visual: the closed poster renders immediately, every frame
// is fetched and decoded once the section is within one viewport, and only
// then does the canvas take over, drawing frame 0 first. Frame 0 is a
// byte-for-byte copy of the poster, so the swap is invisible. The scrub
// itself lives in FutureRigSection's anime timeline, which calls draw().
export function RigScrub({ ref }: { ref?: Ref<RigScrubHandle> }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(ImageBitmap | HTMLImageElement)[] | null>(null);
  const requestedRef = useRef(0);
  const paintedRef = useRef(-1);
  const [ready, setReady] = useState(false);

  const paint = () => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames || requestedRef.current === paintedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(frames[requestedRef.current], 0, 0, canvas.width, canvas.height);
    paintedRef.current = requestedRef.current;
  };

  useImperativeHandle(ref, () => ({
    draw(index: number) {
      requestedRef.current = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)));
      paint();
    },
  }));

  // Backing store tracks the box size, capped at 2x DPR and never above the
  // source width, so frames are never upscaled into wasted memory.
  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.min(Math.round(box.clientWidth * dpr), FRAME_WIDTH);
      const h = Math.round((w * 9) / 16);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        paintedRef.current = -1; // resizing clears the canvas; repaint
        paint();
      }
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(box);
    return () => ro.disconnect();
     
  }, []);

  // Fetch and decode the full sequence once the section is within one
  // viewport of entering. The canvas only appears when every frame is
  // ready; a failed fetch just means the poster stays up. No blank states.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    let cancelled = false;

    const load = async () => {
      try {
        const frames = await Promise.all(
          Array.from({ length: FRAME_COUNT }, async (_, i) => {
            const res = await fetch(framePath(i));
            if (!res.ok) throw new Error(`frame ${i}: HTTP ${res.status}`);
            const blob = await res.blob();
            if (typeof createImageBitmap === "function") {
              return createImageBitmap(blob);
            }
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            await img.decode();
            return img;
          }),
        );
        if (cancelled) {
          for (const f of frames) if ("close" in f) f.close();
          return;
        }
        framesRef.current = frames;
        paintedRef.current = -1;
        paint();
        setReady(true);
      } catch {
        // keep the poster
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void load();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(box);

    return () => {
      cancelled = true;
      io.disconnect();
      if (framesRef.current) {
        for (const f of framesRef.current) if ("close" in f) f.close();
        framesRef.current = null;
      }
    };
     
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0 motion-reduce:hidden">
      <RigClosedPoster />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`rig-edge-blend absolute inset-0 h-full w-full ${ready ? "" : "invisible"}`}
      />
    </div>
  );
}
