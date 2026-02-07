"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContestProblemSelector from "./ContestProblemSelector";
import { addAdminContest } from "@/api/admin.contest.api";

export default function ContestForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    contestNumber: 0,
    contestName: "",
    contestDate: "",
    problems: ["", "", "", ""],
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdminContest(form);
    router.push("/admin/contests");
  };

  return (
    <form onSubmit={submit} className="space-y-3 max-w-md">
      <input
        type="number"
        placeholder="Contest Number"
        onChange={(e) =>
          setForm({ ...form, contestNumber: Number(e.target.value) })
        }
      />

      <input
        placeholder="Contest Name"
        onChange={(e) =>
          setForm({ ...form, contestName: e.target.value })
        }
      />

      <input
        type="datetime-local"
        onChange={(e) =>
          setForm({ ...form, contestDate: e.target.value })
        }
      />

      <ContestProblemSelector
        value={form.problems}
        onChange={(ids) => setForm({ ...form, problems: ids })}
      />

      <button className="border px-4 py-2">Create Contest</button>
    </form>
  );
}
