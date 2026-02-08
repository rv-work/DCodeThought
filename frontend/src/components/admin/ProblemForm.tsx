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
    <div className="max-w-xl mx-auto card animate-scale-in">
      <h1 className="text-2xl font-bold mb-6">Add New Problem</h1>

      <form onSubmit={submit} className="space-y-5">

        <input
          type="number"
          placeholder="Problem Number"
          className="input-field"
          onChange={(e) =>
            setForm({ ...form, problemNumber: Number(e.target.value) })
          }
        />

        <input
          placeholder="Problem Title"
          className="input-field"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="LeetCode Link"
          className="input-field"
          onChange={(e) => setForm({ ...form, leetcodeLink: e.target.value })}
        />

        <select
          className="select-field"
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          className="select-field"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="normal">Normal</option>
          <option value="potd">POTD</option>
          <option value="contest">Contest</option>
          <option value="requested">Requested</option>
        </select>

        <button className="primary-btn">Save Problem</button>
      </form>
    </div>
  );
}
