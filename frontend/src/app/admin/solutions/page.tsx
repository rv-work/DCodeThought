"use client";

import { useEffect, useState } from "react";
import {
  getAdminSolutions,
  deleteAdminSolution,
} from "@/api/admin.solution.api";
import type { Solution } from "@/types/solution";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import Link from "next/link";

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminSolutions().then((res) => {
      setSolutions(res.solutions);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <AdminLoading text="Loading solutions..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Solutions"
        description="Manage problem solutions and explanations"
        action={
          <Link
            href="/admin/solutions/add"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Solution
          </Link>
        }
      />

      {solutions.length === 0 ? (
        <AdminEmptyState
          title="No solutions yet"
          description="Add solutions for problems to help learners understand better."
          action={
            <Link
              href="/admin/solutions/add"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Solution
            </Link>
          }
          icon={
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          }
        />
      ) : (
        <div className="grid gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
          {solutions.map((s, idx) => (
            <div
              key={s._id}
              className="group card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                    {s.problemId.problemNumber}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">
                      {s.problemId.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        {Object.keys(s.code || {}).length} language(s)
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        {s.hints?.length || 0} hints
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/solutions/${s.problemId._id}/edit`}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer group/btn"
                  >
                    <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>

                  <button
                    onClick={async () => {
                      if (confirm("Are you sure you want to delete this solution?")) {
                        await deleteAdminSolution(s.problemId._id);
                        setSolutions((prev) =>
                          prev.filter((x) => x.problemId._id !== s.problemId._id)
                        );
                      }
                    }}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-sm font-medium cursor-pointer group/btn"
                  >
                    <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}