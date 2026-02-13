"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const { googleLogin } = useAuth();
  const router = useRouter();

  return (
    <div className="relative group">
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

      {/* Button Container */}
      <div className="relative p-1 flex items-center justify-center rounded-xl border-2 border-border-subtle bg-background-tertiary hover:border-accent hover:bg-background transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="w-full flex items-center justify-center py-0.5">
          <GoogleLogin
            onSuccess={async (res) => {
              try {
                await googleLogin({ credential: res.credential! });
                router.push("/");
              } catch (error) {
                console.error("Google login failed:", error);
                alert("Google login failed. Please try again.");
              }
            }}
            onError={() => {
              console.error("Google login failed");
              alert("Google login failed. Please try again.");
            }}
            theme="outline"
            size="large"
            width="100%"
            logo_alignment="left"
          />
        </div>
      </div>
    </div>
  );
}