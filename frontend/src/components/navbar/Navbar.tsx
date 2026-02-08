"use client";

import Link from "next/link";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/hooks/useAuth";

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
              <div className="relative group flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-background-secondary border border-border-subtle shadow-sm flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path d="M4 19.5V6a2 2 0 012-2h10a2 2 0 012 2v13.5" />
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M8 10h4" />
                    <path d="M8 14h6" />
                  </svg>
                </div>

                <span className="hidden sm:inline text-lg font-bold tracking-tight">
                  <span className="gradient-text">Code</span>Thought
                </span>
              </div>


            </Link>

            <NavLinks />
          </div>

          {/* Right - Actions */}
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