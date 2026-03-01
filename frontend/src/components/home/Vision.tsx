"use client";

import {
  Zap,
  Target,
  CalendarCheck,
  Brain,
  Quote
} from "lucide-react";

export default function Vision() {
  return (
    <section className="py-32 text-center border-t border-border-subtle relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl animate-float"></div>
        </div>
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-8 animate-fade-in opacity-0">
          <Zap className="w-4 h-4" />
          Our Vision
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-fade-in-up opacity-0">
          The Long-Term Vision
        </h2>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted leading-relaxed mb-12 animate-fade-in-up opacity-0">
          DCodeThought aims to become a{" "}
          <span className="text-foreground font-semibold">
            trusted learning companion
          </span>{" "}
          for thousands of developers — not through shortcuts,
          but through{" "}
          <span className="text-foreground font-semibold">
            clarity, discipline, and deep understanding
          </span>.
        </p>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: "Clarity",
              desc: "Every concept explained with precision and care",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: CalendarCheck,
              title: "Discipline",
              desc: "Consistent daily practice builds mastery",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: Brain,
              title: "Understanding",
              desc: "Deep intuition over surface-level memorization",
              gradient: "from-orange-500 to-red-500",
            },
          ].map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.title}
                className="group relative animate-scale-in opacity-0"
              >
                <div className="relative h-full rounded-2xl bg-background-secondary border border-border-subtle p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  {/* Hover gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-linear-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br ${pillar.gradient} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-muted relative">
                    {pillar.desc}
                  </p>

                  <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-border opacity-10 rounded-lg group-hover:rotate-45 transition-transform duration-700"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote Section */}
        <div className="relative max-w-3xl mx-auto animate-fade-in opacity-0">
          <div className="relative rounded-2xl bg-linear-to-br from-accent/5 to-purple-500/5 border border-accent/20 p-10">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-accent/20" />
            <Quote className="absolute bottom-6 right-6 w-10 h-10 text-accent/20 rotate-180" />

            <p className="text-xl md:text-2xl font-medium text-center leading-relaxed px-8">
              We build a platform that developers return to every day — not
              because they have to, but because it{" "}
              <span className="gradient-text font-bold">
                genuinely helps them grow
              </span>.
            </p>
          </div>
        </div>

        {/* Bottom pulse dots */}
        <div className="mt-16 flex justify-center gap-2 animate-fade-in opacity-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent/50 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}