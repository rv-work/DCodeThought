"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="text-sm font-medium"
      >
        {user.name}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 border rounded bg-white dark:bg-black z-50">
          <Link
            href="/profile"
            className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Profile
          </Link>

          {user.role === "admin" && (
            <Link
              href="/admin"
              className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Admin Dashboard
            </Link>
          )}

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
