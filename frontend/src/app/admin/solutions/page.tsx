"use client";

import { useEffect, useState } from "react";
import { getAdminSolutions, deleteAdminSolution } from "@/api/admin.solution.api";
import type { Solution } from "@/types/solution";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    getAdminSolutions().then((res) => setSolutions(res.solutions));
  }, []);

  return (
    <div>
      <AdminPageHeader title="Solutions" />

      {solutions.map((s) => (
        <div key={s._id} className="border p-2 flex justify-between">
          <div>
            #{s.problemId.problemNumber} {s.problemId.title}
          </div>
          <button
            onClick={async () => {
              await deleteAdminSolution(s.problemId._id);
              setSolutions((x) =>
                x.filter((y) => y.problemId._id !== s.problemId._id)
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
