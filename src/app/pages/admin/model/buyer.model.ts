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

export interface BuyerModel {
  userId?: number,
  userName: string,
  email: string,
  role: string | null,
  acl: string,
  description: string,
  delFlg?: string,
  createDate?: string,
  createBy?: number,
  updateDate?: string | Moment,
  updateBy?: number,
  urlRedirect?: string,
}

export interface BuyerResponse {
  delFlg: string,
  createDate: string,
  createBy: number,
  updateDate: string,
  updateBy: number,
  userId: number,
  userName: string,
  address: string,
  role: string | null,
  phone: string,
  email: string,
}

export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: Array<BuyerResponse>,
  totalPage: number,
  totalRecords: number,
}

export class DataSearchBuyerModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: Array<BuyerResponse> = [],
    public totalPage: number = 0,
    public totalRecords: number = 0
  ) { }
}

export interface HttpClienBuyerCreateResponse extends HttpClientResponse {
  data: BuyerResponse;
}

export interface HttpClienGetBuyerResponse extends HttpClientResponse {
  data: DataSearchBuyerModel;
}

export interface HttpClienGetBuyerByIdResponse extends HttpClientResponse {
  data: {
    user: BuyerResponse;
  }
}

export interface DataActionSeachModel {
  idUser: string,
  userName: string,
}

export interface RequestParamBuyerSeach extends HttpClienRequest {
  keyWord?: string,
  sort?: string,
  column?: string,
}
