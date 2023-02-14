import axios, { type InternalAxiosRequestConfig } from "axios";
const API_URL = "http://localhost:5000/api"
export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // if (config.headers) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  // }
  return config;

})