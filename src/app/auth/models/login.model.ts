import { HttpClientResponse } from '@core/models';

/* eslint-disable @typescript-eslint/naming-convention */
export interface LoginModelResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface LoginModelRequest {
  mail: string;
  password: string;
}

export interface UserLogin {
  mail: string;
  password: string;
}

export interface UserAnotherLogin {
  mail: string;
  ptmp: string;
}

export interface MetaModel {
  code: string;
  field: string | null;
  message: string;
}

export interface RoleModel{
  role:string,
}

export interface DataUserLoginModel{
  roles: Array<RoleModel>,
  delFlg: string,
  createBy:string,
  userId: number,
  userName:string,
  mail:string,
  phone:string,
  lockUser: number | null
  provider: string,
  activateOtp?: string,
  avatar?: string
}

export interface newPass{
  newPass: string,
  confirmPass: string,
}

export interface OtpModel{
  id: string,
  otp:number,
  expired: number,
}

export interface HttpClienUserLogintResponse extends HttpClientResponse {
  data: DataUserLoginModel;
}

export interface HttpClienAnotherUserLogintResponse extends HttpClientResponse {
  data: UserAnotherLogin;
}

export interface HttpClientOtpResponse extends HttpClientResponse {
  data: OtpModel;
}

