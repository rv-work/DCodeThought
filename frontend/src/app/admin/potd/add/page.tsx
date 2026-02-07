"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PotdSelector from "@/components/admin/PotdSelector";
import { addAdminPotd } from "@/api/admin.potd.api";

export default function AddPotdPage() {
  const router = useRouter();
  const [problemId, setProblemId] = useState("");
  const [date, setDate] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdminPotd({ problemId, potdDate: date });
    router.push("/admin/potd");
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <PotdSelector onSelect={setProblemId} />

      <input
        type="datetime-local"
        onChange={(e) => setDate(e.target.value)}
      />

      <button className="border px-4 py-2">Publish POTD</button>
    </form>
  );
}
