"use client";

import { useEffect, useState } from "react";
import {
  getAdminRequests,
  updateRequestStatus,
} from "@/api/admin.request.api";
import type { AdminRequest } from "@/types/request";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminRequests().then((res) => {
      setRequests(res.requests);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Requests" />

      {loading && <AdminLoading text="Loading requests..." />}

      {!loading && requests.length === 0 && (
        <AdminEmptyState
          title="No requests"
          description="Users haven’t raised any requests yet."
        />
      )}

      {!loading &&
        requests.map((r) => (
          <div
            key={r._id}
            className={`border p-3 flex justify-between ${r.completed ? "opacity-60" : ""
              }`}
          >
            <div>
              <div className="font-semibold">
                [{r.type}] {r.title}
              </div>
              <div className="text-sm">{r.description}</div>
              <div className="text-xs">
                Votes: {r.votes} | {r.createdBy.name}
              </div>
            </div>

            <input
              type="checkbox"
              checked={r.completed}
              onChange={(e) => {
                updateRequestStatus(r._id, e.target.checked);
                setRequests((prev) =>
                  prev.map((x) =>
                    x._id === r._id
                      ? { ...x, completed: e.target.checked }
                      : x
                  )
                );
              }}
            />
          </div>
        ))}
    </div>
  );
}
