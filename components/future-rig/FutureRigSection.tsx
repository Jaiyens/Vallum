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
import { CALLOUTS, CLUSTERS, SECTION_COPY, VIEWBOX, type Callout } from "./callouts";
import { SECTION_IDS } from "@/lib/site";

const pct = (y: number) => `${((y / VIEWBOX.h) * 100).toFixed(2)}%`;

function LabelBlock({ c }: { c: Callout }) {
  const side = c.label.side;
  return (
    <div
      className={`rig-label absolute w-[21%] -translate-y-1/2 ${
        side === "left" ? "left-0 pr-3 text-right" : "right-0 pl-3 text-left"
      }`}
      data-cluster={c.cluster}
      style={{ top: pct(c.label.y) }}
    >
      <p className="text-sm leading-tight font-semibold text-paper">{c.name}</p>
      <p className="mt-1 text-xs leading-snug text-fog">{c.support}</p>
    </div>
  );
}

export function FutureRigSection() {
  const root = useRef<HTMLElement>(null);
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
        // Scrubbed explode. Progress 0 when the section top meets the viewport
        // bottom, progress 1 when the section center meets the viewport center.
        // container is omitted on purpose: it defaults to the window scroll,
        // which is what Lenis drives.
        const tl = createTimeline({
          defaults: { ease: "inOutQuad" },
          autoplay: onScroll({
            target: root.current!,
            enter: "bottom top",
            leave: "center center",
            sync: true,
          }),
        });

        let pos = 0;
        for (const { key } of CLUSTERS) {
          const parts = CALLOUTS.filter((c) => c.cluster === key);
          parts.forEach((c, i) => {
            tl.add(
              `#${c.id}`,
              {
                translateX: [`${-c.explode.dx}px`, "0px"],
                translateY: [`${-c.explode.dy}px`, "0px"],
                duration: 600,
              },
              pos + i * 60,
            );
          });
          tl.add(
            svg.createDrawable(`.leader-line[data-cluster="${key}"]`),
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
        tl.add(
          ".return-line",
          { opacity: [0, 1], duration: 300, delay: stagger(30) },
          pos - 200,
        );
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

        {/* desktop: schematic canvas with overlaid label columns */}
        <div className="relative mt-14 hidden aspect-[1200/680] lg:block">
          <div className="absolute inset-0">
            <RigSchematic />
          </div>
          {/* cluster tags */}
          <p className="absolute left-0 font-mono text-xs text-fog" style={{ top: pct(62) }}>
            Sensing
          </p>
          <p className="absolute right-0 font-mono text-xs text-fog" style={{ top: pct(62) }}>
            Trust
          </p>
          <p className="absolute right-0 font-mono text-xs text-fog" style={{ top: pct(382) }}>
            Endurance
          </p>
          {CALLOUTS.map((c) => (
            <LabelBlock key={c.id} c={c} />
          ))}
          <p
            translate="no"
            className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[11px] text-fog/80"
          >
            {SECTION_COPY.caption}
          </p>
        </div>

        {/* tablet and mobile: static exploded schematic, then a plain list */}
        <div className="mt-12 lg:hidden">
          <div className="mx-auto aspect-[740/600] max-w-xl">
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
