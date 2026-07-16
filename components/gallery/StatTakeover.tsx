"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Flip, gsap } from "@/lib/gsap";
import { lenisRef } from "@/lib/lenis-ref";
import { AutoPauseVideo } from "@/components/media/auto-pause-video";
import { GALLERY_VIDEO } from "@/lib/assets";
import type { GalleryPanelContent } from "@/src/content/gallery";
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
import { splitNumerals, teletypeSegments, type Teletype } from "./teletype";

// Fullscreen stat takeover. Desktop morphs the clicked panel's leaf into
// the media slot with GSAP Flip; mobile and reduced motion crossfade with
// their own video element. Text never fades: the stat teletypes so every
// stat lands in about 1.2 seconds, then the source line, then p7's
// secondary. Reduced motion renders everything instantly. Green appears
// only on stat numerals.

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
  const backdropRef = useRef<HTMLDivElement>(null);
  const mediaSlotRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const statSpansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sourceSpanRef = useRef<HTMLSpanElement>(null);
  const secondarySpanRef = useRef<HTMLSpanElement>(null);
  const secondarySourceSpanRef = useRef<HTMLSpanElement>(null);
  const caretStatRef = useRef<HTMLSpanElement>(null);
  const caretSourceRef = useRef<HTMLSpanElement>(null);
  const caretSecondaryRef = useRef<HTMLSpanElement>(null);
  const caretSecondarySourceRef = useRef<HTMLSpanElement>(null);

  const teletypesRef = useRef<Teletype[]>([]);
  const timersRef = useRef<number[]>([]);
  const flipAnimRef = useRef<gsap.core.Animation | null>(null);
  const leafHomeRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const secondary = "secondary" in panel ? panel.secondary : null;
  const statParts = splitNumerals(panel.stat);

  // Scroll lock. lenis.stop() halts the inertial glide; the overflow lock
  // covers keyboard scrolling and the reduced motion mode where Lenis
  // never mounted. The padding compensates the vanished scrollbar on
  // classic-scrollbar platforms so the page never shifts mid-morph, and
  // inert takes the covered page out of the tab order while the dialog is
  // up.
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
  // preventScroll everywhere; a focus-driven scroll would drag the page or
  // the helix viewport out from under the morph.
  useEffect(() => {
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      restoreFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, []);


  const setCaret = (
    active:
      | typeof caretStatRef
      | typeof caretSourceRef
      | typeof caretSecondaryRef
      | typeof caretSecondarySourceRef
      | null,
  ) => {
    for (const ref of [
      caretStatRef,
      caretSourceRef,
      caretSecondaryRef,
      caretSecondarySourceRef,
    ]) {
      const el = ref.current;
      if (!el) continue;
      el.style.display = ref === active ? "inline-block" : "none";
    }
  };

  const startTyping = () => {
    if (instant || closingRef.current) return;
    const statSegments = statParts
      .map((part, i) => ({ el: statSpansRef.current[i], text: part.text }))
      .filter((s): s is { el: HTMLSpanElement; text: string } => s.el !== null);
    const statLen = panel.stat.length;
    const statDelay = Math.min(
      Math.max(STAT_TARGET_MS / statLen, STAT_MIN_CHAR_MS),
      STAT_MAX_CHAR_MS,
    );

    const finish = (lastCaret: typeof caretStatRef) => {
      const caret = lastCaret.current;
      if (caret) caret.setAttribute("data-done", "");
      timersRef.current.push(
        window.setTimeout(() => {
          caret?.setAttribute("data-hidden", "");
        }, CARET_HIDE_DELAY_MS),
      );
    };

    const typeSecondarySource = () => {
      const el = secondarySourceSpanRef.current;
      if (!el || !secondary) return finish(caretSecondaryRef);
      setCaret(caretSecondarySourceRef);
      teletypesRef.current.push(
        teletypeSegments([{ el, text: secondary.source }], () => SOURCE_CHAR_MS, () =>
          finish(caretSecondarySourceRef),
        ),
      );
    };
    const typeSecondary = () => {
      const el = secondarySpanRef.current;
      if (!el || !secondary) return finish(caretSourceRef);
      setCaret(caretSecondaryRef);
      teletypesRef.current.push(
        teletypeSegments([{ el, text: secondary.stat }], () => SOURCE_CHAR_MS, typeSecondarySource),
      );
    };
    const typeSource = () => {
      const el = sourceSpanRef.current;
      if (!el) return;
      setCaret(caretSourceRef);
      teletypesRef.current.push(
        teletypeSegments([{ el, text: panel.source }], () => SOURCE_CHAR_MS, () => {
          if (secondary) typeSecondary();
          else finish(caretSourceRef);
        }),
      );
    };

    setCaret(caretStatRef);
    teletypesRef.current.push(
      teletypeSegments(statSegments, () => statDelay, typeSource),
    );
  };

  // Entrance: Flip morph or crossfade, then the teletype sequence.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (mode === "flip" && leaf && mediaSlotRef.current) {
      leafHomeRef.current = leaf.parentElement;
      const state = Flip.getState(leaf);
      mediaSlotRef.current.appendChild(leaf);
      // Drop the focused 1.04 scale so the morph lands on the slot exactly;
      // the close path restores it.
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
      gsap.from(backdropRef.current, { opacity: 0, duration: 0.3, ease: "none" });
    } else {
      // Reduced motion still gets this opacity-only crossfade per the
      // spec; only the typing is skipped (startTyping no-ops on instant).
      gsap.from(root, {
        opacity: 0,
        duration: CROSSFADE_S,
        ease: "none",
        onComplete: startTyping,
      });
    }

    return () => {
      teletypesRef.current.forEach((t) => t.cancel());
      teletypesRef.current = [];
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      flipAnimRef.current?.kill();
      flipAnimRef.current = null;
      // If the leaf is still ours (StrictMode double-run, breakpoint or
      // motion-preference unmount while open), return it home so the panel
      // never loses its video.
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
      gsap.to(backdropRef.current, { opacity: 0, duration: FLIP_CLOSE_S, ease: "none" });
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
          // pose the rotation controller expects: this panel was fronted,
          // so it is the focused one.
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

  const caret = (ref: React.RefObject<HTMLSpanElement | null>, heightEm = 1) => (
    <span
      ref={ref}
      aria-hidden="true"
      className="gallery-caret w-[0.6ch] translate-y-[0.12em] bg-green-signal"
      style={{ display: "none", height: `${heightEm}em` }}
    />
  );

  return createPortal(
    <div
      ref={rootRef}
      data-takeover
      role="dialog"
      aria-modal="true"
      aria-label={`${panel.industry}. ${panel.stat}`}
      className="fixed inset-0 z-[60]"
    >
      <div
        ref={backdropRef}
        data-takeover-backdrop
        onClick={requestClose}
        className="absolute inset-0 bg-black-raise/[0.92]"
      />
      {/* Full copy for assistive tech. The visual layers stay aria-hidden
          through and after the teletype churn; this block is the readable
          record, sources included. */}
      <div className="sr-only">
        <p>{panel.stat}</p>
        <p>{panel.source}</p>
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
        <div
          className="pointer-events-auto max-h-[80vh] min-w-0 flex-1 overflow-y-auto"
          data-takeover-copy
        >
          {/* Stat headline: ghost pre-sizes the block so nothing shifts as
              the teletype fills the overlay. */}
          <div className="relative">
            <p
              aria-hidden="true"
              className="invisible font-display font-bold font-stretch-expanded"
              style={{ fontSize: "clamp(30px, 6.5vw, 88px)", lineHeight: 1.06 }}
            >
              {panel.stat}
            </p>
            <p
              aria-hidden="true"
              className="absolute inset-0 whitespace-pre-wrap text-left font-display font-bold font-stretch-expanded text-bone-hi"
              style={{ fontSize: "clamp(30px, 6.5vw, 88px)", lineHeight: 1.06 }}
            >
              {statParts.map((part, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    statSpansRef.current[i] = el;
                  }}
                  className={part.numeral ? "text-green-signal" : undefined}
                >
                  {instant ? part.text : null}
                </span>
              ))}
              {caret(caretStatRef)}
            </p>
          </div>
          {/* Source line. */}
          <div className="relative mt-5">
            <p aria-hidden="true" className="invisible font-mono text-sm md:text-base">
              {panel.source}
            </p>
            <p
              aria-hidden="true"
              className="absolute inset-0 whitespace-pre-wrap text-left font-mono text-sm text-bone-dim md:text-base"
            >
              <span ref={sourceSpanRef}>{instant ? panel.source : null}</span>
              {caret(caretSourceRef)}
            </p>
          </div>
          {secondary ? (
            <>
              <div className="relative mt-6">
                <p aria-hidden="true" className="invisible text-base md:text-lg">
                  {secondary.stat}
                </p>
                <p
                  aria-hidden="true"
                  className="absolute inset-0 whitespace-pre-wrap text-left text-base text-bone md:text-lg"
                >
                  <span ref={secondarySpanRef}>{instant ? secondary.stat : null}</span>
                  {caret(caretSecondaryRef)}
                </p>
              </div>
              <div className="relative mt-2">
                <p aria-hidden="true" className="invisible font-mono text-sm md:text-base">
                  {secondary.source}
                </p>
                <p
                  aria-hidden="true"
                  className="absolute inset-0 whitespace-pre-wrap text-left font-mono text-sm text-bone-dim md:text-base"
                >
                  <span ref={secondarySourceSpanRef}>
                    {instant ? secondary.source : null}
                  </span>
                  {caret(caretSecondarySourceRef)}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <button
        ref={closeButtonRef}
        type="button"
        onClick={requestClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-panel border border-hairline font-mono text-lg text-bone hover:text-bone-hi md:right-6 md:top-6"
      >
        x
      </button>
    </div>,
    document.body,
  );
}
