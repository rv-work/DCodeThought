"use client";

import Protected from "@/components/Protected";
import { useFetch } from "@/hooks/useFetch";
import { API } from "@/lib/api";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ProblemCard from "@/components/ProblemCard";

export default function BookmarksPage() {
  return (
    <Protected>
      <BookmarksContent />
    </Protected>
  );
}

function BookmarksContent() {
  const { data, loading, error } = useFetch(API.user.bookmarks.list);

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const bookmarks = data.bookmarks || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">⭐ Your Bookmarked Problems</h1>

      {bookmarks.length === 0 && (
        <EmptyState message="No bookmarks yet." />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((b: any) => (
          <ProblemCard key={b.problem._id} problem={b.problem} />
        ))}
      </div>
    </div>
  );
}
