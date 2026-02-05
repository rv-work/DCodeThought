"use client";

import Link from "next/link";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import { useState } from "react";

export default function AdminContestRow({
  contest,
  refresh,
}: {
  contest: any;
  refresh: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    if (!confirm("Delete this contest?")) return;

    setDeleting(true);
    try {
      await api.delete(API.contest.delete(contest._id));
      refresh();
    } catch (err) {
      console.error(err);
    }
    setDeleting(false);
  };

  return (
    <div className="p-4 border border-border bg-card rounded-lg shadow-card flex items-center justify-between">

      <div>
        <h3 className="text-lg font-semibold">
          Contest #{contest.contestNumber} — {contest.contestName}
        </h3>

        <p className="text-sm text-muted dark:text-muted-dark">
          {new Date(contest.contestDate).toDateString()}
        </p>

        <p className="text-sm text-muted dark:text-muted-dark">
          Problems: {contest.problems?.length || 0}
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/admin/contests/${contest._id}`}
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
