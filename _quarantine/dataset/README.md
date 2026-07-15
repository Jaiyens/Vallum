# Dataset showcase, quarantined

This is the dataset showcase section (Ego4D style annotation overlay), moved
here untouched during the hero rebuild. It returns in the dataset phase.

Contents:

- `showcase.tsx` came from `components/sections/showcase.tsx`
- `showcase-overlay.tsx` came from `components/sections/showcase-overlay.tsx`

Its shared dependencies stay live in the main tree so nothing here rots:
`components/media/auto-pause-video.tsx`, `hooks/use-video-viewport.ts`,
`components/motion/masked-rise.tsx`, `components/ui/aspect-ratio.tsx`,
`components/ui/badge.tsx`, `SHOWCASE_VIDEO` in `lib/assets.ts`, and
`SECTION_IDS.data` in `lib/site.ts`.

To restore: move both files back into `components/sections/`, render
`<Showcase />` at the dataset insertion point in `app/page.tsx`, and remove
`_quarantine` from the tsconfig and eslint ignore lists if this folder is
then empty. This folder is excluded from type checking and linting, so the
code inside is exactly as it was shipped.
