"use client";

import { useState } from "react";
import type { Comment } from "@/types/comment";
import { addReply, voteComment } from "@/api/comment.api";
import CommentForm from "./CommentForm";
import ReplyItem from "./ReplyItem";
import { ThumbsUp, ThumbsDown, MessageCircle, User } from "lucide-react";

type Props = {
  comment: Comment;
  isLoggedIn: boolean;
};

export default function CommentItem({ comment, isLoggedIn }: Props) {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [localComment, setLocalComment] = useState(comment);

  const score = localComment.votes.reduce((s, v) => s + v.value, 0);

  const handleVote = async (type: "up" | "down") => {
    if (!isLoggedIn) return;
    try {
      await voteComment(localComment._id, type);
      // Optimistically update the UI
      const value = type === "up" ? 1 : -1;
      setLocalComment((prev) => ({
        ...prev,
        votes: [...prev.votes, { userId: "temp", value }],
      }));
    } catch (error) {
      console.error("Vote failed:", error);
    }
  };

  const handleReply = async (text: string) => {
    await addReply(localComment._id, text);
    setShowReply(false);
    // Refresh comment to get new reply
    window.location.reload();
  };

  return (
    <div className="rounded-xl bg-background-tertiary border border-border p-6 hover:shadow-lg transition-all">
      {/* Comment Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-white shrink-0">
          <User className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1">
            {comment.userId.name}
          </div>
          <p className="text-sm leading-relaxed wrap-break-word">{comment.text}</p>
        </div>
      </div>

      {/* Comment Actions */}
      <div className="flex items-center gap-4 ml-14">
        {/* Vote buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote("up")}
            disabled={!isLoggedIn}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-background-secondary hover:bg-green-500/10 hover:text-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs font-semibold">
              {localComment.votes.filter((v) => v.value > 0).length}
            </span>
          </button>

          <button
            onClick={() => handleVote("down")}
            disabled={!isLoggedIn}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-background-secondary hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group"
          >
            <ThumbsDown className="w-4 h-4" />
            <span className="text-xs font-semibold">
              {Math.abs(localComment.votes.filter((v) => v.value < 0).length)}
            </span>
          </button>

          <div className="text-sm font-semibold px-2">
            Score: <span className="text-accent">{score}</span>
          </div>
        </div>

        {/* Reply button */}
        {isLoggedIn && (
          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-background-secondary hover:bg-accent/10 hover:text-accent transition-all cursor-pointer text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            Reply
          </button>
        )}
      </div>

      {/* Reply Form */}
      {showReply && isLoggedIn && (
        <div className="mt-4 ml-14">
          <CommentForm
            placeholder="Write your reply..."
            onSubmit={handleReply}
          />
        </div>
      )}

      {/* Replies */}
      {localComment.replies && localComment.replies.length > 0 && (
        <div className="mt-4 ml-14 space-y-3 border-l-2 border-border pl-4">
          {localComment.replies.map((r) => (
            <ReplyItem key={r._id} reply={r} commentId={localComment._id} />
          ))}
        </div>
      )}
    </div>
  );
}