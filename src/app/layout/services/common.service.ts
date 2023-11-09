import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientOtpResponse } from '@auth/models';
import { ApiPath } from '@core/config';
import { HttpClientResponse } from '@core/models';
import { HttpService } from '@core/services';
import { HttpClienChatResponse, RequestParamChatModel } from '@layout/models/chat.model';
import { ChangePasswordRequest, UserModelResponse } from '@layout/models/user.model';
import * as queryString from 'query-string';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends HttpService {

  public constructor(protected override http: HttpClient) {
    super(http);
  }

  public getCurrentUser(): Observable<UserModelResponse> {
    return this.get(ApiPath.USER_LOGIN) as Observable<UserModelResponse>;
  }

  // public changePassword(request: ChangePasswordRequest): Observable<HttpClientResponse> {
  //   return this.put(ApiPath.CHANGE_PASSWORD, request).pipe(
  //     map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  // }
  public changePassword(data: ChangePasswordRequest): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.put<HttpClientResponse | HttpErrorResponse>(ApiPath.CHANGE_PASSWORD, data);
  }

  public logout(): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.delete(ApiPath.LOGOUT) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public sendOtp(phoneNumber: string): Observable<HttpClientOtpResponse> {
    const headers = {
      'phoneNumber': phoneNumber
    };
    return this.http.post<HttpClientOtpResponse>(ApiPath.OTP_SMS, '', { headers }).pipe(
      map((response: HttpClientOtpResponse) => response)) as Observable<HttpClientOtpResponse>;
  }

  public OtpVefification(data: Object): Observable<Object>{
    return this.http.post<Object>(ApiPath.OTP_VERIFICATION, data).pipe(
      map((response) => response)
    ) as Observable<Object>;
  }

  public verifyOtp(data: Object): Observable<Object>{
    return this.http.post<Object>(ApiPath.OTP_VERIFICATION, data).pipe(
      map((response) => response)
    ) as Observable<Object>;
  }

    public getListChat(requestParam: RequestParamChatModel): Observable<HttpClienChatResponse>{
    const convert = queryString.stringify(requestParam);

    return this.get(`${ApiPath.COMMON_CHAT}?${convert}`).pipe(
      map((response: HttpClienChatResponse) => response)
    ) as Observable<HttpClienChatResponse>;
  }
}
