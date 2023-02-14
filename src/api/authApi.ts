import { api } from "./http"
import type { AxiosResponse } from "axios"
import type { IAuthResponse, ILoginInput, IResponse, ISignUpInput } from "@/utils/types"
export default class Auth {
   
  static async registration(user: ISignUpInput) {
    const response = await api.post<IResponse<IAuthResponse>>("/auth/registration", user)
    return response.data
  }
  
  static async login(user: ILoginInput):
    Promise<AxiosResponse<IAuthResponse>> {
    return api.post("/auth/login", user)
  }
  
  static async logout() {
    return api.get("/auth/logout",)
  }
  
  // static async verify(user: ILoginInput):
  //   Promise<AxiosResponse<IAuthResponse>> {
  //   return api.post("/auth/login", user)
  // }
}