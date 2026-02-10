import api from "./axios";
import type { PotdProblem } from "@/types/potd";

export const getAdminPotds = async () => {
  const res = await api.get("/api/admin/potd");
  return res.data as { success: boolean; potds: PotdProblem[] };
};

export const addAdminPotd = async (data: {
  problemId: string;
  potdDate: string;
}) => {
  const payload = {
    ...data,
    potdDate: new Date(data.potdDate).toISOString(),
  };

  const res = await api.post("/api/admin/potd/add", payload);
  return res.data;
};

export const deleteAdminPotd = async (problemId: string) => {
  await api.delete(`/api/admin/potd/${problemId}`);
};
