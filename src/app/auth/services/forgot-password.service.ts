/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@core/config';
import { HttpClientResponse } from '@core/models';
import { HttpService } from '@core/services';
import { environment } from '@env/environment';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';
import { map, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }

  public forgotPassrod(mail: string): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.post(ApiPath.FORGOT_PASSWORD, {mail: mail, urlRedirect: environment.HOME_PAGE}).pipe(
      map((response: HttpClientResponse | HttpErrorResponse) => response)
      ) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public emailUs(data: Object, filehelp: Blob): Observable<HttpClientResponse | HttpErrorResponse>{
    this.loadingDialog.showSpinner(true);
    const formData = new FormData();
    formData.append('json', JSON.stringify(data));
    formData.append('filehelp', filehelp);
    return this.post(ApiPath.EMAIL_US, formData).pipe(
      map((response: HttpClientResponse|HttpErrorResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public sendLinkVertification(mail: String): Observable<HttpClientResponse| HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.post(ApiPath.SEND_LINK_VERTIFICATION, {mail: mail, urlRedirect: environment.HOME_PAGE}).pipe(
      map((response: HttpClientResponse | HttpErrorResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClientResponse| HttpErrorResponse>;
  }

  public changePhone(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.post(ApiPath.CHANGE_PHONE,data).pipe(
      map((response: HttpClientResponse | HttpErrorResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) ;
  }

  public changeMail(data: Object): Observable<HttpClientResponse| HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.post(ApiPath.CHANGE_PHONE,data).pipe(
      map((response: HttpClientResponse | HttpErrorResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClientResponse| HttpErrorResponse>;
  }

}
