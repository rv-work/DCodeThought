"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";

type ProblemOption = {
  _id: string;
  problemNumber: number;
  title: string;
};

export default function PotdSelector({
  onSelect,
  initialValue = "",
}: {
  onSelect: (id: string) => void;
  initialValue?: string;
}) {
  const [problems, setProblems] = useState<ProblemOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    api.get("/api/admin/potd/available-problems")
      .then((res) => {
        setProblems(res.data.problems);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  if (loading) {
    return (
      <div className="card text-center py-8">
        <div className="text-muted">Loading problems...</div>
      </div>
    );
  }

  return (
    <select
      value={selected}
      onChange={(e) => handleChange(e.target.value)}
      className="select-field cursor-pointer"
      required
    >
      <option value="">Select a problem</option>
      {problems.map((p) => (
        <option key={p._id} value={p._id}>
          #{p.problemNumber} — {p.title}
        </option>
      ))}
    </select>
  );
}