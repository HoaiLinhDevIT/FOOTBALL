import { HttpClienRequest, HttpClientResponse } from '@core/models';

export interface ChatResponse {
  id: string;
  requestNo: string;
  userId: number;
  message: string;
  dateTime: string;
  mine: string;
  createDate: Date;
  UpdateDate: Date;
  createBy: number;
  updateBy: number;
}

export interface DataModel {
  length: number;
  currentPage: number;
  noRecordInPage: number;
  results: Array<ChatResponse>;
  totalPage: number;
  totalRecords: number;
}

export class DataSearchChatModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: Array<ChatResponse> = [],
    public totalPage: number = 0,
    public totalRecords: number = 0
  ) {}
}

export interface RequestParamChatModel extends HttpClienRequest {
  requestNo?: string;
  page: number;
  size: number;
}

export interface HttpClienChatResponse extends HttpClientResponse {
    data: DataSearchChatModel;
  }