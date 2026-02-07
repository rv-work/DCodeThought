"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axios";
import { saveAdminSolution } from "@/api/admin.solution.api";
import CodeEditorGroup from "./CodeEditorGroup";

type ProblemOption = {
  _id: string;
  problemNumber: number;
  title: string;
};

export default function SolutionForm() {
  const router = useRouter();
  const [problems, setProblems] = useState<ProblemOption[]>([]);

  const [form, setForm] = useState({
    problemId: "",
    myThought: "",
    engThought: "",
    hints: [] as string[],
    code: {} as Record<string, string>,
    youtubeLink: "",
  });

  useEffect(() => {
    api.get("/api/admin/problems").then((res) => {
      setProblems(res.data.problems);
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAdminSolution(form);
    router.push("/admin/solutions");
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-w-2xl">
      <select
        onChange={(e) => setForm({ ...form, problemId: e.target.value })}
      >
        <option value="">Select Problem</option>
        {problems.map((p) => (
          <option key={p._id} value={p._id}>
            #{p.problemNumber} — {p.title}
          </option>
        ))}
      </select>

      <textarea
        placeholder="My Thought (Hindi)"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, myThought: e.target.value })}
      />

      <textarea
        placeholder="English Thought"
        className="w-full border p-2"
        onChange={(e) => setForm({ ...form, engThought: e.target.value })}
      />

      <textarea
        placeholder="Hints (one per line)"
        className="w-full border p-2"
        onChange={(e) =>
          setForm({
            ...form,
            hints: e.target.value.split("\n").filter(Boolean),
          })
        }
      />

      <CodeEditorGroup
        code={form.code}
        onChange={(code) => setForm({ ...form, code })}
      />

      <input
        placeholder="YouTube Link"
        onChange={(e) => setForm({ ...form, youtubeLink: e.target.value })}
      />

      <button className="border px-4 py-2">Save Solution</button>
    </form>
  );
}
