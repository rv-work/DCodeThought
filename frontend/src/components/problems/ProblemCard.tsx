import Link from "next/link";
import type { PublicProblem } from "@/types/problem";
import { Code2, ArrowRight, Calendar, Trophy, Users } from "lucide-react";

// Updated to use Tailwind v4 bg-linear syntax
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

const typeIcons = {
  potd: Calendar,
  contest: Trophy,
  requested: Users,
};

export default function ProblemCard({ problem }: { problem: PublicProblem }) {
  const TypeIcon = typeIcons[problem.type as keyof typeof typeIcons] || Code2;
  const difficultyLevel = problem.difficulty as keyof typeof difficultyColors;

  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group relative block rounded-3xl bg-background-secondary/60 backdrop-blur-md border border-border-subtle p-7 hover:border-purple-500/30 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Dynamic Background Hover Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 space-y-5">

        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border-subtle shadow-sm">
            <Code2 className="w-3.5 h-3.5 text-muted" />
            <span className="text-xs font-bold text-foreground">#{problem.problemNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold uppercase tracking-wider">
              <TypeIcon className="w-3.5 h-3.5" />
              <span>{problem.type}</span>
            </div>

            {/* Hover Action Arrow */}
            <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl line-clamp-2 text-foreground group-hover:text-purple-400 transition-colors">
          {problem.title}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          {/* Difficulty Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${difficultyGlows[difficultyLevel]}`}>
            <div className={`w-2 h-2 rounded-full bg-linear-to-r ${difficultyColors[difficultyLevel]}`} />
            {problem.difficulty}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors duration-500" />
    </Link>
  );
}