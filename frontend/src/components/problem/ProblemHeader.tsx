import type { ProblemDetail } from "@/types/problem";
import { ExternalLink, Hash, Tag, Code2 } from "lucide-react";

// Tailwind v4 specific gradients
const difficultyColors = {
  Easy: "from-emerald-400 to-green-500",
  Medium: "from-amber-400 to-orange-500",
  Hard: "from-rose-400 to-red-500",
};

const typeColors = {
  potd: "from-blue-500 to-cyan-500",
  contest: "from-purple-500 to-pink-500",
  requested: "from-orange-500 to-red-500",
};

export default function ProblemHeader({ problem }: { problem: ProblemDetail }) {
  return (
    <div className="relative rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-purple-500/20 p-8 md:p-12 overflow-hidden shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)]">

      {/* Decorative internal glows */}
      <div className="absolute top-[-50%] right-[-10%] w-100 h-100 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-100 h-100 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-8">

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border-subtle shadow-sm text-xs font-extrabold text-muted tracking-wide">
            <Hash className="w-3.5 h-3.5" />
            {problem.problemNumber}
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r ${typeColors[problem.type as keyof typeof typeColors]} text-white text-xs font-extrabold uppercase tracking-wider shadow-md`}>
            {problem.type}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border-subtle shadow-sm text-xs font-extrabold text-foreground">
            <div className={`w-2 h-2 rounded-full bg-linear-to-r ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]}`} />
            {problem.difficulty}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
          {problem.title}
        </h1>

        {/* Tags */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Tag className="w-4 h-4 text-purple-400 mr-1" />
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-border-subtle/50">
          <a
            href={problem.leetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-bold text-lg hover:scale-[1.02] transition-transform duration-300 group shadow-xl"
          >
            <Code2 className="w-5 h-5 text-background" />
            <span>Solve on LeetCode</span>
            <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
}