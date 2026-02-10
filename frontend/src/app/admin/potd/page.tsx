"use client";

import { useEffect, useState } from "react";
import { getAdminPotds, deleteAdminPotd } from "@/api/admin.potd.api";
import type { PotdProblem } from "@/types/potd";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import Link from "next/link";

export default function AdminPotdPage() {
  const [potds, setPotds] = useState<PotdProblem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminPotds().then((res) => {
      setPotds(res.potds);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="POTD"
        action={
          <Link href="/admin/potd/add" className="border px-3 py-1 rounded">
            + Add POTD
          </Link>
        }
      />

      {loading && <AdminLoading text="Loading POTDs..." />}

      {!loading && potds.length === 0 && (
        <AdminEmptyState
          title="No POTDs published"
          description="Publish your first Problem of the Day."
          action={
            <Link href="/admin/potd/add" className="border px-3 py-1 rounded">
              + Add POTD
            </Link>
          }
        />
      )}

      {!loading &&
        potds.map((p) => (
          <div
            key={p._id}
            className="border p-3 flex justify-between items-center rounded"
          >
            <div>
              <div className="font-medium">
                #{p.problem.problemNumber} {p.problem.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(p.date).toLocaleString()}
              </div>
            </div>

            <button
              className="text-red-500 text-sm"
              onClick={async () => {
                await deleteAdminPotd(p._id);
                setPotds((x) => x.filter((y) => y._id !== p._id));
              }}
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
}
