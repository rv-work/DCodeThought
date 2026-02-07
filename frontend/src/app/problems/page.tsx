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

  useEffect(() => {
    getProblems(filters).then(setData);
  }, [filters]);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <ProblemFilters
          onChange={(f) =>
            setFilters((prev) => ({
              ...prev,
              ...f,
              page: 1,
            }))
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.problems.map((p: PublicProblem) => (
            <ProblemCard key={p._id} problem={p} />
          ))}
        </div>

        {data && (
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
        )}
      </div>
    </>
  );
}
