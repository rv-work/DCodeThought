"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { Menu, X, Home, Info, Code2, Flame, Trophy, Activity, Swords, Medal, Target, MessageSquarePlus } from "lucide-react";

// Mobile links data (Categorized for vertical scrolling)
const mobileNavGroups = [
  { id: "Main", items: [{ href: "/", label: "Home", icon: Home }, { href: "/problems", label: "Problems", icon: Code2 }, { href: "/potd", label: "POTD", icon: Flame }, { href: "/contests", label: "Contests", icon: Trophy }] },
  { id: "The Arena", items: [{ href: "/feed", label: "Live Feed", icon: Activity }, { href: "/compare", label: "Compare", icon: Swords }, { href: "/leaderboard", label: "Leaderboard", icon: Medal }, { href: "/challenges", label: "Challenges", icon: Target }] },
  { id: "More", items: [{ href: "/requests", label: "Requests", icon: MessageSquarePlus }, { href: "/about", label: "About Us", icon: Info }] }
];

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle/50 bg-background/60 backdrop-blur-2xl transition-all duration-300">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-360 mx-auto px-4 lg:px-6 py-4">

        <div className="flex items-center justify-between gap-4">

          {/* LEFT: Logo Section */}
          <div className="flex items-center justify-start shrink-0">
            <Link href="/" className="cursor-pointer relative group flex items-center justify-center py-1" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-white/5 rounded-full blur-[25px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none"></div>
              <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-105">
                <Image src="/lg.png" alt="DCodeThought Logo" width={180} height={36} priority className="object-contain drop-shadow-none group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500 md:w-60 md:h-12" />
              </div>
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Links (Now 100% Overlap Free!) */}
          <div className="hidden xl:flex items-center justify-center flex-1 min-w-0">
            <NavLinks />
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <ThemeToggle />

            {!user ? (
              <div className="hidden sm:flex items-center gap-2 text-sm font-bold">
                <Link href="/login" className="cursor-pointer px-5 py-2.5 rounded-xl text-muted hover:text-foreground hover:bg-white/5 transition-all duration-300">Login</Link>
                <Link href="/signup" className="cursor-pointer relative group px-6 py-2.5 rounded-xl bg-foreground text-background shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Sign up</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                </Link>
              </div>
            ) : (
              <div className="hidden sm:block">
                <ProfileMenu />
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer xl:hidden p-2 rounded-xl text-foreground hover:bg-white/5 border border-transparent hover:border-border-subtle transition-all"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-border-subtle/50 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-2 duration-300">
          <div className="px-6 py-6 flex flex-col gap-6">

            {mobileNavGroups.map((group) => (
              <div key={group.id} className="flex flex-col gap-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted/50 mb-1 px-3">{group.id}</h4>
                {group.items.map((link) => {
                  const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active
                        ? "bg-foreground text-background shadow-lg"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? "text-background" : "opacity-70"}`} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            ))}

            <div className="sm:hidden pt-6 border-t border-border-subtle/50 flex flex-col gap-3">
              {!user ? (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer w-full text-center px-5 py-3 rounded-xl text-foreground bg-white/5 border border-border-subtle hover:bg-white/10 font-bold transition-all">Login</Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer w-full text-center px-5 py-3 rounded-xl bg-foreground text-background font-bold shadow-lg transition-all">Sign up</Link>
                </>
              ) : (
                <div className="flex justify-center">
                  <ProfileMenu />
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}