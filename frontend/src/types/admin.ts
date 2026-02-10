export type AdminDashboardResponse = {
  success: boolean;
  stats: {
    users: number;
    problems: number;
    solutions: number;
    contests: number;
  };
  recentReports: {
    _id: string;
    title: string;
    createdAt: string;
  }[];
  pendingRequests: {
    _id: string;
    title: string;
    votes: number;
  }[];
};
