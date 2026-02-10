import api from "./axios";
import type { PublicProblem } from "@/types/problem";

export const getAdminProblems = async () => {
  const res = await api.get("/api/admin/problems");
  return res.data as { success: boolean; problems: PublicProblem[] };
};

export const addAdminProblem = async (data: unknown) => {
  const res = await api.post("/api/admin/problems/add", data);
  return res.data;
};

export const deleteAdminProblem = async (id: string) => {
  await api.delete(`/api/admin/problems/${id}`);
};
