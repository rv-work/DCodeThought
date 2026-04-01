"use client";

import { Star, Zap, CheckCircle2 } from "lucide-react";

export default function LiveActivity() {
  const activities = [
    { user: "DTH-1", action: "just solved", problem: "Two Sum", icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, time: "2m ago" },
    { user: "DTH-2", action: "earned the badge", problem: "30-Day Streak", icon: <Zap className="w-4 h-4 text-orange-500" />, time: "5m ago" },
    { user: "DTH-3", action: "was tagged as", problem: "Simplest Thinker", icon: <Star className="w-4 h-4 text-purple-500" />, time: "12m ago" },
    { user: "DTH-4", action: "just solved", problem: "LRU Cache", icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, time: "18m ago" },
  ];

  return (
    <section className="py-12 border-y border-border-subtle bg-background-secondary/20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 flex items-center">

        {/* Pulse Indicator */}
        <div className="flex items-center gap-3 shrink-0 mr-8 border-r border-border-subtle pr-8">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="font-bold text-sm tracking-wider uppercase text-muted">Live Feed</span>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative">
          {/* Fading edges for smooth marquee */}
          <div className="absolute top-0 left-0 w-16 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-8 animate-marquee whitespace-nowrap items-center">
            {/* Duplicated for infinite scroll illusion */}
            {[...activities, ...activities].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm bg-background border border-border-subtle px-4 py-2 rounded-full shadow-sm hover:border-purple-500/30 transition-colors cursor-pointer">
                {item.icon}
                <span className="font-semibold text-foreground">{item.user}</span>
                <span className="text-muted">{item.action}</span>
                <span className="font-bold text-purple-400">{item.problem}</span>
                <span className="text-[10px] text-muted/60 ml-2">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}