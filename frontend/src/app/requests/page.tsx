"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getRequests, toggleRequestVote } from "@/api/request.api";
import type { PublicRequest } from "@/types/request";
import RequestTabs from "@/components/requests/RequestTabs";
import RequestCard from "@/components/requests/RequestCard";
import RequestForm from "@/components/requests/RequestForm";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare, Sparkles, Plus } from "lucide-react";

export default function RequestsPage() {
  const [type, setType] = useState<"question" | "feature">("question");
  const [requests, setRequests] = useState<PublicRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    getRequests(type)
      .then((res) => setRequests(res.requests))
      .finally(() => setLoading(false));
  }, [type]);

  const handleVote = async (id: string) => {
    const res = await toggleRequestVote(id);

    // update frontend state instantly
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id
          ? { ...r, votes: Array(res.votes).fill("x") } // fake vote list length
          : r
      )
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="text-center space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <MessageSquare className="w-4 h-4" />
              Community Requests
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Request & Vote
            </h1>

            {/* Description */}
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Request new problems or features and vote on what matters most to you
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-muted">Community-driven</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-muted">Transparent voting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {/* Tabs */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <RequestTabs active={type} onChange={setType} />
          </div>

          {/* Add Request Button (if logged in) */}
          {user && (
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full rounded-2xl border-2 border-dashed border-border-subtle hover:border-accent hover:bg-accent/5 p-8 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors">
                      <Plus className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold mb-1">
                        Add New {type === "question" ? "Question" : "Feature"}{" "}
                        Request
                      </div>
                      <div className="text-sm text-muted">
                        Share your idea with the community
                      </div>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl bg-background-secondary border border-border-subtle p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                      New {type === "question" ? "Question" : "Feature"} Request
                    </h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-sm text-muted hover:text-foreground cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  <RequestForm />
                </div>
              )}
            </div>
          )}

          {/* Requests List */}
          <div className="space-y-4">
            {loading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-32 rounded-2xl bg-background-secondary border border-border-subtle animate-pulse"
                  />
                ))}
              </>
            ) : requests.length > 0 ? (
              <div className="space-y-4 stagger-children">
                {requests.map((r) => (
                  <RequestCard key={r._id} request={r} onVote={handleVote} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 rounded-2xl bg-background-secondary border border-border-subtle">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mb-6">
                  <MessageSquare className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No {type === "question" ? "Questions" : "Features"} Yet
                </h3>
                <p className="text-muted">
                  Be the first to request a{" "}
                  {type === "question" ? "problem" : "feature"}!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}