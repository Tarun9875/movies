// frontend/src/services/axios.ts

import axios from "axios";

/**
 * ===============================
 *  BASE URL CONFIG
 * ===============================
 * Change this when deploying
 */
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

/**
 * ===============================
 *  AXIOS INSTANCE
 * ===============================
 */
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

/**
 * ===============================
 *  REQUEST INTERCEPTOR
 *  Attach JWT Token Automatically
 * ===============================
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ===============================
 *  RESPONSE INTERCEPTOR (Optional)
 *  Auto logout on 401
 * ===============================
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;