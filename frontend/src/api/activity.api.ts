import api from "./axios";

export interface HeatmapData {
  date: string; // "YYYY-MM-DD"
  count: number;
}

export interface ActivityResponse {
  success: boolean;
  heatmap: HeatmapData[];
}

export const getMyHeatmap = async (): Promise<ActivityResponse> => {
  const res = await api.get("/api/activity/me/heatmap");
  return res.data;
};

// Phase 3 me jab public profiles banayenge tab ye kaam aayega
export const getUserHeatmap = async (
  userId: string,
): Promise<ActivityResponse> => {
  const res = await api.get(`/api/activity/${userId}/heatmap`);
  return res.data;
};

// ... existing functions
export const verifyProblemSync = async (
  problemId: string,
): Promise<{ success: boolean; message: string }> => {
  const res = await api.post("/api/activity/verify-sync", { problemId });
  return res.data;
};
