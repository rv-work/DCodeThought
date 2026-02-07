// -------- REQUEST TYPES --------
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
export type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

// -------- RESPONSE TYPES --------
export type AuthResponse = {
  success: boolean;
  user: User;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};
