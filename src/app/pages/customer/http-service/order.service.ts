import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiPath } from "@core/config";
import { HttpService } from "@core/services";
import { LoadingSpinnerDialogService } from "@layout/services";
import { auditTime, finalize, map, Observable } from "rxjs";
import * as queryString from 'query-string';
import { HttpClienGetOrderByIdResponse, HttpClienGetOrderResponse, RequestParamOrderSeach } from "../../customer/models/customerOrder.model";


@Injectable({
    providedIn: 'root'
})
export class OrderService extends HttpService {
    public constructor(
      protected override http: HttpClient,
      private loadingDialog: LoadingSpinnerDialogService
    ) {
      super(http);
    }

    public getOrder(param: RequestParamOrderSeach): Observable<HttpClienGetOrderResponse> {
        const convert = queryString.stringify(param);

        this.loadingDialog.showSpinner(true);

        return this.get(`${ApiPath.GET_ORDER_CUSTOMER }?${convert}`).pipe( auditTime(500), map((response: HttpClienGetOrderResponse) => response),
          finalize(() => this.loadingDialog.showSpinner(false))
        ) as Observable<HttpClienGetOrderResponse>;
      }

      public deleteOrderById(id: number): Observable<HttpClienGetOrderByIdResponse  | HttpErrorResponse> {
        this.loadingDialog.showSpinner(true);

        return this.delete(ApiPath.DELETE_ORDER_CUSTOMER + '/' + id).pipe(map((response: HttpClienGetOrderByIdResponse ) => response),
          finalize(() => this.loadingDialog.showSpinner(false))
        ) as Observable<HttpClienGetOrderByIdResponse  | HttpErrorResponse>;
      }
}
