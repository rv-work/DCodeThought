"use client";

import type { ProblemFiltersType } from "@/types/problem";
import { Search } from "lucide-react";

type Props = {
  onChange: (filters: Partial<ProblemFiltersType>) => void;
};

export default function ProblemFilters({ onChange }: Props) {
  return (
    <div className="rounded-3xl bg-background-secondary/60 backdrop-blur-xl border border-border-subtle p-3 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            placeholder="Search problems..."
            onChange={(e) => onChange({ search: e.target.value })}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-background border border-transparent text-sm text-foreground focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-muted"
          />
        </div>

        {/* Difficulty Select */}
        <select
          onChange={(e) =>
            onChange({
              difficulty: e.target.value as "Easy" | "Medium" | "Hard" | undefined,
            })
          }
          className="px-4 py-3.5 rounded-2xl bg-background border border-transparent text-sm text-foreground focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all cursor-pointer appearance-none"
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
              type: e.target.value as "potd" | "contest" | "requested" | undefined,
            })
          }
          className="px-4 py-3.5 rounded-2xl bg-background border border-transparent text-sm text-foreground focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all cursor-pointer appearance-none"
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
          className="px-4 py-3.5 rounded-2xl bg-background border border-transparent text-sm text-foreground focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all cursor-pointer appearance-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}