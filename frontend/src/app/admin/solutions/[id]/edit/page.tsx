"use client";

import { useParams } from "next/navigation";
import SolutionForm from "@/components/admin/SolutionForm";

export default function EditSolutionPage() {
  const { id: problemId } = useParams();

  return (
    <SolutionForm
      problemIdFromUrl={problemId as string}
    />
  );
}
