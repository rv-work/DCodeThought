"use client";

import { useState } from "react";
import { reportProblem } from "@/api/report.api";
import { useAuth } from "@/hooks/useAuth";
import { Send, Loader2, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

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

  // ✅ FIX: Show a beautiful login prompt instead of returning null
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center rounded-4xl bg-background-secondary/30 backdrop-blur-md">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20">
          <Lock className="w-8 h-8 text-rose-500" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Login Required</h3>
        <p className="text-muted mb-6">
          Please log in to your account to report issues with this problem.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-foreground text-background font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Go to Login
        </Link>
      </div>
    );
  }

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

    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header handled by parent, starting directly with Success/Form */}

      {/* Success Message */}
      {submitted && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 animate-fade-in-up">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
          <div className="text-sm font-bold text-emerald-500">
            Report submitted successfully! We&apos;ll review it soon.
          </div>
        </div>
      )}

      {/* Form */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Issue Title <span className="text-rose-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief summary of the issue"
            className="w-full px-5 py-4 rounded-xl bg-background border border-border-subtle text-base text-foreground focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all cursor-text placeholder:text-muted/60 shadow-inner"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail (e.g., 'Test case 3 is failing incorrectly...')"
            rows={5}
            className="w-full px-5 py-4 rounded-xl bg-background border border-border-subtle text-base text-foreground focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all resize-none cursor-text placeholder:text-muted/60 shadow-inner"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Screenshot URL <span className="text-muted font-medium ml-1">(Optional)</span>
          </label>
          <input
            value={screenshot}
            onChange={(e) => setScreenshot(e.target.value)}
            placeholder="https://example.com/screenshot.png"
            className="w-full px-5 py-4 rounded-xl bg-background border border-border-subtle text-base text-foreground focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all cursor-text placeholder:text-muted/60 shadow-inner"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={submit}
            disabled={loading || !title.trim() || !description.trim()}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 rounded-xl bg-linear-to-r from-orange-500 to-rose-600 text-white font-bold shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all cursor-pointer group"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Report</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}