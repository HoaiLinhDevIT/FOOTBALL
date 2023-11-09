/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '@auth/services/login.service';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { LoadingSpinnerDialogService } from '@layout/services';
import { CommonService } from '@layout/services/common.service';
import { CustomerService } from '../../../http-service/customer.service';


@Component({
  selector: 'app-close-account-dialog',
  templateUrl: './close-account-dialog.component.html',
  styleUrls: ['./close-account-dialog.component.scss']
})
export class CloseAccountDialogComponent {
  public reasons = ['screen.profile.reason-lock-account-1', 'screen.profile.reason-lock-account-2', 
  'screen.profile.reason-lock-account-3', 'screen.profile.reason-lock-account-4', 'screen.profile.reason-lock-account-5'];
  public reason?: string;
  
  public constructor(
    public dialogRef: MatDialogRef<CloseAccountDialogComponent>,
    public customerService: CustomerService,
    public dialogService: DialogConfirmService,
    public loadingDialog: LoadingSpinnerDialogService,
    private router: Router,
    private commonService: CommonService,
    public toaster: ToasterService,
    private loginService: LoginService
  ) { };

  public onNoClick(): void {
      this.dialogRef.close();
  }

  public logOut(): void {
    this.commonService.logout();
    this.loginService.isLoginAsync$.next(false);
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('user_login');
    this.router.navigate(['auth/login']);
  }

  public lockAccount(): void {
      const dialog = this.dialogService.confirmDialog("Are you sure want to close your Account.");
      dialog.afterClosed().subscribe((confirm) =>{
        if (confirm) {
          this.loadingDialog.showSpinner(true);
          this.customerService.lockAccountCustomer({reason: this.reason})
            .subscribe({
              next: () => {
                this.loadingDialog.showSpinner(false);
                this.dialogService.customMessage('success', 'screen.profile.lock-account-success');
                //this.toaster.show('success', 'Success', 'Your account has been locked, please contact the administrator.');
                this.dialogRef.close();
                this.logOut();
              }
            });
        } else return;
      });
  }

  public changeRadio(event: any):void {
    this.reason = event.value;
  }

}
