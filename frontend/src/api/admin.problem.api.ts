import api from "./axios";
import type { ProblemDetail, PublicProblem } from "@/types/problem";

export const getAdminProblems = async () => {
  const res = await api.get("/api/admin/problems");
  return res.data as { success: boolean; problems: PublicProblem[] };
};

export const getAdminProblemById = async (id: string) => {
  const res = await api.get(`/api/admin/problems/${id}`);
  return res.data as { success: boolean; problem: ProblemDetail };
};

export const addAdminProblem = async (data: ProblemDetail) => {
  const res = await api.post("/api/admin/problems/add", data);
  return res.data;
};

export const updateAdminProblem = async (id: string, data: ProblemDetail) => {
  const res = await api.put(`/api/admin/problems/${id}`, data);
  return res.data;
};

export const deleteAdminProblem = async (id: string) => {
  await api.delete(`/api/admin/problems/${id}`);
};
