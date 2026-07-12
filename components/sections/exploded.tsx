"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { RIG_PARTS } from "@/lib/assets";
import { SECTION_IDS } from "@/lib/site";
import { MaskedRise } from "@/components/motion/masked-rise";

// Vertical explode factors: fraction of the available half-height each part
// travels from the stacked center. Order matches RIG_PARTS (top to bottom).
const EXPLODE: Record<string, { factor: number; x: number }> = {
  "hard-hat-mount": { factor: -1, x: 0 },
  "head-strap": { factor: -0.6, x: 0 },
  iphone: { factor: -0.2, x: 0 },
  "phone-clamp": { factor: 0.2, x: 0 },
  cable: { factor: 0.6, x: 36 },
  "chest-harness": { factor: 1, x: 0 },
};

export function Exploded() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const area = scope.current?.querySelector<HTMLElement>('[data-rig="explode-area"]');
      const anchor = scope.current?.querySelector<HTMLElement>('[data-rig="anchor"]');
      if (!area || !anchor) return;

      const dist = () =>
        Math.max(area.clientHeight / 2 - anchor.clientHeight / 2 - 16, 90);

      const mm = gsap.matchMedia(scope);
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "+=160%",
            pin: '[data-rig="stage"]',
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        RIG_PARTS.forEach((part, i) => {
          const { factor, x } = EXPLODE[part.id];
          tl.to(
            `[data-rig-layer="${part.id}"]`,
            { y: () => factor * dist(), x, duration: 0.4, ease: "power2.inOut" },
            i * 0.05,
          );
        });
        tl.to("[data-rig-line]", { scaleX: 1, stagger: 0.04, duration: 0.2 }, 0.42)
          .to("[data-rig-label]", { autoAlpha: 1, stagger: 0.04, duration: 0.15 }, 0.55)
          .to({}, { duration: 0.3 }, 0.7); // hold the exploded state before unpin
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        // static final state, no pin, no scrub; re-applied on resize since
        // nothing else recomputes these one-shot sets
        const apply = () => {
          RIG_PARTS.forEach((part) => {
            const { factor, x } = EXPLODE[part.id];
            gsap.set(`[data-rig-layer="${part.id}"]`, { y: factor * dist(), x });
          });
          gsap.set("[data-rig-line]", { scaleX: 1 });
          gsap.set("[data-rig-label]", { autoAlpha: 1 });
        };
        apply();
        window.addEventListener("resize", apply);
        return () => window.removeEventListener("resize", apply);
      });
    },
    { scope },
  );

  return (
    <section ref={scope} id={SECTION_IDS.rig} className="scroll-mt-14 border-t border-border">
      <div data-rig="stage" className="flex h-svh flex-col overflow-hidden">
        <div className="mx-auto grid w-full max-w-site flex-1 grid-cols-1 gap-6 px-4 pt-20 pb-8 md:grid-cols-2 md:px-6 md:pt-24">
          <div className="md:self-center">
            <p translate="no" className="mb-4 font-mono text-xs text-fog">section_03 / hardware</p>
            <MaskedRise className="font-display text-4xl font-bold text-balance text-paper font-stretch-expanded md:text-6xl">
              The rig is deliberately boring.
            </MaskedRise>
            <p className="mt-5 max-w-md text-fog md:text-lg">
              Refurbished iPhone 12 and newer. Head strap or chest harness. A cable. A hard
              hat mount for construction. Nothing exotic, so anyone can wear it on a real
              job.
            </p>
          </div>
          <div data-rig="explode-area" className="relative grid min-h-0 place-items-center">
            <div
              data-rig="anchor"
              className="relative aspect-[4/3] w-[min(56vw,180px)] md:w-[min(24vw,280px)]"
            >
              {RIG_PARTS.map((part, i) => (
                <div
                  key={part.id}
                  data-rig-layer={part.id}
                  style={{ zIndex: RIG_PARTS.length - i }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={part.src}
                    alt={part.label}
                    width={part.w}
                    height={part.h}
                    className="h-full w-full rounded-panel border border-border object-cover"
                  />
                  <span
                    data-rig-line
                    aria-hidden="true"
                    className="absolute top-1/2 left-full hidden h-px w-10 origin-left scale-x-0 bg-signal/60 md:block"
                  />
                  <span
                    data-rig-label
                    className="absolute top-1/2 left-[calc(100%+3rem)] hidden -translate-y-1/2 font-mono text-xs whitespace-nowrap text-fog opacity-0 md:block"
                  >
                    {part.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* mobile part list; the per-layer labels are desktop-only */}
        <p translate="no" className="px-4 pb-5 text-center font-mono text-[11px] text-fog md:hidden">
          hard_hat_mount · head_strap · iphone · phone_clamp · cable · chest_harness
        </p>
      </div>
    </section>
  );
}
