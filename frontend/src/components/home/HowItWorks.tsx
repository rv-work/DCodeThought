"use client";

import {
  BookOpen,
  Lightbulb,
  Languages,
  Code2,
  MessageSquare,
  Sparkles
} from "lucide-react";

const STEPS = [
  {
    title: "Pick Your Challenge",
    text: "Open a specific problem or tackle today's curated POTD.",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Engage Your Brain",
    text: "Read guided hints and build your intuition before looking at code.",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "Decode the Logic",
    text: "Understand the deep explanation in clear Hindi + English.",
    icon: Languages,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Master the Syntax",
    text: "Compare optimized solutions side-by-side in C++, Java, and Python.",
    icon: Code2,
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    title: "Join the Conversation",
    text: "Discuss approaches, drop comments, or request new features.",
    icon: MessageSquare,
    gradient: "from-indigo-500 to-purple-600"
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-125 h-125 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-sm font-bold tracking-wide uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            The DCodeThought Method
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            How Learning Works Here
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A proven 5-step process designed for maximum retention, deep understanding, and interview readiness.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Glowing Connection line */}
          <div className="hidden md:block absolute left-11.75 top-12 bottom-12 w-1 bg-linear-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full"></div>

          {/* Steps */}
          <div className="space-y-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="relative animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 group">

                    {/* Icon Node */}
                    <div className="relative shrink-0 z-10">
                      {/* Outer pulse ring on hover */}
                      <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${step.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500`}></div>

                      <div className={`relative w-24 h-24 rounded-2xl bg-background-secondary border border-border-subtle flex flex-col items-center justify-center shadow-lg group-hover:border-purple-500/50 group-hover:scale-110 transition-all duration-500 overflow-hidden`}>
                        {/* Subtle inner gradient */}
                        <div className={`absolute inset-0 bg-linear-to-br ${step.gradient} opacity-5`}></div>

                        <Icon className="w-8 h-8 mb-2 text-foreground group-hover:text-purple-400 transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted group-hover:text-foreground transition-colors">
                          Step 0{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 w-full text-left rounded-3xl bg-background-secondary/40 backdrop-blur-md border border-border-subtle p-8 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] group-hover:border-purple-500/30 group-hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                      {/* Edge highlight on hover */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                      <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-purple-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-lg text-muted">
                        {step.text}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom highlight banner */}
        <div className="mt-20 text-center animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-shadow duration-500">
            <Lightbulb className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold text-foreground">
              Learn by thinking, not by copying.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}