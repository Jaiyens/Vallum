"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SECTION_IDS } from "@/lib/site";
import { MaskedRise } from "@/components/motion/masked-rise";
import { Badge } from "@/components/ui/badge";

const PRODUCTS = [
  {
    index: "product_01",
    title: "Golden training hours",
    body: "Curated, fully labeled first-person footage of a specific work type.",
  },
  {
    index: "product_02",
    title: "Seed licenses",
    body: "Early-access sample sets for labs evaluating the data.",
  },
  {
    index: "product_03",
    title: "Sealed evaluation benchmark",
    body: "A held-out set that is never trained on, for measuring real-world model performance.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Products() {
  return (
    <section
      id={SECTION_IDS.products}
      className="scroll-mt-14 py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        <div className="mb-4">
          <Badge
            variant="outline"
            translate="no"
            className="rounded-panel border-border bg-surface/40 font-mono font-normal text-fog"
          >
            section_04 / products
          </Badge>
        </div>
        <MaskedRise className="max-w-3xl font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl">
          Data products
        </MaskedRise>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 300, damping: 24 },
              }}
              className="group h-full"
            >
              <Card className="h-full rounded-panel border border-border bg-surface ring-0 transition-colors duration-300 group-hover:border-paper/30">
                <CardHeader>
                  <p
                    translate="no"
                    className="font-mono text-xs text-fog transition-colors duration-300 tabular-nums group-hover:text-signal"
                  >
                    {product.index}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-bold text-balance text-paper font-stretch-expanded md:text-2xl">
                    {product.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-fog">{product.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
