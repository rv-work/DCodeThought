"use client";

import {
  Target,
  Coffee,
  Code2,
  MessageCircle,
  Sparkles,
  CalendarCheck,
  Rocket
} from "lucide-react";

export default function DailyValue() {
  const benefits = [
    {
      icon: Target,
      text: "One thoughtfully solved POTD",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Coffee,
      text: "Clean Java explanation",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Code2,
      text: "Multi-language reference",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageCircle,
      text: "Community discussion",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Sparkles,
      text: "Zero distraction",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <div className="mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              Daily Value
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What You Get Every Single Day
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Focused, high-quality learning without the noise
          </p>
        </div>

        {/* Benefit cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.text}
                className="group relative animate-scale-in opacity-0"
              >
                <div className="relative h-full rounded-2xl bg-background-secondary border border-border-subtle p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  {/* Hover gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-linear-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${benefit.gradient} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-6 h-6" strokeWidth={2.5} />
                  </div>

                  <p className="text-sm font-medium leading-tight relative">
                    {benefit.text}
                  </p>

                  <div className="absolute -top-2 -right-2 w-8 h-8 border-2 border-border opacity-20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formula section */}
        <div className="relative max-w-3xl mx-auto rounded-2xl bg-linear-to-br from-accent/5 to-purple-500/5 border border-accent/20 p-10 animate-fade-in opacity-0">
          <div className="flex flex-wrap items-center justify-center gap-4 text-lg">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary border border-border">
              <Target className="w-5 h-5 text-accent" />
              <span className="font-semibold">Quality</span>
            </div>

            <span className="text-2xl text-accent font-bold">+</span>

            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary border border-border">
              <CalendarCheck className="w-5 h-5 text-accent" />
              <span className="font-semibold">Consistency</span>
            </div>

            <span className="text-2xl text-accent font-bold">=</span>

            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-accent to-purple-500 text-white shadow-lg">
              <Rocket className="w-5 h-5" />
              <span className="font-bold">Mastery</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted italic">
            Simple, focused, and effective — every single day
          </p>
        </div>
      </div>
    </section>
  );
}