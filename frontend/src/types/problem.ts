export type PublicProblem = {
  _id: string;
  problemNumber: number;
  title: string;
  slug: string; // ✅ IMPORTANT
  difficulty: "Easy" | "Medium" | "Hard";
  type: "potd" | "contest" | "requested";
  tags: string[];
};

export type ProblemFiltersType = {
  page: number;
  search?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  type?: "potd" | "contest" | "requested";
  sort?: "newest" | "oldest";
};

export type ProblemListResponse = {
  success: boolean;
  problems: PublicProblem[];
  total: number;
  page: number;
  totalPages: number;
};

export type ProblemDetail = {
  _id: string;
  problemNumber: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "potd" | "contest" | "requested";
  tags: string[];
  leetcodeLink: string;
};
