import api from "./axios";
import type { Contest } from "@/types/contest";

export const getAdminContests = async () => {
  const res = await api.get("/api/admin/contests");
  return res.data as { success: boolean; contests: Contest[] };
};

export const addAdminContest = async (data: {
  contestNumber: number;
  contestName: string;
  contestDate: string;
  problems: string[];
}) => {
  const res = await api.post("/api/admin/contests/add", data);
  return res.data;
};

export const deleteAdminContest = async (id: string) => {
  await api.delete(`/api/admin/contests/${id}`);
};

export const getAdminContestById = async (id: string) => {
  const res = await api.get(`/api/admin/contests/${id}`);
  return res.data as { success: boolean; contest: Contest };
};

export const updateAdminContest = async (
  id: string,
  data: {
    contestNumber: number;
    contestName: string;
    contestDate: string;
    problems: string[];
  },
) => {
  const res = await api.put(`/api/admin/contests/${id}`, data);
  return res.data;
};
