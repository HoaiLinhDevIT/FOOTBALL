import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiPath } from '@core/config';
import { map, Observable } from 'rxjs';
import { HttpClientOtpResponse } from '@auth/models';
import { FormGroup } from '@angular/forms';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClientResponse } from '@core/models';
import { HttpClientCountryResponse, HttpClientZipcodeResponse } from '@auth/models/register.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public constructor(private http: HttpClient,
    public afAuth: AngularFireAuth) { }

  public sendVerifyCode(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get(ApiPath.CHANGE_PASSWORD, { params });
  }

  // public userRegistration(data: FormGroup) {
  //   return this.http.post(ApiPath.REGISTER_USER, data);
  // }

  public checkIsExistUser(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.EXIST_USER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public checkIsExistPhone(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.EXIST_PHONE, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public checkIsPhone(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.CHECK_PHONE, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public checkIsPhoneCompany(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.CHECK_PHONE_COMPANY, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public checkIsPhoneRepresentative(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.CHECK_PHONE_REPRESENTATIVE, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public checkIsEmail(data: Object): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.CHECK_EMAIL, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public userRegistration(data: FormGroup): Observable<HttpClientResponse | HttpErrorResponse> {
    return this.http.post<HttpClientResponse | HttpErrorResponse>(ApiPath.REGISTER_USER, data).pipe(
      map((response) => response as HttpClientResponse | HttpErrorResponse)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }


  public activatedEmail(activatedToken: Object) {
    return this.http.put(ApiPath.ACTIVATED_EMAIL, JSON.stringify(activatedToken));
  }

  public exporterRegistration(data: Object, imageBusinessPDF: Blob, imageIndentificationCard: Blob ){
    const formData = new FormData();
    formData.append('json', JSON.stringify(data));
    formData.append('imageBusinessPDF', imageBusinessPDF);
    formData.append('imageIndentificationCard',imageIndentificationCard);
    console.log(formData);
    return this.http.post(ApiPath.REGISTER_EXPORTER, formData);
  }

  public operatorCreateOrder(data: Object, invoiceImage1: Blob, invoiceImage2: Blob, invoiceImage3: Blob ){
    const formData = new FormData();
    formData.append('json', JSON.stringify(data));
    formData.append('invoiceImage1', invoiceImage1);
    formData.append('invoiceImage2', invoiceImage2);
    formData.append('invoiceImage3', invoiceImage3);
    console.log(invoiceImage1 , invoiceImage2, invoiceImage3);
    return this.http.post(ApiPath.CREATE_ORDER_OPERATOR, formData);
  }

  public sendOtp(phoneNumber: string): Observable<HttpClientOtpResponse> {
    console.log(phoneNumber);
    const headers = {
      'phone': phoneNumber
    };
    return this.http.post<HttpClientOtpResponse>(ApiPath.OTP_SMS, '', { headers }).pipe(
      map((response: HttpClientOtpResponse) => response)) as Observable<HttpClientOtpResponse>;
  }

  public googleAuth() {
    return this.authRegister(new GoogleAuthProvider());
  }

  public authRegister(provider: AuthProvider) {
    return this.afAuth.signInWithPopup(provider);
  }

  public getListCountry(): Observable<HttpClientCountryResponse> {
    return this.http.get<HttpClientCountryResponse>(ApiPath.COMMON_COUNTRY).pipe(
      map((response) => response as HttpClientCountryResponse)) as Observable<HttpClientCountryResponse>;
  }

  public getZipcode(zipCode: number): Observable<HttpClientZipcodeResponse> {
    const params = new HttpParams().set('zipCode', zipCode);
    return this.http.get<HttpClientZipcodeResponse>(ApiPath.ZIP_CODE,{ params }).pipe(
      map((response) => response as HttpClientZipcodeResponse)) as Observable<HttpClientZipcodeResponse>;
  }

}
