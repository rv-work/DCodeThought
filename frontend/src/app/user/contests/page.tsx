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

export default function OldPOTDPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [date, setDate] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  // Build filter URL
  const url = `${API.potd.old}?search=${debouncedSearch}&difficulty=${difficulty}&date=${date}`;

  const { data, loading, error } = useFetch(url);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">📅 Old POTDs</h1>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search old POTDs..."
        />

        {/* Difficulty */}
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

        {/* Date filter */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-background border-border"
        />
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Error */}
      {error && <EmptyState message={error} />}

      {/* Problems list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.potds?.length ? (
          data.potds.map((p: IProblem) => <ProblemCard key={p._id} problem={p} />)
        ) : (
          <EmptyState message="No POTDs match your filters." />
        )}
      </div>
    </div>
  );
}
