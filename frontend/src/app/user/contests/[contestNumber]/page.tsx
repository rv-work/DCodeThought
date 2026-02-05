"use client";

import { API } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProblemCard from "@/components/ProblemCard";

export default function ContestDetail({
  params,
}: {
  params: { contestNumber: string };
}) {
  const url = API.contests.one(params.contestNumber);
  const { data, loading, error } = useFetch(url);

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const contest = data.contest;
  const problems = data.problems;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section>
        <h1 className="text-3xl font-bold">{contest.contestName}</h1>
        <p className="text-primary text-sm mt-1">
          Contest #{contest.contestNumber}
        </p>
        <p className="mt-1 text-muted dark:text-muted-dark">
          {new Date(contest.contestDate).toDateString()}
        </p>
      </section>

      {/* PROBLEMS */}
      <section>
        <h2 className="text-2xl font-bold mb-3">🧩 Problems</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems?.length ? (
            problems.map((p: any) => <ProblemCard key={p._id} problem={p} />)
          ) : (
            <EmptyState message="No problems found in this contest." />
          )}
        </div>
      </section>
    </div>
  );
}
