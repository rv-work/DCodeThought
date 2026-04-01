"use client";

import { Sparkles, Code, Cpu } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-border-subtle bg-background">
      {/* Animated Background Mesh/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-100 bg-purple-600/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

        {/* Floating Elements for 3D depth */}
        <div className="hidden md:flex absolute top-10 left-10 items-center gap-2 px-4 py-2 rounded-2xl bg-background-secondary/50 border border-border-subtle backdrop-blur-md animate-bounce" style={{ animationDuration: '4s' }}>
          <Code className="w-4 h-4 text-blue-400" /> <span className="text-xs font-mono text-muted">Clean Logic</span>
        </div>
        <div className="hidden md:flex absolute bottom-10 right-10 items-center gap-2 px-4 py-2 rounded-2xl bg-background-secondary/50 border border-border-subtle backdrop-blur-md animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <Cpu className="w-4 h-4 text-emerald-400" /> <span className="text-xs font-mono text-muted">Optimized</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold tracking-wide uppercase mb-8 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
          <Sparkles className="w-4 h-4" />
          Our Mission
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
          Decoding Logic. <br />
          <span className="relative inline-block mt-2">
            <span className="absolute -inset-2 rounded-lg bg-linear-to-r from-purple-500/20 to-blue-500/20 blur-xl"></span>
            <span className="relative bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400">
              Empowering Thinkers.
            </span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-3xl mx-auto">
          We believe that algorithms shouldn&apos;t be memorized. They should be deeply understood, visualized, and engineered from the ground up.
        </p>
      </div>
    </section>
  );
}