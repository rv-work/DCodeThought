"use client";

import { useFetch } from "@/hooks/useFetch";
import { API } from "@/lib/api";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import CodeTabs from "@/components/CodeTabs";
import AddComment from "@/components/AddComment";
import CommentCard from "@/components/CommentCard";
import { useState } from "react";
import BookmarkButton from "@/components/BookmarkButton";

export default function ProblemDetail({ params }: { params: { slug: string } }) {
  const url = API.problems.one(params.slug);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, loading, error } = useFetch(`${url}?refresh=${refreshKey}`);

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const problem = data.problem;
  const solution = data.solution;
  const comments = data.comments;

  const refresh = () => setRefreshKey((p) => p + 1);

  return (
    <div className="space-y-8">

      {/* Problem Header */}
      <section>
        <h1 className="text-3xl font-bold">
          {problem.problemNumber}. {problem.title}
          <div className="mt-4">
            <BookmarkButton
              problemId={problem._id}
              defaultBookmarked={data.bookmarked}
            />
          </div>

        </h1>

        <p className="text-primary mt-1">
          Difficulty: {problem.difficulty}
        </p>

        <a
          href={problem.leetcodeLink}
          target="_blank"
          className="text-blue-500 underline text-sm"
        >
          View on LeetCode
        </a>

        {/* Tags */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {problem.tags.map((t: string) => (
            <span
              key={t}
              className="px-2 py-1 bg-background border border-border rounded text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* --------------------------------------
          SOLUTION AREA 
      --------------------------------------- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">💡 My Thought (Hindi)</h2>
        <p className="bg-card border border-border p-4 rounded-lg">
          {solution.myThought}
        </p>

        <h2 className="text-2xl font-bold">📘 English Explanation</h2>
        <p className="bg-card border border-border p-4 rounded-lg">
          {solution.engThought}
        </p>

        {/* Code Tabs */}
        <CodeTabs code={solution.code} />

        {/* YouTube Video */}
        {solution.youtubeLink && (
          <div className="mt-6 aspect-video">
            <iframe
              src={solution.youtubeLink.replace("watch?v=", "embed/")}
              className="w-full h-full rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </section>

      {/* --------------------------------------
          COMMENTS SECTION 
      --------------------------------------- */}
      <section>
        <h2 className="text-2xl font-bold mb-3">💬 Comments</h2>

        <AddComment problemId={problem._id} refresh={refresh} />

        <div className="space-y-4 mt-6">
          {comments.length ? (
            comments.map((c: any) => (
              <CommentCard key={c._id} comment={c} refresh={refresh} />
            ))
          ) : (
            <EmptyState message="No comments yet." />
          )}
        </div>
      </section>
    </div>
  );
}
