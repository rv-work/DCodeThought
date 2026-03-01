import api from "./axios";
import type { PublicProblem } from "@/types/problem";

export type ProblemListResponse = {
  success: boolean;
  problems: PublicProblem[];
  total: number;
  page: number;
  totalPages: number;
};

export const getProblems = async (params: {
  page: number;
  search?: string;
  difficulty?: string;
  type?: string;
  sort?: string;
}) => {
  const res = await api.get("/api/problems", { params });
  return res.data as ProblemListResponse;
};

// api/problem.api.ts
import type { ProblemDetail } from "@/types/problem";

export const getProblemDetailBySlug = async (slug: string) => {
  const res = await api.get(`/api/problems/${slug}`);
  return res.data as { success: boolean; problem: ProblemDetail };
};
