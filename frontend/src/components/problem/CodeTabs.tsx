"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const languageColors = {
  Java: "from-orange-500 to-red-500",
  Python: "from-blue-500 to-cyan-500",
  "C++": "from-purple-500 to-pink-500",
  JavaScript: "from-yellow-400 to-orange-500",
  TypeScript: "from-blue-400 to-blue-600",
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
    <div className="w-full">
      {/* Editor Header (macOS style) */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">

        {/* Window Controls */}
        <div className="flex items-center gap-2 mr-6">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        </div>

        {/* Language Tabs */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {languages.map((lang) => {
            const isActive = active === lang;
            const gradient = languageColors[lang as keyof typeof languageColors] || "from-blue-500 to-purple-500";

            return (
              <button
                key={lang}
                onClick={() => setActive(lang)}
                className={`relative px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer ${isActive
                  ? "text-white bg-white/10 shadow-lg"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
              >
                {isActive && (
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 rounded-full bg-linear-to-r ${gradient} shadow-[0_0_10px_currentcolor]`} />
                )}
                {lang}
              </button>
            );
          })}
        </div>

        {/* Copy Button */}
        <button
          onClick={copyCode}
          className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 transition-all cursor-pointer group"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 group-hover:text-white transition-colors" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative bg-[#0d1117] overflow-x-auto p-6 min-h-75">
        <pre className="text-sm font-mono text-gray-200 leading-relaxed tracking-wide">
          <code>{code[active]}</code>
        </pre>
      </div>
    </div>
  );
}