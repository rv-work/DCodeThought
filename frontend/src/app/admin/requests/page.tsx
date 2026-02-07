"use client";

import { useEffect, useState } from "react";
import {
  getAdminRequests,
  updateRequestStatus,
} from "@/api/admin.request.api";
import type { AdminRequest } from "@/types/request";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<AdminRequest[]>([]);

  useEffect(() => {
    getAdminRequests().then((res) => setRequests(res.requests));
  }, []);

  return (
    <div>
      <AdminPageHeader title="Requests" />

      <div className="space-y-3">
        {requests.map((r) => (
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
    </div>
  );
}
