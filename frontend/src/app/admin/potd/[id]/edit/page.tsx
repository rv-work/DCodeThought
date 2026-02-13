"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAdminPotdById } from "@/api/admin.potd.api";
import PotdForm from "@/components/admin/PotdForm";
import AdminLoading from "@/components/admin/AdminLoading";
import type { PotdProblem } from "@/types/potd";

export default function EditPotdPage() {
  const { id: potdId } = useParams();
  const [potd, setPotd] = useState<PotdProblem | null>(null);

  useEffect(() => {
    if (potdId) {
      getAdminPotdById(potdId as string).then((res) =>
        setPotd(res.potd)
      );
    }
  }, [potdId]);

  if (!potd) return <AdminLoading text="Loading POTD..." />;

  return <PotdForm initialData={potd} isEdit />;
}
