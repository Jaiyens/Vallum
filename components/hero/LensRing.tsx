// Lens ring and readout. Positioned by the same CSS variables that drive
// the reveal mask, so the ring and the revealed circle can never desync.
// The readout text is written imperatively from the video clock; it maps
// currentTime to the cutlist blocks in readout-map.ts.
export function LensRing() {
  return (
    <div
      data-lens-ring
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-10 hidden size-[180px] rounded-full border-[1.5px] border-green-signal bg-green-deep/[0.08] opacity-0 lg:block"
      style={{
        transform:
          "translate3d(calc(var(--lx) - 90px), calc(var(--ly) - 90px), 0)",
      }}
    >
      <span className="absolute top-1/2 left-[-1px] h-px w-2 -translate-y-1/2 bg-green-signal" />
      <span className="absolute top-1/2 right-[-1px] h-px w-2 -translate-y-1/2 bg-green-signal" />
      <span
        data-lens-readout
        className="absolute right-0 -bottom-6 translate-x-1/3 font-mono text-[11px] tracking-wider whitespace-nowrap text-mono-anno"
      />
    </div>
  );
}
