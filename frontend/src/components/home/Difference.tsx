"use client";

import {
  X,
  Check,
  Coffee,
  Lightbulb,
  Globe,
  TrendingUp,
  CalendarCheck,
  Zap
} from "lucide-react";

export default function Difference() {
  return (
    <section className="py-24 bg-background-tertiary dark:bg-background-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why DCodeThought Is Different
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Most platforms focus on speed. We focus on understanding.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ❌ Typical Platforms */}
          <div className="rounded-2xl bg-background-secondary border border-border-subtle p-8 relative group hover:shadow-lg transition-all duration-300 animate-slide-in-left">
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center opacity-60">
              <X className="w-5 h-5 text-red-500" />
            </div>

            <h3 className="text-xl font-bold mb-6 text-muted flex items-center gap-2">
              <span className="w-8 h-1 bg-red-500/30 rounded"></span>
              Typical Platforms
            </h3>

            <ul className="space-y-4">
              {[
                "Mostly C++ solutions",
                "Jump straight to final code",
                "No structured thinking process",
                "Hard to revise later",
                "Overwhelming and scattered"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted">
                  <X className="w-4 h-4 text-red-500/60 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ DCodeThought */}
          <div className="rounded-2xl bg-linear-to-br from-accent/5 to-purple-500/5 border-2 border-accent/20 p-8 relative group hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 animate-slide-in-right">
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-accent" />
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-accent/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

            <h3 className="text-xl font-bold mb-6 text-accent flex items-center gap-2 relative">
              <span className="w-8 h-1 bg-linear-to-r from-accent to-purple-500 rounded"></span>
              DCodeThought Approach
            </h3>

            <ul className="space-y-4 relative">
              {[
                { text: "Java-first explanations", icon: Coffee },
                { text: "Hints → Thought → Code flow", icon: Lightbulb },
                { text: "Hindi + English clarity", icon: Globe },
                { text: "Built for revision & growth", icon: TrendingUp },
                { text: "Structured daily learning", icon: CalendarCheck }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent/20 transition-colors">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-medium pt-1">{item.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-accent/20 rounded-bl-lg"></div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium animate-fade-in opacity-0">
            <Zap className="w-4 h-4 text-accent" />
            Understanding over memorization, always
          </div>
        </div>
      </div>
    </section>
  );
}