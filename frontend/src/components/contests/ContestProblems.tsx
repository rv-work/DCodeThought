import Link from "next/link";
import type { PublicProblem } from "@/types/problem";
import { Code2, ArrowRight } from "lucide-react";

const difficultyColors = {
  Easy: "from-green-500 to-emerald-500",
  Medium: "from-yellow-500 to-orange-500",
  Hard: "from-red-500 to-pink-500",
};

export default function ContestProblems({
  problems,
}: {
  problems: PublicProblem[];
}) {
  return (
    <div className="space-y-4">
      {problems.map((p, idx) => (
        <Link
          key={p.slug}
          href={`/problems/${p.slug}`}
          className="group relative block rounded-2xl bg-background-secondary border border-border-subtle p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              {/* Question Number Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent font-bold">
                  Q{idx + 1}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Code2 className="w-4 h-4" />
                  <span>#{p.problemNumber}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                {p.title}
              </h3>

              {/* Difficulty Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold bg-background-tertiary border border-border">
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${difficultyColors[p.difficulty as keyof typeof difficultyColors]
                    }`}
                />
                {p.difficulty}
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="w-10 h-10 rounded-lg bg-background-tertiary flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              <ArrowRight className="w-5 h-5 text-accent" />
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-border opacity-10 rounded-lg group-hover:rotate-45 transition-transform duration-700" />
        </Link>
      ))}
    </div>
  );
}