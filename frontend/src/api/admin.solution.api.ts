import api from "./axios";
import type { Solution } from "@/types/solution";

export const getAdminSolutions = async () => {
  const res = await api.get("/api/admin/solutions");
  return res.data as { success: boolean; solutions: Solution[] };
};

export const saveAdminSolution = async (data: {
  problemId: string;
  myThought: string;
  engThought?: string;
  hints: string[];
  code?: Record<string, string>;
  youtubeLink?: string;
}) => {
  const res = await api.post("/api/admin/solutions/save", data);
  return res.data;
};

export const deleteAdminSolution = async (problemId: string) => {
  await api.delete(`/api/admin/solutions/${problemId}`);
};

export const getAdminSolutionByProblemId = async (problemId: string) => {
  const res = await api.get(`/api/admin/solutions/${problemId}`);
  return res.data as {
    success: boolean;
    solution: Solution & {
      code?: Record<string, string>;
    };
  };
};
