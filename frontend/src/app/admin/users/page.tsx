"use client";

import { useEffect, useState } from "react";
import { getAdminUsers } from "@/api/admin.user.api";
import type { AdminUser } from "@/types/user";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    getAdminUsers().then((res) => setUsers(res.users));
  }, []);

  return (
    <div>
      <AdminPageHeader title="Users" />

      <AdminTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          { key: "dateOfJoining", label: "Joined" },
        ]}
        data={users}
      />
    </div>
  );
}
