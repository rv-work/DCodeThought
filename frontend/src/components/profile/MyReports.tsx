import Link from "next/link";
import type { MyReport } from "@/types/profile";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function MyReports({ reports }: { reports: MyReport[] }) {
  return (
    <div className="rounded-4xl bg-background-secondary/40 backdrop-blur-md border border-border-subtle p-8 md:p-10 shadow-sm h-120 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">
            My Bug Reports
          </h3>
          <p className="text-sm font-medium text-muted">
            {reports.length} issues submitted
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      {reports.length > 0 ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          <div className="grid md:grid-cols-2 gap-5">
            {reports.map((r) => (
              <div
                key={r._id}
                className="p-6 rounded-2xl bg-background border border-border-subtle hover:border-orange-500/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    {r.resolved ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        Resolved
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                        <Clock className="w-3 h-3" />
                        Pending
                      </div>
                    )}
                  </div>

                  <h4 className="font-bold text-foreground text-lg leading-tight mb-4">
                    {r.title}
                  </h4>
                </div>

                <Link
                  href={`/problems/${r.problemId.slug}`}
                  className="flex items-center gap-2 bg-orange-500/5 w-fit px-4 py-2 rounded-xl text-sm font-bold text-orange-500 hover:bg-orange-500/10 hover:text-orange-600 transition-colors group cursor-pointer"
                >
                  <span className="truncate max-w-50">
                    {r.problemId.title}
                  </span>
                  <ExternalLink className="w-4 h-4 shrink-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border-subtle bg-background/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 mb-4">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <h4 className="font-bold text-lg mb-1 text-foreground">
            No reports yet
          </h4>
          <p className="text-sm text-muted">
            You haven&apos;t reported any issues with problems. Awesome!
          </p>
        </div>
      )}
    </div>
  );
}