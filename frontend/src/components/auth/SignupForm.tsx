"use client";

import { useAuth } from "@/hooks/useAuth";
import EmailAuthForm from "./EmailAuthForm";
import GoogleAuthButton from "./GoogleAuthButton";

export default function SignupForm() {
  const { signup } = useAuth();

  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <GoogleAuthButton />

      <div className="text-center text-sm">or sign up with email</div>

      <EmailAuthForm mode="signup" onSubmit={signup} />
    </div>
  );
}
