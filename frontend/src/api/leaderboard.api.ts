import api from "./axios";
import type {
  LeaderboardResponse,
  LeaderboardParams,
} from "@/types/leaderboard";

export const getLeaderboardData = async (
  params: LeaderboardParams,
): Promise<LeaderboardResponse> => {
  // Build query string dynamically
  const query = new URLSearchParams();
  query.append("tab", params.tab);
  if (params.page) query.append("page", params.page.toString());

  if (params.time) query.append("time", params.time);
  if (params.streakType) query.append("streakType", params.streakType);
  if (params.challengeDays)
    query.append("challengeDays", params.challengeDays.toString());
  if (params.collegeName) query.append("collegeName", params.collegeName);

  const res = await api.get(`/api/leaderboard?${query.toString()}`);
  return res.data;
};

export const getFriendsLeaderboardData =
  async (): Promise<LeaderboardResponse> => {
    const res = await api.get("/api/leaderboard/friends");
    return res.data;
  };

export interface SearchUserResult {
  _id: string;
  name: string;
  username: string;
  badges?: string[];
  isFriend: boolean;
}

export interface SearchUsersResponse {
  success: boolean;
  users: SearchUserResult[];
}

export const searchUsers = async (
  query: string,
): Promise<SearchUsersResponse> => {
  const res = await api.get(
    `/api/leaderboard/friends/search?q=${encodeURIComponent(query)}`,
  );
  return res.data;
};
