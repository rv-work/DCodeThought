"use client";

import { useEffect, useState } from "react";
import { getComments, addComment } from "@/api/comment.api";
import type { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare } from "lucide-react";

type Props = {
  slug: string;
};

export default function CommentList({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getComments(slug)
      .then((res) => setComments(res.comments))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddComment = async (text: string) => {
    await addComment(slug, text);
    const res = await getComments(slug);
    setComments(res.comments);
  };

  return (
    <div className="rounded-2xl bg-background-secondary border border-border-subtle p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Discussion</h2>
          <p className="text-sm text-muted">{comments.length} comments</p>
        </div>
      </div>

      {/* Add Comment Form */}
      {user ? (
        <div className="mb-8">
          <CommentForm
            placeholder="Share your thoughts, ask questions, or discuss solutions..."
            onSubmit={handleAddComment}
          />
        </div>
      ) : (
        <div className="mb-8 p-6 rounded-xl bg-accent/5 border border-accent/20 text-center">
          <p className="text-sm text-muted">
            Please log in to join the discussion
          </p>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-background-tertiary animate-pulse"
            />
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((c) => (
            <CommentItem key={c._id} comment={c} isLoggedIn={!!user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
            <MessageSquare className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-semibold mb-2">No comments yet</h3>
          <p className="text-sm text-muted">
            Be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  );
}