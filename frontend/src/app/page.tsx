import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
    </>
  );
}
