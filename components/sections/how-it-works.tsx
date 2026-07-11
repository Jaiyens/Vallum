"use client";

import { motion } from "motion/react";
import { SECTION_IDS } from "@/lib/site";

const STEPS = [
  {
    number: "01",
    title: "Capture",
    body: "Workers wear a refurbished iPhone rig during real shifts.",
  },
  {
    number: "02",
    title: "Label",
    body: "Every clip is annotated with verb-noun actions and hand-object interactions.",
  },
  {
    number: "03",
    title: "License",
    body: "Labeled hours ship to foundation-model labs under clear consent and usage terms.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        <p translate="no" className="mb-4 font-mono text-xs text-fog">section_02 / process</p>
        <h2 className="max-w-2xl font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl">
          How it works
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-border bg-border md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              className="bg-surface p-6 md:p-8"
            >
              <span className="font-mono text-sm text-signal tabular-nums">{step.number}</span>
              <h3 className="mt-6 font-display text-xl font-bold text-paper font-stretch-expanded md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-fog">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
