import api from "./axios";
import type { Solution } from "@/types/solution";

export const getSolutionBySlug = async (slug: string) => {
  const res = await api.get(`/api/solutions/${slug}`);
  return res.data as {
    success: boolean;
    solution: Solution | null;
  };
};
