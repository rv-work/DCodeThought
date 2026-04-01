"use client";

import { Lock, Users, Terminal, Zap } from "lucide-react";

export default function TheCreator() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Brains Behind DCodeThought</h2>
          <p className="text-muted text-lg">Engineered by developers who live and breathe logic.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Glowing Border Container */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-background-secondary/30 backdrop-blur-xl border border-border-subtle p-1 group hover:border-purple-500/30 transition-colors duration-500 shadow-2xl">

            <div className="relative bg-[#0d0d12]/80 backdrop-blur-2xl rounded-[2.3rem] p-10 md:p-16 text-center border border-white/5">

              {/* Locked Avatar Placeholder */}
              <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-background-secondary to-background border-2 border-dashed border-border-subtle flex items-center justify-center mb-8 relative">
                <Lock className="w-8 h-8 text-muted" />
                <div className="absolute -bottom-2 -right-4 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-md shadow-lg uppercase tracking-wider">
                  Coming Soon
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-4 text-foreground">Meet The Core Team</h3>
              <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl mx-auto">
                We are a group of competitive programmers (Top 1% LeetCode), open-source contributors, and full-stack engineers. Right now, we are heads-down focusing on building the ultimate experience for you.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border-subtle text-sm font-medium text-muted shadow-sm">
                  <Terminal className="w-4 h-4 text-emerald-400" /> Grinding Code
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border-subtle text-sm font-medium text-muted shadow-sm">
                  <Zap className="w-4 h-4 text-orange-400" /> Scaling Servers
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border-subtle text-sm font-medium text-muted shadow-sm">
                  <Users className="w-4 h-4 text-blue-400" /> Profiles Dropping Soon
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}