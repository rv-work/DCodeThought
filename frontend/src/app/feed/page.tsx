// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import Navbar from "@/components/navbar/Navbar";
// import { useAuth } from "@/hooks/useAuth";
// import {
//   getFeedPosts, togglePostLike, addPostComment, deletePostComment, deleteFeedPost, editFeedPost
// } from "@/api/feed.api";
// import type { FeedPostType } from "@/types/feed";
// import { parseError } from "@/utils/parseError";
// import toast from "react-hot-toast";
// import { Code2 } from "lucide-react";

// import Lightbox from "@/components/feed/ui/Lightbox";
// import PostSkeleton from "@/components/feed/ui/PostSkeleton";
// import LeftSidebar from "@/components/feed/LeftSidebar";
// import RightSidebar from "@/components/feed/RightSidebar";
// import CreatePostForm from "@/components/feed/CreatePostForm";
// import EditPostModal, { EditPostFormData } from "@/components/feed/EditPostModal";
// import PostItem from "@/components/feed/PostItem";
// import { sidebarCardCls, LightboxState } from "@/components/feed/constants";

// export default function FeedPage() {
//   const { user } = useAuth();

//   // Feed state
//   const [posts, setPosts] = useState<FeedPostType[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [loadingMore, setLoadingMore] = useState<boolean>(false);

//   // Comments state
//   const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
//   const [commentText, setCommentText] = useState<string>("");

//   // Edit / Delete state
//   const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);
//   const [editingPost, setEditingPost] = useState<FeedPostType | null>(null);

//   // Lightbox state
//   const [lightbox, setLightbox] = useState<LightboxState | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // ── Close menu on outside click ────────────────────────────────────────────
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (openMenuPostId && menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         setOpenMenuPostId(null);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [openMenuPostId]);

//   // ── Lightbox nav ───────────────────────────────────────────────────────────
//   const handleLightboxNav = useCallback((dir: 1 | -1) => {
//     setLightbox((prev) => {
//       if (!prev) return prev;
//       const next = prev.index + dir;
//       if (next < 0 || next >= prev.imgs.length) return prev;
//       return { ...prev, index: next };
//     });
//   }, []);

//   // ── Fetch ──────────────────────────────────────────────────────────────────
//   const fetchPosts = async (pageNum: number) => {
//     try {
//       // FIXED: Replaced ternary operators with if/else statements
//       if (pageNum === 1) {
//         setLoading(true);
//       } else {
//         setLoadingMore(true);
//       }

//       const res = await getFeedPosts(pageNum, 10);

//       // FIXED: Replaced ternary operators with if/else statements
//       if (pageNum === 1) {
//         setPosts(res.posts);
//       } else {
//         setPosts((prev) => [...prev, ...res.posts]);
//       }

//       setHasMore(res.hasMore);
//     } catch (error: unknown) {
//       toast.error(parseError(error));
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   useEffect(() => { fetchPosts(1); }, []);

//   // ── Handlers ───────────────────────────────────────────────────────────────
//   const handleLike = async (postId: string) => {
//     if (!user) return toast.error("Log in to like posts.");
//     setPosts(posts.map((p) => {
//       if (p._id !== postId) return p;
//       const liked = p.likes.includes(user._id);
//       return {
//         ...p,
//         likes: liked
//           ? p.likes.filter((id) => id !== user._id)
//           : [...p.likes, user._id],
//       };
//     }));
//     try {
//       await togglePostLike(postId);
//     } catch (error: unknown) {
//       toast.error(parseError(error));
//       fetchPosts(page);
//     }
//   };

//   const handleAddComment = async (postId: string) => {
//     if (!user) return toast.error("Log in to comment.");
//     if (!commentText.trim()) return;
//     try {
//       const res = await addPostComment(postId, commentText);
//       setPosts(posts.map((p) =>
//         p._id === postId ? { ...p, comments: res.comments } : p
//       ));
//       setCommentText("");
//       toast.success("Comment added!");
//     } catch (error: unknown) {
//       toast.error(parseError(error));
//     }
//   };

//   const handleDeleteComment = async (postId: string, commentId: string) => {
//     if (!confirm("Delete this comment?")) return;
//     try {
//       await deletePostComment(postId, commentId);
//       setPosts(posts.map((p) =>
//         p._id === postId
//           ? { ...p, comments: p.comments.filter((c) => c._id !== commentId) }
//           : p
//       ));
//       toast.success("Comment deleted.");
//     } catch (error: unknown) {
//       toast.error(parseError(error));
//     }
//   };

//   const handleDeletePost = async (postId: string) => {
//     if (!confirm("Delete this post permanently?")) return;
//     try {
//       await deleteFeedPost(postId);
//       setPosts(posts.filter((p) => p._id !== postId));
//       setOpenMenuPostId(null);
//       toast.success("Post deleted.");
//     } catch (error: unknown) {
//       toast.error(parseError(error));
//     }
//   };

//   const startEditing = (post: FeedPostType) => {
//     setEditingPost(post);
//     setOpenMenuPostId(null);
//   };

