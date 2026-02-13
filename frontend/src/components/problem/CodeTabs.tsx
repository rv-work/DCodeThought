"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const languageColors = {
  Java: "from-orange-500 to-red-500",
  Python: "from-blue-500 to-cyan-500",
  "C++": "from-purple-500 to-pink-500",
  JavaScript: "from-yellow-500 to-orange-500",
};

export default function CodeTabs({ code }: { code: Record<string, string> }) {
  const languages = Object.keys(code);
  const [active, setActive] = useState<string>(languages[0]);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Language Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {languages.map((lang) => {
          const isActive = active === lang;
          const gradient =
            languageColors[lang as keyof typeof languageColors] ||
            "from-accent to-purple-500";

          return (
            <button
              key={lang}
              onClick={() => setActive(lang)}
              className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${isActive
                  ? "text-white shadow-lg"
                  : "bg-background-tertiary border border-border text-muted hover:text-foreground hover:border-accent"
                }`}
            >
              {isActive && (
                <div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradient}`}
                />
              )}
              <span className="relative">{lang}</span>
            </button>
          );
        })}
      </div>

      {/* Code Block */}
      <div className="relative rounded-xl bg-background-tertiary border border-border overflow-hidden">
        {/* Header with Copy Button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background-secondary">
          <span className="text-sm font-semibold text-muted">{active}</span>
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-tertiary hover:bg-background border border-border text-sm font-medium transition-all cursor-pointer group"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 group-hover:text-accent transition-colors" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm font-mono leading-relaxed">
            <code>{code[active]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}