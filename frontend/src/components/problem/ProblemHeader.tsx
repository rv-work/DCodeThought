import type { ProblemDetail } from "@/types/problem";
import { ExternalLink, Hash, Tag } from "lucide-react";

const difficultyColors = {
  Easy: "from-green-500 to-emerald-500",
  Medium: "from-yellow-500 to-orange-500",
  Hard: "from-red-500 to-pink-500",
};

const typeColors = {
  potd: "from-blue-500 to-cyan-500",
  contest: "from-purple-500 to-pink-500",
  requested: "from-orange-500 to-red-500",
};

export default function ProblemHeader({ problem }: { problem: ProblemDetail }) {
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-accent/10 via-purple-500/10 to-pink-500/10 border border-accent/20 p-10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative space-y-6">
        {/* Problem Number & Type */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary border border-border text-sm font-semibold">
            <Hash className="w-4 h-4" />
            {problem.problemNumber}
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${typeColors[problem.type as keyof typeof typeColors]
              } text-white text-sm font-semibold shadow-lg capitalize`}
          >
            {problem.type}
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary border border-border text-sm font-semibold">
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]
                }`}
            />
            {problem.difficulty}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold">{problem.title}</h1>

        {/* Tags */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-muted" />
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-background-secondary border border-border text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* LeetCode Link */}
        <a
          href={problem.leetcodeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background-secondary border border-border-subtle hover:border-accent hover:shadow-lg transition-all cursor-pointer group"
        >
          <span className="font-semibold">View on LeetCode</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-6 right-6 w-20 h-20 border-l-2 border-b-2 border-accent/20 rounded-bl-2xl" />
    </div>
  );
}