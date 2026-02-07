"use client";

import { useEffect, useState } from "react";
import { getAdminProblems, deleteAdminProblem } from "@/api/admin.problem.api";
import type { Problem } from "@/types/problem";
import AdminTable from "@/components/admin/AdminTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Link from "next/link";

export default function AdminProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    getAdminProblems().then((res) => setProblems(res.problems));
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Problems"
        action={
          <Link href="/admin/problems/add" className="underline">
            Add Problem
          </Link>
        }
      />

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
    </div>
  );
}
