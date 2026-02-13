// components/admin/AdminSidebarItem.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export default function AdminSidebarItem({ href, label, icon }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer
        ${active
          ? "bg-linear-to-r from-accent/10 to-purple-500/10 text-accent border-l-4 border-accent shadow-sm"
          : "text-muted hover:text-foreground hover:bg-background-tertiary"
        }
      `}
    >
      <div className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
        {icon}
      </div>
      <span>{label}</span>

      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
      )}
    </Link>
  );
}