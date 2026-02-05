export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

// PROBLEM
export interface IProblem {
  _id: string;
  problemNumber: number;
  title: string;
  slug: string;
  leetcodeLink: string;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";

  isPOTD: boolean;
  potdDate?: string | null;

  isContest: boolean;
  contestNumber?: number | null;
  contestName?: string | null;
  contestDate?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

// SOLUTION
export interface ISolutionCode {
  java?: string;
  cpp?: string;
  python?: string;
  js?: string;
}

export interface ISolution {
  _id: string;
  problemId: string;
  myThought: string;
  engThought: string;
  code: ISolutionCode;
  youtubeLink?: string;

  createdAt?: string;
  updatedAt?: string;
}

// COMMENT + REPLIES
export interface IReply {
  _id: string;
  userId: IUser;
  text: string;
  createdAt: string;
}

export interface IComment {
  _id: string;
  problemId: string;
  userId: IUser;
  text: string;

  likes: number;
  dislikes: number;

  replies: IReply[];

  createdAt: string;
  updatedAt: string;
}

export interface IContest {
  _id: string;
  contestNumber: number;
  contestName: string;
  contestDate: string;
  problems: string[];
}

// HOME PAGE
export interface IHomeData {
  todayPOTD: IProblem | null;
  recentPOTDs: IProblem[];
  latestContests: IContest[];
  trendingProblems: IProblem[];
}
