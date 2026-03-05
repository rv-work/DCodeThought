"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getTodayPotd } from "@/api/potd.api";
import type { PotdProblem } from "@/types/potd";
import PotdCard from "@/components/potd/PotdCard";
import PotdHistory from "@/components/potd/PotdHistory";
import { Sparkles, Calendar, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

export default function PotdPage() {
  const [today, setToday] = useState<PotdProblem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPotd = async () => {
      try {
        const res = await getTodayPotd();
        setToday(res.potd);
      } catch (err) {
        toast.error(parseError(err));
      } finally {
        setLoading(false);
      }
    };

    loadPotd();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12 relative overflow-hidden">
        {/* Deep Space Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '2s' }}></div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 mb-16 relative z-10">
          <div className="text-center space-y-6 animate-fade-in-up">

            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold uppercase tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
              </span>
              Daily Challenge
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
              Problem of the <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">Day</span>
            </h1>

            {/* Description */}
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
              One carefully selected problem every day to build consistent learning habits and deep algorithmic intuition.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
              <div className="flex items-center gap-3 bg-background-secondary/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-border-subtle">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-foreground font-medium text-sm">Daily consistency</span>
              </div>
              <div className="flex items-center gap-3 bg-background-secondary/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-border-subtle">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-foreground font-medium text-sm">Progressive difficulty</span>
              </div>
              <div className="flex items-center gap-3 bg-background-secondary/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-border-subtle">
                <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-foreground font-medium text-sm">Quality explanations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-6 relative z-10">

          {/* Today's POTD */}
          <div className="mb-20 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-purple-500/30 to-purple-500/30" />
              <h2 className="text-2xl font-bold text-foreground">Today&apos;s Challenge</h2>
              <div className="h-px flex-1 bg-linear-to-r from-purple-500/30 via-purple-500/30 to-transparent" />
            </div>

            {loading ? (
              <div className="rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-10 animate-pulse shadow-lg">
                <div className="space-y-6">
                  <div className="h-6 bg-background-tertiary rounded-lg w-1/4" />
                  <div className="h-10 bg-background-tertiary rounded-xl w-3/4" />
                  <div className="h-6 bg-background-tertiary rounded-lg w-1/2" />
                </div>
              </div>
            ) : today ? (
              <PotdCard potd={today} />
            ) : (
              <div className="text-center py-24 rounded-[2.5rem] bg-background-secondary/30 backdrop-blur-xl border border-border-subtle shadow-xl">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-purple-500/10 mb-6 border border-purple-500/20">
                  <Calendar className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">No POTD Today</h3>
                <p className="text-muted text-lg">
                  Check back tomorrow for a new challenge!
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