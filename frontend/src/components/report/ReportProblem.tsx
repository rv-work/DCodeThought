// components/report/ReportProblem.tsx
"use client";

import { useState } from "react";
import { reportProblem } from "@/api/report.api";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  slug: string;
};

export default function ReportProblem({ slug }: Props) {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [screenshot, setScreenshot] = useState<string>("");

  if (!user) return null;

  const submit = async () => {
    await reportProblem(slug, {
      title,
      description,
      screenshot: screenshot || undefined,
    });
    setTitle("");
    setDescription("");
    setScreenshot("");
    alert("Report submitted");
  };

  return (
    <div className="mt-10 border-t pt-6 space-y-3">
      <h3 className="font-semibold">Report a Problem</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Short title"
        className="w-full border p-2 text-sm"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the issue clearly"
        rows={4}
        className="w-full border p-2 text-sm"
      />

      <input
        value={screenshot}
        onChange={(e) => setScreenshot(e.target.value)}
        placeholder="Screenshot URL (optional)"
        className="w-full border p-2 text-sm"
      />

      <button onClick={submit} className="text-sm underline">
        Submit Report
      </button>
    </div>
  );
}
