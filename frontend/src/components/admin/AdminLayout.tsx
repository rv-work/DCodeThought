// components/admin/AdminLayout.tsx
"use client";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 min-h-screen">
        <AdminHeader />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
