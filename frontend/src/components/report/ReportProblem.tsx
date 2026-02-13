"use client";

import { useState } from "react";
import { reportProblem } from "@/api/report.api";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircle, Send, Loader2, CheckCircle2 } from "lucide-react";

type Props = {
  slug: string;
};

export default function ReportProblem({ slug }: Props) {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [screenshot, setScreenshot] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!user) return null;

  const submit = async () => {
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    try {
      await reportProblem(slug, {
        title,
        description,
        screenshot: screenshot || undefined,
      });
      setTitle("");
      setDescription("");
      setScreenshot("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-background-secondary border border-border-subtle p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Report an Issue</h2>
          <p className="text-sm text-muted">
            Help us improve by reporting bugs or errors
          </p>
        </div>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div className="text-sm font-medium text-green-500">
            Report submitted successfully! We'll review it soon.
          </div>
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Issue Title <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief summary of the issue"
            className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all cursor-text"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
            rows={6}
            className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all resize-none cursor-text"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Screenshot URL (Optional)
          </label>
          <input
            value={screenshot}
            onChange={(e) => setScreenshot(e.target.value)}
            placeholder="https://example.com/screenshot.png"
            className="w-full px-4 py-3 rounded-xl bg-background-tertiary border border-border-subtle text-sm focus:ring-2 ring-accent focus:outline-none transition-all cursor-text"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={submit}
            disabled={loading || !title.trim() || !description.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer group"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Report</span>
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}