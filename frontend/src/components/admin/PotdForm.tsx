"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PotdSelector from "./PotdSelector";
import {
  addAdminPotd,
  updateAdminPotd,
} from "@/api/admin.potd.api";
import type { PotdProblem } from "@/types/potd";

type Props = {
  initialData?: PotdProblem;
  isEdit?: boolean;
};

export default function PotdForm({ initialData, isEdit }: Props) {
  const router = useRouter();

  const [problemId, setProblemId] = useState(
    initialData?.problem._id ?? ""
  );

  const [date, setDate] = useState(() => {
    if (!initialData?.date) return "";
    return new Date(initialData.date)
      .toISOString()
      .slice(0, 16);
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && initialData?._id) {
      await updateAdminPotd(initialData._id, {
        problemId,
        potdDate: date,
      });
    } else {
      await addAdminPotd({
        problemId,
        potdDate: date,
      });
    }

    router.push("/admin/potd");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card animate-scale-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isEdit ? "Edit POTD" : "Publish New POTD"}
          </h1>
          <p className="text-muted">
            {isEdit ? "Update the POTD schedule" : "Schedule a new Problem of the Day"}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Problem Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Select Problem <span className="text-red-500">*</span>
            </label>
            <PotdSelector
              onSelect={setProblemId}
              initialValue={problemId}
            />
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              Schedule Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
              required
            />
            <p className="text-xs text-muted">
              Set when this problem should appear as POTD
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 primary-btn cursor-pointer"
            >
              {isEdit ? "Update POTD" : "Publish POTD"}
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