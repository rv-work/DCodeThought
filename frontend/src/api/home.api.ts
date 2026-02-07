import api from "./axios";
import type { HomeStats } from "@/types/home";

export const getHomeStats = async () => {
  const res = await api.get("/api/home/stats");
  return res.data as { success: boolean; stats: HomeStats };
};
