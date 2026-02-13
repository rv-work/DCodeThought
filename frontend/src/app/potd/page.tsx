"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getTodayPotd } from "@/api/potd.api";
import type { PotdProblem } from "@/types/potd";
import PotdCard from "@/components/potd/PotdCard";
import PotdHistory from "@/components/potd/PotdHistory";
import { Sparkles, Calendar, TrendingUp } from "lucide-react";

export default function PotdPage() {
  const [today, setToday] = useState<PotdProblem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodayPotd()
      .then((res) => setToday(res.potd))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="text-center space-y-6 animate-fade-in-up">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Daily Challenge
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Problem of the Day
            </h1>

            {/* Description */}
            <p className="text-muted text-lg max-w-2xl mx-auto">
              One carefully selected problem every day to build consistent learning habits
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-muted">Daily consistency</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-muted">Progressive difficulty</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-muted">Quality explanations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's POTD */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h2 className="text-2xl font-bold">Today's Challenge</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border via-border to-transparent" />
            </div>

            {loading ? (
              <div className="rounded-2xl bg-background-secondary border border-border-subtle p-8 animate-pulse">
                <div className="space-y-4">
                  <div className="h-4 bg-background-tertiary rounded w-1/4" />
                  <div className="h-8 bg-background-tertiary rounded w-3/4" />
                  <div className="h-4 bg-background-tertiary rounded w-1/2" />
                </div>
              </div>
            ) : today ? (
              <PotdCard potd={today} />
            ) : (
              <div className="text-center py-20 rounded-2xl bg-background-secondary border border-border-subtle">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mb-6">
                  <Calendar className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No POTD Today</h3>
                <p className="text-muted">
                  Check back tomorrow for a new challenge
                </p>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <PotdHistory />
          </div>
        </div>
      </div>
    </>
  );
}