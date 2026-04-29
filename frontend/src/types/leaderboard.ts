export type LeaderboardTab =
  | "streak"
  | "thinker"
  | "college"
  | "rising"
  | "challenge"
  | "newly_joined"
  | "friends"
  | "leetcode";
export type TimeFilter = "all_time" | "this_month" | "this_week";
export type StreakType = "general" | "potd" | "contest";

export interface UserLeaderboardEntry {
  _id: string;
  name: string;
  username: string;
  college?: string;
  badges: string[];
  leetcodeRating?: number; // 👇 NEW FIELD
  socialLinks?: {
    leetcode?: string; // We might need this to show their handle
  };
  streaks?: {
    currentGeneral: number;
    maxGeneral: number;
    currentPotd?: number;
    maxPotd?: number;
    currentContest?: number;
    maxContest?: number;
  };

  reputation?: {
    helpful: number;
    simplest: number;
    creative: number;
    totalThinkerScore: number;
  };
  challenge?: {
    activeDays: number;
    progress: number;
    startDate: string;
  };
  // Dynamic fields from Aggregation
  periodScore?: number;
  recentSolvedCount?: number;
}

export interface CollegeLeaderboardEntry {
  collegeName: string;
  totalStreakScore: number;
  studentCount: number;
}

export type LeaderboardResponse = {
  success: boolean;
  hasMore: boolean;
  tab: LeaderboardTab;
  data: UserLeaderboardEntry[] | CollegeLeaderboardEntry[];
};

// Params Payload Type
export interface LeaderboardParams {
  tab: LeaderboardTab;
  page?: number;
  time?: TimeFilter;
  streakType?: StreakType;
  challengeDays?: number;
  collegeName?: string;
}
