"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  LoginPayload,
  SignupPayload,
  AuthResponse,
} from "@/types/auth";

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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {mode === "signup" && (
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
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
