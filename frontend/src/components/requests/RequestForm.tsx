"use client";

import { useState } from "react";
import { addRequest } from "@/api/request.api";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function RequestForm() {
  const [type, setType] = useState<"question" | "feature">("question");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leetcodeLink, setLeetcodeLink] = useState("");

  const submit = async () => {
    if (!title.trim() || !description.trim()) return;

    if (type === "question" && !leetcodeLink.trim()) {
      return toast.error("LeetCode link is required for question requests.");
    }

    const payload = {
      type,
      title,
      description,
      leetcodeLink: type === "question" ? leetcodeLink : undefined,
    };

    setLoading(true);

    try {
      await toast.promise(
        addRequest(payload),
        {
          loading: "Submitting your request...",
          success: "Request submitted successfully 🎉",
          error: (err) => (err instanceof Error ? err.message : "Something went wrong"),
        }
      );

      setTitle("");
      setDescription("");
      setLeetcodeLink("");
      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 3000);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 animate-fade-in-up">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
          <div className="text-sm font-bold text-emerald-500">
            Request submitted! The community will vote on it shortly.
          </div>
        </div>
      )}

      {/* Type Select */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">Request Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "question" | "feature")}
          className="w-full px-5 py-4 rounded-xl bg-background border border-border-subtle text-sm text-foreground focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all cursor-pointer appearance-none"
        >
          <option value="question">Question / Problem</option>
          <option value="feature">Feature Request</option>
        </select>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            type === "question"
              ? "e.g. Two Sum"
              : "e.g. Add dark mode toggle"
          }
          className="w-full px-5 py-4 rounded-xl bg-background border border-border-subtle text-sm text-foreground focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all cursor-text placeholder:text-muted"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-foreground mb-2">
          Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide more details about your request so the community understands it clearly..."
          className="w-full px-5 py-4 rounded-xl bg-background border border-border-subtle text-sm text-foreground focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none cursor-text placeholder:text-muted"
          rows={5}
        />
      </div>

      {type === "question" && (
        <div className="animate-fade-in">
          <label className="block text-sm font-bold text-foreground mb-2">
            LeetCode Link <span className="text-rose-500">*</span>
          </label>
          <input
            value={leetcodeLink}
            onChange={(e) => setLeetcodeLink(e.target.value)}
            placeholder="https://leetcode.com/problems/..."
            className="w-full px-5 py-4 rounded-xl bg-background border border-border-subtle text-sm text-foreground focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all cursor-text placeholder:text-muted"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={submit}
          disabled={loading || !title.trim() || !description.trim()}
          className="flex items-center justify-center gap-2 px-8 py-4 w-full md:w-auto rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all cursor-pointer group"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Request</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}