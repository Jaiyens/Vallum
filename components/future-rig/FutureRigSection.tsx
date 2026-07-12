"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  createScope,
  createTimeline,
  onScroll,
  stagger,
  svg,
  utils,
  type Scope,
} from "animejs";
import { MaskedRise } from "@/components/motion/masked-rise";
import { RigSchematic } from "./RigSchematic";
import {
  CALLOUTS,
  CLUSTERS,
  MOVERS,
  SECTION_COPY,
  VIEWBOX,
  type Callout,
} from "./callouts";
import { SECTION_IDS } from "@/lib/site";

const pct = (y: number) => `${((y / VIEWBOX.h) * 100).toFixed(2)}%`;

function LabelBlock({ c }: { c: Callout }) {
  return (
    <div
      className={`rig-label absolute inset-x-0 -translate-y-1/2 ${
        c.label.side === "left" ? "text-right" : "text-left"
      }`}
      data-cluster={c.cluster}
      style={{ top: pct(c.label.y) }}
    >
      <p className="text-sm leading-tight font-semibold text-paper">{c.name}</p>
      <p className="mt-1 text-[11px] leading-snug text-fog">{c.support}</p>
    </div>
  );
}

export function FutureRigSection() {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    scope.current = createScope({
      root,
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isDesktop: "(min-width: 1024px)",
      },
    }).add((self) => {
      if (!self) return;
      const matches = self.matches as { reduceMotion: boolean; isDesktop: boolean };
      // The markup is authored in the final exploded state, so reduced motion
      // needs no work at all. Skip every animation.
      if (matches.reduceMotion) return;

      if (matches.isDesktop) {
        // Children of an anime timeline keep their natural (authored, final)
        // state until their tween starts, so hide the reveal targets up
        // front. utils.set registers with the scope and reverts cleanly.
        const drawables = new Map(
          CLUSTERS.map(({ key }) => [
            key,
            svg.createDrawable(`.leader-line[data-cluster="${key}"]`),
          ]),
        );
        for (const [, d] of drawables) utils.set(d, { draw: "0 0" });
        utils.set(".rig-label", { opacity: 0, translateY: "0.75rem" });
        utils.set(".leader-dot", { opacity: 0 });
        for (const m of MOVERS) {
          utils.set(`#${m.id}`, {
            translateX: `${m.from.x}px`,
            translateY: `${m.from.y}px`,
          });
        }

        // Scrubbed explode keyed to the canvas, not the tall section, so the
        // whole assembled-to-exploded arc plays while the drawing is on
        // screen. container is omitted on purpose: it defaults to the window
        // scroll, which is what Lenis drives.
        const tl = createTimeline({
          defaults: { ease: "inOutQuad" },
          autoplay: onScroll({
            target: canvasRef.current ?? root.current!,
            enter: "bottom top",
            leave: "top top",
            sync: true,
          }),
        });

        // hold the assembled unit while it rides into view; the explode
        // starts once the canvas is nearly fully on screen
        let pos = 1600;
        for (const { key } of CLUSTERS) {
          const movers = MOVERS.filter((m) => m.cluster === key);
          movers.forEach((m, i) => {
            tl.add(
              `#${m.id}`,
              {
                translateX: [`${m.from.x}px`, "0px"],
                translateY: [`${m.from.y}px`, "0px"],
                duration: 600,
              },
              pos + i * 60,
            );
          });
          tl.add(
            drawables.get(key)!,
            { draw: ["0 0", "0 1"], duration: 500, delay: stagger(60) },
            pos + 320,
          );
          tl.add(
            `.leader-dot[data-cluster="${key}"]`,
            { opacity: [0, 1], duration: 150, delay: stagger(60) },
            pos + 320,
          );
          tl.add(
            `.rig-label[data-cluster="${key}"]`,
            {
              opacity: [0, 1],
              translateY: ["0.75rem", "0rem"],
              duration: 400,
              delay: stagger(60),
            },
            pos + 480,
          );
          pos += 640;
        }
      } else {
        // Stacked layouts get a light staggered fade on enter. Set the hidden
        // state only now, so no JS or reduced motion always shows the list.
        utils.set(".rig-callout-item", { opacity: 0, translateY: "1rem" });
        animate(".rig-callout-item", {
          opacity: [0, 1],
          translateY: ["1rem", "0rem"],
          duration: 500,
          ease: "outQuad",
          delay: stagger(60),
          autoplay: onScroll({
            target: listRef.current ?? root.current!,
            enter: "bottom top+=80",
          }),
        });
      }
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <section
      ref={root}
      id={SECTION_IDS.rig}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        {/* header */}
        <p className="mb-4 inline-flex items-center gap-2 rounded-panel border border-border px-2.5 py-1 font-mono text-xs text-paper/90">
          <span aria-hidden="true" className="size-1.5 bg-hazard" />
          {SECTION_COPY.eyebrow}
        </p>
        <MaskedRise className="max-w-3xl font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl">
          {SECTION_COPY.headline}
        </MaskedRise>
        <p className="mt-4 max-w-xl text-lg text-fog">{SECTION_COPY.subline}</p>
        <p className="mt-2 max-w-xl text-sm text-fog">{SECTION_COPY.bridge}</p>

        {/* desktop: label column, schematic canvas, label column */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-[220px_minmax(0,1fr)_220px] lg:gap-6">
          <div className="relative">
            <p className="absolute inset-x-0 -top-7 text-right font-mono text-xs text-fog">
              Sensing
            </p>
            {CALLOUTS.filter((c) => c.label.side === "left").map((c) => (
              <LabelBlock key={c.id} c={c} />
            ))}
          </div>
          <div ref={canvasRef} className="relative aspect-[1200/680]">
            <RigSchematic />
            <p
              translate="no"
              className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[11px] text-fog/80"
            >
              {SECTION_COPY.caption}
            </p>
          </div>
          <div className="relative">
            <p className="absolute inset-x-0 -top-7 font-mono text-xs text-fog">Trust</p>
            <p className="absolute inset-x-0 font-mono text-xs text-fog" style={{ top: pct(390) }}>
              Endurance
            </p>
            {CALLOUTS.filter((c) => c.label.side === "right").map((c) => (
              <LabelBlock key={c.id} c={c} />
            ))}
          </div>
        </div>

        {/* tablet and mobile: static exploded schematic, then a plain list */}
        <div className="mt-12 lg:hidden">
          <div className="mx-auto aspect-[1130/600] max-w-xl">
            <RigSchematic compact />
          </div>
          <p
            translate="no"
            className="mt-2 text-center font-mono text-[11px] text-fog/80"
          >
            {SECTION_COPY.caption}
          </p>
          <div ref={listRef} className="mt-10 space-y-10">
            {CLUSTERS.map((cluster) => (
              <div key={cluster.key}>
                <p className="mb-4 font-mono text-xs text-fog">{cluster.label}</p>
                <ul className="space-y-5">
                  {CALLOUTS.filter((c) => c.cluster === cluster.key).map((c) => (
                    <li key={c.id} className="rig-callout-item border-l-2 border-border pl-4">
                      <p className="text-sm font-semibold text-paper">{c.name}</p>
                      <p className="mt-1 text-sm text-fog">{c.support}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
