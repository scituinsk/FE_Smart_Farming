import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "@/features/login/utils/token-helper";

export const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const isDevelopment = import.meta.env.MODE === "development";

// Handler opsional saat refresh gagal
let onRefreshFail: (() => void) | null = null;

export const setRefreshFailHandler = (callback: () => void) => {
  onRefreshFail = callback;
};

// ---------------------------------------------------------
// AXIOS INSTANCE
// ---------------------------------------------------------
export const api = axios.create({
  baseURL,
  withCredentials: false,
});

// ---------------------------------------------------------
// REQUEST INTERCEPTOR → injection Bearer token
// ---------------------------------------------------------
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---------------------------------------------------------
// RESPONSE INTERCEPTOR → refresh token jika 401
// ---------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Jika bukan 401 → biarkan
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Jika ini request refresh token itu sendiri → jangan retry
    if (originalRequest.url?.includes("/token/refresh")) {
      if (isDevelopment) console.error("Refresh token error. Tidak bisa refresh.");
      if (onRefreshFail) onRefreshFail();
      return Promise.reject(error);
    }

    // Hindari infinite loop
    if (originalRequest._retry) {
      if (isDevelopment) console.error("Retry setelah refresh gagal.");
      if (onRefreshFail) onRefreshFail();
      return Promise.reject(error);
    }

    // -----------------------------------------------------
    // Proses refresh token
    // -----------------------------------------------------
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      if (isDevelopment) console.warn("Tidak ada refresh token.");
      if (onRefreshFail) onRefreshFail();
      return Promise.reject(error);
    }

    try {
      originalRequest._retry = true;

      // Panggil endpoint refresh
      const res = (await axios.post(`${baseURL}/token/refresh`, { refresh: refreshToken }, { withCredentials: false })).data;

      const newAccessToken = (res as any).access;
      const newRefreshToken = (res as any).refresh;

      if (!newAccessToken) {
        throw new Error("server tidak mengirim accessToken baru");
      }

      // Simpan token baru
      setAccessToken(newAccessToken);
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }

      if (isDevelopment) console.log("Token berhasil direfresh, retry request.");

      // Update header Authorization untuk retry
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Retry request
      return api(originalRequest);
    } catch (refreshError) {
      if (isDevelopment) console.error("Refresh gagal:", refreshError);
      if (onRefreshFail) onRefreshFail();
      return Promise.reject(refreshError);
    }
  }
);
