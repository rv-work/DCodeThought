import Link from "next/link";
import type { RecentView } from "@/types/profile";

export default function RecentProblems({
  recent,
}: {
  recent: RecentView[];
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Recently Viewed</h3>

      {recent.map((r) => (
        <Link
          key={r.problemId.slug}
          href={`/problems/${r.problemId.slug}`}
          className="block text-sm underline"
        >
          #{r.problemId.problemNumber} {r.problemId.title}
        </Link>
      ))}
    </div>
  );
}
