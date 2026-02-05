"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";

export default function EditProblemPage({ params }: { params: { id: string } }) {
  const problemId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // FORM DATA
  const [problemNumber, setProblemNumber] = useState("");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [leetcodeLink, setLeetcodeLink] = useState("");

  const [isContest, setIsContest] = useState(false);
  const [contestNumber, setContestNumber] = useState("");
  const [contestName, setContestName] = useState("");
  const [contestDate, setContestDate] = useState("");

  const [isPOTD, setIsPOTD] = useState(false);
  const [potdDate, setPotdDate] = useState("");

  // Fetch problem
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(API.problems.oneById(problemId));
        const p = res.data.problem;

        setProblemNumber(p.problemNumber);
        setTitle(p.title);
        setDifficulty(p.difficulty);
        setTags(p.tags);
        setLeetcodeLink(p.leetcodeLink || "");

        setIsContest(p.isContest);
        setContestNumber(p.contestNumber || "");
        setContestName(p.contestName || "");
        setContestDate(p.contestDate ? p.contestDate.slice(0, 10) : "");

        setIsPOTD(p.isPOTD);
        setPotdDate(p.potdDate ? p.potdDate.slice(0, 10) : "");
      } catch {
        setMessage("Error loading problem.");
      }
      setLoading(false);
    };

    fetchData();
  }, [problemId]);

  // Toggle tags
  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // SAVE
  const save = async () => {
    setSaving(true);
    setMessage("");

    try {
      await api.put(API.problems.update(problemId), {
        problemNumber,
        title,
        difficulty,
        tags,
        leetcodeLink,
        isContest,
        contestNumber: isContest ? contestNumber : null,
        contestName: isContest ? contestName : null,
        contestDate: isContest ? contestDate : null,
        isPOTD,
        potdDate: isPOTD ? potdDate : null,
      });

      setMessage("Updated successfully ✔");
    } catch (e: any) {
      setMessage(e.response?.data?.message || "Error updating problem.");
    }

    setSaving(false);
  };

  if (loading) return <Loader />;
  if (!problemNumber) return <EmptyState message="Problem not found." />;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">📝 Edit Problem</h1>

      {message && (
        <p className="text-primary border border-border p-2 rounded bg-card">{message}</p>
      )}

      {/* FORM */}
      <div className="space-y-4">

        <input
          value={problemNumber}
          onChange={(e) => setProblemNumber(e.target.value)}
          placeholder="Problem Number"
          className="w-full p-3 rounded border border-border bg-background"
        />

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Problem Title"
          className="w-full p-3 rounded border border-border bg-background"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-3 rounded border border-border bg-background"
        >
          <option value="">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Tags */}
        <div>
          <p className="mb-2 font-medium">Tags</p>
          <div className="flex flex-wrap gap-2">
            {["Array", "DP", "String", "Tree", "Graph", "Binary Search", "Math"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-3 py-1 text-sm rounded border
                    ${tags.includes(tag)
                      ? "bg-primary text-white"
                      : "bg-card border-border"}
                  `}
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>

        <input
          value={leetcodeLink}
          onChange={(e) => setLeetcodeLink(e.target.value)}
          placeholder="LeetCode Link"
          className="w-full p-3 rounded border border-border bg-background"
        />

        {/* Contest Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isContest}
            onChange={() => setIsContest(!isContest)}
          />
          <label>Is Contest Problem?</label>
        </div>

        {isContest && (
          <div className="space-y-3 border p-4 rounded-lg border-border bg-card">
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
          </div>
        )}

        {/* POTD */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPOTD}
            onChange={() => setIsPOTD(!isPOTD)}
          />
          <label>Mark as POTD?</label>
        </div>

        {isPOTD && (
          <input
            type="date"
            value={potdDate}
            onChange={(e) => setPotdDate(e.target.value)}
            className="w-full p-3 rounded border border-border bg-background"
          />
        )}

        <button
          onClick={save}
          disabled={saving}
          className="w-full p-3 rounded bg-primary text-white hover:bg-primary/90"
        >
          {saving ? "Saving..." : "Update Problem"}
        </button>
      </div>
    </div>
  );
}
