import Link from "next/link";
import type { PublicProblem } from "@/types/problem";
import { Code2, ArrowRight } from "lucide-react";

// Tailwind v4 specific gradients
const difficultyColors = {
  Easy: "from-emerald-400 to-green-500",
  Medium: "from-amber-400 to-orange-500",
  Hard: "from-rose-400 to-red-500",
};

const difficultyGlows = {
  Easy: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Medium: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  Hard: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

export default function ContestProblems({
  problems,
}: {
  problems: PublicProblem[];
}) {
  return (
    <div className="space-y-4">
      {problems.map((p, idx) => {
        const difficultyLevel = p.difficulty as keyof typeof difficultyColors;

        return (
          <Link
            key={p.slug}
            href={`/problems/${p.slug}`}
            className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl bg-background-secondary/40 backdrop-blur-sm border border-border-subtle p-5 hover:border-purple-500/40 hover:bg-background-secondary/80 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.1)] transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in-up opacity-0"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {/* Subtle Hover Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Left Side: Q-Number, Title, ID */}
            <div className="relative flex items-center gap-5 w-full md:w-auto">

              {/* Question Number Block */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 font-extrabold shadow-inner group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300 shrink-0">
                Q{idx + 1}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-muted">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>#{p.problemNumber}</span>
                </div>

                <h3 className="font-bold text-lg text-foreground group-hover:text-purple-400 transition-colors">
                  {p.title}
                </h3>
              </div>
            </div>

            {/* Right Side: Difficulty & Arrow */}
            <div className="relative flex items-center w-full md:w-auto justify-between md:justify-end gap-5 mt-2 md:mt-0 pl-17 md:pl-0">

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${difficultyGlows[difficultyLevel]}`}>
                <div className={`w-2 h-2 rounded-full bg-linear-to-r ${difficultyColors[difficultyLevel]}`} />
                {p.difficulty}
              </div>

              <div className="w-10 h-10 rounded-xl bg-background border border-border-subtle flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white transition-all duration-300">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>

            </div>
          </Link>
        );
      })}
    </div>
  );
}