import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpClienCustomerCreateResponse } from "@auth/models/customer.model";
import { SellerModel } from "@auth/models/seller.model";
import { ApiPath } from "@core/config";
import { HttpService } from "@core/services";
import { LoadingSpinnerDialogService } from "@layout/services/loading-spinner-dialog.service";
import { finalize, map, Observable } from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class SellerService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }


  public createSeller(payload: SellerModel): Observable<HttpClienCustomerCreateResponse | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.post(ApiPath.CREATE_SELLER, payload).pipe(map((response: HttpClienCustomerCreateResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienCustomerCreateResponse | HttpErrorResponse>;
  }
}
