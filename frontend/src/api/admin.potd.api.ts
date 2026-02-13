import api from "./axios";
import type { PotdProblem } from "@/types/potd";

export const getAdminPotds = async () => {
  const res = await api.get("/api/admin/potd");
  return res.data as { success: boolean; potds: PotdProblem[] };
};

export const getAdminPotdById = async (id: string) => {
  const res = await api.get(`/api/admin/potd/${id}`);
  console.log("res : ", res.data);
  return res.data as { success: boolean; potd: PotdProblem };
};

export const updateAdminPotd = async (
  id: string,
  data: { problemId: string; potdDate: string },
) => {
  const payload = {
    ...data,
    potdDate: new Date(data.potdDate).toISOString(),
  };

  const res = await api.put(`/api/admin/potd/${id}`, payload);
  return res.data;
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
