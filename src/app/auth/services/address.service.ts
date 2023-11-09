/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpClienAddressResponse } from "@auth/models/address.model";
import { ApiPath } from "@core/config";
import { HttpService } from "@core/services";
import { LoadingSpinnerDialogService } from "@layout/services";
import { finalize, Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class AddressService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }

  public test(): Observable<any> {
    return this.get(ApiPath.COMMON_ADDRESS).pipe(
    ) as Observable<any>;
  }
}
