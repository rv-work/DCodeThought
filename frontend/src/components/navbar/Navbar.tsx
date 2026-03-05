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
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle/50 bg-background/60 backdrop-blur-2xl transition-all duration-300">
      {/* Subtle etched glass highlight line at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Left - Logo & Nav */}
          <div className="flex items-center gap-8 lg:gap-12">

            <Link
              href="/"
              className="relative group flex items-center justify-center shrink-0 py-1"
            >
              {/* THE WHITE GLOW ENGINE - Premium "Apple-like" Elegance */}

              {/* 1. Broad, soft ambient aura that gently fades in */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-white/5 rounded-[100%] blur-[25px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none"></div>

              {/* 2. Focused core glow right behind the lightbulb icon */}
              <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full blur-[15px] opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>

              {/* 3. The Image itself with a crisp white drop-shadow */}
              <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-105">
                <Image
                  src="/lg.png"
                  alt="DCodeThought Logo"
                  width={240}
                  height={48}
                  priority
                  className="object-contain drop-shadow-[0_0_0px_rgba(255,255,255,0)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500"
                />
              </div>
            </Link>

            {/* Main Navigation Links */}
            <div className="hidden md:block">
              <NavLinks />
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3 lg:gap-5">
            <ThemeToggle />

            {!user && (
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl text-muted hover:text-foreground hover:bg-white/5 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="relative group px-6 py-2.5 rounded-xl bg-foreground text-background shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Sign up</span>
                  {/* Button hover shimmer effect */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
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