import Link from "next/link";
import type { PotdProblem } from "@/types/potd";
import { Calendar, Code2, ArrowRight, Sparkles } from "lucide-react";

// Updated for Tailwind v4
const difficultyColors = {
  Easy: "from-emerald-400 to-green-500",
  Medium: "from-amber-400 to-orange-500",
  Hard: "from-rose-400 to-red-500",
};

const difficultyGlows = {
  Easy: "shadow-emerald-500/20 text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Medium: "shadow-amber-500/20 text-amber-500 bg-amber-500/10 border-amber-500/20",
  Hard: "shadow-rose-500/20 text-rose-500 bg-rose-500/10 border-rose-500/20",
};

export default function PotdCard({ potd }: { potd: PotdProblem }) {
  const difficultyLevel = potd.difficulty as keyof typeof difficultyColors;

  return (
    <Link
      href={`/problems/${potd.slug}`}
      className="group relative block rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-purple-500/30 p-8 md:p-12 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Dynamic Animated Background Glows */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Internal Floating Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:scale-150 group-hover:bg-blue-500/30 transition-all duration-700" />
      <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] group-hover:scale-150 group-hover:bg-purple-500/30 transition-all duration-700" />

      {/* Content Container */}
      <div className="relative z-10 space-y-8">

        {/* Top Header Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500 uppercase tracking-wider mb-1">
                Today&apos;s Challenge
              </div>
              <div className="text-sm text-muted flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4" />
                {new Date(potd.potdDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          <div className="hidden md:flex w-12 h-12 rounded-2xl bg-foreground text-background items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 shadow-xl">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>

        {/* Problem Info */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border-subtle shadow-sm">
            <Code2 className="w-4 h-4 text-muted" />
            <span className="text-xs font-bold text-foreground tracking-wide">#{potd.problemNumber}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground group-hover:text-purple-400 transition-colors leading-tight">
            {potd.title}
          </h2>

          <div className="flex items-center gap-4 pt-2">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-bold border ${difficultyGlows[difficultyLevel]}`}>
              <div className={`w-2 h-2 rounded-full bg-linear-to-r ${difficultyColors[difficultyLevel]}`} />
              {potd.difficulty}
            </div>
          </div>
        </div>

        {/* Mobile Call to action (Visible only on small screens) */}
        <div className="flex md:hidden items-center gap-2 text-sm font-bold text-purple-400 pt-4">
          <span>Start solving</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}