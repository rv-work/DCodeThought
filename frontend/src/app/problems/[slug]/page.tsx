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
import { Layers, Users } from "lucide-react"; // Icons for tabs
import CommunitySolutionsTab from "@/components/problems/Community/CommunitySolutionsTab";
import { ArrowLeft, Flag, X, Youtube } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"official" | "community">("official");

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
            <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-[80px] animate-pulse"></div>
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
          {/* v4 native width/height w-125 h-125 -> 500px */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="text-center relative z-10 p-12 rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-border-subtle shadow-2xl">
            <h2 className="text-4xl font-extrabold mb-4 text-foreground">Problem Not Found</h2>
            <p className="text-muted text-lg mb-8">
              The challenge you&apos;re looking for has vanished into the void.
            </p>
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-foreground text-background font-bold hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
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

      <div className="min-h-screen bg-background pb-20 pt-8 relative overflow-hidden">
        {/* Massive Ambient Glows (v4: w-200 h-200 -> 800px) */}
        <div className="top-0 left-[-10%] w-200 h-200 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none fixed"></div>
        <div className=" top-[20%] right-[-10%] w-200 h-200 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none fixed"></div>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top Navigation Bar */}
          <div className="mb-8 animate-fade-in-up">
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background-secondary/80 backdrop-blur-md border border-border-subtle text-sm font-bold text-muted hover:text-foreground hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all group w-fit"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Problems
            </Link>
          </div>

          {/* TWO COLUMN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* LEFT COLUMN (Scrollable Context) */}
            <div className="xl:col-span-5 space-y-8 flex flex-col">

              <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <ProblemHeader problem={problem} />
              </div>

              {/* YouTube Video Link */}
              {solution?.youtubeLink && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <a
                    href={solution.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-5 p-6 rounded-4xl bg-background-secondary/40 backdrop-blur-xl border border-rose-500/30 hover:border-rose-500/60 transition-all cursor-pointer group overflow-hidden shadow-[0_10px_40px_-10px_rgba(244,63,94,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(244,63,94,0.2)]"
                  >
                    {/* v4 Gradient Syntax */}
                    <div className="absolute inset-0 bg-linear-to-r from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 shrink-0 relative z-10">
                      <Youtube className="w-8 h-8" />
                    </div>

                    <div className="flex-1 relative z-10">
                      <div className="font-extrabold text-xl text-foreground mb-1 group-hover:text-rose-500 transition-colors">Video Walkthrough</div>
                      <div className="text-muted text-sm">Watch the step-by-step visual explanation</div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:translate-x-2 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 relative z-10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </a>
                </div>
              )}

              <div className="animate-fade-in-up flex-1" style={{ animationDelay: "0.3s" }}>
                <CommentList slug={slug} />
              </div>

              {/* Report Section */}
              <div className="animate-fade-in-up pt-4" style={{ animationDelay: "0.4s" }}>
                {!showReport ? (
                  <button
                    onClick={() => setShowReport(true)}
                    className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-2xl bg-background-secondary/40 backdrop-blur-md border border-border-subtle text-muted hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-500/5 font-bold transition-all cursor-pointer"
                  >
                    <Flag className="w-4 h-4" />
                    Report an issue with this problem
                  </button>
                ) : (
                  <div className="relative rounded-3xl border border-rose-500/30 bg-background-secondary/60 backdrop-blur-xl p-8 shadow-[0_10px_40px_-10px_rgba(244,63,94,0.1)] animate-fade-in">
                    <button
                      onClick={() => setShowReport(false)}
                      className="absolute top-6 right-6 p-2 rounded-full bg-background border border-border-subtle text-muted hover:text-foreground transition-all cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <ReportProblem slug={slug} />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN (Sticky Logic & Code) */}
            <div className="xl:col-span-7 relative h-full">
              <div className="sticky top-24 space-y-6 animate-fade-in-up pb-10" style={{ animationDelay: "0.2s" }}>

                {/* TABS CONTROLS - Naya UI Elements */}
                <div className="flex items-center gap-2 p-1.5 bg-background-secondary/60 backdrop-blur-xl border border-border-subtle rounded-2xl w-fit shadow-lg">
                  <button
                    onClick={() => setActiveTab("official")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "official"
                      ? "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                      : "text-muted hover:text-foreground hover:bg-background/50"
                      }`}
                  >
                    <Layers className="w-4 h-4" /> Official Solution
                  </button>

                  <button
                    onClick={() => setActiveTab("community")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === "community"
                      ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                      : "text-muted hover:text-foreground hover:bg-background/50"
                      }`}
                  >
                    <Users className="w-4 h-4" /> Community Approaches
                  </button>
                </div>

                {activeTab === "official" ? (
                  loading ? (
                    /* 1. Jab tak API fetch ho raha hai - Loading State */
                    <div className="flex flex-col items-center justify-center h-125 text-muted font-medium bg-background-secondary/20 backdrop-blur-2xl border border-border-subtle p-10 rounded-[2.5rem] text-center shadow-2xl">
                      <div className="w-20 h-20 mb-6 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Fetching Solution...</h3>
                      <p>Please wait while we retrieve the official guide.</p>
                    </div>
                  ) : !solution ? (
                    /* 2. Jab Loading khatam ho gayi aur solution nahi mila - Not Found State */
                    <div className="flex flex-col items-center justify-center h-125 text-muted font-medium bg-background-secondary/20 backdrop-blur-2xl border border-border-subtle p-10 rounded-[2.5rem] text-center shadow-2xl">
                      <div className="w-20 h-20 mb-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <Layers className="w-10 h-10 text-amber-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Not Uploaded Yet</h3>
                      <p>The official solution for this problem hasn&apos;t been published. <br /> Check back later or explore community approaches!</p>
                    </div>
                  ) : (
                    /* 3. Jab solution mil gaya - Success State */
                    <SolutionSection solution={solution} />
                  )
                ) : (
                  <CommunitySolutionsTab problemId={problem._id} />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}