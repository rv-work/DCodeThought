// components/admin/AdminHeader.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

export default function AdminHeader() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border-subtle bg-background-secondary/50 backdrop-blur-xl sticky top-0 z-10 animate-fade-in">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left - Welcome Message */}
        <div>
          <h1 className="text-lg font-semibold">
            Welcome back, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p className="text-xs text-muted">Manage your platform with ease</p>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-background-tertiary border border-border-subtle flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 cursor-pointer group"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
            ) : (
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-background-tertiary border border-border-subtle hover:border-accent transition-all duration-300 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-muted capitalize">{user?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}