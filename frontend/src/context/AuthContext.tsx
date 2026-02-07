"use client";

import { createContext, useEffect, useState } from "react";
import type {
  User,
  LoginPayload,
  SignupPayload,
  GooglePayload,
  AuthResponse,
} from "@/types/auth";
import * as authApi from "@/api/auth.api";

type AuthContextType = {
  user: User | null;
  loading: boolean;

  login: (data: LoginPayload) => Promise<AuthResponse>;
  signup: (data: SignupPayload) => Promise<AuthResponse>;
  googleLogin: (data: GooglePayload) => Promise<AuthResponse>;

  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 🔥 On app load: hydrate user from cookie
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await authApi.getMe();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (data: LoginPayload): Promise<AuthResponse> => {
    const res = await authApi.login(data);
    setUser(res.user);
    return res;
  };

  const signup = async (data: SignupPayload): Promise<AuthResponse> => {
    const res = await authApi.signup(data);
    setUser(res.user);
    return res;
  };

  const googleLogin = async (
    data: GooglePayload
  ): Promise<AuthResponse> => {
    const res = await authApi.googleLogin(data);
    setUser(res.user);
    return res;
  };

  const logout = async (): Promise<void> => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
