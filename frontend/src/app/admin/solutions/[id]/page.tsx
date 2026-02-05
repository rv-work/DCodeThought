"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { API } from "@/lib/api";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";

export default function AdminEditSolution({ params }: { params: { id: string } }) {
  const solutionId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [solution, setSolution] = useState<any>(null);

  // Form states
  const [myThought, setMyThought] = useState("");
  const [engThought, setEngThought] = useState("");

  const [java, setJava] = useState("");
  const [cpp, setCpp] = useState("");
  const [python, setPython] = useState("");
  const [js, setJs] = useState("");

  const [youtubeLink, setYoutubeLink] = useState("");

  // Fetch existing solution
  useEffect(() => {
    const loadSolution = async () => {
      try {
        const res = await api.get(API.solution.one(solutionId));
        const s = res.data.solution;
        setSolution(s);

        setMyThought(s.myThought || "");
        setEngThought(s.engThought || "");

        setJava(s.code?.java || "");
        setCpp(s.code?.cpp || "");
        setPython(s.code?.python || "");
        setJs(s.code?.js || "");

        setYoutubeLink(s.youtubeLink || "");
      } catch (err) {
        console.error(err);
        setMessage("Failed to load solution.");
      }
      setLoading(false);
    };

    loadSolution();
  }, [solutionId]);

  const saveChanges = async () => {
    setSaving(true);
    setMessage("");

    try {
      await api.put(API.solution.update(solutionId), {
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

      setMessage("Solution updated successfully ✔");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error updating solution");
    }

    setSaving(false);
  };

  if (loading) return <Loader />;
  if (!solution) return <EmptyState message="Solution not found." />;

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">
        ✏ Edit Solution — {solution.problem?.problemNumber}.{" "}
        {solution.problem?.title}
      </h1>

      {message && (
        <p className="text-primary p-2 rounded border border-border bg-card">
          {message}
        </p>
      )}

      <div className="space-y-4">

        {/* Thought Hindi */}
        <div>
          <label className="font-medium">My Thought (Hindi)</label>
          <textarea
            value={myThought}
            onChange={(e) => setMyThought(e.target.value)}
            rows={4}
            className="w-full p-3 border border-border bg-background rounded"
          />
        </div>

        {/* Thought English */}
        <div>
          <label className="font-medium">English Explanation</label>
          <textarea
            value={engThought}
            onChange={(e) => setEngThought(e.target.value)}
            rows={4}
            className="w-full p-3 border border-border bg-background rounded"
          />
        </div>

        {/* Code editors */}
        <h2 className="text-xl font-semibold mt-4">Code Solutions</h2>

        <textarea
          value={java}
          onChange={(e) => setJava(e.target.value)}
          placeholder="Java code..."
          rows={5}
          className="w-full p-3 border border-border bg-background rounded"
        />
        <textarea
          value={cpp}
          onChange={(e) => setCpp(e.target.value)}
          placeholder="C++ code..."
          rows={5}
          className="w-full p-3 border border-border bg-background rounded"
        />
        <textarea
          value={python}
          onChange={(e) => setPython(e.target.value)}
          placeholder="Python code..."
          rows={5}
          className="w-full p-3 border border-border bg-background rounded"
        />
        <textarea
          value={js}
          onChange={(e) => setJs(e.target.value)}
          placeholder="JavaScript code..."
          rows={5}
          className="w-full p-3 border border-border bg-background rounded"
        />

        {/* YouTube link */}
        <input
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="YouTube Link"
          className="w-full p-3 border border-border bg-background rounded"
        />

        <button
          onClick={saveChanges}
          disabled={saving}
          className="w-full p-3 rounded bg-primary text-white hover:bg-primary/90"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
