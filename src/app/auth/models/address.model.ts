import { HttpClientResponse } from "@core/models";

export interface AddressModel {
  code: number;
  name: string;
  fullname: string;
  createBy: string;
  createDate: string;
  delFlg: string;
  exKey: string;
  updateBy: string;
  updateDate: string;
}

export interface HttpClienAddressResponse extends HttpClientResponse {
  data: AddressModel;
}
export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: Array<AddressModel>,
  totalPage: number,
  totalRecords: number,
}
