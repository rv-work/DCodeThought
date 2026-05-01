"use client";

import { useEffect, useState, useMemo } from "react";
import { getProblemSolutions } from "@/api/communitySolution.api";
import { CommunitySolutionData } from "@/types/communitySolution";
import SolutionCard from "./SolutionCard";
import SubmitSolutionForm from "./SubmitSolutionForm";
import { Users, Medal, ThumbsUp, Lightbulb, Sparkles, Plus, X, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

export default function CommunitySolutionsTab({ problemId }: { problemId: string }) {
  const [solutions, setSolutions] = useState<CommunitySolutionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  // 👇 FIX: Get user from auth
  const { user } = useAuth();

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const res = await getProblemSolutions(problemId);
      setSolutions(res.solutions);
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

  // Logic to categorize solutions
  const categorized = useMemo(() => {
    if (!solutions.length) return { best: null, helpful: null, simplest: null, creative: null, rest: [] };

    const remaining = [...solutions];

    const extractMax = (key: keyof CommunitySolutionData["tagCounts"]) => {
      if (!remaining.length) return null;
      let maxIdx = 0;
      let maxVal = remaining[0].tagCounts[key];

      for (let i = 1; i < remaining.length; i++) {
        if (remaining[i].tagCounts[key] > maxVal) {
          maxVal = remaining[i].tagCounts[key];
          maxIdx = i;
        }
      }

      if (maxVal === 0) return null;

      const best = remaining[maxIdx];
      remaining.splice(maxIdx, 1);
      return best;
    };

    const best = extractMax("totalScore");
    const helpful = extractMax("helpful");
    const simplest = extractMax("simplest");
    const creative = extractMax("creative");

    return { best, helpful, simplest, creative, rest: remaining };
  }, [solutions]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-muted">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
        <p>Loading community brilliance...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up w-full">

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[2.5rem] bg-background-secondary/30 backdrop-blur-2xl border border-border-subtle p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-foreground">Community Approaches</h2>
            <p className="text-sm text-muted">{solutions.length} solutions shared</p>
          </div>
        </div>

        {user && (
          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${showSubmitForm
              ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
              : "bg-foreground text-background hover:scale-[1.02]"
              }`}
          >
            {showSubmitForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Share Approach</>}
          </button>
        )}
      </div>

      {/* 👇 FIX: Beautiful Login Banner OR Submit Form */}
      {!user ? (
        <div className="p-8 rounded-3xl bg-background border border-border-subtle flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-indigo-500" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">Join the Conversation</h3>
          <p className="text-muted mb-4">Please log in to share your approach and vote on others&apos; solutions.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background font-bold shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        showSubmitForm && (
          <div className="animate-fade-in-down">
            <SubmitSolutionForm
              problemId={problemId}
              onSuccess={() => {
                setShowSubmitForm(false);
                fetchSolutions();
              }}
            />
          </div>
        )
      )}

      {/* Empty State */}
      {solutions.length === 0 && !showSubmitForm && (
        <div className="text-center py-20 bg-background-secondary/20 rounded-3xl border border-border-subtle border-dashed">
          <Lightbulb className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-foreground mb-2">Be the first to share!</h3>
          <p className="text-muted">
            {/* 👇 FIX: Adjusted empty state text based on login status */}
            {user
              ? "Explain how you solved this problem and earn the Top Thinker badge."
              : "Log in to explain how you solved this problem and earn the Top Thinker badge."}
          </p>
        </div>
      )}

      {/* Highlighted Solutions (The Hall of Fame) */}
      <div className="space-y-6">
        {categorized.best && (
          <div className="relative">
            <div className="absolute -top-3 left-6 z-20 flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-background text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/30">
              <Medal className="w-3.5 h-3.5" /> Best Thinker Solution
            </div>
            <div className="ring-2 ring-amber-500/50 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <SolutionCard solution={categorized.best} />
            </div>
          </div>
        )}

        {categorized.helpful && (
          <div className="relative">
            <div className="absolute -top-3 left-6 z-20 flex items-center gap-1.5 px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-blue-500/30">
              <ThumbsUp className="w-3.5 h-3.5" /> Most Helpful
            </div>
            <div className="ring-1 ring-blue-500/40 rounded-3xl">
              <SolutionCard solution={categorized.helpful} />
            </div>
          </div>
        )}

        {categorized.simplest && (
          <div className="relative">
            <div className="absolute -top-3 left-6 z-20 flex items-center gap-1.5 px-3 py-1 bg-green-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-green-500/30">
              <Lightbulb className="w-3.5 h-3.5" /> Simplest Approach
            </div>
            <div className="ring-1 ring-green-500/40 rounded-3xl">
              <SolutionCard solution={categorized.simplest} />
            </div>
          </div>
        )}

        {categorized.creative && (
          <div className="relative">
            <div className="absolute -top-3 left-6 z-20 flex items-center gap-1.5 px-3 py-1 bg-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Most Creative
            </div>
            <div className="ring-1 ring-purple-500/40 rounded-3xl">
              <SolutionCard solution={categorized.creative} />
            </div>
          </div>
        )}
      </div>

      {/* Standard Solutions List */}
      {categorized.rest.length > 0 && (
        <div className="pt-8">
          <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-6 px-4 flex items-center gap-2">
            <span className="h-px bg-border-subtle flex-1"></span>
            All Other Solutions
            <span className="h-px bg-border-subtle flex-1"></span>
          </h3>
          <div className="space-y-6">
            {categorized.rest.map((sol) => (
              <SolutionCard key={sol._id} solution={sol} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}