/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@core/config';
import { HttpClientResponse } from '@core/models';
import { HttpService } from '@core/services';
import { environment } from '@env/environment';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';
import { HttpClienGetUserByIdResponse, HttpClienGetUserResponse, HttpClienUserCreateResponse, RequestParamUserSeach, UserModel } from '../models/user.model';
import * as queryString from 'query-string';
import { finalize, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }

  public getUser(param: RequestParamUserSeach): Observable<HttpClienGetUserResponse> {
    const convert = queryString.stringify(param);

    this.loadingDialog.showSpinner(true);

    return this.get(`${ApiPath.USER_SYSTEM}?${convert}`).pipe(map((response: HttpClienGetUserResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetUserResponse>;
  }
  public getUserById(id: string): Observable<HttpClienGetUserByIdResponse  | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.get(ApiPath.USER_MASTER + '/' + id).pipe(map((response: HttpClienGetUserByIdResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetUserByIdResponse | HttpErrorResponse>;
  }

  public createUser(payload: UserModel): Observable<HttpClienUserCreateResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.post(ApiPath.USER_MASTER, payload).pipe(map((response: HttpClienUserCreateResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienUserCreateResponse | HttpErrorResponse>;
  }
  public updateUser(payload: UserModel): Observable<HttpClienUserCreateResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.put(ApiPath.USER_MASTER, payload).pipe(
      map((response) => response as HttpClienUserCreateResponse),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienUserCreateResponse | HttpErrorResponse>;
  }
  public deleteUserById(id: number): Observable<HttpClienGetUserByIdResponse  | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.USER_MASTER + '/' + id).pipe(map((response: HttpClienGetUserByIdResponse ) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetUserByIdResponse  | HttpErrorResponse>;
  }
  public sendMailUserById(id: number): Observable<HttpClienGetUserByIdResponse> {
    let param = {
      id: id,
      urlRedirect: environment.HOME_PAGE
    };
    const convert = queryString.stringify(param);

    return this.get(`${ApiPath.USER_SEND_MAIL}?${convert}`).pipe(map((response: HttpClienGetUserByIdResponse) => response)
    ) as Observable<HttpClienGetUserByIdResponse>;
  }
  public exportUserCSV(keyWord: String): Observable<any> {
    let param = {
      header: ['ID', 'ユーザー名称', '権限', 'メールアドレス', '生年月日', '性別', '電話番号', '住所'],
      keyWord: keyWord,
      observe: 'response',
      responseType: 'blob' as 'json'
    };
    let header: HttpHeaders = new HttpHeaders();

    header.append('Content-Type', 'application/csv');
    const convert = queryString.stringify(param);

    return this.http.get(`${ApiPath.USER_SYSTEM_EXPORT_CSV}?${convert}`, { headers: header, observe: 'response', responseType: 'blob' as 'json' }).pipe
      (map((response: any) => response),
        finalize(() => this.loadingDialog.showSpinner(false))) as Observable<any>;
  }
}
