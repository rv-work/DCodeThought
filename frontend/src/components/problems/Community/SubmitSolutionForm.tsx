"use client";

import { useState } from "react";
import { submitCommunitySolution } from "@/api/communitySolution.api";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

interface SubmitSolutionFormProps {
  problemId: string;
  onSuccess: () => void; // Callback to refresh the list after submission
}

export default function SubmitSolutionForm({ problemId, onSuccess }: SubmitSolutionFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    approach: "",
    explanation: "",
    code: "",
    language: "C++",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.approach.length < 10) return toast.error("Approach must be at least 10 characters.");
    if (formData.explanation.length < 10) return toast.error("Explanation must be at least 10 characters.");

    setLoading(true);
    try {
      await submitCommunitySolution({
        problemId,
        ...formData,
      });
      toast.success("Solution posted successfully!");
      setFormData({ approach: "", explanation: "", code: "", language: "C++" });
      onSuccess(); // Refresh the list
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-background-secondary/60 backdrop-blur-md border border-border-subtle shadow-lg">
      <h3 className="text-xl font-bold text-foreground mb-4">Share Your Approach</h3>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Approach Field */}
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Your Approach (Intuition)</label>
          <textarea
            required
            rows={3}
            placeholder="How did you think about this problem? What was your initial thought?"
            className="w-full bg-background border border-border-subtle rounded-xl p-4 text-foreground focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
            value={formData.approach}
            onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
          />
        </div>

        {/* Explanation Field */}
        <div>
          <label className="block text-sm font-semibold text-muted mb-2">Detailed Explanation</label>
          <textarea
            required
            rows={5}
            placeholder="Explain your logic step-by-step..."
            className="w-full bg-background border border-border-subtle rounded-xl p-4 text-foreground focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
            value={formData.explanation}
            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
          />
        </div>

        {/* Optional Code & Language */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-muted mb-2">Language</label>
            <select
              className="w-full bg-background border border-border-subtle rounded-xl p-4 text-foreground focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            >
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-muted mb-2">Code (Optional)</label>
            <textarea
              rows={4}
              placeholder="Paste your code here..."
              className="w-full font-mono text-sm bg-black/50 border border-border-subtle rounded-xl p-4 text-blue-300 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : null}
            {loading ? "Posting..." : "Post Solution"}
          </button>
        </div>
      </form>
    </div>
  );
}