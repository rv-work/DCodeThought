"use client";

import { useEffect, useState } from "react";
import { getAdminReports, updateReportStatus } from "@/api/admin.report.api";
import type { AdminReport } from "@/types/report";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminReports().then((res) => {
      setReports(res.reports);
      setLoading(false);
    });
  }, []);

  const toggle = async (id: string, resolved: boolean) => {
    await updateReportStatus(id, resolved);
    setReports((prev) =>
      prev.map((r) => (r._id === id ? { ...r, resolved } : r))
    );
  };

  if (loading) {
    return <AdminLoading text="Loading reports..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Reports"
        description="Review and manage user-submitted reports"
      />

      {reports.length === 0 ? (
        <AdminEmptyState
          title="No reports"
          description="All good! No reports right now."
          icon={
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          }
        />
      ) : (
        <div className="grid gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
          {reports.map((r, idx) => (
            <div
              key={r._id}
              className={`card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0 ${r.resolved ? "opacity-60" : ""
                }`}
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${r.resolved
                    ? "bg-linear-to-br from-green-500 to-emerald-500 text-white"
                    : "bg-linear-to-br from-red-500 to-orange-500 text-white"
                    }`}>
                    {r.resolved ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{r.title}</h3>
                    <p className="text-muted mb-2">{r.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="px-2 py-1 rounded-md bg-background-tertiary border border-border">
                        <span className="text-muted">Reported by: </span>
                        <span className="font-medium">{r.userId.name}</span>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-background-tertiary border border-border">
                        <span className="font-medium">{r.userId.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <label className="flex items-center gap-3 cursor-pointer shrink-0 group">
                  <span className="text-sm font-medium text-muted group-hover:text-foreground transition-colors">
                    {r.resolved ? "Resolved" : "Pending"}
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={r.resolved}
                      onChange={(e) => toggle(r._id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-muted/30 rounded-full peer peer-checked:bg-accent transition-all duration-300"></div>
                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-7 transition-transform duration-300"></div>
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}