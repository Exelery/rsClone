import { api } from "./http"
import type { AxiosResponse } from "axios"
import type { IProject, IResponse, IResponseUserProject, IResponseIdProject, INewProject } from "@/utils/types"
export default class DataApi {
  static async addProject(project: INewProject):
    Promise<AxiosResponse<IResponse<IResponseIdProject>>> {
    return api.post("/data", project)
  }
  
  static async updateProject(project: IProject):
    Promise<AxiosResponse<IResponse<string>>> {
    return api.put("/data", project)
  }
  
  static async getUserProjects():
    Promise<AxiosResponse<IResponse<IResponseUserProject[]>>> {
    return api.get("/data")
  }
  
  static async deleteProject( projectId: number):
  Promise<AxiosResponse<IResponse<string>>> {
  return api.delete("/data", {data: {projectId: projectId} })
}

static async bindProject(projectId: number): Promise<AxiosResponse<IResponse<string>>>{
  return api.post("/data/bind", {projectId: projectId})
}
  
}