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
import { Code2, Filter } from "lucide-react";

export default function ProblemsPage() {
  const [filters, setFilters] = useState<ProblemFiltersType>({
    page: 1,
    sort: "newest",
  });

  const [data, setData] = useState<ProblemListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProblems = async () => {
      try {
        setLoading(true);
        const result = await getProblems(filters);
        if (isMounted) setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProblems();

    return () => {
      isMounted = false;
    };
  }, [filters]);


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="text-center space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <Code2 className="w-4 h-4" />
              All Problems
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Problem Library
            </h1>

            {/* Description */}
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Browse through all solved problems with detailed Java-first explanations
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-4 text-sm text-muted">
              <Filter className="w-4 h-4" />
              <span>Filter & Sort</span>
            </div>
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

          {/* Problems Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl bg-background-secondary border border-border-subtle animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {data?.problems.map((p: PublicProblem) => (
                  <ProblemCard key={p._id} problem={p} />
                ))}
              </div>

              {data && data.totalPages > 0 && (
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

              {data && data.problems.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mb-6">
                    <Code2 className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Problems Found</h3>
                  <p className="text-muted">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}