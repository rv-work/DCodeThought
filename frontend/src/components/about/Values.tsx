"use client";

import { Compass, Heart, Shield, Zap } from "lucide-react";

const VALUES = [
  {
    title: "Truth in Logic",
    desc: "We don't do shortcuts. We break down the raw logic so you can reconstruct it anywhere, in any language.",
    icon: Compass,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Community First",
    desc: "A rising tide lifts all boats. We prioritize user requests, peer reviews, and highlighting top community thinkers.",
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-400/10"
  },
  {
    title: "Zero Noise",
    desc: "A distraction-free, beautifully engineered interface. No ads, no clutter. Just you and the problem.",
    icon: Shield,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Relentless Consistency",
    desc: "Talent is good. Consistency is dangerous. Our POTD philosophy is built to make you dangerous.",
    icon: Zap,
    color: "text-orange-400",
    bg: "bg-orange-400/10"
  }
];

export default function Values() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
          <p className="text-muted text-lg">The principles that drive every feature we build.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="group p-8 rounded-3xl bg-background-secondary border border-border-subtle hover:border-border transition-colors">
                <div className={`w-12 h-12 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{val.title}</h3>
                <p className="text-muted leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}