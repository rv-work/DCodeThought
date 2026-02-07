"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";

type ProblemOption = {
  _id: string;
  problemNumber: number;
  title: string;
};

export default function ContestProblemSelector({
  value,
  onChange,
}: {
  value: string[];
  onChange: (ids: string[]) => void;
}) {
  const [problems, setProblems] = useState<ProblemOption[]>([]);

  useEffect(() => {
    api.get("/api/admin/problems").then((res) => {
      setProblems(res.data.problems);
    });
  }, []);

  const update = (index: number, id: string) => {
    const next = [...value];
    next[index] = id;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {[0, 1, 2, 3].map((i) => (
        <select
          key={i}
          value={value[i] || ""}
          onChange={(e) => update(i, e.target.value)}
        >
          <option value="">Select Problem {i + 1}</option>
          {problems.map((p) => (
            <option key={p._id} value={p._id}>
              #{p.problemNumber} — {p.title}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
