import type { IResponse } from "@/utils/types";
import axios, { type InternalAxiosRequestConfig } from "axios";
// export const API_URL = "http://localhost:5000/api" // https://rscloneserver-production.up.railway.app/api/
export const API_URL = "https://rscloneserver-production.up.railway.app/api/" // http://localhost:5000/api

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})
export const refreshAccessTokenFn = async () => {
  const response = await api.post<IResponse<string>>('/auth/refresh');
  console.log('refresh', response)
  localStorage.setItem('token', response.data.value)
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
    console.log(error)
    const originalRequest = error.config;
    if (error.response) {
      const errMessage = error.response.data.status as number;
      if (errMessage === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshAccessTokenFn();
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
)