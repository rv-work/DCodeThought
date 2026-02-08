// components/admin/AdminSidebar.tsx
import AdminSidebarItem from "./AdminSidebarItem";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-4 space-y-1">
      <h2 className="font-bold text-lg mb-4">Admin Panel</h2>

      <AdminSidebarItem href="/admin" label="Dashboard" />
      <AdminSidebarItem href="/admin/problems" label="Problems" />
      <AdminSidebarItem href="/admin/potd" label="POTD" />
      <AdminSidebarItem href="/admin/contests" label="Contests" />
      <AdminSidebarItem href="/admin/solutions" label="Solutions" />
      <AdminSidebarItem href="/admin/users" label="Users" />
      <AdminSidebarItem href="/admin/reports" label="Reports" />
      <AdminSidebarItem href="/admin/requests" label="Requests" />
    </aside>
  );
}
