"use client";

import { useEffect, useState } from "react";
import { getAdminPotds, deleteAdminPotd } from "@/api/admin.potd.api";
import type { PotdProblem } from "@/types/potd";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminPotdPage() {
  const [potds, setPotds] = useState<PotdProblem[]>([]);

  useEffect(() => {
    getAdminPotds().then((res) => setPotds(res.potds));
  }, []);

  return (
    <div>
      <AdminPageHeader title="POTD" />

      {potds.map((p) => (
        <div key={p._id} className="border p-2 flex justify-between">
          <div>
            #{p.problemNumber} {p.title} — {p.potdDate}
          </div>
          <button
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
