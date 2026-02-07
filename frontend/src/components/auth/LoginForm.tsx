"use client";

import { useAuth } from "@/hooks/useAuth";
import EmailAuthForm from "./EmailAuthForm";
import GoogleAuthButton from "./GoogleAuthButton";

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <GoogleAuthButton />

      <div className="text-center text-sm">or login with email</div>

      <EmailAuthForm mode="login" onSubmit={login} />
    </div>
  );
}
