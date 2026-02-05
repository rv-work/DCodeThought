"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/user/login";
    return null;
  }

  return <>{children}</>;
}
