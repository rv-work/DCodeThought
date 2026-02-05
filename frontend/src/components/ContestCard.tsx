import Link from "next/link";
import { IContest } from "@/lib/types";

export default function ContestCard({ contest }: { contest: IContest }) {
  return (
    <Link
      href={`/user/contests/${contest.contestNumber}`}
      className="
        block p-4 border border-border rounded-lg shadow-card 
        bg-card hover:border-primary transition
      "
    >
      <h3 className="text-lg font-semibold">{contest.contestName}</h3>
      <p className="text-sm mt-1 text-muted dark:text-muted-dark">
        Contest #{contest.contestNumber}
      </p>
      <p className="text-xs mt-2 opacity-80">
        {new Date(contest.contestDate).toDateString()}
      </p>
    </Link>
  );
}
