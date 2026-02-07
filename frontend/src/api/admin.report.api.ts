import api from "./axios";
import type { AdminReport } from "@/types/report";

export const getAdminReports = async () => {
  const res = await api.get("/api/admin/reports");
  return res.data as { success: boolean; reports: AdminReport[] };
};

export const updateReportStatus = async (id: string, resolved: boolean) => {
  const res = await api.patch(`/api/admin/reports/${id}`, { resolved });
  return res.data;
};
