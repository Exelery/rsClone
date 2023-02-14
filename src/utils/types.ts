export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser
}

export interface IUser {
  username: string;
  email: string;
  isAvtivated: boolean;
  id: string;
}