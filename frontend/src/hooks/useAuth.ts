import { useAuthContext } from "@/context/AuthProvider";

export function useAuth() {
  const { user, loading, refreshUser, logout } = useAuthContext();
  return { user, loading, refreshUser, logout };
}
