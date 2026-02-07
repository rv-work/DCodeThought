"use client";

import { useState } from "react";

type Props = {
  placeholder: string;
  onSubmit: (text: string) => Promise<void>;
};

export default function CommentForm({ placeholder, onSubmit }: Props) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await onSubmit(text);
    setText("");
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full border p-2 text-sm"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="text-sm underline"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
