"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const path = usePathname();

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Problems", path: "/admin/problems" },
    { name: "Add Problem", path: "/admin/problems/new" },
    { name: "Contests", path: "/admin/contests" },
    { name: "Add Contest", path: "/admin/contests/new" },
    { name: "POTD", path: "/admin/potd" },
    { name: "Solutions", path: "/admin/solutions" },
    { name: "Users", path: "/admin/users" },
    { name: "Stats", path: "/admin/stats" },
  ];

  return (
    <aside
      className="
        w-64 min-h-screen border-r border-border bg-card 
        p-4 space-y-2
      "
    >
      <h2 className="text-xl font-bold mb-4 text-primary">Admin Panel</h2>

      <nav className="space-y-1">
        {links.map((link) => {
          const active = path === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`
                block px-3 py-2 rounded-lg 
                ${active
                  ? "bg-primary text-white"
                  : "hover:bg-background"
                }
              `}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
