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
}: {
  onSelect: (id: string) => void;
}) {
  const [problems, setProblems] = useState<ProblemOption[]>([]);

  useEffect(() => {
    api.get("/api/admin/potd/available-problems")
      .then((res) => {
        setProblems(res.data.problems);
      });
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Problem</option>
      {problems.map((p) => (
        <option key={p._id} value={p._id}>
          #{p.problemNumber} — {p.title}
        </option>
      ))}
    </select>
  );
}
