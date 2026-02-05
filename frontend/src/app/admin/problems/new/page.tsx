"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import { generateSlug } from "@/lib/generateSlug"; // if you created it
import Loader from "@/components/Loader";

export default function AdminAddProblem() {
  const [loading, setLoading] = useState(false);

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

  const [message, setMessage] = useState("");

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const submit = async () => {
    if (!problemNumber || !title || !difficulty) {
      setMessage("Please fill required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const slug = generateSlug(title);

      await api.post(API.problems.create, {
        problemNumber,
        title,
        slug,
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

      setMessage("Problem added successfully ✔");
      resetForm();

    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Error adding problem.");
    }

    setLoading(false);
  };

  const resetForm = () => {
    setProblemNumber("");
    setTitle("");
    setDifficulty("");
    setTags([]);
    setLeetcodeLink("");
    setIsContest(false);
    setContestNumber("");
    setContestName("");
    setContestDate("");
    setIsPOTD(false);
    setPotdDate("");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">➕ Add New Problem</h1>

      {/* Success/Error Message */}
      {message && (
        <p className="text-sm text-primary bg-card p-2 rounded border border-border">
          {message}
        </p>
      )}

      {/* FORM */}
      <div className="space-y-4">

        {/* Problem Number */}
        <input
          value={problemNumber}
          onChange={(e) => setProblemNumber(e.target.value)}
          placeholder="Problem Number"
          className="w-full p-3 rounded border border-border bg-background"
        />

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Problem Title"
          className="w-full p-3 rounded border border-border bg-background"
        />

        {/* Difficulty */}
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

        {/* Tags Multi-select */}
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

        {/* LeetCode Link */}
        <input
          value={leetcodeLink}
          onChange={(e) => setLeetcodeLink(e.target.value)}
          placeholder="LeetCode Problem Link"
          className="w-full p-3 rounded border border-border bg-background"
        />

        {/* Contest Toggle */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={isContest}
            onChange={() => setIsContest(!isContest)}
          />
          <label>Is Contest Problem?</label>
        </div>

        {/* Contest Fields */}
        {isContest && (
          <div className="space-y-3 border border-border p-4 rounded-lg bg-card">
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

        {/* POTD Toggle */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={isPOTD}
            onChange={() => setIsPOTD(!isPOTD)}
          />
          <label>Mark as POTD?</label>
        </div>

        {/* POTD Date */}
        {isPOTD && (
          <input
            type="date"
            value={potdDate}
            onChange={(e) => setPotdDate(e.target.value)}
            className="w-full p-3 rounded border border-border bg-background"
          />
        )}

        {/* Submit Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="
            w-full p-3 bg-primary text-white rounded 
            hover:bg-primary/90 transition
          "
        >
          {loading ? "Saving..." : "Add Problem"}
        </button>
      </div>

      {loading && <Loader />}
    </div>
  );
}
