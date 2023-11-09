import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientResponse } from '@core/models/http-response.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export abstract class HttpService {
  public constructor(protected http: HttpClient) { }

  public get(url: string): Observable<HttpClientResponse> {
    return this.http.get<HttpClientResponse>(url).pipe(
      tap((response) => response),
      catchError((err) => of(err))
    );
  }

  public post(url: string, payload: object, header?: HttpHeaders): Observable<HttpClientResponse> {
    return this.http.post<HttpClientResponse>(url, payload, { headers: header }).pipe(
      tap((response) => response),
      catchError((err) => of(err))
    );
  }

  public put(url: string, payload: object): Observable<HttpClientResponse> {
    return this.http.put<HttpClientResponse>(url, payload).pipe(
      tap((response) => response),
      catchError((err) => of(err))
    );
  }

  public delete(url: string, payload?: object): Observable<HttpClientResponse> {
    return this.http.delete<HttpClientResponse>(url, payload).pipe(
      tap((response) => response),
      catchError((err) => of(err))
    );
  }
}
