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

  if (loading) {
    return <AdminLoading text="Loading requests..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="User Requests"
        description="Track and manage community feature requests"
      />

      {requests.length === 0 ? (
        <AdminEmptyState
          title="No requests"
          description="Users haven't raised any requests yet."
          icon={
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
          }
        />
      ) : (
        <div className="grid gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
          {requests.map((r, idx) => (
            <div
              key={r._id}
              className={`card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0 ${r.completed ? "opacity-60" : ""
                }`}
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${r.completed
                    ? "bg-linear-to-br from-green-500 to-emerald-500 text-white"
                    : "bg-linear-to-br from-blue-500 to-cyan-500 text-white"
                    }`}>
                    {r.completed ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${r.type === "feature"
                        ? "bg-purple-500/10 text-purple-500"
                        : "bg-blue-500/10 text-blue-500"
                        }`}>
                        {r.type}
                      </span>
                      <h3 className="font-bold text-lg">{r.title}</h3>
                    </div>
                    <p className="text-muted mb-3">{r.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        {r.votes} votes
                      </div>
                      <div className="px-2 py-1 rounded-md bg-background-tertiary border border-border">
                        <span className="text-muted">by </span>
                        <span className="font-medium">{r.createdBy.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <label className="flex items-center gap-3 cursor-pointer shrink-0 group">
                  <span className="text-sm font-medium text-muted group-hover:text-foreground transition-colors">
                    {r.completed ? "Completed" : "Pending"}
                  </span>
                  <div className="relative">
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