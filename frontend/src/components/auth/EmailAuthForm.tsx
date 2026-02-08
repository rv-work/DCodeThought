"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginPayload, SignupPayload, AuthResponse } from "@/types/auth";

type Mode = "login" | "signup";

type PayloadByMode<T extends Mode> =
  T extends "login" ? LoginPayload : SignupPayload;

type Props<T extends Mode> = {
  mode: T;
  onSubmit: (data: PayloadByMode<T>) => Promise<AuthResponse>;
};

export default function EmailAuthForm<T extends Mode>({
  mode,
  onSubmit,
}: Props<T>) {
  const router = useRouter();

  const [form, setForm] = useState<SignupPayload>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = <K extends keyof SignupPayload>(
    key: K,
    value: SignupPayload[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await onSubmit({
          email: form.email,
          password: form.password,
        } as PayloadByMode<T>);
      } else {
        await onSubmit(form as PayloadByMode<T>);
      }

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
      {mode === "signup" && (
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all"
        />
      )}

      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        required
        className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent transition-all"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        required
        className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent transition-all"
      />

      {error && (
        <p className="text-red-500 text-sm font-medium px-1">{error}</p>
      )}

      <button
        disabled={loading}
        className="w-full px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-medium shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
      >
        {loading
          ? "Please wait..."
          : mode === "login"
            ? "Login"
            : "Create account"}
      </button>
    </form>
  );
}
