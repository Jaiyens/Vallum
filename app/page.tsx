import { GalleryDynamic } from "@/components/gallery/GalleryDynamic";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { DatasetSection } from "@/components/sections/dataset";
import { EthosFounderSection } from "@/components/sections/ethos";
import { SiteFooter } from "@/components/sections/footer";

export default function Home() {
  return (
    <main id="content" tabIndex={-1}>
      {/* HERO EXPERIENCE START */}
      <HeroExperience />
      {/* HERO EXPERIENCE END */}
      <GalleryDynamic />
      {/* Moved off / 2026-09-03 (founder): the turn and its stat slab, the
          method, and the future rig now read as one argument on
          /white-paper, linked from the nav. The front door keeps the film,
          the faces, the record, and the person; the reasoning behind the
          company lives on its own route. */}
      <DatasetSection />
      {/* Beat 6, the ethos and the founder passage (F-0015, F-0402). */}
      <EthosFounderSection />
      {/* Beat 7, the wordmark, and the closing forest strip (F-0016). */}
      <SiteFooter />
    </main>
  );
}
