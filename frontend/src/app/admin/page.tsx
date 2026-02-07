"use client";

import { useEffect, useState } from "react";
import { getAdminDashboard } from "@/api/admin.api";
import type { AdminDashboardResponse } from "@/types/admin";

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardResponse | null>(null);

  useEffect(() => {
    getAdminDashboard().then(setData);
  }, []);

  if (!data) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="border p-4 rounded">
          Users: {data.stats.users}
        </div>
        <div className="border p-4 rounded">
          Problems: {data.stats.problems}
        </div>
      </div>

      {/* Recent Reports */}
      <section>
        <h2 className="font-semibold mb-2">Recent Reports</h2>
        {data.recentReports.map((r) => (
          <div key={r._id} className="text-sm">
            {r.title}
          </div>
        ))}
      </section>

      {/* Pending Requests */}
      <section>
        <h2 className="font-semibold mb-2">
          Pending Requested Questions (50+ votes)
        </h2>
        {data.pendingRequests.map((r) => (
          <div key={r._id} className="text-sm">
            {r.title} ({r.votes})
          </div>
        ))}
      </section>
    </div>
  );
}
