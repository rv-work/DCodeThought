import type { PublicProblem } from "./problem";
import type { RequestType } from "./request";
import type { User } from "./auth"; // Master Type Import kiya
import type { HeatmapData } from "@/api/activity.api";
import type { CommunitySolutionData } from "./communitySolution";

// Ab UserProfile aur AdminUser dono Master User ke hi roop hain!
export type UserProfile = User;
export type AdminUser = User;

// Baaki sab strictly typed waisa hi rahega:
export interface RecentView {
  problemId: PublicProblem;
  viewedAt: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface MyReport {
  _id: string;
  title: string;
  resolved: boolean;
  problemId: {
    title: string;
    slug: string;
  };
  createdAt: string;
}

export interface MyRequest {
  _id: string;
  type: RequestType;
  title: string;
  votes: { userId: string }[];
  completed: boolean;
  createdAt: string;
}

export interface PopulatedProblemRef {
  _id: string;
  title: string;
  slug: string;
  difficulty: string;
  type: string;
}

export interface TopSolution extends Omit<CommunitySolutionData, "problemId"> {
  problemId: PopulatedProblemRef;
}

// 👇 NEW: Strict types for the new stats and activity data
export interface ProfileStats {
  totalActivities: number;
  totalPracticeSolved: number;
  totalPotdSolved: number;
  totalContestParticipated: number;
  totalFeedPosts: number;
  friendCount: number;
  joinedDaysAgo: number;
  profileCompletion: number;
  currentGeneralStreak: number;
  maxGeneralStreak: number;
  currentPotdStreak: number;
  maxPotdStreak: number;
  currentContestStreak: number;
  maxContestStreak: number;
  helpfulVotes: number;
  simplestVotes: number;
  creativeVotes: number;
  totalThinkerScore: number;
  badgeCount: number;
  challengeProgress: number;
  challengeGoal: number | null;
}

export interface ActivityLogEntry {
  _id: string;
  type: string;
  dateString: string;
  createdAt: string;
}

export interface PublicProfileResponse {
  success: boolean;
  user: UserProfile; // Jo ki actually Master User hai
  heatmap: HeatmapData[];
  stats: ProfileStats;
  topSolutions: TopSolution[];
  recentActivity: ActivityLogEntry[];
}

export interface CompareUser extends User {
  problemsSolved: number;
  friendsCount: number;
}

export interface CompareResponse {
  success: boolean;
  users: CompareUser[];
}
