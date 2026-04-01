"use client";

import { Crown, Flame, Star, Lightbulb } from "lucide-react";

const TOP_THINKERS = [
  { name: "Vikash", handle: "@vikash_cpp", tag: "Helpful", icon: <Star className="w-4 h-4 text-blue-400" />, streak: "142 Days", color: "border-blue-500/30 bg-blue-500/5" },
  { name: "Anjali", handle: "@anjali_dev", tag: "Creative", icon: <Lightbulb className="w-4 h-4 text-purple-400" />, streak: "89 Days", color: "border-purple-500/30 bg-purple-500/5" },
  { name: "Rohan", handle: "@rohan_codes", tag: "Simplest", icon: <Crown className="w-4 h-4 text-emerald-400" />, streak: "210 Days", color: "border-emerald-500/30 bg-emerald-500/5" },
];

export default function WallOfFame() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Wall of <span className="bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500">Fame</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto mb-16">
          Meet our top-ranked algorithmists. Consistently crushing POTDs and dropping the best community solutions.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {TOP_THINKERS.map((user, idx) => (
            <div key={idx} className={`relative p-6 rounded-3xl border ${user.color} backdrop-blur-sm group hover:-translate-y-2 transition-transform duration-300 cursor-pointer`}>

              {/* Profile Avatar Placeholder */}
              <div className="w-16 h-16 mx-auto rounded-full bg-background-tertiary border-2 border-border-subtle flex items-center justify-center text-xl font-bold mb-4 shadow-xl">
                {user.name.charAt(0)}
              </div>

              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-sm text-muted mb-6">{user.handle}</p>

              <div className="flex items-center justify-center gap-4">
                {/* Tag Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border-subtle text-xs font-bold">
                  {user.icon}
                  {user.tag}
                </div>
                {/* Streak Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border-subtle text-xs font-bold">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {user.streak}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}