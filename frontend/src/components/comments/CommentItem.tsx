"use client";

import { useState } from "react";
import type { Comment } from "@/types/comment";
import { addReply, voteComment } from "@/api/comment.api";
import CommentForm from "./CommentForm";
import ReplyItem from "./ReplyItem";
import { ThumbsUp, ThumbsDown, MessageCircle, User } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

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
      const value = type === "up" ? 1 : -1;
      setLocalComment((prev) => ({
        ...prev,
        votes: [...prev.votes, { userId: "temp", value }],
      }));
    } catch (err) {
      toast.error(parseError(err));
    }
  };

  const handleReply = async (text: string) => {
    await addReply(localComment._id, text);
    setShowReply(false);
    window.location.reload();
  };

  return (
    <div className="rounded-3xl bg-background border border-border-subtle p-6 md:p-8 hover:border-purple-500/30 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.08)] transition-all duration-300 group">

      {/* Comment Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shrink-0 shadow-md">
          <User className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="font-extrabold text-foreground text-base mb-1.5">
            {comment.userId.name}
          </div>
          <p className="text-base text-muted leading-relaxed whitespace-pre-wrap wrap-break-word">
            {comment.text}
          </p>
        </div>
      </div>

      {/* Comment Actions */}
      <div className="flex items-center gap-4 ml-16 mt-4">
        <div className="flex items-center gap-2 bg-background-secondary/50 p-1 rounded-xl border border-border-subtle">
          <button
            onClick={() => handleVote("up")}
            disabled={!isLoggedIn}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-muted cursor-pointer"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs font-bold">
              {localComment.votes.filter((v) => v.value > 0).length}
            </span>
          </button>

          <div className="w-px h-4 bg-border-subtle"></div>

          <button
            onClick={() => handleVote("down")}
            disabled={!isLoggedIn}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-muted cursor-pointer"
          >
            <ThumbsDown className="w-4 h-4" />
            <span className="text-xs font-bold">
              {Math.abs(localComment.votes.filter((v) => v.value < 0).length)}
            </span>
          </button>
        </div>

        <div className="text-sm font-bold text-muted bg-background-secondary/30 px-3 py-2 rounded-xl border border-border-subtle">
          Score: <span className="text-foreground ml-1">{score}</span>
        </div>

        {isLoggedIn && (
          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-colors cursor-pointer text-sm font-bold text-muted ml-auto md:ml-0"
          >
            <MessageCircle className="w-4 h-4" />
            Reply
          </button>
        )}
      </div>

      {/* Reply Form */}
      {showReply && isLoggedIn && (
        <div className="mt-6 ml-16 animate-fade-in-up">
          <CommentForm
            placeholder="Write your reply..."
            onSubmit={handleReply}
          />
        </div>
      )}

      {/* Nested Replies */}
      {localComment.replies && localComment.replies.length > 0 && (
        <div className="mt-6 ml-[1.8rem] pl-8 space-y-4 border-l-2 border-border-subtle/50">
          {localComment.replies.map((r) => (
            <ReplyItem key={r._id} reply={r} commentId={localComment._id} />
          ))}
        </div>
      )}
    </div>
  );
}