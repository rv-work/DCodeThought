
"use client";

import {
  BrainCircuit,
  Code2,
  CalendarCheck,
  Users
} from "lucide-react";

export default function Trust() {
  const badges = [
    { icon: BrainCircuit, text: "Intuition-First Logic" },
    { icon: Code2, text: "C++, Java & Python" },
    { icon: CalendarCheck, text: "Daily Consistency" },
    { icon: Users, text: "Community-Driven" }
  ];

  return (
    <section className="border-y border-border-subtle/30 py-10 relative overflow-hidden bg-background-secondary/20 backdrop-blur-xl">
      {/* Subtle sweeping gradient background */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-500/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {badges.map((badge, index) => {
            const Icon = badge.icon;

            return (
              <div
                key={badge.text}
                className="group flex items-center gap-3 animate-fade-in opacity-0 px-6 py-3 rounded-2xl bg-background/50 border border-border-subtle hover:border-purple-500/40 hover:bg-purple-500/5 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                  <Icon
                    className="w-5 h-5 text-purple-500"
                    strokeWidth={2}
                  />
                </div>
                <span className="font-bold text-muted group-hover:text-foreground transition-colors">
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edge glows */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
    </section>
  );
}