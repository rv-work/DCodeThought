// components/admin/AdminHeader.tsx
import { useAuth } from "@/hooks/useAuth";

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="h-14 border-b flex items-center justify-between px-6">
      <div className="font-semibold">DCodeThought Admin</div>
      <div className="text-sm">{user?.name}</div>
    </header>
  );
}
