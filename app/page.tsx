import { FutureRigDynamic } from "@/components/future-rig/FutureRigDynamic";
import { GalleryDynamic } from "@/components/gallery/GalleryDynamic";
import { HeroExperience } from "@/components/hero/HeroExperience";
import { TempClose } from "@/components/temp-close";

export default function Home() {
  return (
    <main id="content" tabIndex={-1}>
      {/* HERO EXPERIENCE START */}
      <HeroExperience />
      {/* HERO EXPERIENCE END */}
      <GalleryDynamic />
      {/* INSERTION POINT: dataset section, quarantined at _quarantine/dataset */}
      <FutureRigDynamic />
      {/* INSERTION POINT: founder message */}
      {/* TEMPORARY CLOSE: mono contact line */}
      <TempClose />
    </main>
  );
}
