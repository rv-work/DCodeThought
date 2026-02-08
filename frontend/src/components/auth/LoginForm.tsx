"use client";

import { useAuth } from "@/hooks/useAuth";
import EmailAuthForm from "./EmailAuthForm";
import GoogleAuthButton from "./GoogleAuthButton";

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <div className="space-y-6 max-w-sm mx-auto bg-background-secondary/40 backdrop-blur-xl border border-border-subtle rounded-2xl p-8 shadow-lg animate-scale-in">
      <GoogleAuthButton />

      <div className="text-center text-muted text-sm">or login with email</div>

      <EmailAuthForm mode="login" onSubmit={login} />
    </div>
  );
}
