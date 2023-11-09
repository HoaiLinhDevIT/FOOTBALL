import { DialogConfirmService } from '@common/services/dialog-confirm.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '@core/services/cache/languague.service';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '@auth/services/login.service';


@Injectable()
export class JsonTokenWebInterceptor implements HttpInterceptor {
  public constructor(
    private dialogService: DialogConfirmService,
    private router: Router,
    private loadingDialog: LoadingSpinnerDialogService,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private languageService: LanguageService
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqClone = this.addToHeader(request);

    return next.handle(reqClone).pipe(
      catchError((reason: HttpErrorResponse) => {
        if (reason.error.error === 'invalid_token') {
          this.toastrService.error(this.languageService.get('common.message.invalid-token'), '', {
            enableHtml: true
          });
          this.loginService.isLoginAsync$.next(false);
          this.router.navigate(['auth/login']);
          sessionStorage.removeItem('user_login');
          sessionStorage.removeItem('id_token');
          this.loadingDialog.showSpinner(false);
        } else
          if (reason.error.error === 'access_denied') {
            this.loginService.isLoginAsync$.next(false);
            this.router.navigate(['auth/login']);
            sessionStorage.removeItem('user_login');
            sessionStorage.removeItem('id_token');
            this.loadingDialog.showSpinner(false);
          } else
            if (reason.error.error === 'invalid_grant' || reason.error.error === 'unauthorized' || reason.error.error === 'Unauthorized') {
              this.toastrService.error(this.languageService.get('common.message.login-infor-wrong'));
              sessionStorage.removeItem('id_token');
              sessionStorage.removeItem('user_login');
            } else

              if (reason.error !== undefined && reason.error.code === 'TOKEN_EXPIRED') {
                // TODO: Implement when TOKEN EXPIRED
              } else
                if (reason.status === 500) {
                  this.dialogService.customMessage('error', reason.error.meta.message);
                }

        return throwError(() => reason);
      })
    );
  }

  /**
   * Method to add the Authorization token in header. Returns the new request
   */
  private addToHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = sessionStorage.getItem('id_token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request;
  }
}
