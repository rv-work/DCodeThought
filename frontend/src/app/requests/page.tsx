"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getRequests } from "@/api/request.api";
import type { PublicRequest } from "@/types/request";
import RequestTabs from "@/components/requests/RequestTabs";
import RequestCard from "@/components/requests/RequestCard";
import RequestForm from "@/components/requests/RequestForm";
import { useAuth } from "@/hooks/useAuth";

export default function RequestsPage() {
  const [type, setType] = useState<"question" | "feature">("question");
  const [requests, setRequests] = useState<PublicRequest[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getRequests(type).then((res) =>
      setRequests(res.requests)
    );
  }, [type]);

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <h1 className="text-xl font-bold">Requests</h1>

        <RequestTabs active={type} onChange={setType} />

        {user && <RequestForm />}

        <div className="space-y-3">
          {requests.map((r) => (
            <RequestCard key={r._id} request={r} />
          ))}
        </div>
      </div>
    </>
  );
}
