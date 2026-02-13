"use client";

import { useEffect, useState } from "react";
import { getPotdHistory } from "@/api/potd.api";
import type { PotdProblem } from "@/types/potd";
import Pagination from "@/components/problems/Pagination";
import Link from "next/link";
import { Calendar, Code2, ArrowRight } from "lucide-react";

const difficultyColors = {
  Easy: "from-green-500 to-emerald-500",
  Medium: "from-yellow-500 to-orange-500",
  Hard: "from-red-500 to-pink-500",
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-border" />
        <h2 className="text-2xl font-bold">Past Challenges</h2>
        <div className="h-px flex-1 bg-linear-to-r from-border via-border to-transparent" />
      </div>

      {/* POTD List */}
      <div className="grid gap-4">
        {data.potds.map((p, idx) => (
          <Link
            key={p.slug}
            href={`/problems/${p.slug}`}
            className="group relative block rounded-2xl bg-background-secondary border border-border-subtle p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in-up opacity-0"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {/* linear overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Calendar className="w-4 h-4" />
                  {new Date(p.potdDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                {/* Problem Info */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Code2 className="w-4 h-4" />
                    <span>#{p.problemNumber}</span>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                </div>

                {/* Difficulty */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold bg-background-tertiary border border-border">
                  <div
                    className={`w-2 h-2 rounded-full bg-linear-to-r ${difficultyColors[p.difficulty as keyof typeof difficultyColors]
                      }`}
                  />
                  {p.difficulty}
                </div>
              </div>

              {/* Arrow */}
              <div className="w-10 h-10 rounded-lg bg-background-tertiary flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-accent" />
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-4 right-4 w-12 h-12 border-2 border-border opacity-10 rounded-full group-hover:scale-125 transition-transform duration-700" />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
}