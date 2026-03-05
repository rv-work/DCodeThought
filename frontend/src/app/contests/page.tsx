"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getContests } from "@/api/contest.api";
import type { PublicContest } from "@/types/contest";
import ContestCard from "@/components/contests/ContestCard";
import Pagination from "@/components/problems/Pagination";
import { Trophy, Code2 } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

export default function ContestsPage() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<{
    contests: PublicContest[];
    totalPages: number;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getContests({ page });
        setData({
          contests: res.contests,
          totalPages: res.totalPages,
        });
      } catch (err) {
        toast.error(parseError(err));
      }
    };

    load();
  }, [page]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12 relative overflow-hidden">
        {/* Deep Space Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '2s' }}></div>

        {/* Header Section */}
        <div className="max-w-6xl mx-auto px-6 mb-16 relative z-10">
          <div className="text-center space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold tracking-wide uppercase">
              <Trophy className="w-4 h-4" />
              LeetCode Contests
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Contest <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">Archive</span>
            </h1>

            {/* Description */}
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
              Browse through solved LeetCode contests. Get the intuition and multi-language code for every problem.
            </p>
          </div>
        </div>

        {/* Contests Grid */}
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {data === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-56 rounded-3xl bg-background-secondary/50 backdrop-blur-sm border border-border-subtle animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.contests.map((c, idx) => (
                  <div
                    key={c.contestNumber}
                    className="animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <ContestCard contest={c} />
                  </div>
                ))}
              </div>

              {data.totalPages > 0 && (
                <div className="mt-16">
                  <Pagination
                    page={page}
                    totalPages={data.totalPages}
                    onChange={setPage}
                  />
                </div>
              )}

              {data.contests.length === 0 && (
                <div className="text-center py-24 rounded-[2.5rem] bg-background-secondary/30 backdrop-blur-xl border border-border-subtle shadow-xl mt-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-purple-500/10 mb-6 border border-purple-500/20">
                    <Code2 className="w-12 h-12 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">No Contests Yet</h3>
                  <p className="text-muted text-lg">
                    Contest problems will appear here once they&apos;re added.
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