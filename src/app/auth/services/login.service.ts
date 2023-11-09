/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@core/config';
import { HttpService } from '@core/services';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClienAnotherUserLogintResponse, HttpClienUserLogintResponse, LoginModelRequest, LoginModelResponse } from '../models/login.model';
import { TwitterAuthProvider, GoogleAuthProvider, AuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClientResponse } from '@core/models';
import { environment } from '@env/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpService {
  public isLoginAsync$ = new BehaviorSubject<boolean>(false);

  public constructor(
    protected override http: HttpClient,
    public afAuth: AngularFireAuth
  ) {
    super(http);
  }

  public userLogin(data: LoginModelRequest): Observable<LoginModelResponse> {
    const body = new HttpParams()
      .set('username', data.mail)
      .set('password', data.password)
      .set('grant_type', 'password');
    const headers = {
      'Authorization': 'Basic SUQ6SlBDX09BVVRI',
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return this.http.post<LoginModelResponse>(ApiPath.LOGIN, body.toString(), { headers });
  }

  public getDetailUserLogin(): Observable<HttpClienUserLogintResponse | HttpErrorResponse> {
    return this.get(ApiPath.USER_LOGIN).pipe(
      map((response: HttpClienUserLogintResponse | HttpErrorResponse) => response)
    ) as Observable<HttpClienUserLogintResponse | HttpErrorResponse>;
  }

  public activatedAccount(mail: String): Observable<HttpClientResponse | HttpErrorResponse>{
    return this.post(ApiPath.ACTIVATED_ACCOUNT, {mail: mail, urlRedirect: environment.HOME_PAGE}).pipe(
      map((response: HttpClientResponse | HttpErrorResponse) => response)
    ) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public veryfiyAccountExporter(data: Object): Observable<HttpClientResponse | HttpErrorResponse>{
    return this.post(ApiPath.ACTIVATED_EXPORTER, data).pipe(
      map((response: HttpClientResponse | HttpErrorResponse) => response)
    ) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public verifyUserSNS(data: Object): Observable<HttpClienAnotherUserLogintResponse>{
    return this.http.post<HttpClienAnotherUserLogintResponse>(ApiPath.OTHER_LOGIN, data).pipe(
      map((response: HttpClienAnotherUserLogintResponse) => response)
    ) as Observable<HttpClienAnotherUserLogintResponse>;
  }

  public TwitterAuth() {
    return this.AuthLogin(new TwitterAuthProvider());
  }

  public GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  public FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  public AuthLogin(provider: AuthProvider) {
    return this.afAuth.signInWithPopup(provider);
  }
}
