"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";

export default function AdminPOTDPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [potd, setPotd] = useState<any>(null);
  const [problems, setProblems] = useState<any[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  // Load today's POTD
  useEffect(() => {
    const loadToday = async () => {
      try {
        const res = await api.get(API.potd.today);
        setPotd(res.data.potd || null);
      } catch {
        setPotd(null);
      }
      setLoading(false);
    };
    loadToday();
  }, []);

  const searchProblems = async (value: string) => {
    setSearch(value);

    if (value.length < 2) {
      setProblems([]);
      return;
    }

    try {
      const res = await api.get(`${API.problems.all}?search=${value}`);
      setProblems(res.data.problems || []);
    } catch {
      setProblems([]);
    }
  };

  const setPOTD = async () => {
    if (!selectedProblem || !date) {
      alert("Please select problem & date");
      return;
    }

    setSaving(true);

    try {
      await api.post(API.potd.set, {
        problemId: selectedProblem,
        date,
      });

      alert("POTD updated ✔");
      window.location.reload();
    } catch (e) {
      alert("Error updating POTD");
    }

    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">📅 Manage POTD</h1>

      {/* CURRENT POTD */}
      <div className="p-4 rounded border border-border bg-card">
        <h2 className="text-xl font-semibold mb-2">Today's POTD</h2>

        {potd ? (
          <div>
            <p className="font-medium">
              {potd.problem?.problemNumber}. {potd.problem?.title}
            </p>
            <p className="text-sm text-muted dark:text-muted-dark">
              Difficulty: {potd.problem?.difficulty}
            </p>
            <p className="text-sm text-muted dark:text-muted-dark">
              POTD Date: {new Date(potd.date).toDateString()}
            </p>
          </div>
        ) : (
          <EmptyState message="No POTD set for today." />
        )}
      </div>

      {/* SET POTD SECTION */}
      <div className="space-y-4 border border-border p-5 rounded-xl bg-card">
        <h2 className="text-xl font-semibold mb-3">Set POTD</h2>

        {/* DATE INPUT */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded border border-border bg-background"
        />

        {/* SEARCH PROBLEM */}
        <SearchBar
          value={search}
          onChange={searchProblems}
          placeholder="Search problem..."
        />

        {/* SEARCH RESULTS */}
        {problems.length > 0 && (
          <div className="border border-border rounded-lg bg-background divide-y mt-3">
            {problems.map((p) => (
              <div
                key={p._id}
                className={`p-3 cursor-pointer hover:bg-card ${selectedProblem === p._id ? "bg-primary text-white" : ""
                  }`}
                onClick={() => setSelectedProblem(p._id)}
              >
                {p.problemNumber}. {p.title} —{" "}
                <span className="text-sm">{p.difficulty}</span>
              </div>
            ))}
          </div>
        )}

        {/* SET BUTTON */}
        <button
          onClick={setPOTD}
          disabled={saving}
          className="w-full p-3 rounded bg-primary text-white hover:bg-primary/90"
        >
          {saving ? "Updating..." : "Set as POTD"}
        </button>
      </div>
    </div>
  );
}
