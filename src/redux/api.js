// api.js
import axios from "axios";
import { toast } from "react-hot-toast";
import { history } from "../navigation";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  timeout: 10000,
  withCredentials: true, // always send cookies
});

const BASE_URL = "/teeluxe-wears-fe/";

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
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const authData = localStorage.getItem("authData");
      if (!authData) {
        // user is logged out → don’t try refresh
        return Promise.reject(error);
      };

      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/users/refresh");
        const newAccessToken = refreshResponse.data.accessToken;

        const authData = JSON.parse(localStorage.getItem("authData")) || {};
        authData.token = newAccessToken;
        localStorage.setItem("authData", JSON.stringify(authData));

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {

        console.error(refreshError)
        localStorage.removeItem("authData");
        delete api.defaults.headers.Authorization;

        if (!error._toastShown) {
          toast.error("Session expired. Please log in again.");
          error._toastShown = true;
        }
        history.push(`${BASE_URL}login`); // basename will prepend /teeluxe-wears-fe
        return Promise.reject(refreshError);
      }
    }


    return Promise.reject(error);
  }
);


export default api;
