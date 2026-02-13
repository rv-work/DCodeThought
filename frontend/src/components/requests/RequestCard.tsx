"use client";

import type { PublicRequest } from "@/types/request";
import { useAuth } from "@/hooks/useAuth";
import { ThumbsUp, CheckCircle2, AlertCircle, User } from "lucide-react";

type Props = {
  request: PublicRequest;
  onVote: (id: string) => void;
};

export default function RequestCard({ request, onVote }: Props) {
  const { user } = useAuth();
  const votesCount = request.votes.length;
  const isEligible = request.type === "question" && votesCount >= 50;

  return (
    <div className="group rounded-2xl bg-background-secondary border border-border-subtle p-6 hover:shadow-xl transition-all">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white flex-shrink-0">
          <User className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-bold text-lg">{request.title}</h3>

            {/* Status badges */}
            <div className="flex items-center gap-2 flex-shrink-0">
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

          {/* Footer */}
          <div className="flex items-center gap-4">
            {/* Vote Button */}
            {user && !request.completed && (
              <button
                onClick={() => onVote(request._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Upvote</span>
              </button>
            )}

            {/* Vote Count */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-tertiary border border-border">
              <ThumbsUp className="w-4 h-4 text-accent" />
              <span className="font-semibold">{votesCount}</span>
              <span className="text-sm text-muted">votes</span>
            </div>

            {/* Eligibility indicator */}
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