// components/problems/ProblemCard.tsx
import Link from "next/link";
import type { PublicProblem } from "@/types/problem";

export default function ProblemCard({
  problem,
}: {
  problem: PublicProblem;
}) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="border p-4 rounded hover:bg-gray-50 dark:hover:bg-gray-900"
    >
      <div className="font-semibold">
        #{problem.problemNumber} {problem.title}
      </div>

      <div className="text-xs mt-1 flex gap-2">
        <span>{problem.difficulty}</span>
        <span>{problem.type}</span>
      </div>
    </Link>
  );
}
