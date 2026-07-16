// The rotation controller for the helix. Owns two rotation values and
// everything derived from them: ring azimuth, stage polar tilt, centerpiece
// counter-rotation, per-frame focus, video budget, auto-rotate, and the drag
// physics. Lives outside React so per-frame work structurally cannot touch
// React state.
//
// There is no three.js in this repo, so the two-axis damped orbit is built by
// hand: azimuth and tilt each ease toward a target every frame (the damping
// equivalent), auto-rotate advances the azimuth target, a pointer drag takes
// both targets, and the tilt is clamped to the polar range. Pointer input is
// native pointer events with touch-action pan-y on the stage, so a single
// finger orbits horizontally while a vertical swipe stays page scroll. That
// replaces the old GSAP Draggable, which stamped touch-action none on every
// descendant and had to be undone.

import { gsap } from "@/lib/gsap";
import {
  AUTO_RAD_PER_S,
  AZ_GAIN_DEG_PER_PX,
  DAMP_PER_FRAME,
  DIMMED_BRIGHTNESS,
  DRAG_THRESHOLD_PX,
  FOCUS_HYSTERESIS_DEG,
  FOCUS_TWEEN_S,
  FOCUSED_SCALE,
  MAX_PLAYING_VIDEOS,
  PANEL_COUNT,
  POLAR_MAX_DEG,
  POLAR_MIN_DEG,
  RESUME_IDLE_S,
  REST_TILT_DEG,
  STEP_DEG,
  TILT_GAIN_DEG_PER_PX,
} from "./gallery-config";

const AUTO_DEG_PER_S = (AUTO_RAD_PER_S * 180) / Math.PI;

export type HelixPanel = {
  root: HTMLElement;
  leaf: HTMLElement;
};

export type HelixController = {
  rotateTo(
    deg: number,
    opts?: { duration?: number; onComplete?: () => void; onInterrupt?: () => void },
  ): void;
  suspend(): void;
  release(): void;
  focusedIndex(): number;
  destroy(): void;
};

type HelixTestHook = {
  rotation: number;
  setRotation(deg: number): void;
  focused: number;
};

