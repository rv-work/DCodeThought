"use client";

import { useEffect, useState } from "react";
import { getAdminProblems, deleteAdminProblem } from "@/api/admin.problem.api";
import type { PublicProblem } from "@/types/problem";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import Link from "next/link";

export default function AdminProblemsPage() {
  const [problems, setProblems] = useState<PublicProblem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminProblems().then((res) => {
      setProblems(res.problems);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <AdminLoading text="Loading problems..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Problems"
        description="Manage all coding problems on the platform"
        action={
          <Link
            href="/admin/problems/add"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Problem
          </Link>
        }
      />

      {problems.length === 0 ? (
        <AdminEmptyState
          title="No problems found"
          description="Start by adding problems to your platform."
          action={
            <Link
              href="/admin/problems/add"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Problem
            </Link>
          }
          icon={
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-accent/10 to-purple-500/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          }
        />
      ) : (
        <AdminTable
          columns={[
            { key: "problemNumber", label: "#" },
            { key: "title", label: "Title" },
            { key: "difficulty", label: "Difficulty" },
            { key: "type", label: "Type" },
          ]}
          data={problems}
          editPath="/admin/problems"
          onDelete={async (id) => {
            await deleteAdminProblem(id);
            setProblems((p) => p.filter((x) => x._id !== id));
          }}
        />
      )}
    </div>
  );
}