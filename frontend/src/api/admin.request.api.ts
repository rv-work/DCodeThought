import api from "./axios";
import type { AdminRequest } from "@/types/request";

export const getAdminRequests = async () => {
  const res = await api.get("/api/admin/requests");
  return res.data as { success: boolean; requests: AdminRequest[] };
};

export const updateRequestStatus = async (id: string, completed: boolean) => {
  const res = await api.patch(`/api/admin/requests/${id}`, {
    completed,
  });
  return res.data;
};
