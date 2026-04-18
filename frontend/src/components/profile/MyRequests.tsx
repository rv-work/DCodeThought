import type { MyRequest } from "@/types/profile";
import { MessageSquare, ThumbsUp, CheckCircle2, Clock } from "lucide-react";

export default function MyRequests({ requests }: { requests: MyRequest[] }) {
  return (
    <div className="rounded-4xl bg-background-secondary/40 backdrop-blur-md border border-border-subtle p-8 shadow-sm h-140 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">My Requests</h3>
          <p className="text-sm font-medium text-muted">
            {requests.length} submitted
          </p>
        </div>
      </div>

      {/* Requests List */}
      {requests.length > 0 ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
          {requests.map((r) => (
            <div
              key={r._id}
              className="p-5 rounded-2xl bg-background border border-border-subtle hover:border-purple-500/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h4 className="font-bold text-foreground text-lg leading-tight flex-1">
                  {r.title}
                </h4>

                {r.completed ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                    <Clock className="w-3 h-3" />
                    Pending
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 bg-background-secondary/50 w-fit px-3 py-1.5 rounded-lg border border-border-subtle">
                <ThumbsUp className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-bold text-foreground">
                  {r.votes.length}{" "}
                  <span className="text-muted font-medium">votes</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border-subtle bg-background/50">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 mb-4">
            <MessageSquare className="w-8 h-8 text-purple-500" />
          </div>
          <h4 className="font-bold text-lg mb-1 text-foreground">
            No requests yet
          </h4>
          <p className="text-sm text-muted">
            Suggest a new problem or feature!
          </p>
        </div>
      )}
    </div>
  );
}