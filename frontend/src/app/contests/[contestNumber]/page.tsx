"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { getContestDetail } from "@/api/contest.api";
import type { ContestDetail } from "@/types/contest";
import ContestProblems from "@/components/contests/ContestProblems";

export default function ContestDetailPage() {
  const params = useParams();
  const contestNumber = Number(params.contestNumber);

  const [contest, setContest] = useState<ContestDetail | null>(null);

  useEffect(() => {
    getContestDetail(contestNumber).then((res) =>
      setContest(res.contest)
    );
  }, [contestNumber]);

  if (!contest) return null;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <h1 className="text-xl font-bold">
          Contest #{contest.contestNumber}
        </h1>

        <div className="text-sm">{contest.contestName}</div>
        <div className="text-xs">
          {new Date(contest.contestDate).toDateString()}
        </div>

        <ContestProblems problems={contest.problems} />
      </div>
    </>
  );
}
