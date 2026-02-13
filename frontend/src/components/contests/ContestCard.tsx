import Link from "next/link";
import type { PublicContest } from "@/types/contest";
import { Trophy, Calendar, ChevronRight } from "lucide-react";

export default function ContestCard({
  contest,
}: {
  contest: PublicContest;
}) {
  return (
    <Link
      href={`/contests/${contest.contestNumber}`}
      className="group relative block rounded-2xl bg-background-secondary border border-border-subtle p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-muted">Contest</div>
              <div className="font-bold text-lg">#{contest.contestNumber}</div>
            </div>
          </div>

          <div className="w-8 h-8 rounded-lg bg-background-tertiary flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            <ChevronRight className="w-5 h-5 text-accent" />
          </div>
        </div>

        {/* Contest Name */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-accent transition-colors">
          {contest.contestName}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted">
          <Calendar className="w-4 h-4" />
          <time dateTime={contest.contestDate}>
            {new Date(contest.contestDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-border opacity-10 rounded-full group-hover:scale-125 transition-transform duration-700" />
    </Link>
  );
}