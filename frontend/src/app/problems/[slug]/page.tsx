// app/problems/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { getProblemDetailBySlug } from "@/api/problem.api";
import type { ProblemDetail } from "@/types/problem";
import ProblemHeader from "@/components/problem/ProblemHeader";
import { getSolutionBySlug } from "@/api/solution.api";
import SolutionSection from "@/components/problem/SolutionSection";
import type { Solution } from "@/types/solution";
import CommentList from "@/components/comments/CommentList";
import ReportProblem from "@/components/report/ReportProblem";


export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);

  useEffect(() => {
    getProblemDetailBySlug(slug).then((res) =>
      setProblem(res.problem)
    );
  }, [slug]);

  useEffect(() => {
    getSolutionBySlug(slug).then((res) =>
      setSolution(res.solution)
    );
  }, [slug]);

  if (!problem) return null;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ProblemHeader problem={problem} />

        {solution && <SolutionSection solution={solution} />}

        <CommentList slug={slug} />

        <ReportProblem slug={slug} />

      </div>
    </>
  );
}
