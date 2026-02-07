import api from "./axios";
import type { PublicContest, ContestDetail } from "@/types/contest";

export const getContests = async (params: { page: number }) => {
  const res = await api.get("/api/contests", { params });
  return res.data as {
    success: boolean;
    contests: PublicContest[];
    page: number;
    totalPages: number;
  };
};

export const getContestDetail = async (contestNumber: number) => {
  const res = await api.get(`/api/contests/${contestNumber}`);
  return res.data as {
    success: boolean;
    contest: ContestDetail;
  };
};
