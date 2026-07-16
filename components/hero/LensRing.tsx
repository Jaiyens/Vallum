// Lens ring and readout. Size derives from --lr (shared with the mask
// radius) but position follows --rx/--ry, a second, heavier-lagged pair:
// the chrome trails the glass slightly, which is what makes the lens feel
// like a physical instrument instead of a cutout. Never tween a transform
// on this element directly; all geometry goes through the stage vars.
// The glass look (glint, Fresnel falloff, drop shadow) lives in the
// lens-glass class; a faint hairline ring floats outside the main stroke.
export function LensRing() {
  return (
    <div
      data-lens-ring
      aria-hidden="true"
      className="lens-glass pointer-events-none absolute top-0 left-0 z-10 block rounded-full border border-bone/70 opacity-0"
      style={{
        width: "calc(var(--lr, 60px) * 2)",
        height: "calc(var(--lr, 60px) * 2)",
        transform:
          "translate3d(calc(var(--rx, -9999px) - var(--lr, 60px)), calc(var(--ry, -9999px) - var(--lr, 60px)), 0)",
      }}
    >
      <span className="absolute -inset-[9px] rounded-full border border-bone/25" />
      <span className="absolute top-1/2 left-[-1px] h-px w-1.5 -translate-y-1/2 bg-bone" />
      <span className="absolute top-1/2 right-[-1px] h-px w-1.5 -translate-y-1/2 bg-bone" />
      <span
        data-lens-readout
        className="absolute right-0 -bottom-6 translate-x-1/3 font-mono text-[10px] tracking-wider whitespace-nowrap text-bone-hi"
      />
    </div>
  );
}
