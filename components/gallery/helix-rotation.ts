// The rotation controller for the helix. Owns the single rotation value and
// everything derived from it: ring transform, centerpiece counter-rotation,
// per-frame focus, video budget, autorotate, and the drag physics. Lives
// outside React so per-frame work structurally cannot touch React state.

import { Draggable, gsap } from "@/lib/gsap";
import {
  AUTOROTATE_SECONDS,
  DIMMED_BRIGHTNESS,
  DRAG_GAIN,
  DRAG_RESISTANCE,
  FOCUSED_SCALE,
  FOCUS_HYSTERESIS_DEG,
  FOCUS_TWEEN_S,
  MAX_PLAYING_VIDEOS,
  PANEL_COUNT,
  RESUME_DELAY_S,
  STEP_DEG,
} from "./gallery-config";

// Draggable's type declarations do not surface the rotation tracker that
// type: "rotation" instances carry at runtime.
type RotationDraggable = { rotation: number; tween?: gsap.core.Tween };

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

export function createHelixController(args: {
  stage: HTMLElement;
  ring: HTMLElement;
  centerpiece: HTMLElement;
  proxy: HTMLElement;
  panels: HelixPanel[];
}): HelixController {
  const { stage, ring, centerpiece, proxy, panels } = args;
  const state = { rotation: 0 };
  const videos = panels.map((p) => p.leaf.querySelector("video"));
  let focused = -1;
  let suspended = false;
  let resumeCall: gsap.core.Tween | null = null;
  let rotateTween: gsap.core.Tween | null = null;

  // Centering lives on the element's CSS translate property, which
  // composes before the transform GSAP owns, so the centerpiece is centered
  // from first paint with no JS. Only rotationY is written per frame. The
  // tiny z keeps Safari from z-fighting it against panels crossing the z=0
  // plane.
  gsap.set(centerpiece, {
    transformOrigin: "50% 50%",
    force3D: true,
    z: 0.01,
  });
  panels.forEach((p, i) => {
    gsap.set(p.leaf, {
      scale: 1,
      filter: `brightness(${DIMMED_BRIGHTNESS})`,
      transformOrigin: "50% 50%",
    });
    p.root.dataset.panelIndex = String(i);
  });

  // No video may fetch or decode while the section is offscreen. The
  // observer below flips this; playback requests made while hidden are
  // re-issued for the focused panel when the section returns.
  let onScreen = false;

  const playVideo = (i: number) => {
    const v = videos[i];
    if (!v || !onScreen) return;
    v.dataset.started = "1";
    v.play().catch(() => {});
  };
  const pauseVideo = (i: number) => {
    const v = videos[i];
    if (!v) return;
    // Clearing the flag keeps the viewport observer in auto-pause-video
    // from restarting an unfocused panel when it scrolls back on screen.
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
      gsap.to(el.leaf, {
        scale: 1,
        filter: `brightness(${DIMMED_BRIGHTNESS})`,
        duration: FOCUS_TWEEN_S,
        overwrite: "auto",
      });
      pauseVideo(prev);
    }
    const el = panels[next];
    el.root.setAttribute("data-focused", "");
    gsap.to(el.leaf, {
      scale: FOCUSED_SCALE,
      filter: "brightness(1)",
      duration: FOCUS_TWEEN_S,
      overwrite: "auto",
    });
    playVideo(next);
  };

  const updateFocus = () => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < PANEL_COUNT; i++) {
      const d = distToFront(i * STEP_DEG + state.rotation);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    if (focused === -1) {
      setFocused(best);
    } else if (best !== focused) {
      const incumbent = distToFront(focused * STEP_DEG + state.rotation);
      if (bestDist < incumbent - FOCUS_HYSTERESIS_DEG) setFocused(best);
    }
    // Budget enforcement: nothing beyond the focused panel (and the panel a
    // takeover borrowed) may decode. Cheap property reads, runs every frame.
    let playing = 0;
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      if (!v || v.paused) continue;
      playing += 1;
      if (i !== focused && playing > MAX_PLAYING_VIDEOS) pauseVideo(i);
    }
  };

  const setRing = gsap.quickSetter(ring, "rotationY", "deg");
  const setCenter = gsap.quickSetter(centerpiece, "rotationY", "deg");
  const apply = () => {
    setRing(state.rotation);
    setCenter(state.rotation * -1);
    updateFocus();
  };
  gsap.ticker.add(apply);

  const auto = gsap.to(state, {
    rotation: "+=360",
    duration: AUTOROTATE_SECONDS,
    ease: "none",
    repeat: -1,
  });

  const killResume = () => {
    resumeCall?.kill();
    resumeCall = null;
  };
  const scheduleResume = () => {
    killResume();
    resumeCall = gsap.delayedCall(RESUME_DELAY_S, () => {
      resumeCall = null;
      if (suspended || !onScreen) return;
      // A paused relative tween snaps back to stale recorded values on
      // resume; invalidate re-resolves +=360 from the current rotation.
      auto.invalidate();
      auto.restart();
    });
  };

  // Drag maps by delta, never by absolute value, so the proxy's accumulated
  // rotation never has to agree with state.rotation and autorotate can move
  // the ring while the proxy sits still.
  let grabRing = 0;
  let grabProxy = 0;
  const drag = Draggable.create(proxy, {
    type: "rotation",
    trigger: stage,
    inertia: true,
    dragResistance: DRAG_RESISTANCE,
    dragClickables: true,
    allowNativeTouchScrolling: true,
    cursor: "grab",
    activeCursor: "grabbing",
    onPress() {
      if (suspended) return;
      auto.pause();
      killResume();
      rotateTween?.kill();
      rotateTween = null;
      grabRing = state.rotation;
      grabProxy = (this as unknown as RotationDraggable).rotation;
    },
    onDrag() {
      if (suspended) return;
      state.rotation =
        grabRing + ((this as unknown as RotationDraggable).rotation - grabProxy) * DRAG_GAIN;
    },
    onThrowUpdate() {
      if (suspended) return;
      state.rotation =
        grabRing + ((this as unknown as RotationDraggable).rotation - grabProxy) * DRAG_GAIN;
    },
    onThrowComplete() {
      if (!suspended) scheduleResume();
    },
    onRelease() {
      // A zero-velocity release never creates a throw tween, so
      // onThrowComplete never fires; without this guard autorotate would
      // stay paused forever.
      const tween = (this as unknown as RotationDraggable).tween;
      if (!suspended && (!tween || !tween.isActive())) scheduleResume();
    },
  })[0];

  // Draggable's rotation type stamps inline touch-action: none on the
  // trigger and recursively on every descendant, and force-disables
  // allowNativeTouchScrolling. Undo all of it: pan-y on the stage lets the
  // browser own vertical swipes natively (they never reach Draggable),
  // while horizontal gestures still spin the ring. Descendants revert to
  // auto and the stage's pan-y governs the whole chain.
  stage.style.touchAction = "pan-y";
  stage.querySelectorAll<HTMLElement>("*").forEach((el) => {
    el.style.touchAction = "";
  });

  // Offscreen gate: autorotate and video playback stop while the section
  // is out of view, so nothing fetches or decodes below the fold.
  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      const d = drag as unknown as { isPressed?: boolean; isThrowing?: () => boolean };
      const throwing = typeof d.isThrowing === "function" ? d.isThrowing() : false;
      if (onScreen) {
        if (focused >= 0) playVideo(focused);
        if (!suspended && !resumeCall && !d.isPressed && !throwing) {
          auto.invalidate();
          auto.restart();
        }
      } else {
        if (focused >= 0) videos[focused]?.pause();
        auto.pause();
      }
    },
    { threshold: 0.1 },
  );
  io.observe(stage);
  auto.pause();

  const hook: HelixTestHook = {
    get rotation() {
      return state.rotation;
    },
    setRotation(deg: number) {
      auto.pause();
      killResume();
      state.rotation = deg;
    },
    get focused() {
      return focused;
    },
  };
  (window as Window & { __helix?: HelixTestHook }).__helix = hook;

  updateFocus();

  return {
    rotateTo(deg, opts = {}) {
      auto.pause();
      killResume();
      rotateTween?.kill();
      // Shortest signed arc to the requested pose.
      let delta = (deg - state.rotation) % 360;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      rotateTween = gsap.to(state, {
        rotation: state.rotation + delta,
        duration: opts.duration ?? 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          rotateTween = null;
          opts.onComplete?.();
        },
        // Fires when the tween is killed early, e.g. a press on the stage
        // mid-fronting. Callers use it to unwind held state.
        onInterrupt: () => {
          rotateTween = null;
          opts.onInterrupt?.();
        },
      });
    },
    suspend() {
      suspended = true;
      auto.pause();
      killResume();
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
      gsap.ticker.remove(apply);
      drag.kill();
      auto.kill();
      rotateTween?.kill();
      killResume();
      delete (window as Window & { __helix?: HelixTestHook }).__helix;
    },
  };
}
