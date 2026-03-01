"use client";

import {
  CalendarCheck,
  Ban,
  Target,
  TrendingUp
} from "lucide-react";

export default function PotdPhilosophy() {
  return (
    <section className="py-24 bg-background-tertiary dark:bg-background-secondary relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-r from-accent/10 via-transparent to-transparent blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative">
        {/* Main Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-accent to-purple-500 text-white mb-8 shadow-2xl animate-float">
          <CalendarCheck className="w-9 h-9" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Why Problem of the Day Matters
        </h2>

        {/* Description */}
        <div className="space-y-6 mb-12">
          <p className="text-xl text-muted leading-relaxed max-w-3xl mx-auto">
            One well-thought problem every day compounds into{" "}
            <span className="text-foreground font-semibold">
              strong intuition
            </span>.
          </p>

          <p className="text-lg text-muted leading-relaxed max-w-3xl mx-auto">
            DCodeThought follows a strict daily POTD discipline so you don&apos;t
            break momentum.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Ban,
              title: "No Overload",
              desc: "Just one focused problem",
              color: "from-red-500 to-orange-500",
            },
            {
              icon: Target,
              title: "No Randomness",
              desc: "Carefully selected daily",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: TrendingUp,
              title: "Steady Growth",
              desc: "Consistent daily progress",
              color: "from-green-500 to-emerald-500",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative rounded-xl bg-background-secondary border border-border-subtle p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-scale-in opacity-0"
              >
                <div
                  className={`absolute inset-0 rounded-xl bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${item.color} text-white shadow-lg mb-4`}
                >
                  <Icon className="w-6 h-6" strokeWidth={2.5} />
                </div>

                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Stats visualization */}
        <div className="relative max-w-2xl mx-auto p-8 rounded-2xl bg-linear-to-br from-accent/5 to-purple-500/5 border border-accent/20 animate-fade-in opacity-0">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold bg-linear-to-r from-accent to-purple-500 bg-clip-text text-transparent">
                1
              </span>
              <span className="text-muted">problem</span>
            </div>

            <span className="text-3xl text-muted">×</span>

            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold bg-linear-to-r from-accent to-purple-500 bg-clip-text text-transparent">
                365
              </span>
              <span className="text-muted">days</span>
            </div>

            <span className="text-3xl text-muted">=</span>

            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold bg-linear-to-r from-accent to-purple-500 bg-clip-text text-transparent">
                ∞
              </span>
              <span className="text-muted">mastery</span>
            </div>
          </div>

          <p className="text-sm text-muted italic">
            Small daily actions create extraordinary results over time
          </p>
        </div>
      </div>
    </section>
  );
}