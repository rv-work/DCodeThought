"use client";

import type { PublicRequest } from "@/types/request";
import { useAuth } from "@/hooks/useAuth";
import { ThumbsUp, CheckCircle2, AlertCircle, User, Loader2, ExternalLink } from "lucide-react";
import { useState } from "react";

type Props = {
  request: PublicRequest;
  onVote: (id: string) => Promise<void>;
};

export default function RequestCard({ request, onVote }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const hasVoted = user
    ? request.votes.some((v) => v.userId === user._id)
    : false;

  const votesCount = request.votes.length;
  const isEligible = request.type === "question" && votesCount >= 10;

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    await onVote(request._id);
    setLoading(false);
  };

  return (
    <div className="group rounded-4xl bg-background-secondary/40 backdrop-blur-md border border-border-subtle p-6 md:p-8 hover:border-purple-500/30 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.1)] transition-all duration-300 relative overflow-hidden">

      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start gap-6">

        {/* User Avatar */}
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-500/20">
          <User className="w-6 h-6" />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">

            {/* Title & Type */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${request.type === "question"
                  ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                  : "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                  }`}>
                  {request.type}
                </div>

                {request.completed && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </div>
                )}

                {isEligible && !request.completed && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <AlertCircle className="w-3 h-3" />
                    Under Review
                  </div>
                )}
              </div>
              <h3 className="font-extrabold text-xl text-foreground group-hover:text-purple-400 transition-colors leading-tight">
                {request.title}
              </h3>
            </div>

            {/* Vote Count Badge (Desktop Top Right) */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border-subtle shadow-sm shrink-0">
              <ThumbsUp className={`w-4 h-4 ${hasVoted ? "text-purple-500" : "text-muted"}`} />
              <span className="font-extrabold text-foreground">{votesCount}</span>
              <span className="text-xs font-bold text-muted uppercase">Votes</span>
            </div>
          </div>

          <p className="text-base text-muted leading-relaxed mb-6">
            {request.description}
          </p>

          {/* Bottom Actions Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border-subtle/50">

            {/* Vote Button */}
            {user && !request.completed && (
              <button
                onClick={handleClick}
                disabled={loading}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all cursor-pointer
                  ${hasVoted
                    ? "bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500/20"
                    : "bg-background border border-border-subtle hover:border-purple-500/50 hover:text-purple-500"
                  }
                `}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-current" : ""}`} />
                    <span>{hasVoted ? "Remove Vote" : "Upvote Request"}</span>
                  </>
                )}
              </button>
            )}

            {/* Mobile Vote Count (Visible only on small screens) */}
            <div className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border-subtle shadow-sm shrink-0">
              <ThumbsUp className="w-4 h-4 text-purple-500" />
              <span className="font-extrabold text-foreground">{votesCount}</span>
            </div>

            {/* LeetCode Link */}
            {request.type === "question" && request.leetcodeLink && (
              <a
                href={request.leetcodeLink}
                target="_blank"
                rel="noreferrer"
                className="group/link flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-blue-500 text-sm font-bold hover:bg-blue-500/10 transition-colors"
              >
                <ExternalLink className="w-4 h-4 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                View LeetCode
              </a>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}