"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="p-6">Checking admin access...</div>;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold text-lg mb-4">Admin Panel</h2>

        <nav className="space-y-2 text-sm">
          <div>Dashboard</div>
          <div>Problems</div>
          <div>POTD</div>
          <div>Contests</div>
          <div>Solutions</div>
          <div>Users</div>
          <div>Reports</div>
          <div>Requests</div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