//   const handleSaveEdit = async (id: string, editForm: EditPostFormData) => {
//     try {
//       const res = await editFeedPost(id, {
//         title: editForm.title,
//         leetcodeLink: editForm.link,
//         content: editForm.content,
//         tags: editForm.tags,
//       });
//       setPosts(posts.map((p) => (p._id === id ? res.post : p)));
//       toast.success("Post updated!");
//       setEditingPost(null);
//     } catch (error: unknown) {
//       toast.error(parseError(error));
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up { animation: fadeInUp 0.2s ease-out; }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-fade-in { animation: fadeIn 0.2s ease-out; }
//       `}</style>

//       <Navbar />

//       {lightbox && (
//         <Lightbox state={lightbox} onClose={() => setLightbox(null)} onNav={handleLightboxNav} />
//       )}

//       <div className="min-h-screen lg:min-h-0 lg:h-[calc(100vh-76px)] bg-background relative lg:overflow-hidden">
//         {/* Ambient glows */}
//         <div className="fixed top-[15%] left-[-15%] w-150 h-150 bg-violet-500/10 rounded-full blur-[140px] pointer-events-none" />
//         <div className="fixed top-[50%] right-[-15%] w-125 h-125 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

//         <div className="max-w-300 mx-auto px-4 sm:px-6 h-full grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-6 relative z-10">

//           <LeftSidebar user={user} />

//           {/* ═══ CENTER FEED ═══ */}
//           <main className="min-w-0 min-h-0 lg:h-full lg:flex lg:flex-col pt-6 lg:overflow-hidden">
//             <CreatePostForm user={user} onPostCreated={(newPost) => setPosts([newPost, ...posts])} />

//             {/* Feed list */}
//             <div className="flex-1 lg:overflow-y-auto scrollbar-hide space-y-4 pb-24 lg:pb-6 lg:pr-2">
//               {loading ? (
//                 <><PostSkeleton /><PostSkeleton /><PostSkeleton /></>
//               ) : posts.length === 0 ? (
//                 <div className={`${sidebarCardCls} p-16 text-center`}>
//                   <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
//                     <Code2 className="w-8 h-8 text-violet-500" />
//                   </div>
//                   <p className="text-muted font-bold">No posts yet.</p>
//                   <p className="text-muted text-sm mt-1">Be the first to share a solution!</p>
//                 </div>
//               ) : (
//                 posts.map((post) => (
//                   <PostItem
//                     key={post._id}
//                     post={post}
//                     user={user}
//                     isLiked={!!user && post.likes.includes(user._id)}
//                     onLike={handleLike}
//                     activeCommentPostId={activeCommentPostId}
//                     setActiveCommentPostId={setActiveCommentPostId}
//                     commentText={commentText}
//                     setCommentText={setCommentText}
//                     onAddComment={handleAddComment}
//                     onDeleteComment={handleDeleteComment}
//                     openMenuPostId={openMenuPostId}
//                     setOpenMenuPostId={setOpenMenuPostId}
//                     menuRef={menuRef}
//                     onEditPost={startEditing}
//                     onDeletePost={handleDeletePost}
//                     onImageClick={(idx) => setLightbox({ imgs: post.images, index: idx })}
//                   />
//                 ))
//               )}

//               {/* Load More */}
//               {hasMore && !loading && (
//                 <div className="pt-2 text-center">
//                   <button
//                     onClick={() => { setPage((p) => p + 1); fetchPosts(page + 1); }}
//                     disabled={loadingMore}
//                     className="px-8 py-3 bg-background border border-border-subtle text-muted font-bold text-sm rounded-2xl hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-500 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
//                   >
//                     {loadingMore ? (
//                       <><span className="w-4 h-4 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" /> Loading...</>
//                     ) : (
//                       "Load more posts"
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </main>

//           <RightSidebar user={user} />
//         </div>
//       </div>

//       {editingPost && (
//         <EditPostModal
//           editingPost={editingPost}
//           onClose={() => setEditingPost(null)}
//           onSave={handleSaveEdit}
//         />
//       )}
//     </>
//   );
// }

import Link from 'next/link';
import { Activity, Rocket, ArrowLeft } from 'lucide-react';

const FeedPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 w-full">

      {/* Animated Icon Container */}
      <div className="relative mb-8 group">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/40 transition-all duration-700"></div>

        {/* Main Icon */}
        <div className="relative bg-background-secondary/40 border border-border-subtle p-6 rounded-full backdrop-blur-xl shadow-2xl">
          <Activity className="w-12 h-12 text-purple-400 animate-pulse" />
        </div>

        {/* Floating Rocket Badge */}
        <div className="absolute -top-2 -right-2 bg-background p-2 rounded-full border border-border-subtle shadow-lg animate-bounce">
          <Rocket className="w-5 h-5 text-blue-400" />
        </div>
      </div>

      {/* Typography */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-blue-400">
        Live Feed is Brewing!
      </h1>

      <p className="text-muted text-base md:text-lg max-w-md mb-10 leading-relaxed">
        We are crafting an awesome real-time community experience. The arena engineers are working hard on this feature. Check back soon!
      </p>

      {/* Back to Safety Button */}
      <Link
        href="/problems"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-purple-500/50 transition-all duration-300 text-sm font-bold text-foreground group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        Return to Problems
      </Link>

    </div>
  );
}

export default FeedPage;