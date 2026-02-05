"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import { IUser } from "@/lib/types";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  refreshUser: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await api.get(API.auth.me);
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
  return ctx;
}
