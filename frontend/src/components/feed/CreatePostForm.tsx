"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Code2, Hash, Link as LinkIcon, ImagePlus, Send, X } from "lucide-react";
import Avatar from "./ui/Avatar";
import { createFeedPost } from "@/api/feed.api";
import { parseError } from "@/utils/parseError";
import { inputCls, sidebarCardCls } from "./constants";
import type { FeedPostType } from "@/types/feed";
import type { User } from "@/types/user"; // 

export default function CreatePostForm({
  user,
  onPostCreated
}: {
  user: User | null; //
  onPostCreated: (post: FeedPostType) => void;
}) {
  const [content, setContent] = useState<string>("");
  const [qNum, setQNum] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected: File[] = Array.from(e.target.files);

    if (images.length + selected.length > 4) {
      toast.error("Maximum 4 images allowed.");
      return;
    }

    setImages((prev) => [...prev, ...selected]);
    setImagePreviews((prev) => [
      ...prev,
      ...selected.map((f: File) => URL.createObjectURL(f))
    ]);
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to post.");
    if (!qNum || !title || !link || !content) return toast.error("Question details and content are required.");

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("questionNumber", qNum);
      fd.append("title", title);
      fd.append("leetcodeLink", link);
      fd.append("content", content);
      if (tags) fd.append("tags", tags);
      images.forEach((img: File) => fd.append("images", img));

      const res = await createFeedPost(fd);
      toast.success(res.message);
      onPostCreated(res.post);

      // Reset form
      setContent("");
      setQNum("");
      setTitle("");
      setLink("");
      setTags("");
      setImages([]);
      setImagePreviews([]);
      setIsCreateFormOpen(false);
    } catch (error: unknown) {
      toast.error(parseError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="shrink-0 mb-5 z-40 sticky top-19 lg:static bg-background/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-b border-border-subtle/50 lg:border-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 lg:pb-0">
      {!isCreateFormOpen ? (
        <div
          onClick={() => setIsCreateFormOpen(true)}
          className={`${sidebarCardCls} p-3.5! flex items-center gap-3 cursor-pointer group hover:border-violet-500/40 hover:shadow-md transition-all`}
        >
          <Avatar name={user.name} size="sm" />
          <span className="flex-1 text-sm text-muted font-medium group-hover:text-foreground/70 transition-colors select-none">
            Share your approach, thought process, or code...
          </span>
          <div className="shrink-0 w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500 group-hover:border-violet-500 transition-all">
            <Code2 className="w-4 h-4 text-violet-500 group-hover:text-white transition-colors" />
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

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                <input
                  type="number"
                  placeholder="Question No."
                  value={qNum}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQNum(e.target.value)}
                  className={`${inputCls} pl-9`}
                  required
                />
              </div>
              <div className="relative">
                <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                <input
                  type="text"
                  placeholder="Problem Title"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  className={`${inputCls} pl-9`}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
              <input
                type="url"
                placeholder="LeetCode URL"
                value={link}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
                className={`${inputCls} pl-9`}
                required
              />
            </div>

            <textarea
              placeholder="Explain your thought process, approach, and time complexity..."
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              rows={4}
              className={`${inputCls} resize-none leading-relaxed`}
              required
            />

            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
              <input
                type="text"
                placeholder="Tags (comma separated — e.g. DP, Array, Java)"
                value={tags}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
                className={`${inputCls} pl-9`}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border-subtle group">
                    <Image src={src} alt="preview" fill className="object-cover" unoptimized />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors z-10"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
                {imagePreviews.length < 4 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-border-subtle hover:border-violet-500/50 flex flex-col items-center justify-center gap-1 text-muted hover:text-violet-500 transition-all"
                  >
                    <ImagePlus className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Add</span>
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50 mt-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-2 text-violet-500 hover:bg-violet-500/10 rounded-xl transition-all text-xs font-bold"
                  title="Add images (max 4)"
                >
                  <ImagePlus className="w-4 h-4" />
                  <span>Image {images.length > 0 ? `(${images.length}/4)` : ""}</span>
                </button>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-muted hover:bg-foreground/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-foreground text-background rounded-xl font-bold text-xs hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <><Send className="w-3.5 h-3.5" /> Post Solution</>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}