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

// Add this below your existing `getMyLeetcodeStats`
export const getPublicLeetcodeStats = async (username: string) => {
  const res = await api.get(`/api/profile/u/${username}/leetcode-stats`);
  return res.data as { success: boolean; stats: LeetCodeData };
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

// Update the function signature
export const joinUserChallenge = async (
  days: number,
  title?: string,
  desc?: string,
) => {
  const res = await api.post("/api/profile/me/challenge", {
    days,
    title,
    desc,
  });
  return res.data;
};

// Add these functions
export const linkLeetcodeAccount = async (leetcodeHandle: string) => {
  const res = await api.post("/api/profile/me/leetcode", { leetcodeHandle });
  return res.data as { success: boolean; message: string; user: UserProfile };
};

export interface LCStat {
  difficulty: string;
  count: number;
}

export interface LCContest {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  topPercentage: number;
}

export interface LCSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
}

export interface LCHistory {
  name: string;
  rating: number;
  date: string;
}

// Main Data Interface
export interface LeetCodeData {
  solved: LCStat[];
  contest: LCContest | null;
  recentSubmissions: LCSubmission[];
  contestHistory: LCHistory[];
}

// Function update (agar zaroorat ho)
export const getMyLeetcodeStats = async () => {
  const res = await api.get("/api/profile/me/leetcode-stats");
  return res.data as { success: boolean; stats: LeetCodeData }; // Pehle yahan LCStat[] tha, ab LeetCodeData kar diya
};
