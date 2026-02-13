"use client";

import type { ProblemFiltersType } from "@/types/problem";
import { Search, SlidersHorizontal } from "lucide-react";

type Props = {
  onChange: (filters: Partial<ProblemFiltersType>) => void;
};

export default function ProblemFilters({ onChange }: Props) {
  return (
    <div className="rounded-2xl bg-background-secondary border border-border-subtle p-6">
      <div className="flex items-center gap-2 mb-4 text-sm text-muted">
        <SlidersHorizontal className="w-4 h-4" />
        <span className="font-semibold">Filters</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            placeholder="Search problems..."
            onChange={(e) => onChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all cursor-text"
          />
        </div>

        {/* Difficulty Select */}
        <select
          onChange={(e) =>
            onChange({
              difficulty: e.target.value as
                | "Easy"
                | "Medium"
                | "Hard"
                | undefined,
            })
          }
          className="px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all cursor-pointer"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Type Select */}
        <select
          onChange={(e) =>
            onChange({
              type: e.target.value as
                | "potd"
                | "contest"
                | "requested"
                | undefined,
            })
          }
          className="px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="potd">POTD</option>
          <option value="contest">Contest</option>
          <option value="requested">Requested</option>
        </select>

        {/* Sort Select */}
        <select
          onChange={(e) =>
            onChange({
              sort: e.target.value as "newest" | "oldest",
            })
          }
          className="px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}