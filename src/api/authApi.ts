import { api } from "./http"
import type { AxiosResponse } from "axios"
import type { IAuthResponse } from "@/utils/types"
export default class Auth {
  static async login(email: string, password: string):
    Promise<AxiosResponse<IAuthResponse>> {
    return api.post("/auth/login", {email, password})
  }
  
  static async registration(username: string, email: string, password: string):
    Promise<AxiosResponse<IAuthResponse>> {
    return api.post("/auth/registration", {username, email, password})
  }
  
  static async logout():
    Promise<void> {
    return api.post("/auth/logout",)
  }
}