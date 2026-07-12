const TOKENS = [
  "verb: cut",
  "verb: dig",
  "verb: carry",
  "verb: climb",
  "verb: weld",
  "verb: prune",
  "noun: shears",
  "left_hand",
  "right_hand",
  "object_type: tool",
  "state_transition: remove",
  "pnr_frame",
  "time_to_contact",
];

// Continuous strip of real annotation vocabulary. Pure CSS keyframes on
// transform; frozen under prefers-reduced-motion via globals.css.
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      translate="no"
      className="overflow-hidden border-y border-border bg-surface/60 py-3"
    >
      <div className="marquee-track flex">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-8 pr-8 font-mono text-xs whitespace-nowrap text-fog"
          >
            {TOKENS.map((token) => (
              <span key={token} className="flex items-center gap-8">
                <span>{token}</span>
                <span className="size-1 bg-hazard/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
