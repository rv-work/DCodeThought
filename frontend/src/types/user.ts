export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  dateOfJoining: string;

  // Optional fields (kyunki naye user ke paas ye turant nahi hote)
  username?: string;
  bio?: string;
  college?: string;
  friends?: string[]; // Array of User IDs
  badges?: string[];

  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    leetcode?: string;
  };

  leetcodeRating: number;

  streaks?: {
    currentGeneral: number;
    maxGeneral: number;
    currentPotd: number;
    maxPotd: number;
    currentContest: number;
    maxContest: number;
    lastActivityDate?: string | null;
    lastPotdDate?: string | null;
    lastContestDate?: string | null;
  };

  reputation?: {
    helpful: number;
    simplest: number;
    creative: number;
    totalThinkerScore: number;
  };

  challenge?: {
    title?: string | null;
    desc?: string | null;
    activeDays: number | null;
    startDate: string | null;
    progress: number;
  };
}

// ... Keep your existing LoginPayload, SignupPayload, GooglePayload, AuthResponse here
export interface AuthResponse {
  success: boolean;
  message?: string;
  user: User;
  token?: string;
}
