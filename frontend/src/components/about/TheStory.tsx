"use client";

import { X, CheckCircle2 } from "lucide-react";

export default function TheStory() {
  return (
    <section className="py-24 relative overflow-hidden bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              The internet is full of code. <br />
              <span className="text-muted">But starving for clarity.</span>
            </h2>

            <div className="space-y-6 text-lg text-muted/90 leading-relaxed">
              <p>
                DCodeThought wasn&apos;t built in a boardroom. It was built out of frustration. As developers preparing for top tech companies, we realized something broken about existing platforms.
              </p>
              <p>
                You open a problem, you get stuck, you look at the discussion tab, and boom—someone dumped a 50-line highly optimized C++ code with zero explanation of <strong className="text-foreground">how they actually thought of it</strong>.
              </p>
              <p>
                We wanted a place where the <strong className="text-purple-400">Intuition</strong> is the hero, not just the syntax. A place where daily consistency is rewarded, and learning feels like a community effort.
              </p>
            </div>
          </div>

          {/* Code Window Visual */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative rounded-2xl bg-[#0d0d12] border border-white/10 shadow-2xl overflow-hidden">
              <div className="bg-[#1a1a24] border-b border-white/5 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-4 text-xs font-mono text-muted/50">reality_vs_dcodethought.ts</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-4">
                <div className="opacity-50">
                  <p className="flex items-center gap-2 text-red-400"><X className="w-4 h-4" /> {"// Traditional Platforms"}</p>
                  <p className="text-foreground">function solve() {"{"}</p>
                  <p className="pl-4 text-muted">return magic_formula_you_wont_understand();</p>
                  <p className="text-foreground">{"}"}</p>
                </div>
                <div className="h-px bg-white/10 w-full my-4"></div>
                <div>
                  <p className="flex items-center gap-2 text-emerald-400"><CheckCircle2 className="w-4 h-4" /> {"// DCodeThought Way"}</p>
                  <p className="text-foreground">function solve() {"{"}</p>
                  <p className="pl-4 text-purple-400">const intuition = buildLogicStepByStep();</p>
                  <p className="pl-4 text-blue-400">const optimizedCode = applyToAnyLanguage(intuition);</p>
                  <p className="pl-4 text-emerald-400">return mastery;</p>
                  <p className="text-foreground">{"}"}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}