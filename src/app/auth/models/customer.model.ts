import { DataSearchModel, HttpClienRequest, HttpClientResponse } from '@core/models';
import { Moment } from 'moment';




export interface SortDataTableEventModel{
  active:string,
  direction:string,
}

export class CloseEventEditModel {
  public isClosed: boolean = true;
  public handleEvent?: 'reload' = 'reload';
  public isUpdate?: boolean = false;
  public isDelete?: boolean = false;
}

export interface CustomerModel {
  userId?: number,
  userName: string,
  mail: string,
  password: string,
  cfpassword: string,
  delFlg?: string,
  role: string,
  createDate?: string,
  createBy?: number,
  updateDate?: string | Moment,
  updateBy?: number
}

export interface CustomerResponse {
  delFlg: string,
  createDate: string,
  createBy: number,
  updateDate: string,
  updateBy: number,
  userId: number,
  userName: string,
  password: string,
  cfpassword: string,
  role: string,
  description: string,
  mail: string,
}

export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: Array<CustomerResponse>,
  totalPage: number,
  totalRecords: number,
}

export class DataSearchCustomerModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: Array<CustomerResponse> = [],
    public totalPage: number = 0,
    public totalRecords: number = 0
  ) { }
}

export interface HttpClienCustomerCreateResponse extends HttpClientResponse {
  data: CustomerResponse;
}

export interface HttpClienGetCustomerResponse extends HttpClientResponse {
  data: DataSearchCustomerModel;
}

export interface HttpClienGetCustomerrByIdResponse extends HttpClientResponse {
  data: {
    user: CustomerResponse;
  }
}

export interface DataActionSeachModel{
  idUser:string,
  userName:string,
}

export interface RequestParamOperatorSeach extends HttpClienRequest {
  keyWord?: string,
  sort? :string,
  column?: string,
}
