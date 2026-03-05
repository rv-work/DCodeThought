"use client";

import { useEffect, useState } from "react";
import { getComments, addComment } from "@/api/comment.api";
import type { Comment } from "@/types/comment";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

type Props = {
  slug: string;
};

export default function CommentList({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getComments(slug);
        setComments(res.comments);
      } catch (err) {
        toast.error(parseError(err));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleAddComment = async (text: string) => {
    try {
      await addComment(slug, text);
      const res = await getComments(slug);
      setComments(res.comments);
    } catch (err) {
      toast.error(parseError(err));
    }
  };

  return (
    <div className="rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-border-subtle p-8 md:p-12 shadow-lg relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-100 h-100 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-10 pb-6 border-b border-border-subtle/50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">Discussion</h2>
            <p className="text-muted font-medium mt-1">{comments.length} comments</p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Add Comment Form */}
        {user ? (
          <div className="mb-10">
            <CommentForm
              placeholder="Share your approach, ask a question, or discuss edge cases..."
              onSubmit={handleAddComment}
            />
          </div>
        ) : (
          <div className="mb-10 p-8 rounded-3xl bg-background border border-border-subtle flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Join the Conversation</h3>
            <p className="text-muted">Please log in to share your thoughts and interact with others.</p>
          </div>
        )}

        {/* Comments List */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-3xl bg-background border border-border-subtle animate-pulse"
              />
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((c) => (
              <CommentItem key={c._id} comment={c} isLoggedIn={!!user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-3xl bg-background/50 border border-border-subtle border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 mb-4 border border-blue-500/20">
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">No comments yet</h3>
            <p className="text-muted">
              Be the first to break the ice and share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}