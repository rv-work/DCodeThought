"use client";

import { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

export default function HintsSection({ hints }: { hints: string[] }) {
  const [openHints, setOpenHints] = useState<Set<number>>(new Set());

  if (hints.length === 0) return null;

  const toggleHint = (index: number) => {
    setOpenHints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-3">
      {hints.map((hint, idx) => {
        const isOpen = openHints.has(idx);

        return (
          <div
            key={idx}
            className="rounded-xl border border-border-subtle bg-background-tertiary overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleHint(idx)}
              className="w-full flex items-center justify-between p-4 hover:bg-background-secondary transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold text-sm">
                  {idx + 1}
                </div>
                <span className="font-semibold">Hint {idx + 1}</span>
              </div>

              <div className="flex items-center gap-2">
                {isOpen ? (
                  <Eye className="w-4 h-4 text-accent" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted" />
                )}
                <ChevronDown
                  className={`w-5 h-5 text-muted transition-transform ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 text-sm text-muted leading-relaxed animate-fade-in">
                {hint}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}