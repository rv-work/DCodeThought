import axios, { AxiosError } from "axios";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL: "http://localhost:5100",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    let message = "Something went wrong";

    // 1️⃣ Backend sent a clean message → exact show karo
    if (error.response?.data?.message) {
      message = error.response.data.message;
    }

    // 2️⃣ No response from server (network / CORS)
    else if (error.request && !error.response) {
      message = "Unable to reach the server. Check your network.";
    }

    // 3️⃣ Request was never made (rare axios error)
    else if (error.message) {
      message = error.message;
    }

    // ❗ ALWAYS reject clean Error(message)
    return Promise.reject(new Error(message));
  },
);

export default api;
