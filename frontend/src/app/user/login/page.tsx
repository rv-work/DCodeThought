"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      await api.post(API.auth.login, form);
      refreshUser();
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-card border border-border">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mb-3 border rounded-lg bg-background"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-3 border rounded-lg bg-background"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-hover"
      >
        Login
      </button>

      <p className="mt-3 text-sm">
        Don't have an account?{" "}
        <Link href="/user/signup" className="text-primary hover:underline">
          Signup
        </Link>
      </p>
    </div>
  );
}
