"use client";

import { useState } from "react";

export default function CodeTabs({
  code,
}: {
  code: Record<string, string>;
}) {
  const languages = Object.keys(code);
  const [active, setActive] = useState<string>(languages[0]);

  return (
    <div className="mt-4">
      <div className="flex gap-2 text-sm mb-2">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActive(lang)}
            className={active === lang ? "font-bold underline" : ""}
          >
            {lang}
          </button>
        ))}
      </div>

      <pre className="bg-gray-100 dark:bg-gray-900 p-3 text-sm overflow-auto">
        <code>{code[active]}</code>
      </pre>
    </div>
  );
}
