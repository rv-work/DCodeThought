"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function AddComment({
  problemId,
  refresh,
}: {
  problemId: string;
  refresh: () => void;
}) {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const submitComment = async () => {
    if (!text.trim()) return;

    await api.post(API.comments.add, {
      problemId,
      text,
    });

    setText("");
    refresh();
  };

  if (!user) {
    return <p className="text-muted dark:text-muted-dark">Login to comment.</p>;
  }

  return (
    <div className="mt-4">
      <textarea
        className="w-full border border-border bg-background rounded p-3"
        rows={3}
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submitComment}
        className="mt-2 px-4 py-2 bg-primary text-white rounded-lg"
      >
        Comment
      </button>
    </div>
  );
}
