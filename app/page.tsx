import { FutureRigDynamic } from "@/components/future-rig/FutureRigDynamic";
import { GalleryDynamic } from "@/components/gallery/GalleryDynamic";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { DatasetSection } from "@/components/sections/dataset";
import { EthosFounderSection } from "@/components/sections/ethos";
import { SiteFooter } from "@/components/sections/footer";
import { MethodSection } from "@/components/sections/method";
import { TurnSection } from "@/components/sections/turn";

export default function Home() {
  return (
    <main id="content" tabIndex={-1}>
      {/* HERO EXPERIENCE START */}
      <HeroExperience />
      {/* HERO EXPERIENCE END */}
      <GalleryDynamic />
      {/* The page turns light here and stays light. BRIEF.md, beats 3-5. */}
      <TurnSection />
      <MethodSection />
      {/* The rig sits in the method beat, not the closing position
          (F-0301): a running method implies its kit, and the page still
          has to close on the person, not on unbuilt hardware. */}
      <FutureRigDynamic />
      <DatasetSection />
      {/* Beat 6, the ethos and the founder passage (F-0015, F-0402). */}
      <EthosFounderSection />
      {/* Beat 7, the wordmark, and the closing forest strip (F-0016). */}
      <SiteFooter />
    </main>
  );
}
