"use client";

import { X, Edit3 } from "lucide-react";
import { useState } from "react";
import { inputCls, sidebarCardCls } from "./constants";
import type { FeedPostType } from "@/types/feed";

// 1. Define an explicit interface for the form data to eliminate 'any'
export interface EditPostFormData {
  title: string;
  link: string;
  content: string;
  tags: string;
}

export default function EditPostModal({
  editingPost,
  onClose,
  onSave,
}: {
  editingPost: FeedPostType;
  onClose: () => void;
  // 2. Replaced `any` with the strict `EditPostFormData` interface
  onSave: (id: string, formData: EditPostFormData) => void;
}) {
  // 3. Strongly typed the useState hook
  const [editForm, setEditForm] = useState<EditPostFormData>({
    title: editingPost.title,
    link: editingPost.leetcodeLink,
    content: editingPost.content,
    tags: editingPost.tags.join(", "),
  });

  // 4. Strongly typed the form submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(editingPost._id, editForm);
  };

  // 5. Strongly typed the backdrop click event
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4 sm:pb-0"
      onClick={handleBackdropClick}
    >
      <div className={`${sidebarCardCls} w-full max-w-md shadow-2xl animate-fade-in-up sm:rounded-3xl rounded-t-3xl border-violet-500/30 ring-4 ring-violet-500/10 bg-background!`}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-black text-foreground flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-violet-500" />
            Edit Post
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Problem Title"
            value={editForm.title}
            // 6. Strongly typed the input change event
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, title: e.target.value })}
            className={inputCls}
            required
          />
          <input
            type="url"
            placeholder="LeetCode URL"
            value={editForm.link}
            // 6. Strongly typed the input change event
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, link: e.target.value })}
            className={inputCls}
            required
          />
          <textarea
            placeholder="Content"
            value={editForm.content}
            // 7. Strongly typed the textarea change event
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditForm({ ...editForm, content: e.target.value })}
            rows={5}
            className={`${inputCls} resize-none leading-relaxed`}
            required
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={editForm.tags}
            // 6. Strongly typed the input change event
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, tags: e.target.value })}
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
  );
}