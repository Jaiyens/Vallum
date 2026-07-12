import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Problem } from "@/components/sections/problem";
import { Showcase } from "@/components/sections/showcase";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Exploded } from "@/components/sections/exploded";
import { Products } from "@/components/sections/products";
import { Proof } from "@/components/sections/proof";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="content" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Problem />
        <Showcase />
        <HowItWorks />
        <Exploded />
        <Products />
        <Proof />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
