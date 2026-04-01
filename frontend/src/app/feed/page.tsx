"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/hooks/useAuth";
import {
  getFeedPosts, createFeedPost, togglePostLike,
  addPostComment, deletePostComment, deleteFeedPost, editFeedPost
} from "@/api/feed.api";
import type { FeedPostType } from "@/types/feed";
import { parseError } from "@/utils/parseError";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import {
  Heart, MessageSquare, Share2, ImagePlus, Link as LinkIcon,
  Hash, Send, X, Code2, Shield, Trash2, ExternalLink,
  MoreHorizontal, Edit3, TrendingUp, Award, Zap, BookOpen,
  Trophy, Calendar, ChevronRight, Target
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Avatar({
  name,
  size = "md",
  gradient = "from-violet-500 to-blue-500",
}: {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  gradient?: string;
}) {
  const sizes = {
    xs: "w-7 h-7 text-[11px]",
    sm: "w-9 h-9 text-sm",
    md: "w-12 h-12 text-xl",
    lg: "w-14 h-14 text-2xl",
  };
  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-black text-white shrink-0 ring-2 ring-background shadow-sm`}
    >
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

function PostSkeleton() {
  const cardCls = "bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-3xl p-5 relative overflow-hidden";
  return (
    <div className={`${cardCls} space-y-4 animate-pulse`}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-foreground/10" />
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-foreground/10 rounded w-32" />
          <div className="h-2.5 bg-foreground/5 rounded w-24" />
        </div>
      </div>
      <div className="h-16 bg-foreground/5 rounded-2xl" />
      <div className="space-y-2">
        <div className="h-3 bg-foreground/5 rounded w-full" />
        <div className="h-3 bg-foreground/5 rounded w-4/5" />
        <div className="h-3 bg-foreground/5 rounded w-3/5" />
      </div>
    </div>
  );
}

// ─── Image Grid ───────────────────────────────────────────────────────────────

function ImageGrid({ imgs }: { imgs: string[] }) {
  if (!imgs.length) return null;

  const cls = "relative w-full rounded-2xl overflow-hidden border border-border-subtle hover:border-violet-500/50 transition-colors";

  if (imgs.length === 1)
    return (
      <div className={`${cls} h-64 md:h-[400px]`}>
        <Image src={imgs[0]} alt="Post image" fill className="object-cover" unoptimized />
      </div>
    );

  if (imgs.length === 2)
    return (
      <div className="grid grid-cols-2 gap-1.5">
        {imgs.map((i, idx) => (
          <div key={idx} className={`${cls} h-44 md:h-56`}>
            <Image src={i} alt={`img ${idx + 1}`} fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
    );

  if (imgs.length === 3)
    return (
      <div className="grid grid-cols-2 gap-1.5">
        <div className={`col-span-2 ${cls} h-44`}>
          <Image src={imgs[0]} alt="img 1" fill className="object-cover" unoptimized />
        </div>
        {imgs.slice(1).map((i, idx) => (
          <div key={idx} className={`${cls} h-32`}>
            <Image src={i} alt={`img ${idx + 2}`} fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {imgs.map((i, idx) => (
        <div key={idx} className={`${cls} h-32 md:h-44`}>
          <Image src={i} alt={`img ${idx + 1}`} fill className="object-cover" unoptimized />
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const { user } = useAuth();

  // Feed
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Create Post
  const [content, setContent] = useState("");
  const [qNum, setQNum] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  // Comments
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  // Edit / Delete
  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<FeedPostType | null>(null);
  const [editForm, setEditForm] = useState({ title: "", link: "", content: "", tags: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── STYLING CONSTANTS (Theme Aware) ───
  // Ye miss ho gaye the pehle, ab yahan correctly defined hain
  const inputCls = "w-full bg-background border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all font-medium";
  const cardCls = "bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-3xl p-5 relative overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:-translate-y-0.5";
  const sidebarCardCls = "bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-3xl p-5 relative overflow-hidden";

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchPosts = async (pageNum: number) => {
    try {
      pageNum === 1 ? setLoading(true) : setLoadingMore(true);
      const res = await getFeedPosts(pageNum, 10);
      pageNum === 1
        ? setPosts(res.posts)
        : setPosts((prev) => [...prev, ...res.posts]);
      setHasMore(res.hasMore);
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => { fetchPosts(1); }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    if (images.length + selected.length > 4)
      return toast.error("Maximum 4 images allowed.");
    setImages((prev) => [...prev, ...selected]);
    setImagePreviews((prev) => [...prev, ...selected.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to post.");
    if (!qNum || !title || !link || !content)
      return toast.error("Question details and content are required.");

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("questionNumber", qNum);
      fd.append("title", title);
      fd.append("leetcodeLink", link);
      fd.append("content", content);
      if (tags) fd.append("tags", tags);
      images.forEach((img) => fd.append("images", img));

      const res = await createFeedPost(fd);
      toast.success(res.message);
      setPosts([res.post, ...posts]);
      setContent(""); setQNum(""); setTitle(""); setLink(""); setTags("");
      setImages([]); setImagePreviews([]);
      setIsCreateFormOpen(false);
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return toast.error("Log in to like posts.");

    setPosts(posts.map((p) => {
      if (p._id !== postId) return p;
      const liked = p.likes.includes(user._id);
      return {
        ...p,
        likes: liked ? p.likes.filter((id) => id !== user._id) : [...p.likes, user._id],
      };
    }));

    try {
      await togglePostLike(postId);
    } catch (error) {
      toast.error(parseError(error));
      fetchPosts(page);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user) return toast.error("Log in to comment.");
    if (!commentText.trim()) return;
    try {
      const res = await addPostComment(postId, commentText);
      setPosts(posts.map((p) => (p._id === postId ? { ...p, comments: res.comments } : p)));
      setCommentText("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await deletePostComment(postId, commentId);
      setPosts(posts.map((p) =>
        p._id === postId
          ? { ...p, comments: p.comments.filter((c) => c._id !== commentId) }
          : p
      ));
      toast.success("Comment deleted.");
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Delete this post permanently?")) return;
    try {
      await deleteFeedPost(postId);
      setPosts(posts.filter((p) => p._id !== postId));
      toast.success("Post deleted.");
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  const startEditing = (post: FeedPostType) => {
    setEditingPost(post);
    setEditForm({
      title: post.title,
      link: post.leetcodeLink,
      content: post.content,
      tags: post.tags.join(", "),
    });
    setOpenMenuPostId(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    try {
      const res = await editFeedPost(editingPost._id, {
        title: editForm.title,
        leetcodeLink: editForm.link,
        content: editForm.content,
        tags: editForm.tags,
      });
      setPosts(posts.map((p) => (p._id === editingPost._id ? res.post : p)));
      toast.success("Post updated!");
      setEditingPost(null);
    } catch (error) {
      toast.error(parseError(error));
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        /* Hide scrollbars for a clean app-like feel but keep functionality */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <Navbar />

      {/* 🚀 DASHBOARD ARCHITECTURE: Fixed height on desktop to stop window scroll */}
      <div className="min-h-screen lg:min-h-0 lg:h-[calc(100vh-76px)] bg-background relative lg:overflow-hidden">

        {/* Theme-Aware Ambient Glows */}
        <div className="fixed top-[15%] left-[-15%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[140px] pointer-events-none dark:bg-violet-600/10" />
        <div className="fixed top-[50%] right-[-15%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none dark:bg-blue-600/10" />

        {/* 3-Column Grid takes full height */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-6 relative z-10">

          {/* ════════════════════════════════════════════════
              COLUMN 1: LEFT SIDEBAR (Independent Scroll)
          ════════════════════════════════════════════════ */}
          <aside className="hidden lg:flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide pt-6 pb-6">

            {/* Profile Card */}
            {user ? (
              <div className={sidebarCardCls}>
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-br from-violet-500/20 to-blue-500/20" />
                <div className="relative pt-8 pb-1 flex flex-col items-center">
                  <div className="relative -mt-8 mb-3">
                    <Avatar name={user.name} size="lg" />
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="text-[15px] font-black text-foreground">{user.name}</h3>
                    <p className="text-xs text-muted font-medium mt-0.5">@{user.username}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4 w-full">
                    <div className="bg-background border border-border-subtle rounded-2xl p-3 text-center">
                      <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                      <div className="text-lg font-black text-foreground">{user.streaks?.currentGeneral || 0}</div>
                      <div className="text-[10px] text-muted uppercase font-bold tracking-widest">Streak</div>
                    </div>
                    <div className="bg-background border border-border-subtle rounded-2xl p-3 text-center">
                      <Award className="w-4 h-4 text-violet-500 mx-auto mb-1" />
                      <div className="text-lg font-black text-foreground">{user.reputation?.totalThinkerScore || 0}</div>
                      <div className="text-[10px] text-muted uppercase font-bold tracking-widest">Rep</div>
                    </div>
                  </div>
                  <Link href="/profile" className="flex items-center justify-center gap-1.5 w-full py-2 bg-background border border-border-subtle rounded-xl text-xs font-bold text-muted hover:text-foreground hover:bg-foreground/5 transition-all">
                    View Profile <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className={`${sidebarCardCls} text-center`}>
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-500 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-[15px] font-black text-foreground mb-1.5">Join the Dojo</h3>
                <p className="text-xs text-muted mb-5 leading-relaxed">Share solutions, earn badges, and track your coding streak.</p>
                <Link href="/signup" className="block w-full py-2.5 bg-foreground text-background rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg">
                  Sign Up Free
                </Link>
              </div>
            )}

            {/* Trending Tags */}
            <div className={sidebarCardCls}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[11px] font-black text-muted uppercase tracking-widest">Trending</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Next.js", "Graphs", "DP", "MERN Stack", "System Design", "TypeScript"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-background border border-border-subtle rounded-lg text-[11px] font-bold text-muted hover:text-foreground hover:border-violet-500/40 hover:bg-violet-500/10 cursor-pointer transition-all">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Community Rules */}
            <div className={sidebarCardCls}>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-3.5 h-3.5 text-violet-500" />
                <span className="text-[11px] font-black text-muted uppercase tracking-widest">Community Rules</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Share well-commented code. Don't dump raw solutions.",
                  "Include Time & Space complexity in your write-up.",
                  "Use images for complex tree or graph logic.",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed font-medium">
                    <span className="w-5 h-5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-500 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

          </aside>

          {/* ════════════════════════════════════════════════
              COLUMN 2: CENTER FEED (Independent scroll)
          ════════════════════════════════════════════════ */}

          <main className="min-w-0 min-h-0 lg:h-full lg:flex lg:flex-col pt-6 lg:overflow-hidden">

            {/* ── Fixed Create Post Box (Locks at top) ── */}
            {user && (
              <div className="shrink-0 mb-6 z-40 sticky top-[76px] lg:static bg-background/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-b border-border-subtle/50 lg:border-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 lg:pb-0">
                {!isCreateFormOpen ? (
                  <div
                    onClick={() => setIsCreateFormOpen(true)}
                    className={`${sidebarCardCls} !p-3.5 flex items-center gap-3 cursor-pointer group hover:border-violet-500/30`}
                  >
                    <Avatar name={user.name} size="sm" />
                    <span className="flex-1 text-sm text-muted font-medium group-hover:text-foreground/80 transition-colors select-none">
                      Share your approach, thought process, or code...
                    </span>
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500 group-hover:border-violet-500 transition-all">
                      <ImagePlus className="w-4 h-4 text-violet-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ) : (
                  <div className={`${sidebarCardCls} border-violet-500/30 ring-4 ring-violet-500/10 animate-fade-in-up`}>
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-base font-black text-foreground flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-violet-500" />
                        Share a Solution
                      </h2>
                      <button
                        onClick={() => setIsCreateFormOpen(false)}
                        className="p-1.5 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleCreatePost} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                          <input type="number" placeholder="Question No." value={qNum} onChange={(e) => setQNum(e.target.value)} className={`${inputCls} pl-9`} required />
                        </div>
                        <div className="relative">
                          <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                          <input type="text" placeholder="Problem Title" value={title} onChange={(e) => setTitle(e.target.value)} className={`${inputCls} pl-9`} required />
                        </div>
                      </div>

                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                        <input type="url" placeholder="LeetCode URL" value={link} onChange={(e) => setLink(e.target.value)} className={`${inputCls} pl-9`} required />
                      </div>

                      <textarea placeholder="Explain your thought process, approach, and time complexity..." value={content} onChange={(e) => setContent(e.target.value)} rows={4} className={`${inputCls} resize-none leading-relaxed`} required />

                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                        <input type="text" placeholder="Tags (comma separated — e.g. DP, Array, Java)" value={tags} onChange={(e) => setTags(e.target.value)} className={`${inputCls} pl-9`} />
                      </div>

                      {imagePreviews.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {imagePreviews.map((src, idx) => (
                            <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border-subtle">
                              <Image src={src} alt="preview" fill className="object-cover" unoptimized />
                              <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors z-10"><X className="w-3 h-3 text-white" /></button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50 mt-2">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-violet-500 hover:bg-violet-500/10 rounded-full transition-colors" title="Add images (max 4)">
                          <ImagePlus className="w-5 h-5" />
                        </button>
                        <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setIsCreateFormOpen(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-muted hover:bg-foreground/5 transition-all">Cancel</button>
                          <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-foreground text-background rounded-xl font-bold text-xs hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-lg">
                            {isSubmitting ? "Posting..." : <><Send className="w-3.5 h-3.5" /> Post Solution</>}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ── Feed List (Independent scroll below Create Post) ── */}
            <div className="flex-1 lg:overflow-y-auto scrollbar-hide space-y-5 pb-24 lg:pb-6 lg:pr-2">
              {loading ? (
                <>
                  <PostSkeleton />
                  <PostSkeleton />
                  <PostSkeleton />
                </>
              ) : posts.length === 0 ? (
                <div className={`${sidebarCardCls} p-16 text-center`}>
                  <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                    <Code2 className="w-8 h-8 text-violet-500" />
                  </div>
                  <p className="text-muted font-bold">No posts yet.</p>
                  <p className="text-muted text-sm mt-1">Be the first to share a solution!</p>
                </div>
              ) : (
                posts.map((post) => {
                  const isLiked = !!user && post.likes.includes(user._id);

                  return (
                    <article key={post._id} className={cardCls}>

                      {/* ── Post Header ── */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Link href={`/u/${post.userId?.username}`}>
                            <Avatar
                              name={post.userId?.name || "U"}
                              size="sm"
                              gradient={
                                ["from-violet-500 to-blue-500", "from-emerald-400 to-cyan-500", "from-pink-500 to-violet-500", "from-amber-400 to-orange-500"][
                                (post.userId?.name?.charCodeAt(0) || 0) % 4
                                ]
                              }
                            />
                          </Link>
                          <div>
                            <div className="flex items-center gap-2">
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
                              @{post.userId?.username || "user"} &nbsp;·&nbsp; {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </p>
                          </div>
                        </div>

                        {/* 3-dot menu */}
                        {user && post.userId && user._id === post.userId._id && (
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuPostId(openMenuPostId === post._id ? null : post._id)}
                              className="p-1.5 text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-all"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                            {openMenuPostId === post._id && (
                              <div className="absolute right-0 mt-1.5 w-32 bg-background-secondary border border-border-subtle rounded-2xl shadow-xl overflow-hidden z-20 animate-fade-in-up">
                                <button
                                  onClick={() => startEditing(post)}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-foreground hover:bg-foreground/5 transition-colors text-left"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-violet-500" /> Edit
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post._id)}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors text-left border-t border-border-subtle/50"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* ── Problem Box ── */}
                      <div className="flex items-start justify-between gap-3 bg-gradient-to-br from-violet-500/10 to-blue-500/5 border border-violet-500/20 rounded-2xl p-4 mb-4 group/link">
                        <div>
                          <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-1">
                            Problem #{post.questionNumber}
                          </p>
                          <h3 className="text-sm font-bold text-foreground leading-snug">{post.title}</h3>
                        </div>
                        <a
                          href={post.leetcodeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 w-8 h-8 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all group-hover/link:shadow-md"
                          title="Open on LeetCode"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-blue-500 group-hover/link:text-white transition-colors" />
                        </a>
                      </div>

                      {/* ── Content ── */}
                      <p className="text-sm text-foreground/80 font-medium leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

                      {/* ── Tags ── */}
                      {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-bold text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* ── Images ── */}
                      {post.images?.length > 0 && (
                        <div className="mb-4">
                          <ImageGrid imgs={post.images} />
                        </div>
                      )}

                      {/* ── Actions ── */}
                      <div className="flex items-center gap-1 pt-3 border-t border-border-subtle/50 mt-2">
                        <button
                          onClick={() => handleLike(post._id)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-pink-500/10 ${isLiked ? "text-pink-500 bg-pink-500/5" : "text-muted hover:text-pink-500"
                            }`}
                        >
                          <Heart
                            className={`w-4 h-4 transition-transform ${isLiked ? "fill-current scale-110" : ""}`}
                          />
                          {post.likes.length}
                        </button>

                        <button
                          onClick={() =>
                            setActiveCommentPostId(
                              activeCommentPostId === post._id ? null : post._id
                            )
                          }
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-blue-500/10 ${activeCommentPostId === post._id ? "text-blue-500 bg-blue-500/5" : "text-muted hover:text-blue-500"
                            }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          {post.comments.length}
                        </button>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/feed`);
                            toast.success("Link copied!");
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-muted hover:text-emerald-500 hover:bg-emerald-500/10 transition-all ml-auto"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* ── Comments ── */}
                      {activeCommentPostId === post._id && (
                        <div className="mt-4 pt-4 border-t border-border-subtle/50 animate-fade-in">

                          {/* Comment Input */}
                          {user ? (
                            <form
                              onSubmit={(e) => { e.preventDefault(); handleAddComment(post._id); }}
                              className="flex items-center gap-2.5 mb-5"
                            >
                              <Avatar name={user.name} size="xs" />
                              <input
                                type="text"
                                placeholder="Add to the discussion..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className={`${inputCls} flex-1 rounded-full !py-2`}
                                required
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

                          {/* Comment List */}
                          <div className="space-y-3">
                            {post.comments.map((comment) => (
                              <div key={comment._id} className="flex gap-2.5 group/c">
                                <Link href={`/u/${comment.userId?.username || "user"}`}>
                                  <Avatar name={comment.userId?.name || "U"} size="xs" gradient="from-blue-400 to-violet-500" />
                                </Link>
                                <div className="flex-1 bg-background border border-border-subtle rounded-2xl rounded-tl-md px-3.5 py-2.5 relative">
                                  <div className="flex items-center justify-between mb-1">
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
                                        onClick={() => handleDeleteComment(post._id, comment._id)}
                                        className="absolute top-2.5 right-2.5 p-1 text-muted opacity-0 group-hover/c:opacity-100 hover:text-red-500 transition-all rounded-md hover:bg-red-500/10"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    )}
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                    </article>
                  );
                })
              )}

              {/* Load More */}
              {hasMore && !loading && (
                <div className="pt-4 text-center">
                  <button
                    onClick={() => { setPage((p) => p + 1); fetchPosts(page + 1); }}
                    disabled={loadingMore}
                    className="px-8 py-3 bg-background border border-border-subtle text-muted font-bold text-sm rounded-2xl hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-500 transition-all disabled:opacity-50"
                  >
                    {loadingMore ? "Loading..." : "Load more posts"}
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* ════════════════════════════════════════════════
              COLUMN 3: RIGHT SIDEBAR (Independent Scroll)
          ════════════════════════════════════════════════ */}
          <aside className="hidden xl:flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide pt-6 pb-6">

            {/* Real Challenge Widget */}
            <div className={`${sidebarCardCls} border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-blue-500/5`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-black text-amber-500 uppercase tracking-widest">Active Challenge</span>
              </div>
              {user?.challenge?.activeDays ? (
                <>
                  <p className="text-sm font-bold text-foreground mb-0.5">Maintain {user.challenge.activeDays} Days Streak</p>
                  <p className="text-xs text-muted mb-3 font-medium">{user.challenge.progress} of {user.challenge.activeDays} completed</p>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden border border-border-subtle">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((user.challenge.progress / user.challenge.activeDays) * 100, 100)}%` }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-foreground mb-2">No Active Challenge</p>
                  <Link href="/challenges" className="block text-center w-full py-2 bg-amber-500/10 border border-amber-500/25 text-amber-500 rounded-xl text-xs font-bold hover:bg-amber-500 hover:text-background transition-all">
                    Join a Challenge →
                  </Link>
                </>
              )}
            </div>

            {/* Leaderboard Shortcut */}
            <div className={sidebarCardCls}>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-black text-muted uppercase tracking-widest">Top Thinkers</span>
              </div>
              <div className="text-center py-2">
                <p className="text-sm font-bold text-foreground mb-1">Check Global Rankings</p>
                <p className="text-xs text-muted mb-4">See where you stand among top developers.</p>
                <Link href="/leaderboard" className="w-full inline-block py-2.5 bg-background border border-border-subtle rounded-xl text-xs font-bold text-foreground hover:bg-foreground/5 transition-all">
                  View Leaderboard
                </Link>
              </div>
            </div>

            {/* Daily Problem */}
            <div className={sidebarCardCls}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[11px] font-black text-muted uppercase tracking-widest">Problem of the Day</span>
              </div>
              <div className="bg-background border border-border-subtle rounded-2xl p-4">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1.5">Solve & Earn</p>
                <p className="text-sm font-bold text-foreground mb-3 leading-snug">Boost your streak by solving today's POTD.</p>
                <Link href="/potd" className="block text-center w-full py-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 rounded-xl text-xs font-bold hover:bg-emerald-500 hover:text-background hover:border-emerald-500 transition-all">
                  Solve POTD →
                </Link>
              </div>
            </div>

          </aside>

        </div>
      </div>

      {/* ════════════════════════════════════════════════
          EDIT POST MODAL
      ════════════════════════════════════════════════ */}
      {editingPost && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4 sm:pb-0"
          onClick={(e) => { if (e.target === e.currentTarget) setEditingPost(null); }}
        >
          <div className={`${sidebarCardCls} w-full max-w-md shadow-2xl animate-fade-in-up sm:rounded-3xl rounded-t-3xl border-violet-500/30 ring-4 ring-violet-500/10 !bg-background`}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-black text-foreground flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-violet-500" />
                Edit Post
              </h3>
              <button
                onClick={() => setEditingPost(null)}
                className="p-1.5 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <input
                type="text"
                placeholder="Problem Title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className={inputCls}
                required
              />
              <input
                type="url"
                placeholder="LeetCode URL"
                value={editForm.link}
                onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                className={inputCls}
                required
              />
              <textarea
                placeholder="Content"
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={5}
                className={`${inputCls} resize-none leading-relaxed`}
                required
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={editForm.tags}
                onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                className={inputCls}
              />
              <button
                type="submit"
                className="w-full py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:scale-[1.02] transition-all shadow-lg mt-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}