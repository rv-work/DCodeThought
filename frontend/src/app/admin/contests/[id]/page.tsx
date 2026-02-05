"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import Loader from "@/components/Loader";

export default function EditContestPage({ params }: { params: { id: string } }) {
  const contestId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [contest, setContest] = useState<any>(null);

  const [contestNumber, setContestNumber] = useState("");
  const [contestName, setContestName] = useState("");
  const [contestDate, setContestDate] = useState("");

  const [search, setSearch] = useState("");
  const [problems, setProblems] = useState<any[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(API.contest.one(contestId));
        const c = res.data.contest;

        setContest(c);
        setContestNumber(c.contestNumber);
        setContestName(c.contestName);
        setContestDate(c.contestDate.slice(0, 10));
        setSelectedProblems(c.problems.map((p: any) => p._id));
      } catch {
        alert("Unable to load contest");
      }

      setLoading(false);
    };

    load();
  }, [contestId]);

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

  const save = async () => {
    setSaving(true);
    try {
      await api.put(API.contest.update(contestId), {
        contestNumber,
        contestName,
        contestDate,
        problems: selectedProblems,
      });

      alert("Contest updated ✔");
      window.location.reload();
    } catch {
      alert("Error updating contest");
    }
    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">✏ Edit Contest</h1>

      <input
        value={contestNumber}
        onChange={(e) => setContestNumber(e.target.value)}
        placeholder="Contest Number"
        className="w-full p-3 rounded border border-border bg-background"
      />

      <input
        value={contestName}
        onChange={(e) => setContestName(e.target.value)}
        placeholder="Contest Name"
        className="w-full p-3 rounded border border-border bg-background"
      />

      <input
        type="date"
        value={contestDate}
        onChange={(e) => setContestDate(e.target.value)}
        className="w-full p-3 rounded border border-border bg-background"
      />

      <SearchBar
        value={search}
        onChange={searchProblems}
        placeholder="Search problems to add/remove"
      />

      {problems.length > 0 && (
        <div className="border border-border rounded mt-3">
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
        onClick={save}
        disabled={saving}
        className="w-full p-3 bg-primary text-white rounded hover:bg-primary/90"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
