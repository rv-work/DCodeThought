import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Trust from "@/components/home/Trust";
import WhoIsThisFor from "@/components/home/WhoIsThisFor";
import Difference from "@/components/home/Difference";
import ProblemWalkthrough from "@/components/home/ProblemWalkthrough";
import PotdPhilosophy from "@/components/home/PotdPhilosophy";
import DailyValue from "@/components/home/DailyValue";
import Community from "@/components/home/Community";
import Vision from "@/components/home/Vision";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trust />
      <WhoIsThisFor />
      <Features />
      <Difference />
      <ProblemWalkthrough />
      <PotdPhilosophy />
      <DailyValue />
      <Stats />
      <Community />
      <Vision />
      <CTA />

    </>
  );
}
