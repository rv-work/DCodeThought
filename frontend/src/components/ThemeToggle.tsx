"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        p-2 rounded-lg border 
        bg-card text-foreground
        hover:bg-primary hover:text-white
        transition
      "
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
