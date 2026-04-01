"use client";

import { useEffect, useState } from "react";
import { getHomeStats } from "@/api/home.api";
import type { HomeStats } from "@/types/home";
import { Code2, Flame, Swords, CheckCircle2 } from "lucide-react";

export default function Stats() {
  const [stats, setStats] = useState<HomeStats | null>(null);

  useEffect(() => {
    // Basic error handling added for production safety
    getHomeStats()
      .then((res) => setStats(res.stats))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  if (!stats) return null;

  const statsData = [
    {
      value: stats.totalProblems,
      label: "Problems Solved",
      icon: <Code2 className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      value: stats.totalPotds,
      label: "Daily POTDs",
      icon: <Flame className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      value: stats.totalContests,
      label: "Contests Covered",
      icon: <Swords className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500"
    },
    {
      value: stats.completedRequests,
      label: "Requests Handled",
      icon: <CheckCircle2 className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className="py-24 border-t border-border-subtle relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 40%)'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Growing Every Single Day
          </h2>
          <p className="text-muted text-lg">
            Join the community of developers building their logic, not just memory.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative rounded-3xl bg-background-secondary/60 backdrop-blur-xl border border-border-subtle p-8 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border effect on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br ${stat.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {stat.icon}
              </div>

              <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
                {stat.value}+
              </div>

              <div className="text-sm text-muted font-bold uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}