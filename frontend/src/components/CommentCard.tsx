"use client";

import { useState } from "react";
import { ISolutionCode } from "@/lib/types";

const languages = ["java", "cpp", "python", "js"] as const;

export default function CodeTabs({ code }: { code: ISolutionCode }) {
  const [active, setActive] = useState<"java" | "cpp" | "python" | "js">("java");

  return (
    <div className="border rounded-lg overflow-hidden mt-4 bg-card border-border">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {languages.map((lang) => (
          <button
            key={lang}
            className={`
              px-4 py-2 text-sm capitalize
              ${active === lang ? "bg-primary text-white" : "text-muted dark:text-muted-dark"}
            `}
            onClick={() => setActive(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Code Block */}
      <pre className="p-4 overflow-x-auto text-sm whitespace-pre-wrap">
        {code?.[active] || "// No code available"}
      </pre>
    </div>
  );
}
