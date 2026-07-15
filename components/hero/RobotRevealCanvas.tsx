"use client";

import { useEffect, useRef, type RefObject } from "react";

// The robot layer. One canvas, painted from the single video element's
// bottom half via requestVideoFrameCallback, so both layers share one
// decode and can never drift. A rAF loop covers browsers without the
// callback. CSS masks decide visibility: the radial cursor lens and the
// scroll wipe, both driven by variables on the stage. The canvas itself
// never transforms; WebKit repaints masks badly on moving layers, so all
// motion lives in the mask variables.
//
// The cover math mirrors the CSS framing of the human layer exactly, so
// the two halves register pixel for pixel.
export function RobotRevealCanvas({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const v = videoRef.current;
    if (!canvas || !v) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stop = false;
    let rafId = 0;
    let vfcId = 0;

    const paint = () => {
      if (v.readyState < 2 || v.videoHeight === 0) return;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const sw = v.videoWidth;
      const sh = v.videoHeight / 2; // bottom half: the robot timeline
      const s = Math.max(W / sw, H / sh);
      const dw = sw * s;
      const dh = sh * s;
      ctx.drawImage(v, 0, sh, sw, sh, (W - dw) / 2, (H - dh) / 2, dw, dh);
    };

    const hasVfc = "requestVideoFrameCallback" in HTMLVideoElement.prototype;

    const loop = () => {
      if (stop) return;
      paint();
      if (hasVfc) {
        vfcId = v.requestVideoFrameCallback(loop);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Paused seeks still repaint, which keeps scrubbed verification and
    // any future paused states honest.
    v.addEventListener("seeked", paint);
    loop();

    return () => {
      stop = true;
      if (hasVfc && vfcId) v.cancelVideoFrameCallback(vfcId);
      if (rafId) cancelAnimationFrame(rafId);
      v.removeEventListener("seeked", paint);
      ro.disconnect();
    };
  }, [videoRef]);

  return (
    <canvas
      ref={canvasRef}
      data-robot-canvas
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
    />
  );
}
