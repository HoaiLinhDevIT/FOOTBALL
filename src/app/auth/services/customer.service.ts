/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerModel, HttpClienCustomerCreateResponse } from '@auth/models/customer.model';
import { ApiPath } from '@core/config';
import { HttpClientResponse } from '@core/models';
import { HttpService } from '@core/services';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';
import * as queryString from 'query-string';
import { finalize, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }


  public createCustomer(payload: CustomerModel): Observable<HttpClienCustomerCreateResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.post(ApiPath.CREATE_CUSTOMER, payload).pipe(map((response: HttpClienCustomerCreateResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienCustomerCreateResponse | HttpErrorResponse>;
  }

  public checkIsExistMail(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.EXIST_OPERATOR, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }


}
