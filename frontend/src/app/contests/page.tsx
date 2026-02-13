"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getContests } from "@/api/contest.api";
import type { PublicContest } from "@/types/contest";
import ContestCard from "@/components/contests/ContestCard";
import Pagination from "@/components/problems/Pagination";
import { Trophy, Code2 } from "lucide-react";

export default function ContestsPage() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<{
    contests: PublicContest[];
    totalPages: number;
  } | null>(null);

  useEffect(() => {
    getContests({ page }).then((res) =>
      setData({
        contests: res.contests,
        totalPages: res.totalPages,
      })
    );
  }, [page]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <Trophy className="w-4 h-4" />
              LeetCode Contests
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Contest Archive
            </h1>

            {/* Description */}
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Browse through solved LeetCode contests with detailed explanations for every problem
            </p>
          </div>
        </div>

        {/* Contests Grid */}
        <div className="max-w-6xl mx-auto px-6">
          {data === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl bg-background-secondary border border-border-subtle animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {data.contests.map((c) => (
                  <ContestCard key={c.contestNumber} contest={c} />
                ))}
              </div>

              {data.totalPages > 0 && (
                <div className="mt-12">
                  <Pagination
                    page={page}
                    totalPages={data.totalPages}
                    onChange={setPage}
                  />
                </div>
              )}

              {data.contests.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mb-6">
                    <Code2 className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Contests Yet</h3>
                  <p className="text-muted">
                    Contest problems will appear here once they&apos;re added
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}