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

export interface OperatorModel {
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

export interface OperatorResponse {
  delFlg: string,
  createDate: string,
  createBy: number,
  updateDate: string,
  updateBy: number,
  userId: number,
  userName: string,
  acl: string,
  role: string | null,
  description: string,
  email: string,
}

export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: Array<OperatorResponse>,
  totalPage: number,
  totalRecords: number,
}

export class DataSearchOperatorModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: Array<OperatorResponse> = [],
    public totalPage: number = 0,
    public totalRecords: number = 0
  ) { }
}

export interface HttpClienOperatorCreateResponse extends HttpClientResponse {
  data: OperatorResponse;
}

export interface HttpClienGetOperatorResponse extends HttpClientResponse {
  data: DataSearchOperatorModel;
}

export interface HttpClienGetOperatorByIdResponse extends HttpClientResponse {
  data: {
    user: OperatorResponse;
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
