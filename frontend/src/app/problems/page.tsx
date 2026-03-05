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
import { Code2, Filter, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

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
        toast.error(parseError(err));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProblems();
    return () => { isMounted = false; };
  }, [filters]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12 relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-0 w-125 h-125 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-sm font-bold tracking-wide uppercase">
              <Layers className="w-4 h-4" />
              All Problems
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              Problem <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">Library</span>
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Browse through all solved problems with detailed thought-first explanations and multi-language code.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Filters */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-foreground uppercase tracking-wide">
              <Filter className="w-4 h-4 text-purple-500" />
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
                  className="h-48 rounded-3xl bg-background-secondary/50 border border-border-subtle animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.problems.map((p: PublicProblem) => (
                  <ProblemCard key={p._id} problem={p} />
                ))}
              </div>

              {data && data.totalPages > 0 && (
                <div className="mt-16">
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
                <div className="text-center py-24 bg-background-secondary/30 backdrop-blur-md rounded-3xl border border-border-subtle mt-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-purple-500/10 mb-6 border border-purple-500/20">
                    <Code2 className="w-10 h-10 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">No Problems Found</h3>
                  <p className="text-muted text-lg">
                    Try adjusting your filters or search criteria.
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