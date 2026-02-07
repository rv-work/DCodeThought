// api/report.api.ts
import api from "./axios";
import type { ReportStatus } from "@/types/report";

export const reportProblem = async (
  slug: string,
  payload: {
    title: string;
    description: string;
    screenshot?: string;
  },
) => {
  const res = await api.post(`/api/reports/${slug}`, payload);
  return res.data as { success: boolean; report: ReportStatus };
};
