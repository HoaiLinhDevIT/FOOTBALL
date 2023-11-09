import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OtpModel } from '@auth/models';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { HttpClientResponse } from '@core/models';
import { environment } from '@env/environment';
import { LoadingSpinnerDialogService } from '@layout/services';
import { CommonService } from '@layout/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../http-service/customer.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  public changeEmailForm: FormGroup = new FormGroup({});
  public showPassword: boolean = false;
  public showCfPassword: boolean = false;
  public utils = Utils;
  private otpModel!: OtpModel;
  public validPassword: boolean = false;
  public screen1 = true;
  public screen2 = false;
  public maskmail?: string;

  public constructor(
    public fb: FormBuilder,
    public router: Router,
    public dialogService: DialogConfirmService,
    public toast: ToastrService,
    public customerService: CustomerService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<ChangeEmailComponent>,
    public toaster: ToasterService,
    public loadingDialog: LoadingSpinnerDialogService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.dialogRef.backdropClick().subscribe(() => {
      this.onNoClick();
    });
   }

  public ngOnInit(): void {
    this.initialForm();
  }


  public onNoClick(): void {
    if (this.changeEmailForm.get('email')?.value) {
      this.dialogService.confirmDialog("Are you sure you want to leave?")
        .afterClosed().subscribe((confirm) =>{
          if (confirm) {
            this.dialogRef.close();
          } else return;
        });
    } else {
      this.dialogRef.close();
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  private initialForm(): void {
    this.changeEmailForm = this.fb.group({
      email: new FormControl(this.data, []),
      otp: new FormControl(null, []),
      urlRedirect: environment.HOME_PAGE
    });
  }

  public maskMail(mail: string) {
    let mask = '';
    if (mail) {
      let index = mail.indexOf('@');
      let lengthDisplay = mail.length - index;
      let i = 1;
      if (lengthDisplay + index + 1 > lengthDisplay + 8) {
        i = mail.length - (lengthDisplay + 7);
      }
      for (i; i <= mail.length - lengthDisplay -2; i++) {
        mask += '*';
      }
      return mask + mail.slice(mail.length - lengthDisplay -2);
    } else {
      return '';
    }
  }

  public validatorEmail(): boolean {
    this.changeEmailForm.get('email')?.addValidators([this.utils.requireValidator, Validators.maxLength(256), this.utils.checkMail]);
    this.changeEmailForm.get('email')?.updateValueAndValidity();
    if (this.changeEmailForm.get('email')?.invalid) {
      return true;
    }
    return false;
  }

  public stepEmail() {
    if (!this.validatorEmail())  {
      this.loadingDialog.showSpinner(true);
      this.maskmail = this.maskMail(this.changeEmailForm.get('email')?.value);
      this.customerService.checkMail(
        {
          email: this.changeEmailForm.get('email')?.value
        })
        .subscribe({
          next: (res: HttpClientResponse) => {
            this.loadingDialog.showSpinner(false);
            if (res.data) {
              this.otpModel = res.data;
              this.nexStep(1);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.loadingDialog.showSpinner(false);
            if (err.error.meta.code === "BKE00026") {
              this.dialogService.customMessage('error', "common.message.email-duplicate");
            }
            if (err.error.meta.code === "BKE00028") {
              this.dialogService.customMessage('error', "screen.profile.message.exist-email");
            }
          }
        });
    }

  }

  public validatorOtp(): boolean {
    this.changeEmailForm.get('otp')?.addValidators([this.utils.requireValidator,  Validators.maxLength(6), this.utils.validateFaxPhonePostCode]);
    this.changeEmailForm.get('otp')?.updateValueAndValidity();
    if (this.changeEmailForm.get('otp')?.invalid) {
      return true;
    }
    return false;
  }

  public stepOtp() {
    if (!this.validatorOtp())  {
      this.verifyOTP();
    }

  }


  public verifyOTP() {
    const data = {
      id: this.otpModel.id,
      expired: this.otpModel.expired,
      otp: this.changeEmailForm.get('otp')?.value
    };

    this.loadingDialog.showSpinner(true);
    this.commonService.verifyOtp(data).subscribe((result: Object) => {

      this.loadingDialog.showSpinner(false);
      const resultCode = this.checkResultOtp(result);
      switch (resultCode) {
        case 'BKE00003':
          this.dialogService.customMessage(
            'error',
            'screen.login.verify-otp-msg'
          );
          return;
        case 'BKE00004':
          this.dialogService.customMessage(
            'error',
            'screen.login.verify-otp-invalid'
          );
          return;
        case 'BKE00005':
          this.dialogService.customMessage(
            'error',
            'screen.login.verify-otp-expired'
          );
          return;
        default:
          break;
      }
      this.updateEmail();
    });
  }

  public updateEmail() {
    this.loadingDialog.showSpinner(true);
    this.customerService.updateEmailCustomer({email: this.changeEmailForm.get('email')?.value}).subscribe({
      next: (res: HttpClientResponse) => {
        this.loadingDialog.showSpinner(false);
        if (res.meta.code === "200") {
          //this.dialogService.customMessage('success', "screen.profile.message.change-email-success");
          this.dialogRef.close(res);
          this.toaster.show('success', 'Success', 'Your email has been changed.');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loadingDialog.showSpinner(false);
        //this.dialogService.customMessage('error', "screen.profile.message.change-email-failed");
        this.toaster.show('error', 'Error', "Can't changed your email.");
      }
    });
  }
  private checkResultOtp(data: Object): string {
    let resultCode;
    Object.entries(data).find(([key, value]) => {
      if (key === 'meta') {
        Object.entries(value).find(([key, value]) => {
          if (key === 'field') {
            resultCode = value;
          }
        });
      }
    });
    return resultCode || '';
  }

  // ----------- action step----------------
  public nexStep(step: number): void {
    switch (step) {
      case 1:
        this.screen1 = false;
        this.screen2 = true;
        break;
    }
  }
  public previousStep(step: number): void {
    switch (step) {
      case 1:
        this.screen1 = true;
        this.screen2 = false;
        break;
    }
  }

  public replaceName(value: string): void {
    this.changeEmailForm.controls[value].setValue(this.changeEmailForm.get(value)?.value.replace(/[^0-9]+/g, ""));
  }

}
