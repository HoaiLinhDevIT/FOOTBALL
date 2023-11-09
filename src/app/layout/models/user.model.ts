import { DataModel, HttpClientResponse } from '@core/models';

export interface UserModelResponse extends HttpClientResponse {
  data: DataModel,
}

export interface UserDetailModel {
  userId: number;
  userName: string;
  mail: string;
  phone: string;
  delFlg: string;
  lockUser: string | null;
  roles: UserRole[];
  companyId: number;
  createBy:string|null;
  avatar: string;
}

export interface UserRole {
  role: string;
}

export interface ChangePasswordRequest {
  passwordNew: string,
  passwordConfirm: string
}


