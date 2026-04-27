"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Code2,
  Flame,
  Trophy,
  GitCompare, // Added for Compare
  Swords,     // Repurposed for Battle
  Medal,
  Target,
  MessageSquarePlus,
  Info,
  ChevronDown,
  Sparkles
} from "lucide-react";
import React from "react";

// 1. DEFINE STRICT TYPES SO TYPESCRIPT NEVER CRIES AGAIN 🛡️
type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  hideLabel?: boolean; // The '?' makes it optional!
  isNew?: boolean;     // Added optional flag for the 'NEW' badge
};

type NavGroup = {
  id: string;
  label?: string; // Optional for flat groups like 'main'
  icon?: React.ElementType; // Optional for flat groups
  dropdown: boolean;
  items: NavItem[];
};

// 2. APPLY THE TYPE TO OUR DATA
const navGroups: NavGroup[] = [
  {
    id: "main",
    dropdown: false,
    items: [
      { href: "/", label: "Home", icon: Home, hideLabel: true },
      { href: "/problems", label: "Problems", icon: Code2 },
      { href: "/potd", label: "POTD", icon: Flame },
      { href: "/contests", label: "Contests", icon: Trophy },
    ]
  },
  {
    id: "arena",
    label: "The Arena",
    icon: Swords,
    dropdown: true,
    items: [
      // Removed /feed
      { href: "/compare", label: "Compare", icon: GitCompare }, // Added GitCompare icon
      { href: "/battle", label: "Live Battle", icon: Swords, isNew: true }, // Added Live Battle
      { href: "/leaderboard", label: "Leaderboard", icon: Medal },
      { href: "/challenges", label: "Challenges", icon: Target },
    ]
  },
  {
    id: "community",
    label: "More",
    icon: Sparkles,
    dropdown: true,
    items: [
      { href: "/requests", label: "Requests", icon: MessageSquarePlus },
      { href: "/about", label: "About Us", icon: Info }
    ]
  }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden xl:flex items-center p-1.5 rounded-full bg-background-secondary/40 border border-border-subtle/50 shadow-sm backdrop-blur-xl">
      {navGroups.map((group, groupIndex) => {

        // --- RENDER DROPDOWN MENUS ---
        if (group.dropdown && group.label && group.icon) {
          const isGroupActive = group.items.some(link => pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)));
          const GroupIcon = group.icon;

          return (
            <div key={group.id} className="relative flex items-center group/dropdown">
              <button className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 ${isGroupActive ? "text-foreground bg-white/5" : "text-muted hover:text-foreground hover:bg-white/5"
                }`}>
                <GroupIcon className={`w-4 h-4 transition-colors ${isGroupActive ? "text-purple-500" : "opacity-70 group-hover/dropdown:text-purple-400"}`} />
                <span>{group.label}</span>
                <ChevronDown className="w-3 h-3 opacity-50 group-hover/dropdown:rotate-180 transition-transform duration-300" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50">
                <div className="w-48 p-2 rounded-2xl bg-background-secondary/95 backdrop-blur-2xl border border-border-subtle shadow-2xl flex flex-col gap-1 translate-y-2 group-hover/dropdown:translate-y-0 transition-transform duration-300">
                  {group.items.map(link => {
                    const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all relative ${active ? "bg-purple-500/10 text-purple-400" : "text-muted hover:bg-white/5 hover:text-foreground"
                          }`}
                      >
                        {/* Battle icon ko thoda special treatment/pulse diya hai if active/hovered */}
                        <Icon className={`w-4 h-4 ${active ? "text-purple-500" : "opacity-70"} ${link.href === '/battle' ? 'group-hover:animate-pulse text-red-400' : ''}`} />
                        {link.label}

                        {/* NEW Badge rendering logic */}
                        {link.isNew && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-extrabold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">
                            NEW
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {groupIndex < navGroups.length - 1 && (
                <div className="w-px h-4 bg-border-subtle/60 mx-1.5"></div>
              )}
            </div>
          )
        }

        // --- RENDER STANDARD FLAT LINKS ---
        return (
          <div key={group.id} className="flex items-center">
            {group.items.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  className={`cursor-pointer group/link flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 ${active
                    ? "bg-background text-foreground shadow-md scale-105"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                    }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${active ? "text-purple-500" : "opacity-70 group-hover/link:text-purple-400"}`} />
                  {/* Because of our TS type, link.hideLabel is safe to use! */}
                  {!link.hideLabel && <span>{link.label}</span>}
                </Link>
              );
            })}

            {groupIndex < navGroups.length - 1 && (
              <div className="w-px h-4 bg-border-subtle/60 mx-1.5"></div>
            )}
          </div>
        );
      })}
    </nav>
  );
}