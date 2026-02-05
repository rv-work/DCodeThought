"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ProblemCard from "@/components/ProblemCard";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import { API } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { IProblem } from "@/lib/types";

export default function ProblemsPage() {
  // Search text
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Difficulty filter
  const [difficulty, setDifficulty] = useState("");

  // Tag filter
  const [tag, setTag] = useState("");

  // Build URL dynamically
  const url = `${API.problems.all}?search=${debouncedSearch}&difficulty=${difficulty}&tag=${tag}`;

  const { data, loading, error } = useFetch(url);

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold">🧩 All Problems</h1>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search problems..." />

        {/* Difficulty Filter */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-background border-border"
        >
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Tag Filter */}
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-background border-border"
        >
          <option value="">Tag</option>
          <option value="Array">Array</option>
          <option value="DP">DP</option>
          <option value="Graph">Graph</option>
          <option value="Tree">Tree</option>
          <option value="String">String</option>
          {/* Later dynamic tags from backend */}
        </select>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Error */}
      {error && <EmptyState message={error} />}

      {/* Problem List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.problems?.length ? (
          data.problems.map((p: IProblem) => <ProblemCard key={p._id} problem={p} />)
        ) : (
          <EmptyState message="No problems found" />
        )}
      </div>
    </div>
  );
}
