// api.js
import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const authData = localStorage.getItem("authData");
  if (authData) {
    const token = JSON.parse(authData).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle expired token responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.err === "Token expired"
    ) {
      // Clear stored auth
      localStorage.removeItem("authData");

      // Show toast
      toast.error("Session expired. Please log in again.");

      // Redirect to login
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}login`;
    }
    return Promise.reject(error);
  }
);

export default api;
