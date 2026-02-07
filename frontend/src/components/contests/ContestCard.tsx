import Link from "next/link";
import type { PublicContest } from "@/types/contest";

export default function ContestCard({
  contest,
}: {
  contest: PublicContest;
}) {
  return (
    <Link
      href={`/contests/${contest.contestNumber}`}
      className="border p-4 rounded block hover:bg-gray-50 dark:hover:bg-gray-900"
    >
      <div className="font-semibold">
        Contest #{contest.contestNumber}
      </div>
      <div className="text-sm">{contest.contestName}</div>
      <div className="text-xs">
        {new Date(contest.contestDate).toDateString()}
      </div>
    </Link>
  );
}
