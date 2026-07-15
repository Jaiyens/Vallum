import { FutureRigDynamic } from "@/components/future-rig/FutureRigDynamic";
import { TempClose } from "@/components/temp-close";

export default function Home() {
  return (
    <main id="content" tabIndex={-1}>
      {/* HERO EXPERIENCE START */}
      {/* HERO EXPERIENCE END */}
      {/* INSERTION POINT: problem section, spinning gallery, assets not ready */}
      {/* INSERTION POINT: dataset section, quarantined at _quarantine/dataset */}
      <FutureRigDynamic />
      {/* INSERTION POINT: founder message */}
      {/* TEMPORARY CLOSE: mono contact line */}
      <TempClose />
    </main>
  );
}
