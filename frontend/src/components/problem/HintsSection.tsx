"use client";

import { useState } from "react";

export default function HintsSection({
  hints,
}: {
  hints: string[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  if (hints.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">Hints</h2>

      {hints.map((hint, idx) => (
        <div key={idx} className="mb-2">
          <button
            className="text-sm underline"
            onClick={() =>
              setOpen(open === idx ? null : idx)
            }
          >
            Hint {idx + 1}
          </button>

          {open === idx && (
            <p className="text-sm mt-1">{hint}</p>
          )}
        </div>
      ))}
    </div>
  );
}
