"use client";

import { API } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import POTDCard from "@/components/POTDCard";
import ProblemCard from "@/components/ProblemCard";
import ContestCard from "@/components/ContestCard";

export default function HomePage() {
  const { data, loading, error } = useFetch(API.potd.today.replace("/today", "/home"));
  // backend route: /potd/home → returns full home data

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const { todayPOTD, recentPOTDs, trendingProblems, latestContests } = data;

  return (
    <div className="space-y-10">

      {/* POTD */}
      {todayPOTD ? (
        <POTDCard potd={todayPOTD} />
      ) : (
        <EmptyState message="No POTD available today" />
      )}

      {/* Recent POTDs */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Recent POTDs</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentPOTDs?.length ? (
            recentPOTDs.map((p: any) => <ProblemCard key={p._id} problem={p} />)
          ) : (
            <EmptyState message="No recent POTDs" />
          )}
        </div>
      </section>

      {/* Trending Problems */}
      <section>
        <h2 className="text-2xl font-bold mb-3">🔥 Trending Problems</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trendingProblems?.length ? (
            trendingProblems.map((p: any) => <ProblemCard key={p._id} problem={p} />)
          ) : (
            <EmptyState message="No trending problems" />
          )}
        </div>
      </section>

      {/* Latest Contests */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Upcoming Contests</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestContests?.length ? (
            latestContests.map((c: any) => (
              <ContestCard key={c._id} contest={c} />
            ))
          ) : (
            <EmptyState message="No contests available" />
          )}
        </div>
      </section>

    </div>
  );
}
