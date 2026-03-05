"use client";

import { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

export default function HintsSection({ hints }: { hints: string[] }) {
  const [openHints, setOpenHints] = useState<Set<number>>(new Set());

  if (hints.length === 0) return null;

  const toggleHint = (index: number) => {
    setOpenHints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {hints.map((hint, idx) => {
        const isOpen = openHints.has(idx);

        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                ? "bg-background border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.05)]"
                : "bg-background/50 border-border-subtle hover:border-border"
              }`}
          >
            <button
              onClick={() => toggleHint(idx)}
              className="w-full flex items-center justify-between p-5 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors ${isOpen ? "bg-orange-500 text-white shadow-md" : "bg-orange-500/10 text-orange-500 group-hover:bg-orange-500/20"}`}>
                  {idx + 1}
                </div>
                <span className={`font-bold text-lg ${isOpen ? "text-foreground" : "text-muted group-hover:text-foreground transition-colors"}`}>
                  Reveal Hint {idx + 1}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {isOpen ? <Eye className="w-5 h-5 text-orange-500" /> : <EyeOff className="w-5 h-5 text-muted" />}
                <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-6 pt-2 text-base text-muted leading-relaxed animate-fade-in border-t border-border-subtle/50 ml-18">
                {hint}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}