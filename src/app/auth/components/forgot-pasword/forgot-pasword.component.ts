import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '@auth/services/forgot-password.service';
import { Utils } from '@common/utils/utils';
import { HttpClientResponse } from '@core/models/http-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { LoadingSpinnerDialogService } from '@layout/services';


@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.component.html',
  styleUrls: ['./forgot-pasword.component.scss']
})
export class ForgotPaswordComponent implements OnInit {
  public invalidEmail: boolean = false;
  public forgotPasswordForm: FormGroup = new FormGroup({});
  public utils = Utils;
  public isForgot: Boolean = true;

  public constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private dialogService: DialogConfirmService,
    private loadingDialog: LoadingSpinnerDialogService
    
  ) { }

  public ngOnInit(): void {
    this.initialForm();
  }
  private initialForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl(null, [Validators.required, this.utils.checkMail])
    });
  }

  public validatorEMail():void {
    this.forgotPasswordForm.get('email')?.setValidators([this.utils.requireValidator, this.utils.checkMail]);
    this.forgotPasswordForm.get('email')?.updateValueAndValidity();
    if (this.forgotPasswordForm.controls['email']?.invalid) 
      return;
  }

  public submitForm(): void {
    if (this.forgotPasswordForm.invalid){
      return;
    }
    this.loadingDialog.showSpinner(true);
    if (this.forgotPasswordForm.valid) {
    this.forgotPasswordService.forgotPassrod(this.forgotPasswordForm.get('email')?.value).subscribe((res: HttpClientResponse | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200){
        const response = res as HttpErrorResponse;

          if (response.error.meta.code === 'BKE00019') {
            this.dialogService.customMessage('error','screen.forgot-password.forgot-error');
          }
          if (response.error.meta.code === 'BKE00043') {
            this.dialogService.customMessage('error','');
          }
        this.loadingDialog.showSpinner(false);
    } 
      if((res as HttpClientResponse)?.meta && (res as HttpClientResponse).meta.code === "200") {
        this.isForgot = false;
        this.loadingDialog.showSpinner(false);
      }
    });
  }
  }
}
