"use client";

import { useState } from "react";
import { Languages } from "lucide-react";

export default function ThoughtToggle({
  myThought,
  engThought,
}: {
  myThought: string;
  engThought?: string;
}) {
  const [lang, setLang] = useState<"hi" | "en">("hi");

  return (
    <div className="space-y-4">
      {/* Language Toggle */}
      {engThought && (
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-muted" />
          <div className="inline-flex rounded-lg bg-background-tertiary border border-border p-1">
            <button
              onClick={() => setLang("hi")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${lang === "hi"
                  ? "bg-accent text-white shadow-lg"
                  : "text-muted hover:text-foreground"
                }`}
            >
              Hindi
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${lang === "en"
                  ? "bg-accent text-white shadow-lg"
                  : "text-muted hover:text-foreground"
                }`}
            >
              English
            </button>
          </div>
        </div>
      )}

      {/* Thought Content */}
      <div className="p-6 rounded-xl bg-background-tertiary border border-border text-sm leading-relaxed whitespace-pre-line">
        {lang === "hi" ? myThought : engThought}
      </div>
    </div>
  );
}