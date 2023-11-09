import { DataModel, HttpClienRequest, HttpClientResponse } from '@core/models';

export interface CompanyModel {
  companyId: number;
  companyName: string;
  postCode1?: string;
  phoneNumber1?: string;
  faxNumber1?: string;
  address1?: string;
  address11?: string;
  address12?: string;
  address13?: string;
  address14?: string;
  postCode2?: string;
  phoneNumber2?: string;
  faxNumber2?: string;
  address2?: string;
  address21?: string;
  address22?: string;
  address23?: string;
  address24?: string;
  notes?: string;
  updateDate?: Date;
}

export interface  GetCompaniesRequest extends HttpClienRequest {
  keyWord:string;
  column?:string;
  sort?:string;
 }

export interface GetCompaniesResponse extends HttpClientResponse {
  data: DataModel;
}

export interface CompanyDetail extends HttpClientResponse {
  data: CompanyModel
}


export interface ZipCodeModel {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefcode: string;
  zipcode: string;
}

export interface ZipCodeResponse extends HttpClientResponse  {
  message?: string;
  data: ZipCodeModel[],
  status?: number
}

export class CloseEventModel {
  public isClosed: boolean = true;
  public handleEvent?: 'reload' = 'reload';
}
