import { List } from 'lodash';
import { HttpClientResponse } from '@core/models/http-response.model';
import { HttpClienRequest, DataModel } from '@core/models';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OperatorModule { }

export interface HttpClientListOrderResponse extends HttpClientResponse {
  data: DataListOperatorModel
}

export class DataListOperatorModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: OperatorOrderModule[] = [],
    public totalPage: number = 1,
    public totalRecords: number = 0,
    public countRecords: number = 0,
    public usdTotalPrice: number = 0,
    public usdTotalDue: number = 0,
    public jpyTotalPrice: number = 0,
    public jpyTotalDue: number = 0
  ) { }
}

export interface OperatorOrderModule {
  requestId: number,
  userId: string,
  requestNo: string,
  maker: string,
  model: string,
  chassisNumber: string,
  typeCountry: string,
  totalPrice: bigint,
  balDual: bigint,
  requestUpdateDate: Date,
  userIdExporter?: string,
  statusRequest?: string,
  notification?: string,
  invoiceImage1?: string,
  invoiceImage2?: string,
  invoiceImage3?: string,
  trush?: string,
  avatarUser?: string,
  avatarExpoxter?: string,
  customerName: string,
  exporterName: string,
  listPayment?: Array<PaymentModel>;
  createDate: Date;
  updateDate: Date;
  confirmBl: string;
}

export interface RequestParamOrderSeach extends HttpClienRequest {
  keyWord?: string,
  sort?: string,
  column?: string,
  fieldsTab?: string
}

export interface PaymentModel {
  createBy: string,
  delFlg: string,
  id: number,
  requestNo: string,
  statusPayment: string
}

export interface OperatorSelected {
  name: string,
  sortDecrease: boolean,
  isActive: boolean
}
export class DataListPaymentModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: PaymentManagementModel[] = [],
    public totalPage: number = 1,
    public totalRecords: number = 0,
    public countRecords: number = 0
  ) { }
}
export interface PaymentManagementModel {
  id: number,
  from: string,
  to: string,
  model: string,
  requestNo: string,
  paymentNo: number,
  date: Date,
  chassisNumber: string,
  outstanding: string,
  transfer: string,
  balance: string,
  transferId: string,
  statusTransfer: string,
  refrenceId: string
}

export interface HttpClientPaymentManagementResponse extends HttpClientResponse {
  data: PaymentManagementModel;
}


export interface HttpClientRemittanceReponse extends HttpClientResponse {
  data: DataListRemittanceModel
}

export class DataListRemittanceModel implements DataModel {
  public constructor(
    public length: number = 0,
    public currentPage: number = 0,
    public noRecordInPage: number = 0,
    public results: OperatorRemittanceModule[] = [],
    public totalPage: number = 1,
    public totalRecords: number = 0,
    public countRecords: number = 0,
    public totalReceiveJPY: number = 0,
    public totalTransferJPY: number = 0,
    public totalOutstandingJPY: number = 0,
    public totaBalanceJPY: number = 0,
    public totalReceiveUSD: number = 0,
    public totalTransferUSD: number = 0,
    public totalOutstandingUSD: number = 0,
    public totaBalanceUSD: number = 0
  ) { }
}

export interface OperatorRemittanceModule {
  balance: string,
  chasisNumber: string,
  createBy: string,
  createDate: Date,
  customerId: number,
  customerName: string,
  customnerEmail: string,
  date: Date,
  delFlg: string,
  exporterEmail: string,
  exporterName: string,
  expoxterId: string,
  id: number,
  model: string,
  outstanding: string,
  refrenceId: string,
  statusTransfer: string,
  transfer: string,
  transferId: string
}

