import Navbar from "@/components/navbar/Navbar";
import AboutHero from "@/components/about/AboutHero";
import TheStory from "@/components/about/TheStory";
import Values from "@/components/about/Values";
import TheCreator from "@/components/about/TheCreator";
import CTA from "@/components/home/CTA"; // Reusing the awesome CTA from home

export const metadata = {
  title: "About Us | DCodeThought",
  description: "The story and vision behind DCodeThought - engineered for top problem solvers.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <AboutHero />
      <TheStory />
      <Values />
      <TheCreator />
      <CTA />
    </main>
  );
}