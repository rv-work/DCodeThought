"use client";

import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  // Start with mounted = false to match the server render exactly
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wrapping in setTimeout breaks the synchronous render cycle
    // This fixes the "cascading renders" error!
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // During SSR and initial client paint, render a structurally identical but empty shell.
  // This completely eliminates the hydration mismatch error!
  if (!mounted) {
    return (
      <div className="relative w-11 h-11 rounded-lg flex items-center justify-center opacity-0 pointer-events-none" aria-hidden="true" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-11 h-11 rounded-lg hover:bg-background-tertiary transition-all duration-300 flex items-center justify-center group"
      aria-label="Toggle theme"
    >
      {/* Sun icon */}
      <svg
        className={`absolute w-5.5 h-5.5 transition-all duration-500 ${theme === "dark"
          ? "rotate-90 scale-0 opacity-0"
          : "rotate-0 scale-100 opacity-100"
          }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500 ${theme === "dark"
          ? "rotate-0 scale-100 opacity-100"
          : "-rotate-90 scale-0 opacity-0"
          }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-lg bg-linear-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
    </button>
  );
}