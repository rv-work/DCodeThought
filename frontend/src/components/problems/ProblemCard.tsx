import Link from "next/link";
import type { PublicProblem } from "@/types/problem";

const difficultyColors = {
  Easy: "from-green-500 to-emerald-500",
  Medium: "from-yellow-500 to-orange-500",
  Hard: "from-red-500 to-pink-500",
};

export default function ProblemCard({
  problem,
}: {
  problem: PublicProblem;
}) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group relative block"
    >
      <div className="relative h-full card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${difficultyColors[problem.difficulty]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

        {/* Content */}
        <div className="relative space-y-3">
          {/* Problem Number Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {problem.problemNumber}
              </div>
              <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${difficultyColors[problem.difficulty]} text-white text-xs font-semibold shadow-sm`}>
                {problem.difficulty}
              </div>
            </div>
            <div className="px-3 py-1 rounded-lg bg-background-tertiary border border-border text-xs font-medium capitalize">
              {problem.type}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg group-hover:text-accent transition-colors line-clamp-2">
            {problem.title}
          </h3>

          {/* Arrow Icon */}
          <div className="flex items-center text-sm text-muted group-hover:text-accent transition-colors">
            <span>View Problem</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-border opacity-10 rounded-lg group-hover:rotate-45 transition-transform duration-700"></div>
      </div>
    </Link>
  );
}