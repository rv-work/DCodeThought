"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addAdminProblem,
  updateAdminProblem,
} from "@/api/admin.problem.api";
import type { ProblemDetail } from "@/types/problem";

type Props = {
  initialData?: ProblemDetail;
  isEdit?: boolean;
};

export default function ProblemForm({ initialData, isEdit }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<ProblemDetail>(() => ({
    _id: initialData?._id ?? "",
    problemNumber: initialData?.problemNumber ?? 0,
    title: initialData?.title ?? "",
    difficulty: initialData?.difficulty ?? "Easy",
    type: initialData?.type ?? "potd",
    tags: initialData?.tags ?? [],
    leetcodeLink: initialData?.leetcodeLink ?? "",
  }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && form._id) {
      await updateAdminProblem(form._id, form);
    } else {
      await addAdminProblem(form);
    }

    router.push("/admin/problems");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card animate-scale-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isEdit ? "Edit Problem" : "Add New Problem"}
          </h1>
          <p className="text-muted">
            {isEdit ? "Update the problem details below" : "Fill in the details to create a new problem"}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Problem Number */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Problem Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.problemNumber}
              onChange={(e) =>
                setForm({ ...form, problemNumber: Number(e.target.value) })
              }
              className="input-field"
              placeholder="e.g., 1"
              required
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="input-field"
              placeholder="e.g., Two Sum"
              required
            />
          </div>

          {/* LeetCode Link */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              LeetCode Link <span className="text-red-500">*</span>
            </label>
            <input
              value={form.leetcodeLink}
              onChange={(e) =>
                setForm({ ...form, leetcodeLink: e.target.value })
              }
              className="input-field"
              placeholder="https://leetcode.com/problems/two-sum/"
              required
            />
          </div>

          {/* Difficulty & Type */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Difficulty <span className="text-red-500">*</span>
              </label>
              <select
                value={form.difficulty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    difficulty: e.target.value as "Easy" | "Medium" | "Hard",
                  })
                }
                className="select-field"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as "potd" | "contest" | "requested",
                  })
                }
                className="select-field"
                required
              >
                <option value="potd">POTD</option>
                <option value="contest">Contest</option>
                <option value="requested">Requested</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Tags
            </label>
            <input
              placeholder="Array, Hash Table, Two Pointers (comma separated)"
              className="input-field"
              value={form.tags.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  tags: e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                })
              }
            />
            <p className="text-xs text-muted">Separate multiple tags with commas</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 primary-btn cursor-pointer"
            >
              {isEdit ? "Update Problem" : "Create Problem"}
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