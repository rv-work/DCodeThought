import Link from "next/link";
import type { PotdProblem } from "@/types/potd";
import { Calendar, Code2, ArrowRight, Sparkles } from "lucide-react";

const difficultyColors = {
  Easy: "from-green-500 to-emerald-500",
  Medium: "from-yellow-500 to-orange-500",
  Hard: "from-red-500 to-pink-500",
};

export default function PotdCard({ potd }: { potd: PotdProblem }) {
  return (
    <Link
      href={`/problems/${potd.slug}`}
      className="group relative block rounded-2xl bg-linear-to-br from-accent/10 via-purple-500/10 to-pink-500/10 border-2 border-accent/20 p-8 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-accent to-purple-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="text-sm text-muted flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(potd.potdDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="text-xs text-accent font-semibold">
                Today&apos;s Challenge
              </div>
            </div>
          </div>

          <div className="w-10 h-10 rounded-lg bg-background-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            <ArrowRight className="w-5 h-5 text-accent" />
          </div>
        </div>

        {/* Problem Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Code2 className="w-4 h-4" />
            <span>#{potd.problemNumber}</span>
          </div>

          <h2 className="text-2xl font-bold group-hover:text-accent transition-colors">
            {potd.title}
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-background-secondary border border-border">
            <div
              className={`w-2 h-2 rounded-full bg-linear-to-r ${difficultyColors[potd.difficulty as keyof typeof difficultyColors]
                }`}
            />
            {potd.difficulty}
          </div>
        </div>

        {/* Call to action */}
        <div className="flex items-center gap-2 text-sm font-medium text-accent">
          <span>Start solving</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-accent/20 rounded-bl-lg" />
    </Link>
  );
}