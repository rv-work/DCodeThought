"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAdminContestById } from "@/api/admin.contest.api";
import ContestForm from "@/components/admin/ContestForm";
import AdminLoading from "@/components/admin/AdminLoading";
import type { Contest } from "@/types/contest";

export default function EditContestPage() {
  const { id } = useParams();
  const [contest, setContest] = useState<Contest | null>(null);

  useEffect(() => {
    if (id) {
      getAdminContestById(id as string).then((res) =>
        setContest(res.contest)
      );
    }
  }, [id]);

  if (!contest)
    return <AdminLoading text="Loading contest..." />;

  return <ContestForm initialData={contest} isEdit />;
}
