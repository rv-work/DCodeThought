"use client";

import { useState } from "react";
import { CommunitySolutionData } from "@/types/communitySolution";
import { tagCommunitySolution } from "@/api/communitySolution.api";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { ThumbsUp, Lightbulb, Sparkles, User, Medal } from "lucide-react";
import { parseError } from "@/utils/parseError";

interface SolutionCardProps {
  solution: CommunitySolutionData;
}

export default function SolutionCard({ solution }: SolutionCardProps) {
  const { user } = useAuth();

  // Local state for optimistic UI updates
  const [tagCounts, setTagCounts] = useState(solution.tagCounts);
  const [hasTagged, setHasTagged] = useState(
    solution.taggedBy.some((t) => t.userId === user?._id)
  );
  const [isTagging, setIsTagging] = useState(false);

  const handleTag = async (type: "helpful" | "simplest" | "creative") => {
    if (!user) return toast.error("Please login to tag solutions!");
    if (solution.userId._id === user._id) return toast.error("You can't tag your own solution!");
    if (hasTagged) return toast.error("You have already tagged this solution.");

    setIsTagging(true);
    try {
      const res = await tagCommunitySolution(solution._id, { tagType: type });
      setTagCounts(res.tagCounts);
      setHasTagged(true);
      toast.success(res.message);
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setIsTagging(false);
    }
  };

  return (
    <div className="relative p-6 rounded-3xl bg-background-secondary/40 backdrop-blur-xl border border-border-subtle hover:border-blue-500/30 transition-all duration-300 group">
      {/* Background ambient glow on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

      {/* Header: Author Info */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
            {solution.userId?.name ? solution.userId.name.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              {/* 👇 AND HERE 👇 */}
              <h3 className="font-semibold text-foreground">{solution.userId?.name || "Unknown User"}</h3>
              {solution.userId?.badges?.includes("Top_Thinker") && (
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  <Medal className="w-3 h-3" /> Top Thinker
                </span>
              )}
            </div>
            <p className="text-xs text-muted flex items-center gap-2 mt-1">
              {solution.userId.college && (
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {solution.userId.college}</span>
              )}
              <span>•</span>
              <span>{new Date(solution.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content: Approach & Explanation */}
      <div className="space-y-4 mb-6 relative z-10">
        <div>
          <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Approach</h4>
          <p className="text-foreground leading-relaxed bg-background-tertiary/50 p-4 rounded-xl border border-border-subtle/50">
            {solution.approach}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Explanation</h4>
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {solution.explanation}
          </p>
        </div>
      </div>

      {/* Code Section (If provided) */}
      {solution.code && (
        <div className="mb-6 relative z-10">
          <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Code {solution.language && `(${solution.language})`}</h4>
          <pre className="bg-black/40 p-4 rounded-xl border border-border-subtle overflow-x-auto text-sm text-blue-300">
            <code>{solution.code}</code>
          </pre>
        </div>
      )}

      {/* Footer: Tagging System */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border-subtle relative z-10">
        <button
          onClick={() => handleTag("helpful")}
          disabled={isTagging || hasTagged}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${hasTagged ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"
            } bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20`}
        >
          <ThumbsUp className="w-4 h-4" /> Helpful ({tagCounts.helpful})
        </button>

        <button
          onClick={() => handleTag("simplest")}
          disabled={isTagging || hasTagged}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${hasTagged ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"
            } bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20`}
        >
          <Lightbulb className="w-4 h-4" /> Simplest ({tagCounts.simplest})
        </button>

        <button
          onClick={() => handleTag("creative")}
          disabled={isTagging || hasTagged}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${hasTagged ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-0.5"
            } bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20`}
        >
          <Sparkles className="w-4 h-4" /> Creative ({tagCounts.creative})
        </button>
      </div>
    </div>
  );
}