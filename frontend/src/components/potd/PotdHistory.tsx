"use client";

import { useEffect, useState } from "react";
import { getPotdHistory } from "@/api/potd.api";
import type { PotdProblem } from "@/types/potd";
import Pagination from "@/components/problems/Pagination";
import Link from "next/link";
import { Calendar, Code2, ArrowRight } from "lucide-react";

// Tailwind v4 specific gradients
const difficultyColors = {
  Easy: "from-emerald-400 to-green-500",
  Medium: "from-amber-400 to-orange-500",
  Hard: "from-rose-400 to-red-500",
};

const difficultyGlows = {
  Easy: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Medium: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  Hard: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

export default function PotdHistory() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<{
    potds: PotdProblem[];
    totalPages: number;
  } | null>(null);

  useEffect(() => {
    getPotdHistory({ page }).then((res) =>
      setData({
        potds: res.potds,
        totalPages: res.totalPages,
      })
    );
  }, [page]);

  if (!data) return null;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-border" />
        <h2 className="text-2xl font-bold text-foreground">Past Challenges</h2>
        <div className="h-px flex-1 bg-linear-to-r from-border via-border to-transparent" />
      </div>

      {/* POTD List */}
      <div className="grid gap-4">
        {data.potds.map((p, idx) => {
          const difficultyLevel = p.difficulty as keyof typeof difficultyColors;

          return (
            <Link
              key={p.slug}
              href={`/problems/${p.slug}`}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl bg-background-secondary/40 backdrop-blur-sm border border-border-subtle p-5 hover:border-purple-500/40 hover:bg-background-secondary/80 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.1)] transition-all duration-300 cursor-pointer animate-fade-in-up opacity-0"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Left Side: Date & Title */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 text-xs font-medium text-muted">
                  <span className="flex items-center gap-1.5 bg-background border border-border-subtle px-2 py-1 rounded-md">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(p.potdDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5 bg-background border border-border-subtle px-2 py-1 rounded-md">
                    <Code2 className="w-3.5 h-3.5" />
                    #{p.problemNumber}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-foreground group-hover:text-purple-400 transition-colors">
                  {p.title}
                </h3>
              </div>

              {/* Right Side: Difficulty & Arrow */}
              <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-4 mt-2 md:mt-0">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${difficultyGlows[difficultyLevel]}`}>
                  <div className={`w-2 h-2 rounded-full bg-linear-to-r ${difficultyColors[difficultyLevel]}`} />
                  {p.difficulty}
                </div>

                <div className="w-10 h-10 rounded-xl bg-background border border-border-subtle flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="pt-8">
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}