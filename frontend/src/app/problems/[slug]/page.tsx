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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProblemDetailBySlug(slug).then((res) => setProblem(res.problem)),
      getSolutionBySlug(slug).then((res) => setSolution(res.solution)),
    ]).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">Loading problem...</p>
          </div>
        </div>
      </>
    );
  }

  if (!problem) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Problem Not Found</h2>
            <p className="text-muted mb-6">
              The problem you're looking for doesn't exist
            </p>
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:shadow-lg transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Problems
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          {/* Back Button */}
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Problems
          </Link>

          {/* Problem Header */}
          <div className="animate-fade-in-up">
            <ProblemHeader problem={problem} />
          </div>

          {/* Solution Section */}
          {solution && (
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <SolutionSection solution={solution} />
            </div>
          )}

          {/* Comments Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CommentList slug={slug} />
          </div>

          {/* Report Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <ReportProblem slug={slug} />
          </div>
        </div>
      </div>
    </>
  );
}