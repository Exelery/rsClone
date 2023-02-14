export interface IResponse<T> {
  status: number;
  value: T
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser
}

export interface IRefreshResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  username: string;
  email: string;
  isAvtivated: boolean;
  id: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISignUpInput {
  username: string;
  email: string;
  password: string;
}

export type IAuthStoreState = {
  authUser: IUser | null;
};