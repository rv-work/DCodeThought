"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const { googleLogin } = useAuth();
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (res) => {
        await googleLogin({ credential: res.credential! });
        router.push("/"); // ✅ HOME REDIRECT
      }}
      onError={() => {
        alert("Google login failed");
      }}
    />
  );
}
