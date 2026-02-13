import Link from "next/link";
import type { RecentView } from "@/types/profile";
import { Clock, Code2, ArrowRight } from "lucide-react";

const difficultyColors = {
  Easy: "from-green-500 to-emerald-500",
  Medium: "from-yellow-500 to-orange-500",
  Hard: "from-red-500 to-pink-500",
};

export default function RecentProblems({ recent }: { recent: RecentView[] }) {
  return (
    <div className="rounded-2xl bg-background-secondary border border-border-subtle p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Recently Viewed</h3>
          <p className="text-sm text-muted">{recent.length} problems</p>
        </div>
      </div>

      {/* Recent List */}
      {recent.length > 0 ? (
        <div className="space-y-3">
          {recent.map((r, idx) => (
            <Link
              key={r.problemId.slug}
              href={`/problems/${r.problemId.slug}`}
              className="group flex items-center justify-between p-4 rounded-xl bg-background-tertiary hover:bg-background hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-muted">
                    #{r.problemId.problemNumber}
                  </div>
                  <div className="font-semibold truncate group-hover:text-accent transition-colors">
                    {r.problemId.title}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
            <Clock className="w-8 h-8 text-accent" />
          </div>
          <h4 className="font-semibold mb-2">No recent problems</h4>
          <p className="text-sm text-muted">
            Problems you view will appear here
          </p>
        </div>
      )}
    </div>
  );
}