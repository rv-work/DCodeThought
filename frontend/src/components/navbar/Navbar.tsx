"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle backdrop-blur-xl bg-background/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Logo & Nav */}
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="group flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <Image
                src="/lg.png"
                alt="DCodeThought Logo"
                width={251}
                height={50}
                priority
                className="rounded-md object-contain group-hover:scale-110 transition-transform duration-300"
              />


            </Link>

            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {!user && (
              <div className="flex items-center gap-3 text-sm">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-muted hover:text-foreground hover:bg-background-tertiary transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 rounded-lg bg-linear-to-r from-accent to-purple-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}

            {user && <ProfileMenu />}
          </div>
        </div>
      </div>
    </header>
  );
}