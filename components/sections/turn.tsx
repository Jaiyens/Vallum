import { TURN_COPY } from "@/src/content/sections";

// Beat 3, the turn. The last dark beat is the helix above; from here the
// page is bone and stays light. Server-safe, static, no motion.
export function TurnSection() {
  return (
    <section className="bg-bone text-black">
      <div className="mx-auto max-w-site px-4 py-section-sm md:px-6 md:py-44">
        <h2 className="max-w-3xl font-display text-3xl font-bold text-balance font-stretch-expanded md:text-5xl">
          {TURN_COPY.heading}
        </h2>
        <div className="mt-10 max-w-2xl space-y-8 md:mt-14">
          <div>
            <p className="text-lg leading-relaxed">{TURN_COPY.lead}</p>
            <p className="mt-2 font-mono text-xs text-forest-line">
              {TURN_COPY.leadSource}
            </p>
          </div>
          <div>
            <p className="text-lg leading-relaxed">{TURN_COPY.indoor}</p>
            <p className="mt-2 font-mono text-xs text-forest-line">
              {TURN_COPY.indoorSource}
            </p>
          </div>
          <p className="text-lg leading-relaxed">{TURN_COPY.turn}</p>
        </div>
      </div>
    </section>
  );
}
