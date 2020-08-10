export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ILoginSuccessResponse {
  token: string;
}
