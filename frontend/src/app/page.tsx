import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Trust from "@/components/home/Trust";
import Difference from "@/components/home/Difference";
import PotdPhilosophy from "@/components/home/PotdPhilosophy";
import CTA from "@/components/home/CTA";
import HowItWorks from "@/components/home/HowItWorks";
import LiveActivity from "@/components/home/LiveActivity";
import WallOfFame from "@/components/home/WallOfFame";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* 1. THE HOOK */}
      <Hero />
      <LiveActivity />

      {/* 2. THE PROBLEM & SOLUTION */}
      <Trust />
      <Difference />

      {/* 3. THE PRODUCT */}
      <Features />
      <HowItWorks />

      {/* 4. THE HABIT & GAMIFICATION */}
      <PotdPhilosophy />
      <WallOfFame />

      {/* 5. THE PROOF & ACTION */}
      <Stats />
      <CTA />

    </>
  );
}
