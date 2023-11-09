import { HttpClienRequest, HttpClientResponse } from "@core/models";
export interface ProfileModel {
  userId: number,
  email: string,
  userName: string,
  companyName: string,
  zipCode1: string,
  address11: string,
  address12: string,
  address13: string,
  address14: string,
  zipCode2: string,
  address21: string,
  address22: string,
  address23: string,
  address24: string,
  phonePersonal: string,
  countryName: string,
  moneyTransfer: string,
  receiveFromSeller: string,
  completionFromSeller: string,
  confirmationComplete: string,
  generalAlert: string,
  activateOtp: string,
  avatar: string,
  delFlg: string,
  createDate: Date,
  createBy: string,
}


export interface ExporterInfoModelResponse {
  userId: number,
  email: string,
  userName: string,
  companyName: string,
  zipCode1: string,
  address11: string,
  address12: string,
  address13: string,
  address14: string,
  zipCode2: string,
  address21: string,
  address22: string,
  address23: string,
  address24: string,
  phonePersonal: string,
  countryName: string,
  moneyTransfer: string,
  receiveFromSeller: string,
  completionFromSeller: string,
  confirmationComplete: string,
  generalAlert: string,
  activateOtp: string,
  avatar: string,
  delFlg: string,
  createDate: Date,
  createBy: string,
}
export interface Zipcode {
  zipCode1: string,
  address11: string,
  address12: string,
  address13: string,
  address14: string,
  zipCode2: string,
  address21: string,
  address22: string,
  address23: string,
  address24: string,
}
export interface BankInfoModel {
  id: string,
  bankName: string,
  branch: string,
  accountNumber: string,
}
export interface BankInfoResponse {
  id: string,
  bankName: string,
  branch: string,
  accountNumber: string,
}

export interface HttpClientBankInfoResponse extends HttpClientResponse {
  data: Array<BankInfoResponse>;
}
export interface HttpClientExporterInfoResponse extends HttpClientResponse {
  data: ExporterInfoModelResponse;
}

export interface ProfileResponse extends HttpClientResponse {
  data: ProfileModel;
}

// order
export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: Array<ExporterResponse>,
  totalPage: number,
  totalRecords: number,
}


export interface PaymentModel  {
  createBy: string,
  delFlg: string,
  id: number,
  requestNo: string,
  statusPayment: string
}


export interface ExporterResponse  {
  requestId: number;
  userId: number;
  requestNo?: string;
  maker?: string;
  userIdExporter?: string;
  model?: string;
  chassiNumber?: string;
  statusCar?: string;
  totalPrice?: string;
  price?: string;
  requestUpdateDate?: Date;
  statusRequets?: string;
  notification?: string;
  typeCountry?: string;
  invoiceImage?: string;
  balDual?: number;
  chassisNumber?: number;
  listPayment?: Array<PaymentModel>;
}

export class DataSearchOrderModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: Array<ExporterResponse> = [],
    public totalPage: number = 0,
    public totalRecords: number = 0
  ) { }
}

export interface RequestParamOrderSeach extends HttpClienRequest {
    keyWord?: string,
    sort? :string,
    column?: string,
    fieldsTab?: string
}

export interface HttpClientGetOrderResponse extends HttpClientResponse {
  data: DataSearchOrderModel;
}

export interface HttpClientGetOrderByIdResponse extends HttpClientResponse {
  data: {
    user: ExporterResponse;
  }
}

export interface HttpRequestOrderResponse extends HttpClientResponse {
  data: ExporterResponse
}



