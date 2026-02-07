import Link from "next/link";
import type { PublicProblem } from "@/types/problem";

export default function ContestProblems({
  problems,
}: {
  problems: PublicProblem[];
}) {
  return (
    <div className="space-y-3">
      {problems.map((p, idx) => (
        <Link
          key={p.slug}
          href={`/problems/${p.slug}`}
          className="border p-3 block rounded"
        >
          <div className="font-semibold">
            Q{idx + 1}. #{p.problemNumber} {p.title}
          </div>
          <div className="text-xs">{p.difficulty}</div>
        </Link>
      ))}
    </div>
  );
}
