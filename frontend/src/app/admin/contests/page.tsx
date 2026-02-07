"use client";

import { useEffect, useState } from "react";
import { getAdminContests, deleteAdminContest } from "@/api/admin.contest.api";
import type { Contest } from "@/types/contest";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminContestsPage() {
  const [contests, setContests] = useState<Contest[]>([]);

  useEffect(() => {
    getAdminContests().then((res) => setContests(res.contests));
  }, []);

  return (
    <div>
      <AdminPageHeader title="Contests" />

      {contests.map((c) => (
        <div key={c._id} className="border p-2 flex justify-between">
          <div>
            Contest {c.contestNumber} — {c.contestName}
          </div>
          <button
            onClick={async () => {
              await deleteAdminContest(c._id);
              setContests((x) => x.filter((y) => y._id !== c._id));
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
