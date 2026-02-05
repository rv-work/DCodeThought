import Link from "next/link";
import { IProblem } from "@/lib/types";

export default function ProblemCard({ problem }: { problem: IProblem }) {
  return (
    <Link
      href={`/user/problems/${problem.slug}`}
      className="
        block p-4 rounded-lg border border-border bg-card shadow-card
        hover:border-primary transition
      "
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {problem.problemNumber}. {problem.title}
        </h3>

        <span
          className="
            text-xs px-2 py-1 rounded bg-primary text-white
          "
        >
          {problem.difficulty}
        </span>
      </div>

      <div className="mt-2 flex gap-2 flex-wrap">
        {problem.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded bg-background border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
