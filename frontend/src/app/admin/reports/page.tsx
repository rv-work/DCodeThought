"use client";

import { useEffect, useState } from "react";
import {
  getAdminReports,
  updateReportStatus,
} from "@/api/admin.report.api";
import type { AdminReport } from "@/types/report";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReport[]>([]);

  useEffect(() => {
    getAdminReports().then((res) => setReports(res.reports));
  }, []);

  const toggle = async (id: string, resolved: boolean) => {
    await updateReportStatus(id, resolved);
    setReports((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, resolved } : r
      )
    );
  };

  return (
    <div>
      <AdminPageHeader title="Reports" />

      <div className="space-y-3">
        {reports.map((r) => (
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
              onChange={(e) =>
                toggle(r._id, e.target.checked)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
