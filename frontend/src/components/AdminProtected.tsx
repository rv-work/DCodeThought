"use client";

import { useAuth } from "@/hooks/useAuth";
import Loader from "./Loader";

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/user/login";
    return null;
  }

  // Only admin allowed
  if (user.role !== "admin") {
    if (typeof window !== "undefined") window.location.href = "/";
    return null;
  }

  return <>{children}</>;
}
