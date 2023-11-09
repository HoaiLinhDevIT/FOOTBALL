import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordService } from '@auth/services/forgot-password.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { HttpClientResponse } from '@core/models/http-response.model';

@Component({
  selector: 'app-email-vertification',
  templateUrl: './email-vertification.component.html',
  styleUrls: ['./email-vertification.component.scss']
})
export class EmailVertificationComponent implements OnInit {
  public invalidEmail: boolean = false;
  public emailVertificationForm: FormGroup = new FormGroup({});
  public utils = Utils;
  public isEmail = true;
  public isSuccess = true;

  public constructor(
    private fb: FormBuilder,
    private dialogService: DialogConfirmService,
    private service: ForgotPasswordService,
    public dialogRef: MatDialogRef<EmailVertificationComponent>
    
  ) { }

  public ngOnInit(): void {
    this.initialForm();
  }
  private initialForm(): void {
    this.emailVertificationForm = this.fb.group({
      email: new FormControl(null, [Validators.required, this.utils.checkMail])
    });
  }

  public dissmiss(): void {
    this.dialogRef.close();
  }

  public validatorEMail(): void{
    this.emailVertificationForm.get('email')?.setValidators([this.utils.requireValidator, this.utils.checkMail]);
    this.emailVertificationForm.get('email')?.updateValueAndValidity();
    if (this.emailVertificationForm.controls['email']?.invalid) 
      return;
  }

  public submitForm(): void {
    if(this.emailVertificationForm.invalid){
      return;
    }
    if( this.emailVertificationForm.valid){
      this.service.sendLinkVertification(this.emailVertificationForm.get('email')?.value).subscribe((res: HttpClientResponse | HttpErrorResponse) => {
        if((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200){
          const response = res as HttpErrorResponse;
            if(response.error.meta.code === "BKE00019"){
              this.dialogService.customMessage("error",'');
            }
            if(response.error.meta.code === "BKE00020"){
              this.dialogService.customMessage("error",'Account not found');
            }
          }
        if((res as HttpClientResponse) && (res as HttpClientResponse).meta.code === "200"){
          this.isSuccess = false;
        }
      });
    }
  }
}
