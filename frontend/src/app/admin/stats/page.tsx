"use client";

import { API } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import StatCard from "@/components/StatCard";

export default function AdminStatsPage() {
  const { data, loading, error } = useFetch(API.stats.all);

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const stats = data || {};

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">📊 Platform Statistics</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard label="Total Users" value={stats.users} />
        <StatCard label="Problems Added" value={stats.problems} />
        <StatCard label="Solutions Uploaded" value={stats.solutions} />
        <StatCard label="Contests" value={stats.contests} />
        <StatCard label="Total POTDs" value={stats.potdCount} />
        <StatCard
          label="New Users Today"
          value={stats.todayUsers}
        />
      </div>

      {/* FUTURE ANALYTICS */}
      <div className="p-6 border border-border bg-card rounded-lg shadow-card">
        <h2 className="text-xl font-semibold mb-2">
          📈 Growth (Coming Soon)
        </h2>
        <p className="text-muted dark:text-muted-dark">
          Charts for weekly / monthly growth will be added later.
        </p>
      </div>
    </div>
  );
}
