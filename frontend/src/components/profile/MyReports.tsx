import Link from "next/link";
import type { MyReport } from "@/types/profile";

export default function MyReports({
  reports,
}: {
  reports: MyReport[];
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">My Reports</h3>

      {reports.map((r) => (
        <div key={r._id} className="border p-2 rounded text-sm">
          <div className="font-medium">{r.title}</div>

          <Link
            href={`/problems/${r.problemId.slug}`}
            className="text-xs underline"
          >
            {r.problemId.title}
          </Link>

          <div className="text-xs">
            Status: {r.resolved ? "Resolved" : "Pending"}
          </div>
        </div>
      ))}
    </div>
  );
}
