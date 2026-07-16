"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Flip, gsap } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis-ref";
import { AutoPauseVideo } from "@/components/media/auto-pause-video";
import { GALLERY_VIDEO } from "@/lib/assets";
import {
  type GalleryPanelContent,
  panelLabel,
} from "@/src/content/gallery";
import {
  CARET_HIDE_DELAY_MS,
  CROSSFADE_S,
  FLIP_CLOSE_S,
  FLIP_OPEN_S,
  FOCUSED_SCALE,
  SOURCE_CHAR_MS,
  STAT_MAX_CHAR_MS,
  STAT_MIN_CHAR_MS,
  STAT_TARGET_MS,
} from "./gallery-config";
import { teletypeSegments, type Teletype } from "./teletype";

// The focus state (Recipe B). No opaque dialog covers the scene: the whole
// canvas is blurred and desaturated by HelixStage while the clicked panel
// resolves forward, so the world steps back rather than a box opening on top.
// Desktop morphs the clicked panel's leaf into the media slot with GSAP Flip;
// mobile and reduced motion crossfade with their own video element. The detail
// (industry, then the statistic or the condition line, then the citation) sits
// on a Recipe A glass band and teletypes in; reduced motion renders it at once.
// Text is bone throughout, the caret is forest-line, never amber.

type Mode = "flip" | "fade";

