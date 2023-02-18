import { api } from "./http"
import type { AxiosResponse } from "axios"
import type { ILoginInput, IRefreshResponse, IResponse, ISignUpInput, IUser } from "@/utils/types"
export default class Auth {

  static async registration(user: ISignUpInput): Promise<AxiosResponse<IResponse<string>>> {
    return await api.post("/auth/registration", user)
  }

  static async login(user: ILoginInput):
    Promise<AxiosResponse<IResponse<IRefreshResponse>>> {
    return api.post("/auth/login", user)
  }

  static async logout():
    Promise<AxiosResponse<IResponse<string>>> {
    return api.get("/auth/logout",)
  }
  
  static async getUserInfo():
    Promise<AxiosResponse<IResponse<IUser>>> {
      console.log('getting user data')
    return api.get("/user",)
  }
  

  // static async verify(user: ILoginInput):
  //   Promise<AxiosResponse<IAuthResponse>> {
  //   return api.post("/auth/login", user)
  // }
}
