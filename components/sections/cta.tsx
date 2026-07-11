"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { CAL_COM_LINK, CONTACT_EMAIL, SECTION_IDS } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Cta() {
  return (
    <section
      id={SECTION_IDS.contact}
      className="scroll-mt-14 border-t border-border py-section-sm md:py-section"
    >
      <div className="mx-auto max-w-site px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p translate="no" className="mb-4 font-mono text-xs text-fog">section_06 / contact</p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-3xl font-display text-3xl font-bold text-balance text-paper font-stretch-expanded md:text-5xl"
          >
            If you are training robots for the physical world, let’s talk.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-10"
          >
            <Button asChild className="h-11 px-6 text-base">
              <a href={CAL_COM_LINK} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-6"
          >
            <Button asChild variant="outline" className="h-11 px-6">
              <a href={`mailto:${CONTACT_EMAIL}?subject=Vallum%20intro`}>
                Intro by email
              </a>
            </Button>
            <p className="mt-4 font-mono text-xs text-fog">
              No list. No sequence. A person reads this.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
