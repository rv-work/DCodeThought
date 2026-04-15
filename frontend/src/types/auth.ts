import { User as UserData } from "./user";

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type GooglePayload = {
  credential: string;
};

// -------- USER TYPE --------
export type User = UserData;

// -------- RESPONSE TYPES --------
export type AuthResponse = {
  success: boolean;
  user: UserData;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};
