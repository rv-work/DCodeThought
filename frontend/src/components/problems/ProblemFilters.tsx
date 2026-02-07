"use client";

import type { ProblemFiltersType } from "@/types/problem";

type Props = {
  onChange: (filters: Partial<ProblemFiltersType>) => void;
};

export default function ProblemFilters({ onChange }: Props) {
  return (
    <div className="flex gap-2 text-sm mb-4">
      <input
        placeholder="Search"
        onChange={(e) => onChange({ search: e.target.value })}
        className="border px-2 py-1"
      />

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
      >
        <option value="">Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

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
      >
        <option value="">Type</option>
        <option value="potd">POTD</option>
        <option value="contest">Contest</option>
        <option value="requested">Requested</option>
      </select>

      <select
        onChange={(e) =>
          onChange({
            sort: e.target.value as "newest" | "oldest",
          })
        }
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
