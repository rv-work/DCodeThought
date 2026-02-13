import Link from "next/link";
import type { PublicProblem } from "@/types/problem";
import { Code2, ArrowRight, Calendar, Trophy, Users } from "lucide-react";

const difficultyColors = {
  Easy: "from-green-500 to-emerald-500",
  Medium: "from-yellow-500 to-orange-500",
  Hard: "from-red-500 to-pink-500",
};

const typeIcons = {
  potd: Calendar,
  contest: Trophy,
  requested: Users,
};

export default function ProblemCard({ problem }: { problem: PublicProblem }) {
  const TypeIcon = typeIcons[problem.type as keyof typeof typeIcons] || Code2;

  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group relative block rounded-2xl bg-background-secondary border border-border-subtle p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Code2 className="w-4 h-4" />
            <span>#{problem.problemNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Type badge */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/10 text-accent text-xs font-semibold">
              <TypeIcon className="w-3 h-3" />
              <span className="capitalize">{problem.type}</span>
            </div>

            {/* Arrow icon */}
            <div className="w-8 h-8 rounded-lg bg-background-tertiary flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <ArrowRight className="w-4 h-4 text-accent" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-accent transition-colors">
          {problem.title}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Difficulty badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold bg-background-tertiary border border-border">
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]
                }`}
            />
            {problem.difficulty}
          </div>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-border opacity-10 rounded-lg group-hover:rotate-45 transition-transform duration-700" />
    </Link>
  );
}