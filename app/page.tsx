import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { PrinciplesStrip } from "@/components/PrinciplesStrip";
import { UnderstandActGrow } from "@/components/UnderstandActGrow";
import { CalculatorIndex } from "@/components/CalculatorIndex";
import { HowWeCalculate } from "@/components/HowWeCalculate";
import { CompareLearn } from "@/components/CompareLearn";
import { WhoItsFor } from "@/components/WhoItsFor";
import { Faq } from "@/components/Faq";
import { FinalBand } from "@/components/FinalBand";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-fermor-green selection:text-ink">
      <Nav />
      <main id="main-content" className="flex-1">
        <Hero />
        <PrinciplesStrip />
        <UnderstandActGrow />
        <CalculatorIndex />
        <HowWeCalculate />
        <CompareLearn />
        <WhoItsFor />
        <Faq />
        <FinalBand />
      </main>
      <Footer />
    </div>
  );
}
