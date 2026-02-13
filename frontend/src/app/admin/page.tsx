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
    <div className="space-y-8">
      {/* Page Title */}
      <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted">Monitor your platform&apos;s key metrics and activities</p>
      </div>

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Users"
          value={data.stats.users}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          gradient="from-blue-500 to-cyan-500"
          delay="0.1s"
        />
        <StatCard
          label="Total Problems"
          value={data.stats.problems}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          gradient="from-purple-500 to-pink-500"
          delay="0.2s"
        />
        <StatCard
          label="Total Solutions"
          value={data.stats.solutions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          gradient="from-green-500 to-emerald-500"
          delay="0.3s"
        />
        <StatCard
          label="Total Contests"
          value={data.stats.contests}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
          gradient="from-orange-500 to-red-500"
          delay="0.4s"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 🚨 RECENT REPORTS */}
        <section className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
          <SectionHeader title="Recent Reports" link="/admin/reports" />

          <div className="card">
            {data.recentReports.length === 0 ? (
              <AdminEmptyState
                title="No reports"
                description="All clear! No unresolved reports."
              />
            ) : (
              <div className="space-y-3">
                {data.recentReports.map((r, idx) => (
                  <div
                    key={r._id}
                    className="p-4 rounded-xl bg-background-tertiary border border-border hover:border-accent transition-all duration-300 hover:shadow-md cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium group-hover:text-accent transition-colors">{r.title}</div>
                        <div className="text-xs text-muted mt-1">Report #{idx + 1}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 🔥 HIGH PRIORITY REQUESTS */}
        <section className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.6s" }}>
          <SectionHeader
            title="High Priority Requests"
            subtitle="50+ votes"
            link="/admin/requests"
          />

          <div className="card">
            {data.pendingRequests.length === 0 ? (
              <AdminEmptyState
                title="No high priority requests"
                description="Nothing urgent at the moment."
              />
            ) : (
              <div className="space-y-3">
                {data.pendingRequests.map((r) => (
                  <div
                    key={r._id}
                    className="p-4 rounded-xl bg-background-tertiary border border-border hover:border-accent transition-all duration-300 hover:shadow-md cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium group-hover:text-accent transition-colors">{r.title}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        {r.votes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- helper components ---------------- */

function StatCard({
  label,
  value,
  icon,
  gradient,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  delay: string;
}) {
  return (
    <div
      className="group relative rounded-2xl bg-background-secondary border border-border-subtle p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-scale-in opacity-0 cursor-default"
      style={{ animationDelay: delay }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${gradient} text-white mb-4 shadow-lg relative`}>
        {icon}
      </div>

      {/* Value */}
      <div className="text-4xl font-bold mb-1 relative">{value}</div>

      {/* Label */}
      <div className="text-sm text-muted font-medium relative">{label}</div>

      {/* Decorative corner */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-border opacity-20 group-hover:opacity-40 transition-opacity"></div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  link,
}: {
  title: string;
  subtitle?: string;
  link: string;
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
      </div>
      <Link
        href={link}
        className="flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all duration-300 cursor-pointer group"
      >
        <span className="font-medium">View all</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
}