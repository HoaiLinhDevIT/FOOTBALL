import { HttpClientRemittanceReponse } from './../model/operator.model';
import { HttpClienGetOrderByIdResponse } from './../../customer/models/customerOrder.model';
import { HttpClientResponse } from './../../../core/models/http-response.model';
import { DataBuyerModel } from './../model/user.model';
import { RequestParamUserSeach } from './../../system/models/user.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiPath } from "@core/config";
import { HttpService } from "@core/services";
import { LoadingSpinnerDialogService } from "@layout/services";
import { auditTime, finalize, map, Observable } from "rxjs";
import * as queryString from 'query-string';
import { HttpClientListOrderResponse } from '../model/operator.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }

  public getListOrder(data: RequestParamUserSeach) {
    const convert = queryString.stringify(data);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.GET_LIST_ORDER_OPERATOR}?${convert}`).pipe(auditTime(500), map((response: HttpClientListOrderResponse | HttpErrorResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    );
  }

  public deleteOrderById(id: number): Observable<HttpClienGetOrderByIdResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.DELETE_ORDER_CUSTOMER + '/' + id).pipe(map((response: HttpClienGetOrderByIdResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetOrderByIdResponse | HttpErrorResponse>;
  }


  public updateStatusConfirm(data: Object): Observable<HttpClientResponse> {

    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.UPDATE_STATS_CONFIRM, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public getListRemittance(data: RequestParamUserSeach) {
    const convert = queryString.stringify(data);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.GET_LIST_REMITTANCE}?${convert}`).pipe(auditTime(500), map((response: HttpClientRemittanceReponse | HttpErrorResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    );
  }
}
