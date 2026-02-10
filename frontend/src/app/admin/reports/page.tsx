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

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Reports" />

      {loading && <AdminLoading text="Loading reports..." />}

      {!loading && reports.length === 0 && (
        <AdminEmptyState
          title="No reports"
          description="All good! No reports right now."
        />
      )}

      {!loading &&
        reports.map((r) => (
          <div
            key={r._id}
            className={`border p-3 flex justify-between ${r.resolved ? "opacity-60" : ""
              }`}
          >
            <div>
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm">{r.description}</div>
              <div className="text-xs">
                {r.userId.name} ({r.userId.email})
              </div>
            </div>

            <input
              type="checkbox"
              checked={r.resolved}
              onChange={(e) => toggle(r._id, e.target.checked)}
            />
          </div>
        ))}
    </div>
  );
}
