"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addAdminProblem } from "@/api/admin.problem.api";

export default function ProblemForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    problemNumber: 0,
    title: "",
    leetcodeLink: "",
    difficulty: "Easy",
    type: "normal",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdminProblem(form);
    router.push("/admin/problems");
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-w-md">
      <input
        placeholder="Problem Number"
        type="number"
        onChange={(e) =>
          setForm({ ...form, problemNumber: Number(e.target.value) })
        }
      />
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="LeetCode Link"
        onChange={(e) => setForm({ ...form, leetcodeLink: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option value="normal">Normal</option>
        <option value="potd">POTD</option>
        <option value="contest">Contest</option>
        <option value="requested">Requested</option>
      </select>

      <button className="border px-4 py-2">Save</button>
    </form>
  );
}
