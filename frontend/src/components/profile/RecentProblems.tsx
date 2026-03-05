import Link from "next/link";
import type { RecentView } from "@/types/profile";
import { Activity, Code2, ArrowRight } from "lucide-react";

// Tailwind v4 specific gradients
const difficultyColors = {
  Easy: "from-emerald-400 to-green-500",
  Medium: "from-amber-400 to-orange-500",
  Hard: "from-rose-400 to-red-500",
};

export default function RecentProblems({ recent }: { recent: RecentView[] }) {
  // filter invalid entries just in case
  const validRecent = recent.filter((r) => r.problemId);

  return (
    <div className="h-full rounded-4xl bg-background-secondary/40 backdrop-blur-md border border-border-subtle p-8 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">History</h3>
          <p className="text-sm font-medium text-muted">{validRecent.length} problems viewed</p>
        </div>
      </div>

      {/* Recent List */}
      {validRecent.length > 0 ? (
        <div className="space-y-4">
          {validRecent.map((r) => {
            const difficulty = r.problemId.difficulty as "Easy" | "Medium" | "Hard";

            return (
              <Link
                key={r.problemId.slug}
                href={`/problems/${r.problemId.slug}`}
                className="group flex items-center justify-between p-4 rounded-2xl bg-background border border-border-subtle hover:border-blue-500/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                {/* Left Section */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <Code2 className="w-5 h-5 text-blue-500 group-hover:text-white" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-bold text-muted tracking-wide">
                        #{r.problemId.problemNumber}
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md bg-linear-to-r text-white font-extrabold uppercase tracking-wider ${difficultyColors[difficulty]}`}>
                        {difficulty}
                      </span>
                    </div>
                    <div className="font-bold text-foreground truncate group-hover:text-blue-500 transition-colors">
                      {r.problemId.title}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border-subtle bg-background/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 mb-4">
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
          <h4 className="font-bold text-lg mb-1 text-foreground">No recent activity</h4>
          <p className="text-sm text-muted">Problems you view will appear here.</p>
        </div>
      )}
    </div>
  );
}