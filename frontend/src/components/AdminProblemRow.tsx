"use client";

import Link from "next/link";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import { useState } from "react";

export default function AdminSolutionRow({
  solution,
  refresh,
}: {
  solution: any;
  refresh: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    if (!confirm("Delete this solution?")) return;

    setDeleting(true);
    try {
      await api.delete(API.solution.delete(solution._id));
      refresh();
    } catch (err) {
      console.error(err);
    }
    setDeleting(false);
  };

  return (
    <div className="p-4 border border-border bg-card rounded-lg shadow-card flex items-center justify-between">

      {/* Left — Problem Info */}
      <div>
        <h3 className="text-lg font-semibold">
          {solution.problem?.problemNumber}. {solution.problem?.title}
        </h3>

        <p className="text-sm text-muted dark:text-muted-dark">
          Difficulty: {solution.problem?.difficulty}
        </p>

        <Link
          href={`/user/problems/${solution.problem?.slug}`}
          className="text-primary text-sm underline"
        >
          View Problem
        </Link>
      </div>

      {/* Right — Actions */}
      <div className="flex gap-3">
        <Link
          href={`/admin/solutions/${solution._id}`}
          className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
        >
          Edit
        </Link>

        <button
          onClick={remove}
          disabled={deleting}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
