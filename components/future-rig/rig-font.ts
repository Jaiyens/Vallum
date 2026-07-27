import { Newsreader } from "next/font/google";

// LOOK.md's display steps require Newsreader (the site's display serif), but
// the shared --font-display theme token in globals.css still points at
// Archivo pending the site-wide type swap (that file is owned by other
// agents right now). Loaded locally so this section's heading can carry the
// correct display face without touching global theme tokens. Variable
// weight with the opsz axis enabled: browsers apply font-optical-sizing
// automatically, which is what gives Newsreader "real display cuts" at the
// display-2 size instead of a scaled-up text cut.
export const rigDisplayFont = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  style: ["normal"],
  display: "swap",
});
