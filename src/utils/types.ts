export interface IResponse<T> {
  status: number;
  value: T
}
 
export interface ILoginResponse {
  text: string;
  token: string;
}

export interface IRefreshResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
}
export interface IUserStateUpdate {
  name: string;
  email: string;
}

export interface IUser {
  name: string;
  email: string;
  isActivated: boolean;
  id: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUser extends ISignUpInput {
  newpassword: string
}

export type IAuthStoreState = {
  authUser: IUser | null;
};

export interface IFile {
  fileName: string;
  content: string
}

export interface INewProject {
  projectName: string,
  data: IFile[]
}
export interface IProject extends INewProject{
  projectId: number,
  
}

export interface IResponseUserProject {
  projectId: number,
  projectName: string,
  projectFiles: IFile[]
}

export interface IResponseIdProject {
  projectId: number
}

export interface NavigatorLanguage  {
  userLanguage?: string;
}
