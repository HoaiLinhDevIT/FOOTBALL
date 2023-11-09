import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '@auth/services/login.service';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { HttpClientResponse } from '@core/models';
import { CommonService } from '@layout/services/common.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public utils = Utils;


  public constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private loginService: LoginService,
    private commonService: CommonService,
    public dialogService: DialogConfirmService,
    public toaster: ToasterService,
    private router: Router
  ) {
    this.dialogRef.addPanelClass('change-pwd-page');
    this.dialogRef.backdropClick().subscribe(() => {
      this.closePopup();
    });
  }
  public showCurrentPassword: boolean = false;
  public showNewPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public changePasswordForm: FormGroup = new FormGroup({});

  public ngOnInit(): void {
    this.initialForm();
  }
  public initialForm(): void {
    this.changePasswordForm = this.fb.group({
      passwordNew: new FormControl(null, [Validators.required, this.utils.checkPassword]),
      passwordConfirm: new FormControl(null, [Validators.required])
    });
  }
  public togglePassWord(type: string): void {
    switch (type) {
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;

      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;

      default:
        break;
    }
  }

  public submitForm(): void {
    this.validatorPass();
    this.validatorCfPass();
    if (this.changePasswordForm.valid) {
      this.commonService.changePassword(this.changePasswordForm.value).subscribe({
        next: (res: HttpClientResponse | HttpErrorResponse) => {
          if (res as HttpClientResponse) {
            this.toaster.show('success', 'Success', 'Your password has been changed.');
            this.dialogRef.close();
            sessionStorage.removeItem('id_token');
            sessionStorage.removeItem('user_login');
            this.loginService.isLoginAsync$.next(false);
            this.router.navigate(['auth/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error?.meta?.code === 'BKE00028') {
            this.dialogService.customMessage('error', "common.message.password-duplicate");
          } else if (err.error?.meta?.code === 'BKE00026') {
            this.changePasswordForm.get('passwordConfirm')?.setErrors({ 'notMatch': true });
          }
        }
      }
      );
    }
  }

  public closePopup(): void {
    if (this.changePasswordForm.get('passwordNew')?.value || this.changePasswordForm.get('passwordConfirm')?.value) {
      this.dialogService.confirmDialog("Are you sure you want to leave?")
        .afterClosed().subscribe((confirm) => {
          if (confirm) {
            this.dialogRef.close();
          } else return;
        });
    } else {
      this.dialogRef.close();
    }
  }

  public validatorPass(): boolean {
    this.changePasswordForm.get('passwordNew')?.addValidators([this.utils.requireValidator, Validators.maxLength(32), this.utils.checkPassword]);
    this.changePasswordForm.get('passwordNew')?.updateValueAndValidity();
    if (this.changePasswordForm.get('passwordNew')?.invalid) {
      return true;
    } else return false;
  }

  public validatorCfPass(): boolean {
    this.changePasswordForm.get('passwordConfirm')?.addValidators([this.utils.requireValidator, Validators.maxLength(32)]);
    this.changePasswordForm.get('passwordConfirm')?.updateValueAndValidity();
    if (this.changePasswordForm.get('passwordConfirm')?.invalid) {
      return true;
    }
    if (this.changePasswordForm.get('passwordConfirm')?.value !== this.changePasswordForm.get('passwordNew')?.value) {
      this.changePasswordForm.get('passwordConfirm')?.setValidators([this.utils.wrongCfPassword]);
      this.changePasswordForm.get('passwordConfirm')?.updateValueAndValidity();
      if (this.changePasswordForm.get('passwordConfirm')?.value !== this.changePasswordForm.get('passwordNew')?.value) {
        return true;
      }
    }
    if (this.changePasswordForm.get('passwordConfirm')?.invalid) {
      return true;
    }
    return false;
  }

}
