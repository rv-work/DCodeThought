import Link from "next/link";
import type { PublicContest } from "@/types/contest";
import { Trophy, Calendar, ArrowRight } from "lucide-react";

export default function ContestCard({
  contest,
}: {
  contest: PublicContest;
}) {
  return (
    <Link
      href={`/contests/${contest.contestNumber}`}
      className="group relative block rounded-3xl bg-background-secondary/60 backdrop-blur-xl border border-border-subtle p-7 hover:border-purple-500/30 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative Blur */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors duration-500" />

      {/* Content */}
      <div className="relative z-10 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">Contest</div>
              <div className="font-extrabold text-2xl text-foreground">#{contest.contestNumber}</div>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shadow-sm">
            <ArrowRight className="w-5 h-5 text-purple-500" />
          </div>
        </div>

        {/* Contest Name */}
        <h3 className="font-bold text-lg line-clamp-2 text-foreground group-hover:text-purple-400 transition-colors">
          {contest.contestName}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm font-medium text-muted bg-background/50 px-3 py-1.5 rounded-lg border border-border-subtle">
          <Calendar className="w-4 h-4 text-purple-400" />
          <time dateTime={contest.contestDate}>
            {new Date(contest.contestDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
    </Link>
  );
}