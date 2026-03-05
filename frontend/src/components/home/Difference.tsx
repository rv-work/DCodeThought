"use client";

import { X, Check, BrainCircuit, Lightbulb, Globe, TrendingUp, Code2 } from "lucide-react";

export default function Difference() {
  return (
    <section className="py-24 bg-background-tertiary dark:bg-background-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why DCodeThought Is Different
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Most platforms just give you the code. We give you the brainpower behind it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Typical Platforms */}
          <div className="rounded-3xl bg-background border border-border-subtle p-8 lg:p-10 relative group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-muted flex items-center gap-3">
              <span className="w-2 h-8 bg-red-500/40 rounded-full"></span>
              Typical Platforms
            </h3>
            <ul className="space-y-5">
              {[
                "Jump straight to the final code",
                "Solutions lacking detailed intuition",
                "Hard to trace the thought process",
                "Code is difficult to revise later",
                "Overwhelming and unstructured"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-muted text-lg">
                  <X className="w-5 h-5 text-red-500/60 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DCodeThought */}
          <div className="rounded-3xl bg-linear-to-br from-purple-500/5 to-blue-500/5 border-2 border-purple-500/30 p-8 lg:p-10 relative group hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-500">
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Check className="w-6 h-6 text-purple-500" />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0"></div>

            <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3 relative z-10">
              <span className="w-2 h-8 bg-linear-to-b from-purple-500 to-blue-500 rounded-full"></span>
              The DCodeThought Way
            </h3>
            <ul className="space-y-5 relative z-10">
              {[
                { text: "Detailed Thought-First Explanations", icon: BrainCircuit },
                { text: "Hints → Intuition → Logic flow", icon: Lightbulb },
                { text: "Code in C++, Java, and Python", icon: Code2 },
                { text: "Hindi + English clarity for deep understanding", icon: Globe },
                { text: "Built specifically for rapid revision", icon: TrendingUp }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-center gap-4 group/item text-lg">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-purple-500/20 group-hover/item:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="font-medium text-foreground">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}