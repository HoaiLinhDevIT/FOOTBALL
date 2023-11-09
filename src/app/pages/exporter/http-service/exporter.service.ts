/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountryModel, HttpClientCountryResponse } from '@auth/models/register.model';
import { ApiPath } from '@core/config';
import { HttpClientResponse, HttpClientZipcodeResponse } from '@core/models';
import { HttpService } from '@core/services';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';
import { auditTime, finalize, map, Observable } from 'rxjs';
import * as queryString from 'query-string';
import { HttpClientBankInfoResponse, HttpClientExporterInfoResponse, HttpClientGetOrderResponse, RequestParamOrderSeach } from '../models/exporter.model';


@Injectable({
  providedIn: 'root'
})
export class ExporterService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }

  public testUpload(data: Object): Observable<Object> {
    return this.http.post<Object>(ApiPath.COMMON_UPLOAD_PDF, data).pipe(
      map((response: Object) => response)
    ) as Observable<Object>;
  }

  public getExporterInfo(id: number): Observable<HttpClientExporterInfoResponse> {
    return this.http.get<HttpClientExporterInfoResponse | HttpErrorResponse>(ApiPath.GET_EXPORTER_INFO + '/' + id).pipe(
      map((response) => response as HttpClientExporterInfoResponse | HttpErrorResponse)) as Observable<HttpClientExporterInfoResponse>;
  }

  public updateExporterInfo(data: FormGroup): Observable<HttpClientExporterInfoResponse> {
    return this.http.put<HttpClientExporterInfoResponse | HttpErrorResponse>(ApiPath.UPDATE_EXPORTER_INFO, data).pipe(
      map((response) => response as HttpClientExporterInfoResponse | HttpErrorResponse)) as Observable<HttpClientExporterInfoResponse>;
  }

  public updateAvatarExporter(imageIndentificationCard: Blob, userId: number) {
    const formData = new FormData();
    formData.append('imageIndentificationCard', imageIndentificationCard);
    return this.http.put(ApiPath.UPDATE_AVATAR_EXPORTER + '/' + userId, formData);
  }

  public checkPassword(data: Object): Observable<HttpClientResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.CHECK_PASSWORD_EXPORTER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public checkMail(data: Object): Observable<HttpClientResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.CHECK_EMAIL_EXPORTER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public updateNameExporter(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.UPDATE_NAME_EXPORTER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }
  public updateEmailExporter(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.UPDATE_EMAIL_EXPORTER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public verifyPhone(data: Object): Observable<HttpClientResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.VERIFY_PHONE_EXPORTER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public updatePhoneExporter(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.UPDATE_PHONE_EXPORTER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public changePasswordExporter(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse>(ApiPath.UPDATE_PASSWORD_EXPORTER, data);
  }

  public changeAddress1Exporter(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse>(ApiPath.UPDATE_ADDRESS1_EXPORTER, data);
  }
  public changeAddress2Exporter(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse>(ApiPath.UPDATE_ADDRESS2_EXPORTER, data);
  }

  public lockAccountExporter(data: Object) {
    return this.http.put(ApiPath.LOCK_ACCOUNT_EXPORTER, data);
  }

  public getZipcode(zipCode: number): Observable<HttpClientZipcodeResponse> {
    const params = new HttpParams().set('zipCode', zipCode);
    return this.http.get<HttpClientZipcodeResponse>(ApiPath.ZIP_CODE, { params }).pipe(
      map((response) => response as HttpClientZipcodeResponse)) as Observable<HttpClientZipcodeResponse>;
  }

  public getBanks(id: number): Observable<HttpClientBankInfoResponse> {
    return this.http.get<HttpClientBankInfoResponse>(ApiPath.COMMON_BANKS + '/' + id).pipe(
      map((response) => response as HttpClientBankInfoResponse)) as Observable<HttpClientBankInfoResponse>;
  }

  public addBank(data: Object): Observable<HttpClientBankInfoResponse> {
    return this.http.post<HttpClientBankInfoResponse>(ApiPath.COMMON_BANKS, data).pipe(
      map((response) => response as HttpClientBankInfoResponse)) as Observable<HttpClientBankInfoResponse>;
  }

  public changeBanks(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse>(ApiPath.COMMON_BANKS, data);
  }

  public getListCountry(): Observable<HttpClientCountryResponse> {
    return this.http.get<HttpClientCountryResponse>(ApiPath.COMMON_COUNTRY).pipe(
      map((response) => response as HttpClientCountryResponse)) as Observable<HttpClientCountryResponse>;
  }

  public getListOrderExporter(data: RequestParamOrderSeach): Observable<HttpClientGetOrderResponse> {
    const query = queryString.stringify(data);
    this.loadingDialog.showSpinner(true);
    return this.http.get<HttpClientGetOrderResponse>(`${ApiPath.GET_LIST_ORDER_EXPORTER}?${query}`).pipe(
      auditTime(500),
      map((response) => response as HttpClientGetOrderResponse), finalize(() => this.loadingDialog.showSpinner(false))) as Observable<HttpClientGetOrderResponse>;
  }
  // public getListOrderExporter(data: object): Observable<HttpClientResponse> {
  //   return this.http.get<HttpClientResponse>(ApiPath.GET_LIST_ORDER_EXPORTER, data).pipe(
  //     map((response) => response as HttpClientResponse)) as Observable<HttpClientResponse>;
  // }


  public createProduct(param: any): Observable<any> {
    const convert = queryString.stringify(param);

    this.loadingDialog.showSpinner(true);

    return this.get(`${ApiPath.GETALL_OPERATOR}?${convert}`).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }

  public getProduct(param: any): Observable<any> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.GET_PRODUCT}?${convert}`).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }

  public getPitch(): Observable<any> {
    // const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(ApiPath.GET_PITCH).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }

  public addPromotion(payload: any): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.post(ApiPath.CREATE_PROMOTION, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public updatePromotion(payload: any): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.put(ApiPath.UPDATE_PROMOTION, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public deletePromotion(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.DELETE_PROMOTION + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public getListPromotion(): Observable<any> {
    this.loadingDialog.showSpinner(true);
    return this.get(ApiPath.GET_PROMOTION).pipe(auditTime(500), map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }

  public addProduct(payload: any): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.post(ApiPath.CREATE_PRODUCT, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public updateProduct(payload: any): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.put(ApiPath.UPDATE_PRODUCT, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public deleteProduct(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.DELETE_PRODUCT + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public sellerGetOrder(param: any): Observable<any> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.SELLER_GET_ORDER}?${convert}`).pipe(auditTime(500), map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }

  public buyerGetOrder(param: any): Observable<any> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.BUYER_GET_ORDER}?${convert}`).pipe(auditTime(500), map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }

  public adminGetOrder(param: any): Observable<any> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.ADMIN_GET_ORDER}?${convert}`).pipe(auditTime(500), map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }
}
