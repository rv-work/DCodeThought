"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getRequests, toggleRequestVote } from "@/api/request.api";
import type { PublicRequest } from "@/types/request";
import RequestTabs from "@/components/requests/RequestTabs";
import RequestCard from "@/components/requests/RequestCard";
import RequestForm from "@/components/requests/RequestForm";
import { useAuth } from "@/hooks/useAuth";
import { MessageSquare, Plus, Lightbulb, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/parseError";
import Link from "next/link";

export default function RequestsPage() {
  const [type, setType] = useState<"question" | "feature">("question");
  const [requests, setRequests] = useState<PublicRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await getRequests(type);
        setRequests(res.requests);
      } catch (err) {
        toast.error(parseError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [type]);

  const handleVote = async (id: string) => {
    if (!user) {
      toast.error("Please login to vote");
      return;
    }
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

            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Request & Vote
            </h1>

            <p className="text-muted text-lg max-w-2xl mx-auto">
              Request new problems or features and vote on what matters most to you
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <RequestTabs active={type} onChange={setType} />

          {/* Form Section / Login CTA */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {user ? (
              !showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full rounded-2xl border-2 border-dashed border-border-subtle hover:border-accent hover:bg-accent/5 p-8 transition-all group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6 text-accent" />
                    </div>
                    <div className="font-semibold text-center text-foreground">
                      Add New {type === "question" ? "Question" : "Feature"} Request
                    </div>
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl bg-background-secondary border border-border-subtle p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-foreground">Create New {type === "question" ? "Question" : "Feature"}</h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                  <RequestForm />
                </div>
              )
            ) : (
              /* Logged Out State Prompt with Dynamic Messages */
              <div className="w-full rounded-2xl border-2 border-dashed border-border-subtle p-10 bg-background-secondary/20 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                    {type === "question" ? (
                      <HelpCircle className="w-6 h-6 text-purple-500" />
                    ) : (
                      <Lightbulb className="w-6 h-6 text-purple-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {type === "question"
                        ? "Have a problem in mind?"
                        : "Got a brilliant feature idea?"}
                    </h3>
                    <p className="text-muted mt-1 max-w-sm">
                      {type === "question"
                        ? "Login to request a specific question you want us to solve."
                        : "Login to suggest new tools or improvements for the platform."}
                    </p>
                  </div>
                  <Link
                    href="/login"
                    className="mt-2 px-8 py-3 rounded-xl bg-foreground text-background font-bold hover:scale-[1.03] transition-all shadow-lg shadow-black/10"
                  >
                    Login to {type === "question" ? "Request Question" : "Suggest Feature"}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* List Section */}
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
              <div className="space-y-4">
                {requests.map((r) => (
                  <RequestCard key={r._id} request={r} onVote={handleVote} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 rounded-3xl bg-background-secondary/30 border border-border-subtle border-dashed">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  No {type === "question" ? "Questions" : "Features"} Found
                </h3>
                <p className="text-muted mt-2">Be the first to suggest something new!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}