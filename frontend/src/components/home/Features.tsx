"use client";

import { BrainCircuit, Medal, Flame, Trophy, Tag, Zap, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    title: "The 'Best Thinker' Tags",
    desc: "Earn reputation through our 3-tier community tagging system: Helpful, Simplest, and Creative.",
    icon: Tag,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "Gamified Streaks & Heatmaps",
    desc: "Build consistency with GitHub-style activity heatmaps and unlock progressive badges from 30 to 365 days.",
    icon: Flame,
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Multi-Tier Leaderboards",
    desc: "Compete Globally, dominate your College-wide leaderboard, or challenge your Friends in private circles.",
    icon: Trophy,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Thought-First Explanations",
    desc: "Understand the 'Why' before the 'How'. Deep intuition building followed by multi-language solutions.",
    icon: BrainCircuit,
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    title: "Blazing Fast Feeds",
    desc: "Powered by Upstash Redis caching, experience zero-lag problem discovery even during peak traffic.",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    title: "Peer-Reviewed Solutions",
    desc: "A centralized hub where official solutions meet community brilliance. Discuss, upvote, and learn.",
    icon: Medal,
    gradient: "from-fuchsia-500 to-purple-600"
  },
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-sm font-bold tracking-wide uppercase">
              The Ecosystem
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Engineered for Top Problem Solvers
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Not just another coding site. A fully gamified, community-driven platform built to accelerate your algorithmic journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="group cursor-pointer relative rounded-3xl bg-background-secondary/50 backdrop-blur-xl border border-border-subtle p-8 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500">
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <Icon size={26} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 relative">{feature.title}</h3>
                <p className="text-muted leading-relaxed relative">{feature.desc}</p>
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                  <ArrowRight className="w-6 h-6 text-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}