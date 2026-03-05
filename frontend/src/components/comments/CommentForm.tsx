"use client";

import { useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";

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
    <div className="relative rounded-4xl bg-background-secondary/30 backdrop-blur-xl border border-border-subtle p-3 transition-all duration-500 focus-within:bg-background-secondary/60 focus-within:border-purple-500/40 focus-within:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] group">

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-transparent border-none text-base text-foreground placeholder:text-muted/60 focus:ring-0 outline-none resize-none cursor-text min-h-25"
        rows={3}
      />

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between mt-2 pt-3 border-t border-border-subtle/50 px-2 pb-1">

        {/* Subtle dynamic text that appears on focus */}
        <div className="flex items-center gap-2 text-xs font-bold text-muted opacity-50 group-focus-within:opacity-100 group-focus-within:text-purple-400 transition-all duration-500">
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Share your thought process</span>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none transition-all cursor-pointer group/btn"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <span>Post</span>
                <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}