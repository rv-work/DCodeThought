"use client";

import { useState } from "react";

export default function ThoughtToggle({
  myThought,
  engThought,
}: {
  myThought: string;
  engThought?: string;
}) {
  const [lang, setLang] = useState<"hi" | "en">("hi");

  return (
    <div className="space-y-2">
      {engThought && (
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setLang("hi")}
            className={lang === "hi" ? "font-bold" : ""}
          >
            Hindi
          </button>
          <button
            onClick={() => setLang("en")}
            className={lang === "en" ? "font-bold" : ""}
          >
            English
          </button>
        </div>
      )}

      <p className="text-sm whitespace-pre-line">
        {lang === "hi" ? myThought : engThought}
      </p>
    </div>
  );
}