export function StatTakeover({
  panel,
  mode,
  instant,
  leaf,
  onClosed,
}: {
  panel: GalleryPanelContent;
  mode: Mode;
  instant: boolean;
  leaf: HTMLElement | null;
  onClosed: () => void;
}) {
  const asset = GALLERY_VIDEO[panel.id as keyof typeof GALLERY_VIDEO];
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaSlotRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const primarySpanRef = useRef<HTMLSpanElement>(null);
  const sourceSpanRef = useRef<HTMLSpanElement>(null);
  const caretPrimaryRef = useRef<HTMLSpanElement>(null);
  const caretSourceRef = useRef<HTMLSpanElement>(null);

  const teletypesRef = useRef<Teletype[]>([]);
  const timersRef = useRef<number[]>([]);
  const flipAnimRef = useRef<gsap.core.Animation | null>(null);
  const crossfadeAnimRef = useRef<gsap.core.Tween | null>(null);
  const leafHomeRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Every panel carries a statistic now; the takeover always renders the full
  // stat, its source, and (for logging) a secondary cited figure.
  const primaryText = panel.stat;
  const sourceText = panel.source;
  const secondary = panel.secondary ?? null;

  // Scroll lock. lenis.stop() halts the inertial glide; the overflow lock
  // covers keyboard scrolling and reduced motion where Lenis never mounted.
  // The padding compensates the vanished scrollbar so the page never shifts,
  // and inert takes the covered page out of the tab order.
  useEffect(() => {
    lenisRef.current?.stop();
    const html = document.documentElement;
    const gutter = window.innerWidth - html.clientWidth;
    const prevOverflow = html.style.overflow;
    const prevPadding = html.style.paddingRight;
    html.style.overflow = "hidden";
    if (gutter > 0) html.style.paddingRight = `${gutter}px`;
    const behind = document.getElementById("content");
    behind?.setAttribute("inert", "");
    return () => {
      behind?.removeAttribute("inert");
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPadding;
      lenisRef.current?.start();
    };
  }, []);

  // Focus management: remember the opener, focus the close control.
  useEffect(() => {
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      restoreFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, []);

  const setCaret = (
    active: typeof caretPrimaryRef | typeof caretSourceRef | null,
  ) => {
    for (const ref of [caretPrimaryRef, caretSourceRef]) {
      const el = ref.current;
      if (!el) continue;
      el.style.display = ref === active ? "inline-block" : "none";
    }
  };

  const startTyping = () => {
    if (instant || closingRef.current) return;
    const primaryLen = primaryText.length;
    const primaryDelay = Math.min(
      Math.max(STAT_TARGET_MS / primaryLen, STAT_MIN_CHAR_MS),
      STAT_MAX_CHAR_MS,
    );

    const finish = (lastCaret: typeof caretPrimaryRef) => {
      const caret = lastCaret.current;
      if (caret) caret.setAttribute("data-done", "");
      timersRef.current.push(
        window.setTimeout(() => {
          caret?.setAttribute("data-hidden", "");
        }, CARET_HIDE_DELAY_MS),
      );
    };

    const typeSource = () => {
      const el = sourceSpanRef.current;
      if (!el || !sourceText) return finish(caretPrimaryRef);
      setCaret(caretSourceRef);
      teletypesRef.current.push(
        teletypeSegments([{ el, text: sourceText }], () => SOURCE_CHAR_MS, () =>
          finish(caretSourceRef),
        ),
      );
    };

    const primaryEl = primarySpanRef.current;
    if (!primaryEl) return;
    setCaret(caretPrimaryRef);
    teletypesRef.current.push(
      teletypeSegments([{ el: primaryEl, text: primaryText }], () => primaryDelay, typeSource),
    );
  };

  // Entrance: Flip morph (helix) or crossfade (mobile, reduced), then the
  // teletype sequence.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (mode === "flip" && leaf && mediaSlotRef.current) {
      leafHomeRef.current = leaf.parentElement;
      const state = Flip.getState(leaf);
      mediaSlotRef.current.appendChild(leaf);
      gsap.set(leaf, { scale: 1 });
      flipAnimRef.current = Flip.from(state, {
        absolute: true,
        scale: true,
        duration: FLIP_OPEN_S,
        ease: "power3.inOut",
        onComplete: () => {
          flipAnimRef.current = null;
          startTyping();
        },
      });
      // The teletype is the copy's entrance; no opacity tween on the band, so
      // it can never get stranded at zero under a StrictMode double-mount.
    } else if (instant) {
      // Reduced motion (and any other instant caller): no crossfade at all.
      // gsap.from() here previously raced a StrictMode double-invoke of this
      // effect (two untracked tweens fighting the same property), which left
      // the whole dialog stranded at a near-zero opacity. An unconditional
      // opacity: 1 has no tween to race, so it can never get stuck.
      gsap.set(root, { opacity: 1 });
    } else {
      // fromTo() (not from()) pins both ends explicitly, so a StrictMode
      // double-invoke that kills the first tween and starts a second one
      // still animates the correct 0 -> 1 range instead of capturing
      // whatever partial value the first tween left behind.
      crossfadeAnimRef.current = gsap.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: CROSSFADE_S, ease: "none", onComplete: startTyping },
      );
    }

    return () => {
      teletypesRef.current.forEach((t) => t.cancel());
      teletypesRef.current = [];
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      flipAnimRef.current?.kill();
      flipAnimRef.current = null;
      crossfadeAnimRef.current?.kill();
      crossfadeAnimRef.current = null;
      const home = leafHomeRef.current;
      if (mode === "flip" && leaf && home && leaf.parentElement !== home) {
        home.appendChild(leaf);
        gsap.set(leaf, {
          clearProps:
            "position,left,top,width,height,inset,margin,zIndex,transform,opacity",
        });
        gsap.set(leaf, {
          scale: FOCUSED_SCALE,
          filter: "brightness(1)",
          transformOrigin: "50% 50%",
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    teletypesRef.current.forEach((t) => t.cancel());
    teletypesRef.current = [];
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    flipAnimRef.current?.kill();
    flipAnimRef.current = null;

    if (mode === "flip" && leaf && leafHomeRef.current) {
      const state = Flip.getState(leaf);
      leafHomeRef.current.appendChild(leaf);
      if (rootRef.current) {
        gsap.to(rootRef.current.querySelectorAll("[data-takeover-copy]"), {
          opacity: 0,
          duration: FLIP_CLOSE_S * 0.5,
          ease: "none",
        });
      }
      Flip.from(state, {
        absolute: true,
        scale: true,
        duration: FLIP_CLOSE_S,
        ease: "power3.inOut",
        onComplete: () => {
          // Hand the leaf back to its stylesheet, then restore the focused
          // pose the rotation controller expects: this panel was fronted, so
          // it is the focused one.
          gsap.set(leaf, {
            clearProps:
              "position,left,top,width,height,inset,margin,zIndex,transform,opacity",
          });
          gsap.set(leaf, {
            scale: FOCUSED_SCALE,
            filter: "brightness(1)",
            transformOrigin: "50% 50%",
          });
          onClosed();
        },
      });
    } else if (instant) {
      // Reduced motion closes at once, same as it opened.
      onClosed();
    } else if (rootRef.current) {
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: CROSSFADE_S,
        ease: "none",
        onComplete: onClosed,
      });
    } else {
      onClosed();
    }
  };

  // Esc closes and kills all typing timers. Tab is trapped on the close
  // control, the dialog's only tab stop; the page behind is inert.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
      } else if (e.key === "Tab") {
        e.preventDefault();
        closeButtonRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const caret = (ref: React.RefObject<HTMLSpanElement | null>) => (
    <span
      ref={ref}
      aria-hidden="true"
      className="gallery-caret ml-[1px] inline-block w-[0.5ch] translate-y-[0.08em] bg-forest-line align-baseline"
      style={{ display: "none", height: "0.92em" }}
    />
  );

  const primarySize = { fontSize: "clamp(30px, 5.2vw, 60px)", lineHeight: 1.08 };

  return createPortal(
    <div
      ref={rootRef}
      data-takeover
      role="dialog"
      aria-modal="true"
      aria-label={panelLabel(panel)}
      className="fixed inset-0 z-[60]"
    >
      {/* Click-outside closes. Transparent: the scene behind is blurred by the
          canvas itself (Recipe B), so no scrim is drawn here. */}
      <div
        data-takeover-backdrop
        onClick={requestClose}
        className="absolute inset-0"
      />
      {/* Full copy for assistive tech; the visual layers stay aria-hidden. */}
      <div className="sr-only">
        <p>{primaryText}</p>
        {sourceText ? <p>{sourceText}</p> : null}
        {secondary ? (
          <>
            <p>{secondary.stat}</p>
            <p>{secondary.source}</p>
          </>
        ) : null}
      </div>
      <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-site flex-col justify-center gap-6 px-4 md:flex-row md:items-center md:gap-12 md:px-6">
        <div
          ref={mediaSlotRef}
          data-takeover-media
          className="pointer-events-auto relative aspect-[3/4] h-[34vh] shrink-0 self-center overflow-hidden rounded-panel md:h-[min(64vh,680px)]"
        >
          {mode === "fade" ? (
            <AutoPauseVideo
              asset={asset}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
        </div>
        {/* Recipe A band: blur(24) saturate(50) over ink-35, no border, no
            shadow, no radius. Rides the detail, legible over the blurred scene. */}
        <div
          data-takeover-copy
          className="pointer-events-auto max-h-[80vh] min-w-0 flex-1 overflow-y-auto"
          style={{
            backgroundColor: "rgba(12,11,9,0.35)",
            WebkitBackdropFilter: "blur(24px) saturate(50%)",
            backdropFilter: "blur(24px) saturate(50%)",
            padding: 24,
          }}
        >
          <p className="font-display text-bone" style={{ fontSize: "clamp(20px,2.4vw,26px)" }}>
            {panel.industry}
          </p>
          {/* Primary line: ghost pre-sizes the block so nothing shifts as the
              teletype fills it. */}
          <div className="relative mt-4">
            <p aria-hidden="true" className="invisible font-display" style={primarySize}>
              {primaryText}
            </p>
            <p
              aria-hidden="true"
              className="absolute inset-0 whitespace-pre-wrap text-left font-display text-bone-hi"
              style={primarySize}
            >
              <span ref={primarySpanRef}>{instant ? primaryText : null}</span>
              {caret(caretPrimaryRef)}
            </p>
          </div>
          {sourceText ? (
            <div className="relative mt-5">
              <p aria-hidden="true" className="invisible font-mono text-sm md:text-base">
                {sourceText}
              </p>
              <p
                aria-hidden="true"
                className="absolute inset-0 whitespace-pre-wrap text-left font-mono text-sm text-bone-dim md:text-base"
              >
                <span ref={sourceSpanRef}>{instant ? sourceText : null}</span>
                {caret(caretSourceRef)}
              </p>
            </div>
          ) : null}
          {secondary ? (
            <div className="mt-6 border-t border-hairline pt-4">
              <p
                aria-hidden="true"
                className="font-display text-bone"
                style={{ fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.2 }}
              >
                {secondary.stat}
              </p>
              <p aria-hidden="true" className="mt-2 font-mono text-sm text-bone-dim">
                {secondary.source}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <button
        ref={closeButtonRef}
        type="button"
        onClick={requestClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-panel border border-hairline font-mono text-lg text-bone hover:text-bone-hi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone md:right-6 md:top-6"
      >
        x
      </button>
    </div>,
    document.body,
  );
}
