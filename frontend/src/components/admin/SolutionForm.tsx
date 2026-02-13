"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axios";
import {
  saveAdminSolution,
  getAdminSolutionByProblemId,
} from "@/api/admin.solution.api";
import CodeEditorGroup from "./CodeEditorGroup";

type ProblemOption = {
  _id: string;
  problemNumber: number;
  title: string;
};

type Props = {
  problemIdFromUrl?: string;
};

export default function SolutionForm({
  problemIdFromUrl,
}: Props) {
  const router = useRouter();
  const isEdit = !!problemIdFromUrl;

  const [problems, setProblems] = useState<ProblemOption[]>([]);
  const [loading, setLoading] = useState(isEdit);

  const [form, setForm] = useState(() => ({
    problemId: problemIdFromUrl ?? "",
    myThought: "",
    engThought: "",
    hints: [] as string[],
    code: {} as Record<string, string>,
    youtubeLink: "",
  }));

  // ADD mode → load available problems
  useEffect(() => {
    if (!problemIdFromUrl) {
      api
        .get("/api/admin/solutions/available-problems")
        .then((res) => {
          setProblems(res.data.problems);
        });
    }
  }, [problemIdFromUrl]);

  // EDIT mode → fetch existing solution
  useEffect(() => {
    if (!problemIdFromUrl) return;

    let mounted = true;

    (async () => {
      try {
        const res =
          await getAdminSolutionByProblemId(
            problemIdFromUrl
          );

        if (!mounted) return;

        const s = res.solution;

        setForm({
          problemId: s.problemId._id,
          myThought: s.myThought,
          engThought: s.engThought || "",
          hints: s.hints || [],
          code: s.code || {},
          youtubeLink: s.youtubeLink || "",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [problemIdFromUrl]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAdminSolution(form);
    router.push("/admin/solutions");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center py-12">
          <div className="text-muted">Loading solution...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card animate-scale-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isEdit ? "Edit Solution" : "Add New Solution"}
          </h1>
          <p className="text-muted">
            {isEdit ? "Update the solution details below" : "Create a comprehensive solution with hints and code"}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Problem select only in ADD mode */}
          {!problemIdFromUrl && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Select Problem <span className="text-red-500">*</span>
              </label>
              <select
                value={form.problemId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    problemId: e.target.value,
                  })
                }
                className="select-field cursor-pointer"
                required
              >
                <option value="">Select Problem</option>
                {problems.map((p) => (
                  <option key={p._id} value={p._id}>
                    #{p.problemNumber} — {p.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Hindi Thought */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              My Thought (Hindi) <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="समस्या को हिंदी में समझाएं..."
              className="input-field"
              rows={6}
              value={form.myThought}
              onChange={(e) =>
                setForm({
                  ...form,
                  myThought: e.target.value,
                })
              }
              required
            />
          </div>

          {/* English Thought */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              English Thought
            </label>
            <textarea
              placeholder="Explain the problem in English..."
              className="input-field"
              rows={6}
              value={form.engThought}
              onChange={(e) =>
                setForm({
                  ...form,
                  engThought: e.target.value,
                })
              }
            />
          </div>

          {/* Hints */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Hints (one per line)
            </label>
            <textarea
              placeholder="Hint 1: Think about using a hashmap&#10;Hint 2: Consider the time complexity&#10;Hint 3: Can you optimize the space?"
              className="input-field"
              rows={4}
              value={form.hints.join("\n")}
              onChange={(e) =>
                setForm({
                  ...form,
                  hints: e.target.value
                    .split("\n")
                    .filter(Boolean),
                })
              }
            />
            <p className="text-xs text-muted">Each line will be a separate hint</p>
          </div>

          {/* Code Editor */}
          <CodeEditorGroup
            code={form.code}
            onChange={(code) =>
              setForm({ ...form, code })
            }
          />

          {/* YouTube Link */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              YouTube Video Link (Optional)
            </label>
            <input
              placeholder="https://www.youtube.com/watch?v=..."
              className="input-field"
              value={form.youtubeLink}
              onChange={(e) =>
                setForm({
                  ...form,
                  youtubeLink: e.target.value,
                })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 primary-btn cursor-pointer"
            >
              {isEdit ? "Update Solution" : "Save Solution"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 rounded-xl border-2 border-border-subtle hover:border-accent transition-all duration-300 font-medium cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}