/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MetaModel {
  code: string;
  field: string | null;
  message: string;
}

export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: object[],
  totalPage: number,
  totalRecords: number,
  countRecords: number,
}

export interface HttpClienRequest {
  page: number;
  size: number;
}

export interface HttpClientResponseZipCode {
  results: DataSearchModel | any;
  message: string;
  status: number;
}

export interface HttpClientResponse {
  data: DataSearchModel | any;
  errors: object[];
  meta: MetaModel;
}


export class DataSearchModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: any[] = [],
    public totalPage: number = 0,
    public totalRecords: number = 0,
    public countRecords: number = 0
  ) { }
}

export interface Zipcode {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefcode: string;
  zipcode: string;
}

export interface HttpClientZipcodeResponse extends HttpClientResponse {
  data: Array<Zipcode>;
}
