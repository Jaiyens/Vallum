"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SECTION_IDS } from "@/lib/site";
import { GALLERY_PANELS } from "@/src/content/gallery";
import { createHelixController, type HelixController } from "./helix-rotation";
import { useTypewriter } from "./use-typewriter";
import { HelixStage } from "./HelixStage";
import { MobileGallery } from "./MobileGallery";
import { ReducedGallery } from "./ReducedGallery";
import { StatTakeover } from "./StatTakeover";
import { ROTATE_TO_FRONT_S, STEP_DEG } from "./gallery-config";

type Mode = "helix" | "mobile" | "reduced";

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function computeMode(): Mode {
  if (window.matchMedia(REDUCED_QUERY).matches) return "reduced";
  return window.matchMedia(DESKTOP_QUERY).matches ? "helix" : "mobile";
}

// The problem section. The centerpiece is its only heading; there is no
// eyebrow. Renders one of three modes and owns the takeover state. Click
// and breakpoint events are the only React state here; per-frame values
// live in the rotation controller and never touch React.
export function GallerySection() {
  const [mode, setMode] = useState<Mode>(computeMode);
  const [openPanel, setOpenPanel] = useState<{
    index: number;
    leaf: HTMLElement | null;
  } | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);
  const centerRootRef = useRef<HTMLDivElement | null>(null);
  const centerTextRef = useRef<HTMLSpanElement | null>(null);
  const leavesRef = useRef<(HTMLDivElement | null)[]>([]);
  const controllerRef = useRef<HelixController | null>(null);
  // Synchronous re-entry lock for the fronting window: openIndex only
  // flips in the rotateTo onComplete 0.35s after the click, and a second
  // click in that window would otherwise pause the typewriter twice while
  // close resumes it once, freezing it forever.
  const openingRef = useRef(false);

  const typingRef = useTypewriter(centerTextRef, mode === "helix");

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reduced = window.matchMedia(REDUCED_QUERY);
    const update = () => {
      setMode(computeMode());
      setOpenPanel(null);
    };
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (mode !== "helix") return;
    const stage = stageRef.current;
    const ring = ringRef.current;
    const proxy = proxyRef.current;
    const centerpiece = centerRootRef.current;
    if (!stage || !ring || !proxy || !centerpiece) return;
    const panels: { root: HTMLElement; leaf: HTMLElement }[] = [];
    for (const leaf of leavesRef.current) {
      const root = leaf?.closest<HTMLElement>("[data-panel]");
      if (leaf && root) panels.push({ root, leaf });
    }
    if (panels.length !== GALLERY_PANELS.length) return;

    const controller = createHelixController({ stage, ring, centerpiece, proxy, panels });
    controllerRef.current = controller;
    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, [mode]);

  const registerLeaf = useCallback((index: number, el: HTMLDivElement | null) => {
    leavesRef.current[index] = el;
  }, []);

  const openTakeover = useCallback(
    (index: number) => {
      if (index < 0 || openPanel !== null || openingRef.current) return;
      const controller = controllerRef.current;
      if (mode === "helix" && controller) {
        openingRef.current = true;
        typingRef.current.pause();
        // Front the clicked panel first: Flip records a flat box, so a
        // hard-rotated pose would snap flat mid-morph. At yaw zero the
        // morph is clean, and the fronting reads as choreography.
        controller.rotateTo(-index * STEP_DEG, {
          duration: ROTATE_TO_FRONT_S,
          onComplete: () => {
            openingRef.current = false;
            controller.suspend();
            setOpenPanel({ index, leaf: leavesRef.current[index] ?? null });
          },
          // A press on the stage during the fronting kills the tween; the
          // click is abandoned, so the pause must unwind with it.
          onInterrupt: () => {
            if (openingRef.current) {
              openingRef.current = false;
              typingRef.current.resume();
            }
          },
        });
      } else {
        setOpenPanel({ index, leaf: null });
      }
    },
    [mode, openPanel, typingRef],
  );

  const handleClosed = useCallback(() => {
    setOpenPanel(null);
    if (mode === "helix") {
      controllerRef.current?.release();
      typingRef.current.resume();
    }
  }, [mode, typingRef]);

  return (
    <section
      id={SECTION_IDS.problem}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        {mode === "helix" ? (
          <HelixStage
            stageRef={stageRef}
            ringRef={ringRef}
            proxyRef={proxyRef}
            centerRootRef={centerRootRef}
            centerTextRef={centerTextRef}
            onOpen={openTakeover}
            registerLeaf={registerLeaf}
          />
        ) : mode === "mobile" ? (
          <MobileGallery onOpen={openTakeover} />
        ) : (
          <ReducedGallery onOpen={openTakeover} />
        )}
      </div>
      {openPanel !== null ? (
        <StatTakeover
          panel={GALLERY_PANELS[openPanel.index]}
          mode={mode === "helix" ? "flip" : "fade"}
          instant={mode === "reduced"}
          leaf={openPanel.leaf}
          onClosed={handleClosed}
        />
      ) : null}
    </section>
  );
}
