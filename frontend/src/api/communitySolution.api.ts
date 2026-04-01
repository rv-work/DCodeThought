import api from "./axios";
import {
  SubmitSolutionPayload,
  TagSolutionPayload,
  SubmitSolutionResponse,
  GetSolutionsResponse,
  TagSolutionResponse,
} from "@/types/communitySolution";

// 1. Submit a new solution
export const submitCommunitySolution = async (
  data: SubmitSolutionPayload,
): Promise<SubmitSolutionResponse> => {
  const res = await api.post("/api/community-solutions", data);
  return res.data;
};

// 2. Get all community solutions for a specific problem
export const getProblemSolutions = async (
  problemId: string,
): Promise<GetSolutionsResponse> => {
  const res = await api.get(`/api/community-solutions/problem/${problemId}`);
  return res.data;
};

// 3. Tag a specific solution
export const tagCommunitySolution = async (
  solutionId: string,
  data: TagSolutionPayload,
): Promise<TagSolutionResponse> => {
  const res = await api.post(
    `/api/community-solutions/${solutionId}/tag`,
    data,
  );
  return res.data;
};
