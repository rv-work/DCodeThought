"use client";

import { useState } from "react";
import { addRequest } from "@/api/request.api";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export default function RequestForm() {
  const [type, setType] = useState<"question" | "feature">("question");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    try {
      await addRequest({ type, title, description });
      setTitle("");
      setDescription("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      // Reload to show new request
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Success Message */}
      {submitted && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
          <div className="text-sm font-medium text-green-500">
            Request submitted! The community will vote on it.
          </div>
        </div>
      )}

      {/* Type Select */}
      <div>
        <label className="block text-sm font-semibold mb-2">Request Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "question" | "feature")}
          className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all cursor-pointer"
        >
          <option value="question">Question / Problem</option>
          <option value="feature">Feature Request</option>
        </select>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            type === "question"
              ? "Which problem would you like explained?"
              : "What feature would you like to see?"
          }
          className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all cursor-text"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide more details about your request..."
          className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all resize-none cursor-text"
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={submit}
          disabled={loading || !title.trim() || !description.trim()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Request</span>
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}