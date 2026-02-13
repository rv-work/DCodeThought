"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";

type ProblemOption = {
  _id: string;
  problemNumber: number;
  title: string;
};

type Props = {
  value: string[];
  onChange: (ids: string[]) => void;
  mode: "add" | "edit";
};

export default function ContestProblemSelector({
  value,
  onChange,
  mode,
}: Props) {
  const [problems, setProblems] = useState<ProblemOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/admin/contests/problems?mode=${mode}`)
      .then((res) => {
        setProblems(res.data.problems);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [mode]);

  const update = (index: number, id: string) => {
    const next = [...value];
    next[index] = id;
    onChange(next);
  };

  if (loading) {
    return (
      <div className="card text-center py-8">
        <div className="text-muted">Loading problems...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <label className="block text-xs font-medium text-muted">
            Problem {i + 1}
          </label>
          <select
            value={value[i] || ""}
            onChange={(e) => update(i, e.target.value)}
            className="select-field cursor-pointer"
            required
          >
            <option value="">Select Problem {i + 1}</option>

            {problems.map((p) => (
              <option
                key={p._id}
                value={p._id}
                disabled={
                  value.includes(p._id) &&
                  value[i] !== p._id
                }
              >
                #{p.problemNumber} — {p.title}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}