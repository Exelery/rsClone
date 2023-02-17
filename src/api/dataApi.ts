import { api } from "./http"
import type { AxiosResponse } from "axios"
import type { IProject, IResponse, IResponseUserProject, IResponseIdProject } from "@/utils/types"
export default class Auth {
  static async addProject(project: IProject):
    Promise<AxiosResponse<IResponse<IResponseIdProject>>> {
    return api.post("/data/add", project)
  }
  
  static async updateProject(project: IProject):
    Promise<AxiosResponse<IResponse<string>>> {
    return api.post("/data/update", project)
  }
  
  static async getUserProjects(userId: number):
    Promise<AxiosResponse<IResponse<IResponseUserProject[]>>> {
    return api.post("/data/get", {userId: userId})
  }
  
  static async deleteProject(userId: number, projectId: number):
  Promise<AxiosResponse<IResponse<string>>> {
  return api.post("/data/update", { userId: userId, projectId: projectId })
}
  
}