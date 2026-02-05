"use client";

import { useState } from "react";
import { API } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import AdminProblemRow from "@/components/AdminProblemRow";
import SearchBar from "@/components/SearchBar";

export default function AdminProblemsPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tag, setTag] = useState("");

  const debounced = useDebounce(search, 300);

  const url = `${API.problems.all}?search=${debounced}&difficulty=${difficulty}&tag=${tag}`;

  const { data, loading, error, refetch } = useFetch(url, true);
  // true ⇒ can refresh manually

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const problems = data?.problems || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">🛠 Manage Problems</h1>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title / number..."
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-3 py-2 border border-border rounded bg-background"
        >
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="px-3 py-2 border border-border rounded bg-background"
        >
          <option value="">Tag</option>
          <option value="Array">Array</option>
          <option value="Graph">Graph</option>
          <option value="DP">DP</option>
          <option value="Tree">Tree</option>
          <option value="String">String</option>
          <option value="Math">Math</option>
        </select>
      </div>

      {/* PROBLEMS LIST */}
      <div className="space-y-4">
        {problems.length ? (
          problems.map((p: any) => (
            <AdminProblemRow
              key={p._id}
              problem={p}
              refresh={refetch}
            />
          ))
        ) : (
          <EmptyState message="No problems found." />
        )}
      </div>
    </div>
  );
}
