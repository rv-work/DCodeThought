"use client";

import { createContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Default to system preference or fallback to 'dark' for initial SSR render
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Wrapping in setTimeout prevents the "cascading renders" error 
    // when syncing the React state with the DOM on the first load.
    const timer = setTimeout(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";

      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }

      localStorage.setItem("theme", nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};