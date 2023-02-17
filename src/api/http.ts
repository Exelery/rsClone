import type { IRefreshResponse, IResponse } from "@/utils/types";
import axios, { type InternalAxiosRequestConfig } from "axios";
// export const API_URL = "http://localhost:5000/api" // https://rscloneserver-production.up.railway.app/api/
export const API_URL = "https://rscloneserver-production.up.railway.app/api/" // http://localhost:5000/api

export const api = axios.create({
  withCredentials: false,
  baseURL: API_URL
})
export const refreshAccessTokenFn = async () => {
  const response = await api.get<IResponse<IRefreshResponse>>('/auth/refresh');
  return response.data;
};


api.defaults.headers.common['Content-Type'] = 'application/json';
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.status as number;
    if (errMessage === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
)