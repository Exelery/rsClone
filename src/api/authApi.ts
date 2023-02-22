import { api } from "./http"
import type { AxiosResponse } from "axios"
import type { ILoginInput, IRefreshResponse, IResponse, ISignUpInput, IUpdateUser, IUser } from "@/utils/types"
export default class Auth {

  static async registration(user: ISignUpInput): Promise<AxiosResponse<IResponse<string>>> {
    const answer = await api.post("/auth/registration", user)
    return answer.data
  }

  static async login(user: ILoginInput):
    Promise<AxiosResponse<IResponse<IRefreshResponse>>> {
      const answer = await api.post("/auth/login", user)
    return answer.data
    
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
  
  static async updateUser(data: IUpdateUser): Promise<AxiosResponse<IResponse<IUser>>>
    { 
      console.log('updateUser')
    return api.put("/user", data )
  }
  

  // static async verify(user: ILoginInput):
  //   Promise<AxiosResponse<IAuthResponse>> {
  //   return api.post("/auth/login", user)
  // }
}
