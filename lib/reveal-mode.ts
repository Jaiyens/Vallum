export type RevealMode = "clip" | "fade";

// Safari technically supports animated clip-path but compositing an animated
// clip over a <video> layer repaints and flickers. Those WebKit builds get an
// opacity crossfade with a blur that resolves instead.
export function getRevealMode(): RevealMode {
  if (typeof window === "undefined") return "fade";
  const supports =
    typeof CSS !== "undefined" &&
    CSS.supports?.("clip-path", "inset(0% 0% 0% 0%)");
  const ua = navigator.userAgent;
  const isSafari = /Safari/.test(ua) && !/Chrom(e|ium)|Edg|OPR|Android/.test(ua);
  return supports && !isSafari ? "clip" : "fade";
}
