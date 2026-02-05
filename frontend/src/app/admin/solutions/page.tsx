"use client";

import { useState } from "react";
import { API } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import SearchBar from "@/components/SearchBar";
import AdminSolutionRow from "@/components/AdminSolutionRow";

export default function AdminSolutionsPage() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);

  const url = `${API.solution.all}?search=${debounced}`;

  const { data, loading, error, refetch } = useFetch(url, true);

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const solutions = data?.solutions || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">🛠 Manage Solutions</h1>

      {/* SEARCH BAR */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by problem title or number..."
      />

      {/* LIST */}
      <div className="space-y-4">
        {solutions.length ? (
          solutions.map((s: any) => (
            <AdminSolutionRow key={s._id} solution={s} refresh={refetch} />
          ))
        ) : (
          <EmptyState message="No solutions found." />
        )}
      </div>
    </div>
  );
}
