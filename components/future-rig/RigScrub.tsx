"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { FRAME_COUNT, FRAME_WIDTH, framePath } from "./frames-manifest";
import { RigClosedPoster } from "./rig-static";

export type RigScrubHandle = {
  // Request a frame by index. Safe to call before frames are decoded; the
  // latest request is painted as soon as they are.
  draw: (index: number) => void;
};

type Frame = ImageBitmap | HTMLImageElement;

// Parallel fetches. Enough to fill a slow link without starving the page's
// videos of connections.
const LOAD_CONCURRENCY = 6;

// Coarse to fine: both ends, then the midpoint of every remaining gap,
// breadth-first (0, 55, 27, 13, 41, ...). Any prefix of this order is an
// evenly spaced subset of the sequence, so the scrub plays the whole
// explosion in coarse steps within the first handful of frames and gets
// smoother as the rest arrive.
function loadOrder(count: number): number[] {
  const order = [0, count - 1];
  let gaps: [number, number][] = [[0, count - 1]];
  while (gaps.length) {
    const next: [number, number][] = [];
    for (const [a, b] of gaps) {
      if (b - a < 2) continue;
      const mid = (a + b) >> 1;
      order.push(mid);
      next.push([a, mid], [mid, b]);
    }
    gaps = next;
  }
  return order;
}

// The loaded frame closest to the requested one, or -1 if none is.
function nearestLoaded(frames: (Frame | undefined)[], target: number): number {
  for (let d = 0; d < frames.length; d++) {
    if (frames[target - d]) return target - d;
    if (frames[target + d]) return target + d;
  }
  return -1;
}

// The scrubbed visual: the closed poster renders immediately and the frames
// stream in coarse to fine (see loadOrder). The canvas takes over once both
// ends are decoded and always paints the loaded frame nearest the one the
// scroll asks for, repainting as closer frames land. Frame 0 is a
// byte-for-byte copy of the poster, so the swap is invisible.
//
// Until 2026-09-14 the canvas waited for all 56 frames. On the founder's
// connection the slowest of them took 14s, so a first visit scrolled the
// whole pin on the frozen poster and then snapped to the end state. The
// scrub itself lives in FutureRigSection's anime timeline, which calls
// draw().
export function RigScrub({ ref }: { ref?: Ref<RigScrubHandle> }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(Frame | undefined)[] | null>(null);
  const requestedRef = useRef(0);
  const paintedRef = useRef(-1);
  const [ready, setReady] = useState(false);

  const paint = () => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames) return;
    const index = nearestLoaded(frames, requestedRef.current);
    const frame = frames[index];
    if (!frame || index === paintedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    paintedRef.current = index;
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

  // Fetch and decode the sequence, coarse to fine. It starts once the page
  // has loaded and gone idle, so the frames are usually in before anyone
  // scrolls this far, or earlier if the section comes within one viewport
  // first. The idle start is desktop-only with motion allowed (the only
  // layout that scrubs; elsewhere the stage is display:none and the
  // observer never fires) and skipped under Save-Data. A frame that fails
  // is simply never painted; its neighbours cover the gap, and if an end
  // frame fails the poster stays up. No blank states.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    let cancelled = false;
    let started = false;
    const frames: (Frame | undefined)[] = new Array(FRAME_COUNT);
    framesRef.current = frames;

    const fetchFrame = async (i: number): Promise<Frame> => {
      const res = await fetch(framePath(i), { priority: "low" });
      if (!res.ok) throw new Error(`frame ${i}: HTTP ${res.status}`);
      const blob = await res.blob();
      if (typeof createImageBitmap === "function") {
        return createImageBitmap(blob);
      }
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      await img.decode();
      return img;
    };

    const load = async () => {
      if (started) return;
      started = true;
      const order = loadOrder(FRAME_COUNT);
      let cursor = 0;
      const worker = async () => {
        while (!cancelled && cursor < order.length) {
          const i = order[cursor++];
          let frame: Frame;
          try {
            frame = await fetchFrame(i);
          } catch {
            continue;
          }
          if (cancelled) {
            if ("close" in frame) frame.close();
            return;
          }
          frames[i] = frame;
          if (frames[0] && frames[FRAME_COUNT - 1]) {
            setReady(true);
            paint();
          }
        }
      };
      await Promise.all(Array.from({ length: LOAD_CONCURRENCY }, worker));
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

    const scrubs = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    ).matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData === true;
    let cancelIdle = () => {};
    const startWhenIdle = () => {
      // Safari has no requestIdleCallback.
      if (typeof requestIdleCallback === "function") {
        const id = requestIdleCallback(() => void load(), { timeout: 3000 });
        cancelIdle = () => cancelIdleCallback(id);
      } else {
        const id = window.setTimeout(() => void load(), 1500);
        cancelIdle = () => window.clearTimeout(id);
      }
    };
    if (scrubs && !saveData) {
      if (document.readyState === "complete") startWhenIdle();
      else window.addEventListener("load", startWhenIdle, { once: true });
    }

    return () => {
      cancelled = true;
      io.disconnect();
      window.removeEventListener("load", startWhenIdle);
      cancelIdle();
      for (const f of frames) if (f && "close" in f) f.close();
      framesRef.current = null;
    };
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0 motion-reduce:hidden">
      <RigClosedPoster />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${ready ? "" : "invisible"}`}
      />
    </div>
  );
}
