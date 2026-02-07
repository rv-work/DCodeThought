"use client";

import { useEffect, useState } from "react";
import { getPotdHistory } from "@/api/potd.api";
import type { PotdProblem } from "@/types/potd";
import PotdCard from "./PotdCard";
import Pagination from "@/components/problems/Pagination";

export default function PotdHistory() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<{
    potds: PotdProblem[];
    totalPages: number;
  } | null>(null);

  useEffect(() => {
    getPotdHistory({ page }).then((res) =>
      setData({
        potds: res.potds,
        totalPages: res.totalPages,
      })
    );
  }, [page]);

  if (!data) return null;

  return (
    <div className="mt-8">
      <h2 className="font-semibold mb-3">Older POTDs</h2>

      <div className="grid gap-3">
        {data.potds.map((p) => (
          <PotdCard key={p.slug} potd={p} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={data.totalPages}
        onChange={setPage}
      />
    </div>
  );
}
