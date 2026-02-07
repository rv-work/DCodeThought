import api from "./axios";
import type { PotdProblem } from "@/types/potd";

export const getTodayPotd = async () => {
  const res = await api.get("/api/potd/today");
  return res.data as {
    success: boolean;
    potd: PotdProblem | null;
  };
};

export const getPotdHistory = async (params: {
  page: number;
  search?: string;
}) => {
  const res = await api.get("/api/potd/history", { params });
  return res.data as {
    success: boolean;
    potds: PotdProblem[];
    page: number;
    totalPages: number;
  };
};
