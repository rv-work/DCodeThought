import api from "./axios";
import type {
  UserProfile,
  MyReport,
  MyRequest,
  RecentView,
  PublicProfileResponse,
  CompareResponse,
} from "@/types/profile";

export const getProfile = async () => {
  const res = await api.get("/api/profile/me");
  return res.data as { success: boolean; user: UserProfile };
};

export const updateProfileData = async (data: Partial<UserProfile>) => {
  const res = await api.put("/api/profile/me", data);
  return res.data as { success: boolean; message: string; user: UserProfile };
};

export const getPublicProfileData = async (
  username: string,
): Promise<PublicProfileResponse> => {
  const res = await api.get(`/api/profile/u/${username}`);
  return res.data;
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

export const toggleFriendStatus = async (
  username: string,
): Promise<{ success: boolean; isFriend: boolean; message: string }> => {
  const res = await api.post(`/api/profile/friends/${username}`);
  return res.data;
};

export const getCompareData = async (
  usernames: string[],
): Promise<CompareResponse> => {
  const res = await api.get(
    `/api/profile/compare?users=${usernames.join(",")}`,
  );
  return res.data;
};

export const joinUserChallenge = async (days: number) => {
  const res = await api.post("/api/profile/me/challenge", { days });
  return res.data;
};
