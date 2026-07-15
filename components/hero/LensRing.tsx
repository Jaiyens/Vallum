// Lens ring and readout. Position and size derive from the same CSS
// variables that drive the reveal mask (--lx, --ly, --lr), so the ring and
// the revealed circle can never desync in any state. Engaged and dormant
// sizes are tweened through --lr on the stage; never tween a transform on
// this element directly, gsap would clobber the calc()/var() transform.
// The readout text is written imperatively from the video clock; it maps
// currentTime to the cutlist blocks in readout-map.ts.
export function LensRing() {
  return (
    <div
      data-lens-ring
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-10 hidden rounded-full border-[1.5px] border-green-signal bg-green-deep/[0.08] opacity-0 lg:block"
      style={{
        width: "calc(var(--lr, 90px) * 2)",
        height: "calc(var(--lr, 90px) * 2)",
        transform:
          "translate3d(calc(var(--lx) - var(--lr, 90px)), calc(var(--ly) - var(--lr, 90px)), 0)",
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
