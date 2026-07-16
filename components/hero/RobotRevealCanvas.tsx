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

    const paint = (opaque = false) => {
      if (v.readyState < 2 || v.videoHeight === 0) return;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const sw = v.videoWidth;
      const sh = v.videoHeight / 2; // bottom half: the robot timeline
      const s = Math.max(W / sw, H / sh);
      const dw = sw * s;
      const dh = sh * s;
      // Frame-echo motion blur under slow motion: each new frame
      // dissolves through the previous composite instead of stepping,
      // the canvas equivalent of shutter blur. Full speed and seeks
      // paint opaque.
      ctx.globalAlpha = !opaque && v.playbackRate < 0.95 ? 0.5 : 1;
      ctx.drawImage(v, 0, sh, sw, sh, (W - dw) / 2, (H - dh) / 2, dw, dh);
      ctx.globalAlpha = 1;
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
      // The resize wipes the canvas, so repaint opaque: an echo pass
      // over a blank canvas would leave the layer half transparent.
      paint(true);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Paused seeks still repaint, which keeps scrubbed verification and
    // any future paused states honest. Seek paints are opaque so no echo
    // of an unrelated frame survives the jump.
    const onSeeked = () => paint(true);
    v.addEventListener("seeked", onSeeked);
    loop();

    return () => {
      stop = true;
      if (hasVfc && vfcId) v.cancelVideoFrameCallback(vfcId);
      if (rafId) cancelAnimationFrame(rafId);
      v.removeEventListener("seeked", onSeeked);
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
