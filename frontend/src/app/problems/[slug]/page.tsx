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
import api from "@/api/axios";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

export default function ProblemDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [p, s] = await Promise.all([
          getProblemDetailBySlug(slug),
          getSolutionBySlug(slug),
        ]);
        setProblem(p.problem);
        setSolution(s.solution);
      } catch (err) {
        toast.error(parseError(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    api.post(`/api/problems/${slug}/view`).catch(() => { });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin relative z-10" />
          </div>
        </div>
      </>
    );
  }

  if (!problem) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="text-center relative z-10 p-10 rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-border-subtle shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-3 text-foreground">Problem Not Found</h2>
            <p className="text-muted text-lg mb-8">
              The problem you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-bold hover:scale-[1.02] hover:shadow-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Library
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-150 h-150 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-[40%] right-0 w-150 h-150 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none "></div>

        <div className="max-w-5xl mx-auto px-6 space-y-10 relative z-10">
          {/* Back Button */}
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-border-subtle text-sm font-bold text-muted hover:text-foreground hover:border-purple-500/50 transition-all group w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Problems
          </Link>

          {/* Problem Header */}
          <div className="animate-fade-in-up">
            <ProblemHeader problem={problem} />
          </div>

          {!solution && (
            <div className="text-muted font-medium bg-background-secondary/40 backdrop-blur-md border border-border-subtle p-6 rounded-2xl text-center">
              Solution has not been published yet. Check back soon!
            </div>
          )}

          {/* Solution Section */}
          {solution && (
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <SolutionSection solution={solution} />
            </div>
          )}

          {/* Comments */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CommentList slug={slug} />
          </div>

          {/* Report Section */}
          <div className="pt-8 border-t border-border-subtle/50 pb-20 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {!showReport ? (
              <button
                onClick={() => setShowReport(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background-secondary border border-border-subtle text-muted hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-500/5 font-bold transition-all cursor-pointer"
              >
                <Flag className="w-4 h-4" />
                Report an issue with this problem
              </button>
            ) : (
              <div className="relative rounded-4xl border border-rose-500/30 bg-background-secondary/60 backdrop-blur-xl p-8 shadow-[0_10px_40px_-10px_rgba(244,63,94,0.1)] animate-fade-in">
                <button
                  onClick={() => setShowReport(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-background border border-border-subtle text-muted hover:text-foreground transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-rose-500">
                    <Flag className="w-5 h-5" />
                    Report Issue
                  </h3>
                  <p className="text-sm text-muted mt-1">Help us improve by describing what is wrong.</p>
                </div>
                <ReportProblem slug={slug} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}