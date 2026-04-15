"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpandableContent({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const limit = 280;
  const isLong = text.length > limit;

  return (
    <div className="mb-4">
      <p className="text-sm text-foreground/80 font-medium leading-relaxed whitespace-pre-wrap">
        {isLong && !expanded ? text.slice(0, limit) + "…" : text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1.5 flex items-center gap-1 text-xs font-bold text-violet-500 hover:text-violet-400 transition-colors"
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Read more</>
          )}
        </button>
      )}
    </div>
  );
}