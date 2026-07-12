"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// The observed element must be the unclipped wrapper: a child translated
// 110% inside overflow-hidden has zero intersection area, so whileInView on
// the child itself would never fire. Variants propagate the trigger down.
const variants: Variants = {
  hidden: { y: "115%" },
  visible: (delay: number) => ({
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

type MaskedRiseProps = {
  as?: "h2" | "p";
  delay?: number;
  amount?: number;
  className?: string;
  children: React.ReactNode;
};

export function MaskedRise({
  as = "h2",
  delay = 0,
  amount = 0.4,
  className,
  children,
}: MaskedRiseProps) {
  const Inner = as === "p" ? motion.p : motion.h2;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className="overflow-hidden"
    >
      <Inner variants={variants} custom={delay} className={className}>
        {children}
      </Inner>
    </motion.div>
  );
}
