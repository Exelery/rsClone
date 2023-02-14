import { api } from "./http"
import type { AxiosResponse } from "axios"
import type { IAuthResponse } from "@/utils/types"
export default class Auth {
  static async login(email: string, password: string):
    Promise<AxiosResponse<IAuthResponse>> {
    return api.post("/data/login", {email, password})
  }
  
  static async registration(username: string, email: string, password: string):
    Promise<AxiosResponse<IAuthResponse>> {
    return api.post("/data/registration", {email, password})
  }
  
  static async logout():
    Promise<void> {
    return api.post("/data/logout",)
  }
}