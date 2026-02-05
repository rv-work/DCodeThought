"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import SearchBar from "@/components/SearchBar";

export default function NewContestPage() {
  const [contestNumber, setContestNumber] = useState("");
  const [contestName, setContestName] = useState("");
  const [contestDate, setContestDate] = useState("");

  const [search, setSearch] = useState("");
  const [problems, setProblems] = useState<any[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const searchProblems = async (value: string) => {
    setSearch(value);

    if (value.length < 2) {
      setProblems([]);
      return;
    }

    const res = await api.get(`${API.problems.all}?search=${value}`);
    setProblems(res.data.problems || []);
  };

  const toggleProblem = (id: string) => {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const createContest = async () => {
    if (!contestName || !contestDate || !contestNumber) {
      alert("Please fill all fields.");
      return;
    }

    setSaving(true);

    try {
      await api.post(API.contest.create, {
        contestNumber,
        contestName,
        contestDate,
        problems: selectedProblems,
      });

      alert("Contest created ✔");
      window.location.href = "/admin/contests";
    } catch {
      alert("Error creating contest");
    }

    setSaving(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">➕ Add New Contest</h1>

      <input
        value={contestNumber}
        onChange={(e) => setContestNumber(e.target.value)}
        placeholder="Contest Number"
        className="w-full p-3 border border-border rounded bg-background"
      />

      <input
        value={contestName}
        onChange={(e) => setContestName(e.target.value)}
        placeholder="Contest Name"
        className="w-full p-3 border border-border rounded bg-background"
      />

      <input
        type="date"
        value={contestDate}
        onChange={(e) => setContestDate(e.target.value)}
        className="w-full p-3 border border-border rounded bg-background"
      />

      <SearchBar
        value={search}
        onChange={searchProblems}
        placeholder="Search problems to add..."
      />

      {problems.length > 0 && (
        <div className="border border-border rounded">
          {problems.map((p) => (
            <div
              key={p._id}
              onClick={() => toggleProblem(p._id)}
              className={`p-3 cursor-pointer hover:bg-card ${selectedProblems.includes(p._id)
                  ? "bg-primary text-white"
                  : "bg-background"
                }`}
            >
              {p.problemNumber}. {p.title}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={createContest}
        disabled={saving}
        className="w-full p-3 bg-primary text-white rounded hover:bg-primary/90"
      >
        {saving ? "Creating..." : "Create Contest"}
      </button>
    </div>
  );
}
