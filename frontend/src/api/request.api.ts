import api from "./axios";
import type { PublicRequest, RequestType } from "@/types/request";

export const getRequests = async (type?: RequestType) => {
  const res = await api.get("/api/requests", {
    params: type ? { type } : {},
  });
  return res.data as { success: boolean; requests: PublicRequest[] };
};

export const addRequest = async (payload: {
  type: RequestType;
  title: string;
  description: string;
}) => {
  const res = await api.post("/api/requests", payload);
  return res.data;
};

export const toggleRequestVote = async (id: string) => {
  const res = await api.post(`/api/requests/vote/${id}`);
  return res.data as { success: boolean; votes: number };
};
