"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { getContestDetail } from "@/api/contest.api";
import type { ContestDetail } from "@/types/contest";
import ContestProblems from "@/components/contests/ContestProblems";
import { Calendar, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContestDetailPage() {
  const params = useParams();
  const contestNumber = Number(params.contestNumber);

  const [contest, setContest] = useState<ContestDetail | null>(null);

  useEffect(() => {
    getContestDetail(contestNumber).then((res) => setContest(res.contest));
  }, [contestNumber]);

  if (!contest) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">Loading contest...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          {/* Back Button */}
          <Link
            href="/contests"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Contests
          </Link>

          {/* Contest Header */}
          <div className="relative rounded-3xl bg-linear-to-br from-accent/10 via-purple-500/10 to-pink-500/10 border border-accent/20 p-10 overflow-hidden animate-fade-in-up">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-border-subtle text-sm font-semibold">
                <Trophy className="w-4 h-4 text-accent" />
                Contest #{contest.contestNumber}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold">
                {contest.contestName}
              </h1>

              {/* Date */}
              <div className="flex items-center gap-2 text-muted">
                <Calendar className="w-4 h-4" />
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
            <h2 className="text-2xl font-bold mb-6">Contest Problems</h2>
            <ContestProblems problems={contest.problems} />
          </div>
        </div>
      </div>
    </>
  );
}