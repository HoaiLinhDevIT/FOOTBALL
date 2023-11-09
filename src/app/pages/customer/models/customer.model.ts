import { HttpClientResponse } from "@core/models";

export interface ProfileModel{
    userId: number,
    userName:string,
    address?: string,
    birthday?: string,
    phone:string,
    country: string,
    avatar?: string,
    gender?: string,
    postCode?: string,
    moneyTransfer: string,
    receiveFromSeller: string,
    completionFromSeller: string,
    confirmationComplete: string,
    generalAlert: string,
    activateOtp: string
  }

export interface CustomerInfoModelResponse {
  userId: number,
  email: string,
  userName: string,
  phone: string,
  country: string,
  moneyTransfer: string,
  receiveFromSeller: string,
  completionFromSeller: string,
  confirmationComplete: string,
  generalAlert: string,
  activateOtp: string,
  avatar: string,
  birthDay: string,
  isOtpLogin: string,
  gender: string,
  createDate: Date,
  createBy: string,
  address: string,
  countryId: number
}

export interface HttpClientCustomerInfoResponse extends HttpClientResponse {
  data: CustomerInfoModelResponse;
}

export interface ProfileResponse extends HttpClientResponse{
  data: ProfileModel;
}



