"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { MoreHorizontal, Edit3, Trash2, ExternalLink, Heart, MessageSquare, Share2 } from "lucide-react";
import Avatar from "./ui/Avatar";
import ExpandableContent from "./ui/ExpandableContent";
import ImageGrid from "./ui/ImageGrid";
import { cardCls, inputCls } from "./constants";
import type { FeedPostType } from "@/types/feed";
import type { User } from "@/types/auth"; // Make sure the path to your User type is correct

interface PostItemProps {
  post: FeedPostType;
  user: User | null;
  isLiked: boolean;
  onLike: (id: string) => void;
  activeCommentPostId: string | null;
  setActiveCommentPostId: (id: string | null) => void;
  commentText: string;
  setCommentText: (text: string) => void;
  onAddComment: (id: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  openMenuPostId: string | null;
  setOpenMenuPostId: (id: string | null) => void;
  // FIXED: Explicitly allow null to match React's useRef behavior
  menuRef: React.RefObject<HTMLDivElement | null>;
  onEditPost: (post: FeedPostType) => void;
  onDeletePost: (id: string) => void;
  onImageClick: (idx: number) => void;
}

export default function PostItem({
  post, user, isLiked, onLike, activeCommentPostId, setActiveCommentPostId,
  commentText, setCommentText, onAddComment, onDeleteComment, openMenuPostId,
  setOpenMenuPostId, menuRef, onEditPost, onDeletePost, onImageClick
}: PostItemProps) {

  const gradients = [
    "from-violet-500 to-blue-500",
    "from-emerald-400 to-cyan-500",
    "from-pink-500 to-violet-500",
    "from-amber-400 to-orange-500",
  ];
  const authorGradient = gradients[(post.userId?.name?.charCodeAt(0) || 0) % 4];

  return (
    <article className={cardCls}>
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href={`/u/${post.userId?.username}`} className="hover:opacity-80 transition-opacity">
            <Avatar name={post.userId?.name || "U"} size="sm" gradient={authorGradient} />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/u/${post.userId?.username}`}
                className="text-sm font-extrabold text-foreground hover:text-violet-500 transition-colors"
              >
                {post.userId?.name || "Unknown"}
              </Link>
              {post.userId?.badges?.includes("Top_Thinker") && (
                <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-md">
                  ⚡ Top
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted font-medium mt-0.5">
              @{post.userId?.username || "user"} &nbsp;·&nbsp;{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* 3-dot menu */}
        {user && post.userId && user._id === post.userId._id && (
          <div className="relative" ref={openMenuPostId === post._id ? menuRef : null}>
            <button
              onClick={() => setOpenMenuPostId(openMenuPostId === post._id ? null : post._id)}
              className="p-1.5 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-all"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {openMenuPostId === post._id && (
              <div className="absolute right-0 mt-1.5 w-36 bg-background-secondary border border-border-subtle rounded-2xl shadow-2xl overflow-hidden z-20 animate-fade-in-up">
                <button
                  onClick={() => onEditPost(post)}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-bold text-foreground hover:bg-foreground/5 transition-colors text-left"
                >
                  <Edit3 className="w-3.5 h-3.5 text-violet-500" /> Edit Post
                </button>
                <button
                  onClick={() => onDeletePost(post._id)}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors text-left border-t border-border-subtle/50"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Problem Box */}
      <a
        href={post.leetcodeLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-start justify-between gap-3 bg-linear-to-br from-violet-500/10 to-blue-500/5 border border-violet-500/20 rounded-2xl p-4 mb-4 group/link hover:border-violet-500/40 hover:shadow-md transition-all "
      >
        <div>
          <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-1">
            Problem #{post.questionNumber}
          </p>
          <h3 className="text-sm font-bold text-foreground leading-snug group-hover/link:text-violet-400 transition-colors">
            {post.title}
          </h3>
        </div>
        <div className="shrink-0 w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center group-hover/link:bg-blue-500 transition-all">
          <ExternalLink className="w-3.5 h-3.5 text-blue-500 group-hover/link:text-white transition-colors" />
        </div>
      </a>

      {/* Content */}
      <ExpandableContent text={post.content} />

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg hover:bg-blue-500/20 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Images — clickable with lightbox */}
      {post.images?.length > 0 && (
        <div className="mb-4">
          <ImageGrid
            imgs={post.images}
            onImageClick={(idx) => onImageClick(idx)}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-border-subtle/50 mt-2">
        <button
          onClick={() => onLike(post._id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-pink-500/10 active:scale-95 ${isLiked ? "text-pink-500 bg-pink-500/5" : "text-muted hover:text-pink-500"}`}
        >
          <Heart className={`w-4 h-4 transition-all ${isLiked ? "fill-current scale-110" : ""}`} />
          {post.likes.length}
        </button>

        <button
          onClick={() => setActiveCommentPostId(activeCommentPostId === post._id ? null : post._id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-blue-500/10 ${activeCommentPostId === post._id ? "text-blue-500 bg-blue-500/5" : "text-muted hover:text-blue-500"}`}
        >
          <MessageSquare className="w-4 h-4" />
          {post.comments.length}
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/feed`);
            toast.success("Link copied!");
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-muted hover:text-emerald-500 hover:bg-emerald-500/10 transition-all ml-auto active:scale-95"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Comments */}
      {activeCommentPostId === post._id && (
        <div className="mt-4 pt-4 border-t border-border-subtle/50 animate-fade-in">
          {user ? (
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); onAddComment(post._id); }}
              className="flex items-center gap-2.5 mb-5"
            >
              <Avatar name={user.name} size="xs" />
              <input
                type="text"
                placeholder="Add to the discussion..."
                value={commentText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
                className={`${inputCls} flex-1 rounded-full py-2!`}
                autoFocus
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-foreground text-background rounded-full font-bold text-xs hover:scale-105 transition-all disabled:opacity-40 shrink-0 shadow-sm"
              >
                Reply
              </button>
            </form>
          ) : (
            <p className="text-xs text-muted italic mb-4">
              <Link href="/login" className="text-violet-500 hover:underline font-bold">Log in</Link> to join the discussion.
            </p>
          )}

          <div className="space-y-3">
            {post.comments.length === 0 ? (
              <p className="text-xs text-muted text-center py-3 font-medium">No comments yet. Be the first!</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment._id} className="flex gap-2.5 group/c">
                  <Link href={`/u/${comment.userId?.username || "user"}`}>
                    <Avatar name={comment.userId?.name || "U"} size="xs" gradient="from-blue-400 to-violet-500" />
                  </Link>
                  <div className="flex-1 bg-background border border-border-subtle rounded-2xl rounded-tl-md px-3.5 py-2.5 relative">
                    <div className="flex items-center justify-between mb-1 pr-6">
                      <Link
                        href={`/u/${comment.userId?.username || "user"}`}
                        className="text-xs font-black text-foreground hover:text-violet-500 transition-colors"
                      >
                        {comment.userId?.name || "Unknown"}
                      </Link>
                      <span className="text-[10px] text-muted uppercase font-semibold">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed font-medium">{comment.text}</p>

                    {user && comment.userId &&
                      (user._id === comment.userId._id || user._id === post.userId._id) && (
                        <button
                          onClick={() => onDeleteComment(post._id, comment._id)}
                          className="absolute top-2.5 right-2.5 p-1 text-muted opacity-0 group-hover/c:opacity-100 hover:text-red-500 transition-all rounded-md hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </article>
  );
}