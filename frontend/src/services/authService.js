import api from "./api";

export const register = (payload) => api.post("/api/auth/register", payload);

export const login = (payload) => api.post("/api/auth/login", payload);

export const googleDemoLogin = (payload) => api.post("/api/auth/google-demo", payload);

export const googleStatus = () => api.get("/api/auth/google/status");

export const googleLoginUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  return `${baseUrl}/oauth2/authorization/google`;
};
