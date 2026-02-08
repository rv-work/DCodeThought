import api from "./axios";
import {
  SignupPayload,
  LoginPayload,
  GooglePayload,
  AuthResponse,
  LogoutResponse,
} from "@/types/auth";

export const signup = async (data: SignupPayload): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/signup", data);
  return res.data;
};

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const googleLogin = async (
  data: GooglePayload,
): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/google", data);
  return res.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export const getMe = async (): Promise<AuthResponse> => {
  const res = await api.get("/api/profile/me");
  return res.data;
};
