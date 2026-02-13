"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContestProblemSelector from "./ContestProblemSelector";
import {
  addAdminContest,
  updateAdminContest,
} from "@/api/admin.contest.api";
import type { Contest } from "@/types/contest";

type Props = {
  initialData?: Contest;
  isEdit?: boolean;
};

export default function ContestForm({
  initialData,
  isEdit,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    contestNumber: initialData?.contestNumber ?? 0,
    contestName: initialData?.contestName ?? "",
    contestDate: initialData?.contestDate
      ? new Date(initialData.contestDate)
        .toISOString()
        .slice(0, 16)
      : "",
    problems:
      initialData?.problems.map((p) => p._id) ??
      ["", "", "", ""],
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      contestDate: new Date(form.contestDate).toISOString(),
    };

    if (isEdit && initialData?._id) {
      await updateAdminContest(initialData._id, payload);
    } else {
      await addAdminContest(payload);
    }

    router.push("/admin/contests");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card animate-scale-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isEdit ? "Edit Contest" : "Create New Contest"}
          </h1>
          <p className="text-muted">
            {isEdit ? "Update the contest details below" : "Fill in the details to create a new contest"}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Contest Number */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Contest Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.contestNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  contestNumber: Number(e.target.value),
                })
              }
              className="input-field"
              placeholder="e.g., 420"
              required
            />
          </div>

          {/* Contest Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Contest Name <span className="text-red-500">*</span>
            </label>
            <input
              value={form.contestName}
              onChange={(e) =>
                setForm({
                  ...form,
                  contestName: e.target.value,
                })
              }
              className="input-field"
              placeholder="e.g., Weekly Contest 420"
              required
            />
          </div>

          {/* Contest Date */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Contest Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={form.contestDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  contestDate: e.target.value,
                })
              }
              className="input-field"
              required
            />
          </div>

          {/* Problem Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Select 4 Problems <span className="text-red-500">*</span>
            </label>
            <ContestProblemSelector
              value={form.problems}
              onChange={(ids) =>
                setForm({ ...form, problems: ids })
              }
              mode={isEdit ? "edit" : "add"}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 primary-btn cursor-pointer"
            >
              {isEdit ? "Update Contest" : "Create Contest"}
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