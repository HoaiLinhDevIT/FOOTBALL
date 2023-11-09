import { HttpClienRequest, HttpClientResponse } from "@core/models";

export interface DataModel {
  length: number,
  currentPage: number,
  noRecordInPage: number,
  results: Array<CustomerOderResponse>,
  totalPage: number,
  totalRecords: number,
}

export interface PaymentModel{
  createBy?: string;
  id?: number;
  requestNo?: string;
  statusPayment?: string;
}
export interface CustomerOderModel {
  requestId: number;
  userId: number;
  requestNo?: string;
  maker?: string;
  userIdExporter?: string;
  model?: string;
  chassisNumber?: string;
  statusCar?: string;
  totalPrice?: string;
  balDual?: string;
  requestUpdateDate?: Date;
  statusRequets?: string;
  notification?: string;
  typeCountry?: string;
  invoiceImage?: string;
  trush?: string;
  listPayment?: Array<PaymentModel>;
}
export interface CustomerOderResponse  {
  requestId: number;
  userId: number;
  requestNo?: string;
  maker?: string;
  userIdExporter?: string;
  model?: string;
  chassisNumber?: string;
  statusCar?: string;
  totalPrice?: string;
  balDual?: string;
  requestUpdateDate?: Date;
  statusRequets?: string;
  notification?: string;
  typeCountry?: string;
  invoiceImage?: string;
  trush?: string;
  listPayment?: Array<PaymentModel>;
}

export class DataSearchOrderModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: Array<CustomerOderResponse> = [],
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

export interface HttpClienGetOrderResponse extends HttpClientResponse {
  data: DataSearchOrderModel;
}

export interface HttpClienGetOrderByIdResponse extends HttpClientResponse {
  data: {
    user: CustomerOderResponse;
  }
}


