import { FutureRigDynamic } from "@/components/future-rig/FutureRigDynamic";
import { GalleryDynamic } from "@/components/gallery/GalleryDynamic";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { SiteFooter } from "@/components/sections/footer";

export default function Home() {
  return (
    <main id="content" tabIndex={-1}>
      {/* HERO EXPERIENCE START */}
      <HeroExperience />
      {/* HERO EXPERIENCE END */}
      <GalleryDynamic />
      {/* Recomposed 2026-09-03 (founder). The record and the ethos and
          founder slab left the front door: the founder did not recognise
          either on the page and asked for them to go. Nothing is lost:
          /dataset renders the same schema, consent stack, and offer from
          src/content/dataset-page.ts, and ETHOS_COPY stays in
          src/content/ethos.ts because the nav, both footer strips, and
          /dataset read their labels from it. The turn and the method live
          inside the white paper at /research. The rig came back from
          /research the same day to close the page ahead of the wordmark,
          the founder's call over F-0301's ordering. The gap between the
          helix and the rig is the founder's to fill next. */}
      <FutureRigDynamic />
      {/* Beat 7, the wordmark, and the closing forest strip (F-0016). */}
      <SiteFooter />
    </main>
  );
}
