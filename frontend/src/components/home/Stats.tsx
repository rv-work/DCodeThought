"use client";

import { useEffect, useState } from "react";
import { getHomeStats } from "@/api/home.api";
import type { HomeStats } from "@/types/home";

export default function Stats() {
  const [stats, setStats] = useState<HomeStats | null>(null);

  useEffect(() => {
    getHomeStats().then((res) => setStats(res.stats));
  }, []);

  if (!stats) return null;

  const statsData = [
    {
      value: stats.totalProblems,
      label: "Problems Solved",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      value: stats.totalPotds,
      label: "Daily POTDs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500"
    },
    {
      value: stats.totalContests,
      label: "Contests Covered",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500"
    },
    {
      value: stats.completedRequests,
      label: "Requests Completed",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 border-t border-border-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Growing Every Single Day
          </h2>
          <p className="text-muted text-lg">
            Join thousands of developers improving their problem-solving skills
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl bg-background-secondary border border-border-subtle p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} text-white mb-4 shadow-lg`}>
                {stat.icon}
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(to bottom right, var(--foreground), var(--foreground-muted))`
              }}>
                {stat.value}+
              </div>

              {/* Label */}
              <div className="text-sm text-muted font-medium">
                {stat.label}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-border opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}