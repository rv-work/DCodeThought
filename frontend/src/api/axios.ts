import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5100",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 RESPONSE ERROR INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message || "Something went wrong";

    // ❗ IMPORTANT: throw clean Error
    return Promise.reject(new Error(message));
  },
);

export default api;
