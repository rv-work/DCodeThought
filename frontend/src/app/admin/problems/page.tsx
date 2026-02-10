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

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Problems"
        action={
          <Link href="/admin/problems/add" className="underline">
            Add Problem
          </Link>
        }
      />

      {loading && <AdminLoading text="Loading problems..." />}

      {!loading && problems.length === 0 && (
        <AdminEmptyState
          title="No problems found"
          description="Start by adding problems to your platform."
          action={
            <Link href="/admin/problems/add" className="underline">
              Add Problem
            </Link>
          }
        />
      )}

      {!loading && problems.length > 0 && (
        <AdminTable
          columns={[
            { key: "problemNumber", label: "#" },
            { key: "title", label: "Title" },
            { key: "difficulty", label: "Difficulty" },
            { key: "type", label: "Type" },
          ]}
          data={problems}
          onDelete={async (id) => {
            await deleteAdminProblem(id);
            setProblems((p) => p.filter((x) => x._id !== id));
          }}
        />
      )}
    </div>
  );
}
