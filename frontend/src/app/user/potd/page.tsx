"use client";

import { API } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import POTDCard from "@/components/POTDCard";
import ProblemCard from "@/components/ProblemCard";

export default function TodayPOTDPage() {
  const { data, loading, error } = useFetch(API.potd.today);

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const { potd, recent } = data;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">🔥 Today’s LeetCode POTD</h1>

      {potd ? (
        <POTDCard potd={potd} />
      ) : (
        <EmptyState message="No POTD available for today." />
      )}

      {/* Recent Section */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Recent POTDs</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recent?.length ? (
            recent.map((p: any) => <ProblemCard key={p._id} problem={p} />)
          ) : (
            <EmptyState message="No recent POTDs found." />
          )}
        </div>
      </section>
    </div>
  );
}
