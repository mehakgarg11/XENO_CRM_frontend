import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "/").replace(/\/+$/, ""),
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.request.use((cfg) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
