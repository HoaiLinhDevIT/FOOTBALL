import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientResponse } from '@core/models';
import { HttpService } from '@core/services';
import { LoadingSpinnerDialogService } from '@layout/services';
import * as queryString from 'query-string';
import { Observable, map, finalize } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DialogSeachApiService extends HttpService {

  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }
  public getDataDialogCommon(url: string, keySearch?: string): Observable<HttpClientResponse> {

    let param = {
      keyWord: keySearch ? keySearch : ''
    };
    const convert = queryString.stringify(param);

    this.loadingDialog.showSpinner(true);

    return this.get(`${url}?${convert}`).pipe(map((response: HttpClientResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClientResponse>;
  }

}
