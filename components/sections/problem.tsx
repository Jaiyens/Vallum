"use client";

import { motion } from "motion/react";
import { SECTION_IDS } from "@/lib/site";

const LINES = [
  "Robotics foundation models lack real first-person data of physical outdoor labor.",
  "Nearly all egocentric datasets are indoor and domestic.",
  "Farming, construction, solar, and oil work are unrecorded at scale.",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Problem() {
  return (
    <section
      id={SECTION_IDS.problem}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <p translate="no" className="mb-4 font-mono text-xs text-fog">section_01 / problem</p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl"
            >
              Dangerous outdoor work is the last data desert.
            </motion.h2>
          </div>
          <ul className="space-y-6 md:col-span-6 md:col-start-7 md:mt-9">
            {LINES.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="border-l-2 border-border pl-5 text-lg text-paper/85 md:text-xl"
              >
                {line}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
