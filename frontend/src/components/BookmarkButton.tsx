"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function BookmarkButton({
  problemId,
  defaultBookmarked,
}: {
  problemId: string;
  defaultBookmarked: boolean;
}) {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(defaultBookmarked);

  if (!user) return null; // Hide if not logged in

  const toggleBookmark = async () => {
    try {
      if (bookmarked) {
        await api.post(API.user.bookmarks.remove, { problemId });
        setBookmarked(false);
      } else {
        await api.post(API.user.bookmarks.add, { problemId });
        setBookmarked(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`
        px-3 py-1 rounded-lg border
        ${bookmarked ? "bg-primary text-white" : "bg-card border-border"}
      `}
    >
      {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
    </button>
  );
}
