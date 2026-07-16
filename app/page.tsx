import { FutureRigDynamic } from "@/components/future-rig/FutureRigDynamic";
import { GalleryDynamic } from "@/components/gallery/GalleryDynamic";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { DatasetSection } from "@/components/sections/dataset";
import { MethodSection } from "@/components/sections/method";
import { TurnSection } from "@/components/sections/turn";
import { TempClose } from "@/components/temp-close";

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
      <DatasetSection />
      <FutureRigDynamic />
      {/* INSERTION POINT: founder message */}
      {/* TEMPORARY CLOSE: mono contact line */}
      <TempClose />
    </main>
  );
}
