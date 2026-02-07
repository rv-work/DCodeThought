"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getContests } from "@/api/contest.api";
import type { PublicContest } from "@/types/contest";
import ContestCard from "@/components/contests/ContestCard";
import Pagination from "@/components/problems/Pagination";

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

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-bold mb-4">Contests</h1>

        <div className="grid gap-4">
          {data?.contests.map((c) => (
            <ContestCard key={c.contestNumber} contest={c} />
          ))}
        </div>

        {data && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        )}
      </div>
    </>
  );
}
