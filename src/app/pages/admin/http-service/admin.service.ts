/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiPath } from "@core/config";
import { HttpService } from "@core/services";
import { LoadingSpinnerDialogService } from "@layout/services";
import { auditTime, finalize, map, Observable } from 'rxjs';
import * as queryString from 'query-string';
import { HttpClienGetBuyerResponse, RequestParamBuyerSeach } from "../model/buyer.model";
import { HttpClienGetSellerResponse, RequestParamSellerSeach } from "../model/seller.model";


@Injectable({
  providedIn: 'root'
})

export class AdminService extends HttpService {
  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
    super(http);
  }

  public getListBuyer(param: RequestParamBuyerSeach): Observable<HttpClienGetBuyerResponse> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.LIST_BUYER}?${convert}`).pipe(map((response: HttpClienGetBuyerResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetBuyerResponse>;
  }



  public getListSeller(param: RequestParamSellerSeach): Observable<HttpClienGetSellerResponse> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.LIST_SELLER}?${convert}`).pipe(map((response: HttpClienGetSellerResponse) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<HttpClienGetSellerResponse>;
  }

  public category(): Observable<any> {
    return this.get(ApiPath.CATEGORY).pipe(
    ) as Observable<any>;
  }
  public categorySp(): Observable<any> {
    return this.get(ApiPath.CATEGORYSP).pipe(
    ) as Observable<any>;
  }
  public categorySb(): Observable<any> {
    return this.get(ApiPath.CATEGORYSB).pipe(
    ) as Observable<any>;
  }

  public checklogin(): Observable<any> {
    return this.get(ApiPath.CHECK_LOGIN).pipe(
    ) as Observable<any>;
  }

  public getListCategory(param: any): Observable<any> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.ALLCATEGORY}?${convert}`).pipe(auditTime(500), map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }


  public deleteCategory(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.DELETE_CATEGORY + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }


  public addCategory(payload: any): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.post(ApiPath.ADD_CATEGORY, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public updateCategory(payload: any): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.put(ApiPath.UPDATE_CATEGORY, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }


  public activeCategory(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.ACTIVE_CATEGORY + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }


  public getListNews(param: any): Observable<any> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.ALLNEWS}?${convert}`).pipe(auditTime(500), map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }

  public getPost(param: any): Observable<any> {
    const convert = queryString.stringify(param);
    this.loadingDialog.showSpinner(true);
    return this.get(`${ApiPath.ALLPOST}?${convert}`).pipe(auditTime(500), map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any>;
  }

  public addNews(payload: any): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.post(ApiPath.ADD_NEWS, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public updateNews(payload: any): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.put(ApiPath.UPDATE_NEWS, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public deleteNews(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.DELETE_NEWS + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public activeNews(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);

    return this.delete(ApiPath.ACTIVE_NEWS + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public getListCatego(): Observable<any> {
    return this.get(ApiPath.GET_LIST_CATEGORY).pipe(
    ) as Observable<any>;
  }

  public getListCategoPitch(): Observable<any> {
    return this.get(ApiPath.GET_LIST_CATEGORY_PITCH).pipe(
    ) as Observable<any>;
  }

  public getListTime(): Observable<any> {
    return this.get(ApiPath.GET_LIST_TIME).pipe(
    ) as Observable<any>;
  }

  public getAllPitch(): Observable<any> {
    return this.get(ApiPath.GET_ALL_PITCH).pipe(
    ) as Observable<any>;
  }

  public getListProductByCategory(data: any): Observable<any> {
    return this.post(ApiPath.GET_PRODUCT_BY_CATEGORY, data).pipe(map((response: any) => response),
    finalize(() => this.loadingDialog.showSpinner(false))
  ) as Observable<any>;
  }

  public addComment(payload: any): Observable<any | HttpErrorResponse> {
    return this.post(ApiPath.ADD_COMMENT, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public getListCommentByProductId(data: any): Observable<any> {
    return this.post(ApiPath.GET_COMMENT, data).pipe(map((response: any) => response),
    finalize(() => this.loadingDialog.showSpinner(false))
  ) as Observable<any>;
  }

  public addCart(payload: any): Observable<any | HttpErrorResponse> {
    return this.post(ApiPath.ADD_CART, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public getListCart(): Observable<any> {
    return this.get(ApiPath.GET_LIST_CART).pipe(map((response: any) => response),
    finalize(() => this.loadingDialog.showSpinner(false))
  ) as Observable<any>;
  }

  public deleteCart(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.delete(ApiPath.DELETE_CART + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public addOrder(payload: any): Observable<any | HttpErrorResponse> {
    return this.post(ApiPath.ADD_ORDER, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public addHistory(payload: any): Observable<any | HttpErrorResponse> {
    return this.post(ApiPath.ADD_HISTORY, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public confirmOrder(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.delete(ApiPath.CONFIRM_ORDER + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public deleteOrder(id: number): Observable<any | HttpErrorResponse> {
    this.loadingDialog.showSpinner(true);
    return this.delete(ApiPath.DELETE_ORDER + '/' + id).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }

  public addPitch(payload: any): Observable<any | HttpErrorResponse> {
    return this.post(ApiPath.ADD_PITCH, payload).pipe(map((response: any) => response),
      finalize(() => this.loadingDialog.showSpinner(false))
    ) as Observable<any | HttpErrorResponse>;
  }
}
