"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

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
    try {
      await onSubmit(text);
      setText("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all resize-none cursor-text"
        rows={4}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <span>Post Comment</span>
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}