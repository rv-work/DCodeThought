"use client";

import {
  Coffee,
  Lightbulb,
  CalendarCheck,
  Code2,
  Trophy,
  Users,
  ArrowRight
} from "lucide-react";

const FEATURES = [
  {
    title: "Java-First Explanations",
    desc: "No more hunting for good Java solutions. Every problem is explained clearly with intent.",
    icon: Coffee,
    gradient: "from-orange-500 to-amber-500"
  },
  {
    title: "Hints-Driven Learning",
    desc: "Think step-by-step with guided hints before jumping to the solution.",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Daily POTD Discipline",
    desc: "Consistency beats talent. One well-explained problem every day.",
    icon: CalendarCheck,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Multi-Language Code",
    desc: "Compare Java, C++, Python, and JavaScript side-by-side.",
    icon: Code2,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Contests & Practice",
    desc: "Organized contest sets for effective pattern recognition and revision.",
    icon: Trophy,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Community Requests",
    desc: "Request problems and features. Popular requests get prioritized and solved.",
    icon: Users,
    gradient: "from-pink-500 to-rose-500"
  },
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A complete learning ecosystem designed to build deep problem-solving intuition
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl bg-background-secondary border border-border-subtle p-8 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gradient hover overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative mb-5">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 relative">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted leading-relaxed relative">
                  {feature.desc}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-accent" />
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-border opacity-20 group-hover:opacity-40 rounded-tl-2xl transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-border opacity-20 group-hover:opacity-40 rounded-br-2xl transition-opacity"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}