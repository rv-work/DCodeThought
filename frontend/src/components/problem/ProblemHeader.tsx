import type { ProblemDetail } from "@/types/problem";

export default function ProblemHeader({
  problem,
}: {
  problem: ProblemDetail;
}) {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">
        #{problem.problemNumber} {problem.title}
      </h1>

      <div className="text-sm flex gap-3">
        <span>{problem.difficulty}</span>
        <span>{problem.type}</span>
      </div>

      <div className="flex gap-2 text-xs">
        {problem.tags.map((t) => (
          <span key={t} className="border px-2 py-0.5">
            {t}
          </span>
        ))}
      </div>

      <a
        href={problem.leetcodeLink}
        target="_blank"
        className="text-sm underline"
      >
        View on LeetCode
      </a>
    </div>
  );
}
