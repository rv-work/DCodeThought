"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-background-tertiary transition-all duration-200 group"
      >
        {/* Circular Avatar */}
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-white font-semibold shadow-md group-hover:scale-110 transition-transform duration-300">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Glow behind avatar */}
          <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* User name */}
        <span className="hidden sm:inline font-medium text-sm">
          {user.name}
        </span>

        {/* Arrow */}
        <svg
          className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-border-subtle bg-background-secondary shadow-2xl backdrop-blur-xl overflow-hidden animate-scale-in z-50">

          {/* Header */}
          <div className="px-4 py-4 border-b border-border-subtle bg-background-tertiary flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-white font-semibold shadow">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-background-tertiary transition-colors"
            >
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>

            {user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-background-tertiary transition-colors"
              >
                <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin Dashboard
              </Link>
            )}

            {/* Divider */}
            <div className="my-2 border-t border-border-subtle"></div>

            {/* Logout */}
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
