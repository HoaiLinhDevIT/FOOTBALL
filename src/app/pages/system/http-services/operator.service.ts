/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@core/config';
import { HttpClientResponse } from '@core/models';
import { HttpService } from '@core/services';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';
import * as queryString from 'query-string';
import { finalize, map, Observable } from 'rxjs';
import { HttpClienGetOperatorByIdResponse, HttpClienGetOperatorResponse, HttpClienOperatorCreateResponse, OperatorModel, RequestParamOperatorSeach } from '../models/operator.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }

  public getOperator(param: RequestParamOperatorSeach): Observable<HttpClienGetOperatorResponse> {
    const convert = queryString.stringify(param);

    this.loadingDialog.showSpinner(true);

    return this.get(`${ApiPath.GETALL_OPERATOR}?${convert}`).pipe(map((response: HttpClienGetOperatorResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetOperatorResponse>;
  }

  public getOperatorById(id: string): Observable<HttpClienGetOperatorByIdResponse  | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.get(ApiPath.GETBYID_OPERATOR + '/' + id).pipe(map((response: HttpClienGetOperatorByIdResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetOperatorByIdResponse | HttpErrorResponse>;
  }

  public createOperator(payload: OperatorModel): Observable<HttpClienOperatorCreateResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.post(ApiPath.CREATE_OPERATOR, payload).pipe(map((response: HttpClienOperatorCreateResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienOperatorCreateResponse | HttpErrorResponse>;
  }

  public checkIsExistMail(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.EXIST_OPERATOR, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public deleteUserById(id: number): Observable<HttpClienGetOperatorByIdResponse  | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.DELETE_OPERATOR + '/' + id).pipe(map((response: HttpClienGetOperatorByIdResponse ) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetOperatorByIdResponse  | HttpErrorResponse>;
  }

  public updateOperator(payload: OperatorModel): Observable<HttpClienOperatorCreateResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.put(ApiPath.UPDATE_OPERATOR , payload).pipe(map((response: HttpClienOperatorCreateResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienOperatorCreateResponse | HttpErrorResponse>;
  }

  public resetPassOperator(payload: OperatorModel): Observable<HttpClienOperatorCreateResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.put(ApiPath.RESET_OPERATOR , payload).pipe(map((response: HttpClienOperatorCreateResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienOperatorCreateResponse | HttpErrorResponse>;
  }
}
