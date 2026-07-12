"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { SECTION_IDS } from "@/lib/site";
import { MaskedRise } from "@/components/motion/masked-rise";

const EASE = [0.22, 1, 0.36, 1] as const;

// Counts up once when scrolled into view. Renders the final value on the
// server so no-JS and reduced-motion users always see the real number.
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView || reduced || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toLocaleString("en-US");
        }
      },
    });
    return () => controls.stop();
  }, [inView, reduced, to]);
  return <span ref={ref}>{to.toLocaleString("en-US")}</span>;
}

export function Proof() {
  return (
    <section
      id={SECTION_IDS.proof}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        <p translate="no" className="mb-4 font-mono text-xs text-fog">section_05 / audience</p>
        <MaskedRise className="max-w-3xl font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl">
          Built for the labs teaching robots to work.
        </MaskedRise>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-12"
        >
          <p translate="no" className="font-mono text-xs text-fog">
            intended_audience, not customers
          </p>
          <p className="mt-2 max-w-2xl text-lg text-paper/85 md:text-xl">
            Designed for teams like{" "}
            <span translate="no">1X, Generalist AI, NVIDIA GEAR, Mecka, and Encord</span>.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="rounded-panel border border-border bg-surface p-6 md:col-span-5 md:p-8"
          >
            <p className="font-mono text-sm leading-relaxed text-paper/85">
              Public egocentric datasets like Ego4D reached{" "}
              <span className="text-signal tabular-nums">
                <CountUp to={3670} />
                &nbsp;hours
              </span>{" "}
              across <span className="text-signal tabular-nums">9&nbsp;countries</span>.
              Almost none of it is dangerous outdoor work.
            </p>
            <p translate="no" className="mt-6 font-mono text-xs text-fog">
              source: Ego4D dataset, Grauman et al.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="border-l-2 border-border pl-5 md:col-span-7 md:pl-6"
          >
            <p className="leading-relaxed text-fog">
              Robots will take on the most dangerous outdoor jobs. They cannot learn work no
              one has recorded. So I am building the dataset I wish already existed, one real
              shift at a time. Vallum is early and pre-revenue, and I would rather say that
              plainly. If you train robots for the physical world, I want to hear from you.
            </p>
            <p className="mt-4 font-mono text-sm text-fog">Jay, founder</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
