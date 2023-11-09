/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountryModel, HttpClientCountryResponse } from '@auth/models/register.model';
import { ApiPath } from '@core/config';
import { HttpClientResponse, HttpClientZipcodeResponse } from '@core/models';
import { HttpService } from '@core/services';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';
import { map, Observable } from 'rxjs';
import { HttpClientCustomerInfoResponse, ProfileResponse } from '../models/customer.model';

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

  public testUpload(data: Object): Observable<Object> {
    return this.http.post<Object>(ApiPath.COMMON_UPLOAD_PDF, data).pipe(
      map((response: Object) => response)
    ) as Observable<Object>;
  }

  public getCustomerInfo(): Observable<HttpClientCustomerInfoResponse> {
    return this.http.get<HttpClientCustomerInfoResponse | HttpErrorResponse>(ApiPath.GET_CUSTOMER_INFO).pipe(
      map((response) => response as HttpClientCustomerInfoResponse | HttpErrorResponse)) as Observable<HttpClientCustomerInfoResponse>;
  }

  public updateCustomerInfo(data: FormGroup): Observable<HttpClientCustomerInfoResponse> {
    return this.http.put<HttpClientCustomerInfoResponse | HttpErrorResponse>(ApiPath.UPDATE_CUSTOMER_INFO, data).pipe(
      map((response) => response as HttpClientCustomerInfoResponse | HttpErrorResponse)) as Observable<HttpClientCustomerInfoResponse>;
  }

  public updateAvatarCutomer(imageIndentificationCard: Blob , userId: number): Observable<HttpClientCustomerInfoResponse> {
    const formData = new FormData();
    formData.append('imageIndentificationCard',imageIndentificationCard);
    return this.http.put(ApiPath.UPDATE_AVATAR_CUSTOMER + '/' + userId, formData).pipe(
      map((response) => response as HttpClientCustomerInfoResponse)) as Observable<HttpClientCustomerInfoResponse>;
  }

  public checkPassword(data: Object): Observable<HttpClientResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.CHECK_PASSWORD_CUSTOMER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public checkMail(data: Object): Observable<HttpClientResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.CHECK_EMAIL_CUSTOMER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public updateEmailCustomer(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.UPDATE_EMAIL_CUSTOMER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public updateNameCustomer(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.UPDATE_NAME_CUSTOMER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public updateAddressCustomer(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.UPDATE_EMAIL_CUSTOMER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public verifyPhone(data: Object): Observable<HttpClientResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.VERIFY_PHONE_CUSTOMER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }

  public updatePhoneCustomer(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.UPDATE_PHONE_CUSTOMER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse>;
  }


  public changePasswordCustomer(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse>(ApiPath.UPDATE_PASSWORD_CUSTOMER, data);
  }

  public changeAddressCustomer(data: Object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse>(ApiPath.UPDATE_ADDRESS_CUSTOMER, data);
  }

  public getListCountry(): Observable<HttpClientCountryResponse> {
    return this.http.get<HttpClientCountryResponse>(ApiPath.COMMON_COUNTRY).pipe(
      map((response) => response as HttpClientCountryResponse)) as Observable<HttpClientCountryResponse>;
  }

  // public getZipcode(zipCode: number): Observable<HttpClientZipcodeResponse> {
  //   const params = new HttpParams().set('zipCode', zipCode);
  //   return this.http.get<HttpClientZipcodeResponse>(ApiPath.ZIP_CODE,{ params }).pipe(
  //     map((response) => response as HttpClientZipcodeResponse)) as Observable<HttpClientZipcodeResponse>;
  // }


  public lockAccountCustomer(data: Object) {
    return this.http.put(ApiPath.LOCK_ACCOUNT_CUSTOMER, data);
  }

}
