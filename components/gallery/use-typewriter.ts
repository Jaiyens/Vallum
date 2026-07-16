"use client";

import { useEffect, useRef, type RefObject } from "react";
import { GALLERY_CENTERPIECE } from "@/src/content/gallery";
import {
  BACKSPACE_MS,
  HOLD_MS,
  PUNCT_PAUSE_MS,
  TYPE_JITTER_MS,
  TYPE_MIN_MS,
} from "./gallery-config";

export type TypewriterHandle = { pause(): void; resume(): void };

type Phase = "typing" | "holding" | "deleting";

// The centerpiece state machine: type stem plus line one, hold, backspace
// to the stem, type the next line, loop forever. One setTimeout is pending
// at any moment; pause is a single clearTimeout and the machine's position
// survives in refs, so resume picks up exactly where it left off. Pausing
// stacks (takeover open plus hidden tab both hold it), and only the last
// resume restarts the chain.
export function useTypewriter(
  textRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): RefObject<TypewriterHandle> {
  const handleRef = useRef<TypewriterHandle>({ pause() {}, resume() {} });

  useEffect(() => {
    if (!enabled) return;
    const el = textRef.current;
    if (!el) return;

    const { stem, lines } = GALLERY_CENTERPIECE;
    const machine = { line: 0, char: 0, phase: "typing" as Phase };
    let timer: number | null = null;
    // A tab already hidden at mount starts paused; the visibilitychange
    // handler releases the hold on first reveal.
    let holds = document.visibilityState === "hidden" ? 1 : 0;
    let dead = false;

    const write = (text: string) => {
      el.textContent = text;
    };

    const schedule = (ms: number) => {
      timer = window.setTimeout(step, ms);
    };

    const keyDelay = (justTyped: string) => {
      const base = TYPE_MIN_MS + Math.random() * TYPE_JITTER_MS;
      return justTyped === "." || justTyped === "," ? base + PUNCT_PAUSE_MS : base;
    };

    const step = () => {
      if (dead || holds > 0) return;
      const target = stem + lines[machine.line];
      if (machine.phase === "typing") {
        if (machine.char < target.length) {
          machine.char += 1;
          write(target.slice(0, machine.char));
          schedule(keyDelay(target[machine.char - 1]));
        } else {
          machine.phase = "holding";
          schedule(HOLD_MS);
        }
      } else if (machine.phase === "holding") {
        machine.phase = "deleting";
        schedule(BACKSPACE_MS);
      } else {
        if (machine.char > stem.length) {
          machine.char -= 1;
          write(target.slice(0, machine.char));
          schedule(BACKSPACE_MS);
        } else {
          machine.line = (machine.line + 1) % lines.length;
          machine.phase = "typing";
          schedule(TYPE_MIN_MS);
        }
      }
    };

    const pause = () => {
      holds += 1;
      if (timer !== null) clearTimeout(timer);
      timer = null;
    };
    const resume = () => {
      holds = Math.max(0, holds - 1);
      if (holds === 0 && !dead && timer === null) step();
    };
    handleRef.current = { pause, resume };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") pause();
      else resume();
    };
    document.addEventListener("visibilitychange", onVisibility);

    step();

    return () => {
      dead = true;
      if (timer !== null) clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      handleRef.current = { pause() {}, resume() {} };
    };
  }, [textRef, enabled]);

  return handleRef;
}
