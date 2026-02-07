"use client";

import { useState } from "react";
import type { Comment } from "@/types/comment";
import { addReply, voteComment } from "@/api/comment.api";
import CommentForm from "./CommentForm";
import ReplyItem from "./ReplyItem";

type Props = {
  comment: Comment;
  isLoggedIn: boolean;
};

export default function CommentItem({ comment, isLoggedIn }: Props) {
  const [showReply, setShowReply] = useState<boolean>(false);

  const score = comment.votes.reduce((s, v) => s + v.value, 0);

  return (
    <div className="border p-3 rounded">
      <div className="text-sm font-semibold">
        {comment.userId.name}
      </div>

      <div className="text-sm">{comment.text}</div>

      <div className="flex gap-2 text-xs mt-2">
        <button
          onClick={() =>
            voteComment(comment._id, "up")
          }
        >
          👍
        </button>

        <button
          onClick={() =>
            voteComment(comment._id, "down")
          }
        >
          👎
        </button>

        <span>{score}</span>

        {isLoggedIn && (
          <button onClick={() => setShowReply(!showReply)}>
            Reply
          </button>
        )}
      </div>

      {showReply && isLoggedIn && (
        <CommentForm
          placeholder="Write a reply..."
          onSubmit={(text) =>
            addReply(comment._id, text)
          }
        />
      )}

      {comment.replies.map((r) => (
        <ReplyItem
          key={r._id}
          reply={r}
          commentId={comment._id}
        />
      ))}
    </div>
  );
}
