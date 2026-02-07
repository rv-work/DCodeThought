"use client";

import { useEffect, useState } from "react";
import { getComments, addComment } from "@/api/comment.api";
import type { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  slug: string;
};

export default function CommentList({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getComments(slug).then((res) =>
      setComments(res.comments)
    );
  }, [slug]);

  const handleAddComment = async (text: string) => {
    await addComment(slug, text);
    const res = await getComments(slug);
    setComments(res.comments);
  };

  return (
    <div className="mt-10 space-y-4">
      <h2 className="font-semibold">Comments</h2>

      {user && (
        <CommentForm
          placeholder="Add a comment..."
          onSubmit={handleAddComment}
        />
      )}

      <div className="space-y-3">
        {comments.map((c) => (
          <CommentItem
            key={c._id}
            comment={c}
            isLoggedIn={!!user}
          />
        ))}
      </div>
    </div>
  );
}
