"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg">
            DCodeThought
          </Link>

          <NavLinks />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {!user && (
            <>
              <Link href="/login" className="text-sm underline">
                Login
              </Link>
              <Link href="/signup" className="text-sm underline">
                Signup
              </Link>
            </>
          )}

          {user && <ProfileMenu />}
        </div>
      </div>
    </header>
  );
}
