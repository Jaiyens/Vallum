import { SECTION_IDS } from "@/lib/site";
import { METHOD_COPY } from "@/src/content/sections";

// Beat 4, the method. Bone surface. Server-safe, static, no motion.
export function MethodSection() {
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="scroll-mt-14 border-t border-forest-line/30 bg-bone text-black"
    >
      <div className="mx-auto max-w-site px-4 py-section-sm md:px-6 md:py-44">
        <h2 className="max-w-3xl font-display text-3xl font-bold text-balance font-stretch-expanded md:text-5xl">
          {METHOD_COPY.heading}
        </h2>
        <div className="mt-10 max-w-2xl space-y-8 md:mt-14">
          <p className="text-lg leading-relaxed">{METHOD_COPY.people}</p>
          <p className="text-lg leading-relaxed">{METHOD_COPY.window}</p>
          <p className="text-lg leading-relaxed">{METHOD_COPY.kit}</p>
        </div>
      </div>
    </section>
  );
}
