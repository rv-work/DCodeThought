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
    <div className="space-y-6">
      {/* iOS-Style Language Toggle */}
      {engThought && (
        <div className="flex items-center gap-3">
          <Languages className="w-5 h-5 text-purple-500" />
          <div className="inline-flex rounded-xl bg-background border border-border-subtle p-1.5 shadow-inner">
            <button
              onClick={() => setLang("hi")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer ${lang === "hi"
                  ? "bg-foreground text-background shadow-md scale-100"
                  : "text-muted hover:text-foreground scale-95"
                }`}
            >
              Hinglish / Hindi
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer ${lang === "en"
                  ? "bg-foreground text-background shadow-md scale-100"
                  : "text-muted hover:text-foreground scale-95"
                }`}
            >
              Pure English
            </button>
          </div>
        </div>
      )}

      {/* Thought Content Panel */}
      <div className="p-6 md:p-8 rounded-3xl bg-background border border-border-subtle text-base md:text-lg leading-loose text-muted whitespace-pre-line shadow-sm">
        {lang === "hi" ? myThought : engThought}
      </div>
    </div>
  );
}