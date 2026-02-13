import type { PublicProblem } from "./problem";
import type { RequestType } from "./request";

export type UserProfile = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  dateOfJoining: string;
};

export type RecentView = {
  problemId: PublicProblem;
  viewedAt: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type MyReport = {
  _id: string;
  title: string;
  resolved: boolean;
  problemId: {
    title: string;
    slug: string;
  };
  createdAt: string;
};

export type MyRequest = {
  _id: string;
  type: RequestType;
  title: string;
  votes: { userId: string }[];
  completed: boolean;
  createdAt: string;
};
