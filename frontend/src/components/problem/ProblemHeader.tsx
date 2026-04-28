"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProblemDetail } from "@/types/problem";
import {
  ExternalLink, Hash, Tag, Code2,
  RefreshCw, CheckCircle2, Link as LinkIcon, AlertCircle
} from "lucide-react";
import { verifyProblemSync } from "@/api/activity.api";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

// Tailwind v4 specific gradients
const difficultyColors = {
  Easy: "from-emerald-400 to-green-500",
  Medium: "from-amber-400 to-orange-500",
  Hard: "from-rose-400 to-red-500",
};

const typeColors = {
  potd: "from-blue-500 to-cyan-500",
  contest: "from-purple-500 to-pink-500",
  requested: "from-orange-500 to-red-500",
};

// Custom interface for the API Error
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function ProblemHeader({ problem }: { problem: ProblemDetail }) {
  const { user } = useAuth();
  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  // Check if user has linked their LeetCode account
  const hasLeetcodeLinked = !!user?.socialLinks?.leetcode;

  const handleVerify = async () => {
    if (!user) {
      toast.error("Please login to verify your submission!");
      router.push("/login");
      return;
    }

    setIsVerifying(true);
    try {
      // API call to verify with LeetCode GraphQL
      const res = await verifyProblemSync(problem._id);
      if (res.success) {
        setIsSynced(true);
        toast.success(res.message || "Verified successfully! Streak updated.✅");
      }
    } catch (error) {
      // Safely casting the error to our custom ApiError interface
      const err = error as ApiError;
      toast.error(err.response?.data?.message || "Verification failed. Make sure you solved it recently.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLinkLeetcode = () => {
    if (!user) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }
    router.push("/profile");
  };

  return (
    <div className="relative rounded-[2.5rem] bg-background-secondary/40 backdrop-blur-xl border border-purple-500/20 p-8 md:p-12 overflow-hidden shadow-[0_20px_60px_-15px_rgba(168,85,247,0.1)]">

      {/* Decorative internal glows */}
      <div className="absolute top-[-50%] right-[-10%] w-100 h-100 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-100 h-100 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-8">

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border-subtle shadow-sm text-xs font-extrabold text-muted tracking-wide">
            <Hash className="w-3.5 h-3.5" />
            {problem.problemNumber}
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r ${typeColors[problem.type as keyof typeof typeColors]} text-white text-xs font-extrabold uppercase tracking-wider shadow-md`}>
            {problem.type}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border-subtle shadow-sm text-xs font-extrabold text-foreground">
            <div className={`w-2 h-2 rounded-full bg-linear-to-r ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]}`} />
            {problem.difficulty}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
          {problem.title}
        </h1>

        {/* Tags */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Tag className="w-4 h-4 text-purple-400 mr-1" />
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="pt-6 border-t border-border-subtle/50 flex flex-wrap items-center gap-4">
          <a
            href={problem.leetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-bold text-lg hover:scale-[1.02] transition-transform duration-300 group shadow-xl"
          >
            <Code2 className="w-5 h-5 text-background" />
            <span>Solve on LeetCode</span>
            <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* DYNAMIC SYNC LOGIC */}
          {!hasLeetcodeLinked ? (
            <div className="flex flex-wrap items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-5 py-3.5 rounded-xl shadow-lg">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-sm font-bold text-amber-500/90 pr-2">
                Link LeetCode to mark as solved
              </span>
              <button
                onClick={handleLinkLeetcode}
                className="flex cursor-pointer items-center gap-1.5 px-4 py-2 bg-amber-500 text-black text-xs font-black uppercase tracking-wider rounded-lg hover:scale-105 transition-transform shadow-md"
              >
                <LinkIcon className="w-3.5 h-3.5" /> Link Now
              </button>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              disabled={isVerifying || isSynced}
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl border ${isSynced
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500 cursor-default"
                : "bg-background border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:scale-[1.02]"
                }`}
            >
              {isVerifying ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : isSynced ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
              <span>{isVerifying ? "Verifying..." : isSynced ? "Synced & Logged!" : "Verify Sync"}</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}