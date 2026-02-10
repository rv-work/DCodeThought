"use client";

import { useEffect, useState } from "react";
import { getAdminContests, deleteAdminContest } from "@/api/admin.contest.api";
import type { Contest } from "@/types/contest";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Link from "next/link";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

export default function AdminContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminContests().then((res) => {
      setContests(res.contests);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Contests"
        action={
          <Link
            href="/admin/contests/add"
            className="border px-3 py-1 rounded"
          >
            + Add Contest
          </Link>
        }
      />

      {/* 🔄 Loading */}
      {loading && <AdminLoading text="Loading contests..." />}

      {/* 📭 Empty */}
      {!loading && contests.length === 0 && (
        <AdminEmptyState
          title="No contests yet"
          description="Create your first contest to get started."
          action={
            <Link
              href="/admin/contests/add"
              className="border px-3 py-1 rounded"
            >
              + Add Contest
            </Link>
          }
        />
      )}

      {/* 📋 Data */}
      {!loading &&
        contests.length > 0 &&
        contests.map((c) => (
          <div
            key={c._id}
            className="border p-2 flex justify-between"
          >
            <div>
              Contest {c.contestNumber} — {c.contestName}
            </div>
            <button
              onClick={async () => {
                await deleteAdminContest(c._id);
                setContests((x) =>
                  x.filter((y) => y._id !== c._id)
                );
              }}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
