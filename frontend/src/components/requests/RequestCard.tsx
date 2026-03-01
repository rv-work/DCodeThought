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
    <div className="group rounded-2xl bg-background-secondary border border-border-subtle p-6 hover:shadow-xl transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-white shrink-0">
          <User className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-bold text-lg">{request.title}</h3>

            <div className="flex items-center gap-2 shrink-0">
              {request.completed && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </div>
              )}

              {isEligible && !request.completed && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
                  <AlertCircle className="w-3 h-3" />
                  Under Review
                </div>
              )}

              <div
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${request.type === "question"
                  ? "bg-blue-500/10 text-blue-500"
                  : "bg-purple-500/10 text-purple-500"
                  }`}
              >
                {request.type}
              </div>
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-4">
            {request.description}
          </p>


          {request.type === "question" && request.leetcodeLink && (
            <a
              href={request.leetcodeLink}
              target="_blank"
              className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent/80 transition-colors"
            >
              <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center">
                <ExternalLink className="w-4 h-4" />
              </div>
              View LeetCode Problem
            </a>
          )}



          <div className="flex items-center gap-4 mt-4">
            {user && !request.completed && (
              <button
                onClick={handleClick}
                disabled={loading}
                className={` flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer
    ${hasVoted
                    ? "bg-red-600/90 hover:bg-red-600 text-white"
                    : "bg-linear-to-r from-accent to-purple-500 text-white"
                  }`}
              >
                {loading ? (
                  <div className="px-4 py-1">
                    <Loader2 className="w-4 h-4  animate-spin" />
                  </div>

                ) : (
                  <>
                    <ThumbsUp className={`w-4 h-4 ${hasVoted ? "rotate-180" : ""}`} />
                    <span>{hasVoted ? "Downvote" : "Upvote"}</span>
                  </>
                )}
              </button>
            )}

            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-tertiary border border-border">
              <ThumbsUp className="w-4 h-4 text-accent" />
              <span className="font-semibold">{votesCount}</span>
              <span className="text-sm text-muted">votes</span>
            </div>

            {isEligible && !request.completed && (
              <div className="text-sm text-muted">
                ✨ Eligible for priority review
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}