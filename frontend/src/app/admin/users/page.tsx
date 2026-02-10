"use client";

import { useEffect, useState } from "react";
import { getAdminUsers } from "@/api/admin.user.api";
import type { AdminUser } from "@/types/user";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers().then((res) => {
      setUsers(res.users);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Users" />

      {/* 🔄 Loading */}
      {loading && <AdminLoading text="Loading users..." />}

      {/* 📭 Empty */}
      {!loading && users.length === 0 && (
        <AdminEmptyState
          title="No users found"
          description="No users have signed up yet."
        />
      )}

      {/* 📋 Data */}
      {!loading && users.length > 0 && (
        <AdminTable
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "dateOfJoining", label: "Joined" },
          ]}
          data={users}
        />
      )}
    </div>
  );
}
