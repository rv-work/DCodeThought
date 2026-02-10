"use client";

import type { PublicRequest } from "@/types/request";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  request: PublicRequest;
  onVote: (id: string) => void;
};

export default function RequestCard({ request, onVote }: Props) {
  const { user } = useAuth();
  const votesCount = request.votes.length;

  return (
    <div className="border p-4 rounded space-y-1">
      <div className="font-semibold">{request.title}</div>
      <div className="text-sm">{request.description}</div>

      <div className="flex items-center gap-3 text-xs">
        <span>Votes: {votesCount}</span>

        {request.type === "question" && votesCount >= 50 && (
          <span className="text-green-600">Eligible (Admin Todo)</span>
        )}

        {request.completed && (
          <span className="text-gray-500">Completed</span>
        )}

        {user && !request.completed && (
          <button
            onClick={() => onVote(request._id)}
            className="underline"
          >
            Upvote
          </button>
        )}
      </div>
    </div>
  );
}
