"use client";

import { useEffect, useState } from "react";
import { getAdminDashboard } from "@/api/admin.api";
import type { AdminDashboardResponse } from "@/types/admin";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err: Error) => {
        alert(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <AdminLoading text="Loading dashboard..." />;
  }

  if (!data) {
    return (
      <AdminEmptyState
        title="Dashboard unavailable"
        description="Something went wrong while loading dashboard data."
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Users" value={data.stats.users} />
        <StatCard label="Problems" value={data.stats.problems} />
        <StatCard label="Solutions" value={data.stats.solutions} />
        <StatCard label="Contests" value={data.stats.contests} />
      </div>

      {/* 🚨 RECENT REPORTS */}
      <section>
        <SectionHeader title="Recent Reports" link="/admin/reports" />

        {data.recentReports.length === 0 ? (
          <AdminEmptyState
            title="No reports"
            description="All clear! No unresolved reports."
          />
        ) : (
          <div className="space-y-2">
            {data.recentReports.map((r) => (
              <div
                key={r._id}
                className="border p-2 rounded text-sm"
              >
                {r.title}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🔥 HIGH PRIORITY REQUESTS */}
      <section>
        <SectionHeader
          title="High Priority Requests (50+ votes)"
          link="/admin/requests"
        />

        {data.pendingRequests.length === 0 ? (
          <AdminEmptyState
            title="No high priority requests"
            description="Nothing urgent at the moment."
          />
        ) : (
          <div className="space-y-2">
            {data.pendingRequests.map((r) => (
              <div
                key={r._id}
                className="border p-2 rounded text-sm flex justify-between"
              >
                <span>{r.title}</span>
                <span className="text-muted-foreground">
                  {r.votes} votes
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------------- helper components ---------------- */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border p-4 rounded">
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

function SectionHeader({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="font-semibold">{title}</h2>
      <Link href={link} className="text-sm underline">
        View all
      </Link>
    </div>
  );
}
