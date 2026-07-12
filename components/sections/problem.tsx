"use client";

import { SECTION_IDS } from "@/lib/site";
import { MaskedRise } from "@/components/motion/masked-rise";

const LINES = [
  "Robotics foundation models lack real first-person data of physical outdoor labor.",
  "Nearly all egocentric datasets are indoor and domestic.",
  "Farming, construction, solar, and oil work are unrecorded at scale.",
];


export function Problem() {
  return (
    <section
      id={SECTION_IDS.problem}
      className="scroll-mt-14 py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <p translate="no" className="mb-4 font-mono text-xs text-fog">
              section_01 / problem
            </p>
            <MaskedRise className="font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl">
              Dangerous outdoor work is the last data desert.
            </MaskedRise>
          </div>
          <ul className="space-y-6 md:col-span-6 md:col-start-7 md:mt-9">
            {LINES.map((line, i) => (
              <li key={line} className="border-l-2 border-border pl-5">
                <MaskedRise
                  as="p"
                  delay={i * 0.12}
                  amount={0.5}
                  className="text-lg text-paper/85 md:text-xl"
                >
                  {line}
                </MaskedRise>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