const norm = (deg: number) => ((deg % 360) + 360) % 360;
// Angular distance from front-center (0deg), in [0, 180].
const distToFront = (deg: number) => {
  const a = norm(deg);
  return Math.min(a, 360 - a);
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function createHelixController(args: {
  stage: HTMLElement;
  ring: HTMLElement;
  centerpiece: HTMLElement;
  panels: HelixPanel[];
}): HelixController {
  const { stage, ring, centerpiece, panels } = args;
  const state = {
    az: 0,
    azTarget: 0,
    tilt: REST_TILT_DEG,
    tiltTarget: REST_TILT_DEG,
  };
  const videos = panels.map((p) => p.leaf.querySelector("video"));
  // The poster sits beside the leaf so the slot never goes black while the leaf
  // is borrowed by a takeover; it has to dim with the leaf or a paused back
  // panel would glow through the glass band. Both are leaves, so filtering them
  // never touches the 3D stage or ring.
  const posters = panels.map((p) => p.root.querySelector("img"));

  // Depth brightness: the front panel is lit, the rest recede into the ink so
  // whatever crosses behind the centerpiece band arrives already dark. This is
  // what holds bone text legible against every frame without a solid box, and
  // it reads as atmosphere, not an effect.
  const depthBright = (distDeg: number) => {
    const t = (1 + Math.cos((distDeg * Math.PI) / 180)) / 2; // 1 front, 0 back
    return 0.2 + 0.7 * Math.pow(t, 2.2);
  };
  const applyBrightness = (i: number, b: number) => {
    const v = `brightness(${b.toFixed(3)})`;
    panels[i].leaf.style.filter = v;
    const img = posters[i];
    if (img) img.style.filter = v;
  };
  let focused = -1;
  let suspended = false;
  let autoActive = true;
  let onScreen = false;
  let resumeCall: gsap.core.Tween | null = null;
  let rotateTween: gsap.core.Tween | null = null;

  gsap.set(ring, { transformOrigin: "50% 50%", force3D: true });
  gsap.set(stage, { transformOrigin: "50% 50%", force3D: true });
  // The tiny z keeps Safari from z-fighting the centerpiece against panels
  // crossing the z=0 plane. Centering lives on the element's CSS translate,
  // which composes before the GSAP-owned rotation.
  gsap.set(centerpiece, { transformOrigin: "50% 50%", force3D: true, z: 0.01 });
  panels.forEach((p, i) => {
    gsap.set(p.leaf, { scale: 1, transformOrigin: "50% 50%" });
    p.root.dataset.panelIndex = String(i);
    applyBrightness(i, DIMMED_BRIGHTNESS);
  });

  const playVideo = (i: number) => {
    const v = videos[i];
    if (!v || !onScreen) return;
    v.dataset.started = "1";
    v.play().catch(() => {});
  };
  const pauseVideo = (i: number) => {
    const v = videos[i];
    if (!v) return;
    delete v.dataset.started;
    v.pause();
  };

  const setFocused = (next: number) => {
    if (next === focused) return;
    const prev = focused;
    focused = next;
    if (prev >= 0) {
      const el = panels[prev];
      el.root.removeAttribute("data-focused");
      // Brightness is depth-driven every frame; focus animates the scale pop
      // only, so the two never fight over the leaf's filter.
      gsap.to(el.leaf, { scale: 1, duration: FOCUS_TWEEN_S, overwrite: "auto" });
      pauseVideo(prev);
    }
    const el = panels[next];
    el.root.setAttribute("data-focused", "");
    gsap.to(el.leaf, {
      scale: FOCUSED_SCALE,
      duration: FOCUS_TWEEN_S,
      overwrite: "auto",
    });
    playVideo(next);
  };

  const updateFocus = () => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < PANEL_COUNT; i++) {
      const d = distToFront(i * STEP_DEG + state.az);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    if (focused === -1) {
      setFocused(best);
    } else if (best !== focused) {
      const incumbent = distToFront(focused * STEP_DEG + state.az);
      if (bestDist < incumbent - FOCUS_HYSTERESIS_DEG) setFocused(best);
    }
    let playing = 0;
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      if (!v || v.paused) continue;
      playing += 1;
      if (i !== focused && playing > MAX_PLAYING_VIDEOS) pauseVideo(i);
    }
  };

  const setRing = gsap.quickSetter(ring, "rotationY", "deg");
  const setStageTilt = gsap.quickSetter(stage, "rotationX", "deg");
  const setCenter = gsap.quickSetter(centerpiece, "rotationY", "deg");

  const tick = (_time: number, deltaMs: number) => {
    const dt = Math.min((deltaMs || 16.7) / 1000, 0.05);
    // Frame-rate normalised follow fraction.
    const f = 1 - Math.pow(1 - DAMP_PER_FRAME, dt * 60);

    if (autoActive && !suspended && onScreen && !dragging && !rotateTween) {
      state.azTarget += AUTO_DEG_PER_S * dt;
    }
    if (!rotateTween) {
      state.az += (state.azTarget - state.az) * f;
    }
    state.tilt += (state.tiltTarget - state.tilt) * f;

    setRing(state.az);
    setStageTilt(state.tilt);
    setCenter(state.az * -1);
    updateFocus();

    // Depth brightness, every frame, except while a takeover owns the front
    // leaf. The focused panel is fully lit; everyone else falls off with the
    // angular distance from front.
    if (!suspended) {
      for (let i = 0; i < PANEL_COUNT; i++) {
        const b = i === focused ? 1 : depthBright(distToFront(i * STEP_DEG + state.az));
        applyBrightness(i, b);
      }
    }
  };
  gsap.ticker.add(tick);

  const killResume = () => {
    resumeCall?.kill();
    resumeCall = null;
  };
  const scheduleResume = () => {
    killResume();
    resumeCall = gsap.delayedCall(RESUME_IDLE_S, () => {
      resumeCall = null;
      if (suspended || !onScreen) return;
      autoActive = true;
      state.tiltTarget = REST_TILT_DEG; // ease the pose home, never snap
    });
  };

  // Pointer input. A press below the drag threshold is left alone so a panel
  // button click still fires; past the threshold it captures the pointer and
  // orbits. Vertical touch never reaches us because the stage is pan-y, so a
  // single finger orbits azimuth and the page keeps its vertical scroll.
  let dragging = false;
  let pending = false;
  let startX = 0;
  let startY = 0;
  let startAz = 0;
  let startTilt = 0;
  let activePointer: number | null = null;

  const onPointerDown = (e: PointerEvent) => {
    if (suspended || e.button !== 0) return;
    pending = true;
    dragging = false;
    activePointer = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    startAz = state.azTarget;
    startTilt = state.tiltTarget;
    autoActive = false;
    killResume();
    rotateTween?.kill();
    rotateTween = null;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!pending || e.pointerId !== activePointer) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;
      dragging = true;
      stage.setPointerCapture(e.pointerId);
      stage.style.cursor = "grabbing";
    }
    state.azTarget = startAz + dx * AZ_GAIN_DEG_PER_PX;
    state.tiltTarget = clamp(
      startTilt + dy * TILT_GAIN_DEG_PER_PX,
      POLAR_MIN_DEG,
      POLAR_MAX_DEG,
    );
  };

  const endPointer = (e: PointerEvent) => {
    if (e.pointerId !== activePointer) return;
    const wasDragging = dragging;
    pending = false;
    dragging = false;
    activePointer = null;
    stage.style.cursor = "";
    try {
      stage.releasePointerCapture(e.pointerId);
    } catch {
      /* capture was never taken (a click, or a cancelled touch) */
    }
    if (!suspended) scheduleResume();
    // A click (no drag) leaves the panel button's own handler to run.
    void wasDragging;
  };

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", endPointer);
  stage.addEventListener("pointercancel", endPointer);
  stage.style.touchAction = "pan-y";
  stage.style.cursor = "grab";

  // Offscreen gate: auto-rotate and video playback stop while the section is
  // out of view, so nothing fetches or decodes below the fold.
  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) {
        if (focused >= 0) playVideo(focused);
      } else if (focused >= 0) {
        videos[focused]?.pause();
      }
    },
    { threshold: 0.1 },
  );
  io.observe(stage);

  const hook: HelixTestHook = {
    get rotation() {
      return state.az;
    },
    setRotation(deg: number) {
      autoActive = false;
      killResume();
      rotateTween?.kill();
      rotateTween = null;
      state.az = deg;
      state.azTarget = deg;
    },
    get focused() {
      return focused;
    },
  };
  (window as Window & { __helix?: HelixTestHook }).__helix = hook;

  updateFocus();

  return {
    rotateTo(deg, opts = {}) {
      autoActive = false;
      killResume();
      rotateTween?.kill();
      // Shortest signed arc to the requested pose.
      let delta = (deg - state.az) % 360;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      const target = state.az + delta;
      state.azTarget = target;
      rotateTween = gsap.to(state, {
        az: target,
        duration: opts.duration ?? 0.35,
        ease: "power2.inOut",
        onUpdate: () => {
          state.azTarget = state.az;
        },
        onComplete: () => {
          rotateTween = null;
          opts.onComplete?.();
        },
        onInterrupt: () => {
          rotateTween = null;
          opts.onInterrupt?.();
        },
      });
    },
    suspend() {
      suspended = true;
      autoActive = false;
      killResume();
      rotateTween?.kill();
      rotateTween = null;
    },
    release() {
      suspended = false;
      scheduleResume();
    },
    focusedIndex() {
      return focused;
    },
    destroy() {
      io.disconnect();
      gsap.ticker.remove(tick);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", endPointer);
      stage.removeEventListener("pointercancel", endPointer);
      rotateTween?.kill();
      killResume();
      delete (window as Window & { __helix?: HelixTestHook }).__helix;
    },
  };
}
