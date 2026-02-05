"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const links = [
    { name: "Problems", path: "/user/problems" },
    { name: "POTD", path: "/user/potd" },
    { name: "Contests", path: "/user/contests" },
    { name: "Solutions", path: "/user/solutions" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <Link href="/" className="text-2xl font-bold text-primary">
          DCodeThought
        </Link>

        {/* MIDDLE — NAV LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const active = pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`
                  text-sm font-medium 
                  ${active ? "text-primary font-semibold" : "text-muted dark:text-muted-dark"}
                  hover:text-primary transition
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT — THEME + AUTH */}
        <div className="flex items-center gap-3">

          {/* Admin button */}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="
                px-3 py-1 rounded-lg border border-primary text-primary
                hover:bg-primary hover:text-white transition
              "
            >
              Admin
            </Link>
          )}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Auth section */}
          {user ? (
            <Link
              href="/user/profile"
              className="
                px-3 py-1 rounded-lg border border-border
                text-foreground hover:bg-primary hover:text-white transition
              "
            >
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <Link
              href="/user/login"
              className="
                px-4 py-1 rounded-lg bg-primary text-white 
                hover:bg-primary/90 transition
              "
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
