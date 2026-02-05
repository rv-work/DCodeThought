"use client";

import { useState } from "react";
import { API } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import SearchBar from "@/components/SearchBar";
import AdminContestRow from "@/components/AdminContestRow";

export default function AdminContestsPage() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);

  const url = `${API.contest.all}?search=${debounced}`;

  const { data, loading, error, refetch } = useFetch(url, true);

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const contests = data?.contests || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">🏆 Manage Contests</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search contest by name or number..."
      />

      <div className="space-y-4">
        {contests.length ? (
          contests.map((c: any) => (
            <AdminContestRow key={c._id} contest={c} refresh={refetch} />
          ))
        ) : (
          <EmptyState message="No contests found." />
        )}
      </div>
    </div>
  );
}
