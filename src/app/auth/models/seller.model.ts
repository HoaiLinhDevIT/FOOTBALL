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

export interface SellerModel {
  userId?: number,
  companyName: string,
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

export interface SellerResponse {
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
  results: Array<SellerResponse>,
  totalPage: number,
  totalRecords: number,
}

export class DataSearchSellerModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: Array<SellerResponse> = [],
    public totalPage: number = 0,
    public totalRecords: number = 0
  ) { }
}

export interface HttpClienSellerCreateResponse extends HttpClientResponse {
  data: SellerResponse;
}

export interface HttpClienGetSellerResponse extends HttpClientResponse {
  data: DataSearchSellerModel;
}

export interface HttpClienGetSellerrByIdResponse extends HttpClientResponse {
  data: {
    user: SellerResponse;
  }
}

export interface DataActionSeachModel {
  idUser: string,
  userName: string,
}

export interface RequestParamOperatorSeach extends HttpClienRequest {
  keyWord?: string,
  sort?: string,
  column?: string,
}
