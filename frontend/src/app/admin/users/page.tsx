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

  if (loading) {
    return <AdminLoading text="Loading users..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Users"
        description="Manage platform users and their accounts"
      />

      {users.length === 0 ? (
        <AdminEmptyState
          title="No users found"
          description="No users have signed up yet."
          icon={
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          }
        />
      ) : (
        <AdminTable
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "dateOfJoining", label: "Joined" },
          ]}
          data={users}
          editPath="/admin/users"
        />
      )}
    </div>
  );
}