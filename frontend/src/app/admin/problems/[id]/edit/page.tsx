"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAdminProblemById } from "@/api/admin.problem.api";
import ProblemForm from "@/components/admin/ProblemForm";
import AdminLoading from "@/components/admin/AdminLoading";
import type { ProblemDetail } from "@/types/problem";

export default function EditProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<ProblemDetail | null>(null);

  useEffect(() => {
    if (id) {
      getAdminProblemById(id as string).then((res) =>
        setProblem(res.problem)
      );
    }
  }, [id]);

  if (!problem) return <AdminLoading text="Loading problem..." />;

  return <ProblemForm initialData={problem} isEdit />;
}
