import AdminSidebar from "@/components/AdminSidebar";
import AdminProtected from "@/components/AdminProtected";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProtected>
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex-1 p-6 bg-background">
          {children}
        </div>
      </div>
    </AdminProtected>
  );
}
