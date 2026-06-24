import api from "./api";

export const getProfile = () => api.get("/api/profile");

export const createProfile = (payload) => api.post("/api/profile", payload);

export const updateProfile = (payload) => api.put("/api/profile", payload);

export const uploadProfilePhoto = (file) => {
  const formData = new FormData();
  formData.append("photo", file);
  return api.post("/api/profile/photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
