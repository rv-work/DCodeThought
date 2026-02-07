import api from "./axios";
import type {
  UserProfile,
  MyReport,
  MyRequest,
  RecentView,
} from "@/types/profile";

export const getProfile = async () => {
  const res = await api.get("/api/profile/me");
  return res.data as { success: boolean; user: UserProfile };
};

export const getMyReports = async () => {
  const res = await api.get("/api/profile/me/reports");
  return res.data as { success: boolean; reports: MyReport[] };
};

export const getMyRequests = async () => {
  const res = await api.get("/api/profile/me/requests");
  return res.data as { success: boolean; requests: MyRequest[] };
};

export const getMyRecentProblems = async () => {
  const res = await api.get("/api/profile/me/recent");
  return res.data as { success: boolean; recent: RecentView[] };
};
