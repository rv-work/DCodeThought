export interface TagCounts {
  helpful: number;
  simplest: number;
  creative: number;
  totalScore: number;
}

export interface TaggedBy {
  userId: string;
  tagType: "helpful" | "simplest" | "creative";
}

export interface CommunitySolutionAuthor {
  _id: string;
  name: string;
  college?: string;
  badges: string[];
  reputation: {
    helpful: number;
    simplest: number;
    creative: number;
    totalThinkerScore: number;
  };
}

// 👇 Naya Type for populated problem
export interface PopulatedProblemRef {
  _id: string;
  title: string;
  slug: string;
  difficulty: string;
  type: string;
}

export interface CommunitySolutionData {
  _id: string;
  // 👇 Yahan string ke saath PopulatedProblemRef allow kar diya
  problemId: string | PopulatedProblemRef;
  userId: CommunitySolutionAuthor;
  approach: string;
  explanation: string;
  code?: string;
  language?: string;
  tagCounts: TagCounts;
  taggedBy: TaggedBy[];
  createdAt: string;
}

// Payloads (Request Data)
export interface SubmitSolutionPayload {
  problemId: string;
  approach: string;
  explanation: string;
  code?: string;
  language?: string;
}

export interface TagSolutionPayload {
  tagType: "helpful" | "simplest" | "creative";
}

// Responses
export interface SubmitSolutionResponse {
  success: boolean;
  message: string;
  solution: CommunitySolutionData;
}

export interface GetSolutionsResponse {
  success: boolean;
  solutions: CommunitySolutionData[];
}

export interface TagSolutionResponse {
  success: boolean;
  message: string;
  tagCounts: TagCounts;
}
