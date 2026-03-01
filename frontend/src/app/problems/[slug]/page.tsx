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
import { ArrowLeft, Flag, X } from "lucide-react";
import Link from "next/link";

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);

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
              The problem you&apos;re looking for doesn&apos;t exist
            </p>
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:shadow-lg transition-all"
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
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Problems
          </Link>

          {/* Problem Header */}
          <ProblemHeader problem={problem} />

          {/* Solution Section */}
          {solution && <SolutionSection solution={solution} />}

          {/* Comments */}
          <CommentList slug={slug} />

          {/* Report Toggle Button */}
          <div className="pt-4">
            {!showReport ? (
              <button
                onClick={() => setShowReport(true)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-linear-to-r from-red-500 to-orange-500 text-white font-medium hover:shadow-lg transition-all"
              >
                <Flag className="w-4 h-4" />
                Report this problem
              </button>
            ) : (
              <div className="relative rounded-2xl border border-border-subtle bg-background-secondary p-6 animate-fade-in">
                {/* Close button */}
                <button
                  onClick={() => setShowReport(false)}
                  className="absolute top-4 right-4 text-muted hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>

                <ReportProblem slug={slug} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}