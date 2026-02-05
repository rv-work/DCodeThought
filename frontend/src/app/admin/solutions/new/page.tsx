"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import Loader from "@/components/Loader";

export default function AdminAddSolution() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [problems, setProblems] = useState<any[]>([]);
  const [problemId, setProblemId] = useState("");

  const [myThought, setMyThought] = useState("");
  const [engThought, setEngThought] = useState("");

  const [java, setJava] = useState("");
  const [cpp, setCpp] = useState("");
  const [python, setPython] = useState("");
  const [js, setJs] = useState("");

  const [youtubeLink, setYoutubeLink] = useState("");

  // Fetch basic problems list
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get(API.problems.basicList);
        setProblems(res.data.problems || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchProblems();
  }, []);

  const submit = async () => {
    if (!problemId || !myThought || !engThought) {
      setMessage("Please fill all required fields.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await api.post(API.solution.create, {
        problemId,
        myThought,
        engThought,
        code: {
          java,
          cpp,
          python,
          js,
        },
        youtubeLink,
      });

      setMessage("Solution added successfully ✔");
      resetForm();
    } catch (e: any) {
      setMessage(e.response?.data?.message || "Error adding solution.");
    }

    setSaving(false);
  };

  const resetForm = () => {
    setProblemId("");
    setMyThought("");
    setEngThought("");
    setJava("");
    setCpp("");
    setPython("");
    setJs("");
    setYoutubeLink("");
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">📝 Add Solution</h1>

      {message && (
        <p className="text-primary bg-card border border-border p-2 rounded">
          {message}
        </p>
      )}

      <div className="space-y-4">

        {/* SELECT PROBLEM */}
        <select
          value={problemId}
          onChange={(e) => setProblemId(e.target.value)}
          className="w-full p-3 border border-border bg-background rounded"
        >
          <option value="">Select Problem</option>
          {problems.map((p) => (
            <option key={p._id} value={p._id}>
              {p.problemNumber}. {p.title}
            </option>
          ))}
        </select>

        {/* THOUGHT HINDI */}
        <div>
          <label className="font-medium">My Thought (Hindi)</label>
          <textarea
            value={myThought}
            onChange={(e) => setMyThought(e.target.value)}
            rows={4}
            className="w-full p-3 border border-border bg-background rounded"
          />
        </div>

        {/* THOUGHT ENGLISH */}
        <div>
          <label className="font-medium">English Explanation</label>
          <textarea
            value={engThought}
            onChange={(e) => setEngThought(e.target.value)}
            rows={4}
            className="w-full p-3 border border-border bg-background rounded"
          />
        </div>

        {/* CODE INPUTS */}
        <h2 className="text-xl font-semibold mt-4">Code Solutions</h2>

        <textarea
          value={java}
          onChange={(e) => setJava(e.target.value)}
          placeholder="Java Code..."
          className="w-full p-3 border border-border bg-background rounded"
          rows={5}
        />

        <textarea
          value={cpp}
          onChange={(e) => setCpp(e.target.value)}
          placeholder="C++ Code..."
          className="w-full p-3 border border-border bg-background rounded"
          rows={5}
        />

        <textarea
          value={python}
          onChange={(e) => setPython(e.target.value)}
          placeholder="Python Code..."
          className="w-full p-3 border border-border bg-background rounded"
          rows={5}
        />

        <textarea
          value={js}
          onChange={(e) => setJs(e.target.value)}
          placeholder="JavaScript Code..."
          className="w-full p-3 border border-border bg-background rounded"
          rows={5}
        />

        {/* YOUTUBE LINK */}
        <input
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="YouTube Link"
          className="w-full p-3 border border-border bg-background rounded"
        />

        <button
          onClick={submit}
          disabled={saving}
          className="w-full p-3 rounded bg-primary text-white hover:bg-primary/90"
        >
          {saving ? "Saving..." : "Add Solution"}
        </button>
      </div>
    </div>
  );
}
