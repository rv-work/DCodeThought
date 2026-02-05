"use client";

import { useState } from "react";
import { API } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import SearchBar from "@/components/SearchBar";
import AdminUserRow from "@/components/AdminUserRow";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 300);

  const url = `${API.user.all}?search=${debounced}`;

  const { data, loading, error, refetch } = useFetch(url, true);

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;

  const users = data?.users || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">👥 Manage Users</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search user by name or email"
      />

      <div className="space-y-4">
        {users.length ? (
          users.map((u: any) => (
            <AdminUserRow key={u._id} user={u} refresh={refetch} />
          ))
        ) : (
          <EmptyState message="No users found." />
        )}
      </div>
    </div>
  );
}
