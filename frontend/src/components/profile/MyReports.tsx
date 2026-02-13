import Link from "next/link";
import type { MyReport } from "@/types/profile";
import { AlertCircle, CheckCircle2, Clock, ExternalLink } from "lucide-react";

export default function MyReports({ reports }: { reports: MyReport[] }) {
  return (
    <div className="rounded-2xl bg-background-secondary border border-border-subtle p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold">My Reports</h3>
          <p className="text-sm text-muted">{reports.length} total</p>
        </div>
      </div>

      {/* Reports Grid */}
      {reports.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {reports.map((r) => (
            <div
              key={r._id}
              className="p-4 rounded-xl bg-background-tertiary border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-semibold flex-1 text-sm">{r.title}</h4>
                {r.resolved ? (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Resolved
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
                    <Clock className="w-3 h-3" />
                    Pending
                  </div>
                )}
              </div>

              <Link
                href={`/problems/${r.problemId.slug}`}
                className="flex items-center gap-2 text-sm text-accent hover:underline cursor-pointer group"
              >
                <span className="truncate">{r.problemId.title}</span>
                <ExternalLink className="w-3 h-3 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
            <AlertCircle className="w-8 h-8 text-accent" />
          </div>
          <h4 className="font-semibold mb-2">No reports yet</h4>
          <p className="text-sm text-muted">
            Report issues to help improve the platform
          </p>
        </div>
      )}
    </div>
  );
}