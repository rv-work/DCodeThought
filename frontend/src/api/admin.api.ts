import api from "./axios";
import type { AdminDashboardResponse } from "@/types/admin";

export const getAdminDashboard = async (): Promise<AdminDashboardResponse> => {
  const res = await api.get("/api/admin/dashboard");
  return res.data;
};
