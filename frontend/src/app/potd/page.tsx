"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { getTodayPotd } from "@/api/potd.api";
import type { PotdProblem } from "@/types/potd";
import PotdCard from "@/components/potd/PotdCard";
import PotdHistory from "@/components/potd/PotdHistory";

export default function PotdPage() {
  const [today, setToday] = useState<PotdProblem | null>(null);

  useEffect(() => {
    getTodayPotd().then((res) => setToday(res.potd));
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-bold mb-4">
          Problem of the Day
        </h1>

        {today ? (
          <PotdCard potd={today} />
        ) : (
          <p className="text-sm">No POTD for today</p>
        )}

        <PotdHistory />
      </div>
    </>
  );
}
