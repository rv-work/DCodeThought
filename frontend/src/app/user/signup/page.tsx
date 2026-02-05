"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    try {
      await api.post(API.auth.signup, form);
      refreshUser();
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-card border border-border">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-2 mb-3 border rounded-lg bg-background"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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
        onClick={handleSignup}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-hover"
      >
        Sign Up
      </button>

      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link href="/user/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
