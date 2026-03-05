"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { getContestDetail } from "@/api/contest.api";
import type { ContestDetail } from "@/types/contest";
import ContestProblems from "@/components/contests/ContestProblems";
import { Calendar, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

export default function ContestDetailPage() {
  const params = useParams();
  const contestNumber = Number(params.contestNumber);

  const [contest, setContest] = useState<ContestDetail | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContestDetail(contestNumber);
        setContest(res.contest);
      } catch (err) {
        toast.error(parseError(err));
      }
    };
    load();
  }, [contestNumber]);

  if (!contest) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
          {/* Glowing pulse loader */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin relative z-10" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 space-y-10 relative z-10">

          {/* Back Button */}
          <Link
            href="/contests"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-border-subtle text-sm font-bold text-muted hover:text-foreground hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Contests
          </Link>

          {/* Contest Hero Banner */}
          <div className="relative rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-purple-500/20 p-10 md:p-14 overflow-hidden animate-fade-in-up shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)]">
            {/* Massive internal decorative glows */}
            <div className="absolute top-[-50%] right-[-10%] w-100 h-100 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-50%] left-[-10%] w-100 h-100 bg-purple-500/20 rounded-full blur-[100px]" />

            <div className="relative z-10 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold uppercase tracking-wide">
                <Trophy className="w-4 h-4" />
                Contest #{contest.contestNumber}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                {contest.contestName}
              </h1>

              {/* Date */}
              <div className="flex items-center gap-2 text-muted font-medium text-lg bg-background/50 px-4 py-2 rounded-xl border border-border-subtle">
                <Calendar className="w-5 h-5 text-purple-400" />
                <time dateTime={contest.contestDate}>
                  {new Date(contest.contestDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>

          {/* Problems Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-foreground">Contest Problems</h2>
              <div className="h-px flex-1 bg-linear-to-r from-purple-500/20 to-transparent" />
            </div>

            <ContestProblems problems={contest.problems} />
          </div>
        </div>
      </div>
    </>
  );
}