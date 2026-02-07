import type { MyRequest } from "@/types/profile";

export default function MyRequests({
  requests,
}: {
  requests: MyRequest[];
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">My Requests</h3>

      {requests.map((r) => (
        <div key={r._id} className="border p-2 rounded text-sm">
          <div className="font-medium">{r.title}</div>
          <div className="text-xs">
            Votes: {r.votes.length} |{" "}
            {r.completed ? "Completed" : "Open"}
          </div>
        </div>
      ))}
    </div>
  );
}
