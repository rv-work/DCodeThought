import api from "./axios";
import type { User } from "@/types/user";

export const getAdminUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data as { success: boolean; users: User[] };
};
