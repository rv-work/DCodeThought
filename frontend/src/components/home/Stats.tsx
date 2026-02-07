"use client";

import { useEffect, useState } from "react";
import { getHomeStats } from "@/api/home.api";
import type { HomeStats } from "@/types/home";

export default function Stats() {
  const [stats, setStats] = useState<HomeStats | null>(null);

  useEffect(() => {
    getHomeStats().then((res) => setStats(res.stats));
  }, []);

  if (!stats) return null;

  return (
    <section className="py-10 flex justify-center gap-6 text-sm">
      <div>{stats.totalProblems} Problems</div>
      <div>{stats.totalPotds} POTDs</div>
      <div>{stats.totalContests} Contests</div>
      <div>{stats.completedRequests} Requests Completed</div>
      <div>{stats.resolvedReports} Reports Resolved</div>
    </section>
  );
}
