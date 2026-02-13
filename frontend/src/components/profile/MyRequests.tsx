import type { MyRequest } from "@/types/profile";
import { MessageSquare, ThumbsUp, CheckCircle2, Clock } from "lucide-react";

export default function MyRequests({ requests }: { requests: MyRequest[] }) {
  return (
    <div className="rounded-2xl bg-background-secondary border border-border-subtle p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold">My Requests</h3>
          <p className="text-sm text-muted">{requests.length} total</p>
        </div>
      </div>

      {/* Requests List */}
      {requests.length > 0 ? (
        <div className="space-y-3">
          {requests.map((r) => (
            <div
              key={r._id}
              className="p-4 rounded-xl bg-background-tertiary border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-semibold flex-1">{r.title}</h4>
                {r.completed ? (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-semibold">
                    <Clock className="w-3 h-3" />
                    Pending
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted">
                <ThumbsUp className="w-4 h-4" />
                <span>{r.votes.length} votes</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
            <MessageSquare className="w-8 h-8 text-accent" />
          </div>
          <h4 className="font-semibold mb-2">No requests yet</h4>
          <p className="text-sm text-muted">
            Start requesting problems or features!
          </p>
        </div>
      )}
    </div>
  );
}