"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const { googleLogin } = useAuth();
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-xl border border-border-subtle p-2 bg-background-tertiary shadow-sm hover:shadow-md transition-all">
        <GoogleLogin
          onSuccess={async (res) => {
            await googleLogin({ credential: res.credential! });
            router.push("/");
          }}
          onError={() => alert("Google login failed")}
        />
      </div>
    </div>
  );
}
