"use client";

import { useEffect, useState } from "react";
import {
  getAdminSolutions,
  deleteAdminSolution,
} from "@/api/admin.solution.api";
import type { Solution } from "@/types/solution";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import Link from "next/link";

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminSolutions().then((res) => {
      setSolutions(res.solutions);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Solutions"
        action={
          <Link
            href="/admin/solutions/add"
            className="border px-3 py-1 rounded"
          >
            + Add Solution
          </Link>
        }
      />

      {/* Loading */}
      {loading && <AdminLoading text="Loading solutions..." />}

      {/* Empty */}
      {!loading && solutions.length === 0 && (
        <AdminEmptyState
          title="No solutions yet"
          description="Add solutions for problems to help learners."
          action={
            <Link
              href="/admin/solutions/add"
              className="border px-3 py-1 rounded"
            >
              + Add Solution
            </Link>
          }
        />
      )}

      {/* Data */}
      {!loading &&
        solutions.map((s) => (
          <div
            key={s._id}
            className="border p-3 flex justify-between items-center rounded"
          >
            <div>
              <div className="font-medium">
                #{s.problemId.problemNumber} {s.problemId.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {Object.keys(s.code || {}).length} language(s) •{" "}
                {s.hints?.length || 0} hints
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/admin/solutions/edit/${s.problemId._id}`}
                className="text-sm underline"
              >
                Edit
              </Link>

              <button
                className="text-sm text-red-500"
                onClick={async () => {
                  await deleteAdminSolution(s.problemId._id);
                  setSolutions((prev) =>
                    prev.filter(
                      (x) => x.problemId._id !== s.problemId._id
                    )
                  );
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
