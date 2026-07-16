import type Lenis from "lenis";

// Shared handle to the SmoothScroll Lenis instance so overlays can stop and
// restart page scroll. Stays null under reduced motion, where Lenis never
// mounts; consumers must handle that with an overflow lock of their own.
export const lenisRef: { current: Lenis | null } = { current: null };
