"use client";

import { BrainCircuit, Lightbulb, CalendarCheck, Code2, Trophy, Users, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    title: "Thought-First Explanations",
    desc: "We explain the 'Why' before the 'How'. Understand the logic and intuition before writing a single line of code.",
    icon: BrainCircuit,
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "Hints-Driven Learning",
    desc: "Think step-by-step with guided hints, exactly like a real technical interview environment.",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Multi-Language Code",
    desc: "Complete, optimized solutions provided in C++, Java, and Python so you can learn in your preferred stack.",
    icon: Code2,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Daily POTD Discipline",
    desc: "Consistency beats talent. One deeply explained problem every single day.",
    icon: CalendarCheck,
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    title: "Contests & Practice",
    desc: "Organized contest sets for effective pattern recognition and rapid revision.",
    icon: Trophy,
    gradient: "from-rose-400 to-red-500"
  },
  {
    title: "Community Requests",
    desc: "Stuck on a problem? Request it. Popular requests get prioritized, detailed explanations.",
    icon: Users,
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
            Everything You Need to Excel
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A platform engineered to build deep problem-solving intuition across multiple programming languages.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="group relative rounded-3xl bg-background-secondary/50 backdrop-blur-xl border border-border-subtle p-8 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500">
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