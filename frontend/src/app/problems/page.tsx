"use client";

import { useEffect, useState } from "react";
import { getProblems } from "@/api/problem.api";
import ProblemCard from "@/components/problems/ProblemCard";
import ProblemFilters from "@/components/problems/ProblemFilters";
import Pagination from "@/components/problems/Pagination";
import type {
  PublicProblem,
  ProblemFiltersType,
  ProblemListResponse,
} from "@/types/problem";
import Navbar from "@/components/navbar/Navbar";

export default function ProblemsPage() {
  const [filters, setFilters] = useState<ProblemFiltersType>({
    page: 1,
    sort: "newest",
  });

  const [data, setData] = useState<ProblemListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProblems(filters).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [filters]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-purple-500/5 to-pink-500/5 border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center space-y-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold">
                All Problems
              </h1>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                Master problem-solving with our comprehensive collection of LeetCode problems
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Filters */}
          <div className="mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <ProblemFilters
              onChange={(f) =>
                setFilters((prev) => ({
                  ...prev,
                  ...f,
                  page: 1,
                }))
              }
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-border"></div>
                <div className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent absolute top-0 left-0 animate-spin"></div>
              </div>
            </div>
          )}

          {/* Problems Grid */}
          {!loading && data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
                {data.problems.map((p: PublicProblem, idx) => (
                  <div
                    key={p._id}
                    className="animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${0.1 * (idx % 6)}s` }}
                  >
                    <ProblemCard problem={p} />
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {data.problems.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                  <div className="w-20 h-20 rounded-2xl bg-muted/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">No problems found</h3>
                  <p className="text-muted">Try adjusting your filters</p>
                </div>
              )}

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    page={data.page}
                    totalPages={data.totalPages}
                    onChange={(p) =>
                      setFilters((prev) => ({
                        ...prev,
                        page: p,
                      }))
                    }
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}