"use client";

import { useAuth } from "@/hooks/useAuth";
import EmailAuthForm from "./EmailAuthForm";
import GoogleAuthButton from "./GoogleAuthButton";

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <div className="space-y-6">
      {/* Google Auth */}
      <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
        <GoogleAuthButton />
      </div>

      {/* Divider */}
      <div className="relative animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 py-1 rounded bg-background-secondary text-muted uppercase tracking-wide">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Email Form */}
      <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
        <EmailAuthForm mode="login" onSubmit={login} />
      </div>
    </div>
  );
}