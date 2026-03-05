"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getRequests, toggleRequestVote } from "@/api/request.api";
import type { PublicRequest } from "@/types/request";
import RequestTabs from "@/components/requests/RequestTabs";
import RequestCard from "@/components/requests/RequestCard";
import RequestForm from "@/components/requests/RequestForm";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";

export default function RequestsPage() {
  const [type, setType] = useState<"question" | "feature">("question");
  const [requests, setRequests] = useState<PublicRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const res = await getRequests(type);
      setRequests(res.requests);
      setLoading(false);
    };

    fetchRequests();
  }, [type]);



  const handleVote = async (id: string) => {
    try {
      const res = await toggleRequestVote(id);

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, votes: res.votes } : r
        )
      );

      toast.success("Vote updated 🔼");
    } catch (err: unknown) {
      toast.error(parseError(err));
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <MessageSquare className="w-4 h-4" />
              Community Requests
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              Request & Vote
            </h1>

            <p className="text-muted text-lg max-w-2xl mx-auto">
              Request new problems or features and vote on what matters most to you
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <RequestTabs active={type} onChange={setType} />

          {user && (
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full rounded-2xl border-2 border-dashed border-border-subtle hover:border-accent hover:bg-accent/5 p-8 transition-all"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-accent" />
                    </div>
                    <div className="font-semibold text-center">
                      Add New {type === "question" ? "Question" : "Feature"} Request
                    </div>
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl bg-background-secondary border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">New Request</h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-sm text-muted"
                    >
                      Cancel
                    </button>
                  </div>
                  <RequestForm />
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            {loading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-32 rounded-2xl bg-background-secondary border animate-pulse"
                  />
                ))}
              </>
            ) : requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((r) => (
                  <RequestCard key={r._id} request={r} onVote={handleVote} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 rounded-2xl bg-background-secondary border">
                <MessageSquare className="w-10 h-10 text-accent mx-auto mb-6" />
                <h3 className="text-xl font-semibold">
                  No {type === "question" ? "Questions" : "Features"} Yet
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}