import { DataSearchModel, HttpClienRequest, HttpClientResponse } from '@core/models';
import { Moment } from 'moment';




export interface SortDataTableEventModel {
  active: string,
  direction: string,
}

export class CloseEventEditModel {
  public isClosed: boolean = true;
  public handleEvent?: 'reload' = 'reload';
  public isUpdate?: boolean = false;
  public isDelete?: boolean = false;
}

export interface UserModel {
  userId?: number,
  userName: string,
  companyId: number,
  role: string | null,
  mail: string,
  birthDay: string,
  gender: string,
  phone: string,
  address: string,
  password?: string,
  delFlg?: string,
  createDate?: string,
  createBy?: number,
  updateDate?: string | Moment,
  updateBy?: number,
  urlRedirect?: string,
}

export interface BuyerModel {
  userId?: number,
  userName: string,
  countryName: string,
  email: string,
  address1: string,
  phonePersonal: string,
  delFlg?: string,
  createDate?: string,
  createBy?: number,
  updateDate?: string | Moment,
  updateBy?: number
}

export interface UserResponse {
  delFlg: string,
  createDate: string,
  createBy: number,
  updateDate: string,
  updateBy: number,
  userId: number,
  userName: string,
  companyId: number,
  role: string | null,
  password: string,
  mail: string,
  birthDay: string,
  gender: string,
  phone: string,
  address: string,
  freeItem1: string | null,
  freeItem2: string | null,
  freeItem3: string | null
}

export interface RequestOrderModel {
  userId: string;
  requestNo: string;
  maker: string;
  model: string;
  chassiNumber: string;
  mfgDate: string;
  typeCountry: string;
  totalPrice: string;
  price: string;
  userIdExporter: string;
  statusRequest: string;
  invoiceImage: string;
}

export interface PaymentModel {
  priceItem: string;
}

export interface FileModel {
  name: string;
  file: Blob;
}

export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: Array<UserResponse>,
  totalPage: number,
  totalRecords: number,
}
export interface DataBuyerModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: Array<BuyerModel>,
  totalPage: number,
  totalRecords: number,
}

export interface RequestParamBuyerSeach {
  keyWord?: string,
  sort?: string,
  column?: string,
  page?: number,
  size?: number
}
export class DataSearchUserModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: Array<UserResponse> = [],
    public totalPage: number = 0,
    public totalRecords: number = 0
  ) { }
}

export interface HttpClienUserCreateResponse extends HttpClientResponse {
  data: UserResponse;
}

export interface HttpClienGetUserResponse extends HttpClientResponse {
  data: DataSearchUserModel;
}

export interface HttpClienGetUserByIdResponse extends HttpClientResponse {
  data: {
    user: UserResponse
  };
}

export interface DataActionSeachModel {
  idUser: string,
  userName: string,
}

export interface RequestParamUserSeach extends HttpClienRequest {
  keyWord?: string,
  sort?: string,
  column?: string,
}


export interface RegisterOrderOperator {
  emailCustomer: string;
  chassiNumber: string;
  emailExporter: string;
  maker: string;
  model: string;
  totalPrice: string;
  typeCountry: string;
  month: string;
  year: string;
  payment: Array<PaymentModel>;
  invoiceImage: string
}
