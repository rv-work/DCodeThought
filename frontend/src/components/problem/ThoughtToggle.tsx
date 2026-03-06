"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function ThoughtToggle({
  myThought,
  engThought,
}: {
  myThought: string;
  engThought?: string;
}) {
  const [lang, setLang] = useState<"hi" | "en">("hi");

  const content = lang === "hi" ? myThought : engThought || "";

  return (
    <div className="space-y-6">
      {/* Language Toggle */}
      {engThought && (
        <div className="flex items-center gap-3">
          <Languages className="w-5 h-5 text-purple-500" />

          <div className="inline-flex rounded-xl bg-background border border-border-subtle p-1.5 shadow-inner">
            <button
              onClick={() => setLang("hi")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer ${lang === "hi"
                ? "bg-foreground text-background shadow-md"
                : "text-muted hover:text-foreground"
                }`}
            >
              Hinglish
            </button>

            <button
              onClick={() => setLang("en")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer ${lang === "en"
                ? "bg-foreground text-background shadow-md"
                : "text-muted hover:text-foreground"
                }`}
            >
              Pure English
            </button>
          </div>
        </div>
      )}

      {/* Markdown Content - SCROLLABLE CONTAINER */}
      <div className="relative rounded-3xl bg-background border border-border-subtle shadow-sm overflow-hidden">
        {/* Top/Bottom fading gradients to indicate scrollability */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-linear-to-b from-background to-transparent z-10 pointer-events-none" />

        <div className="p-6 md:p-8 max-h-125 overflow-y-auto overscroll-contain relative z-0 scrollbar-thin scrollbar-thumb-purple-500/20 hover:scrollbar-thumb-purple-500/40 scrollbar-track-transparent">

          {/* FIX: Changed prose-invert to dark:prose-invert and forced foreground colors */}
          <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-a:text-purple-500 prose-blockquote:text-muted prose-blockquote:border-l-purple-500">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}