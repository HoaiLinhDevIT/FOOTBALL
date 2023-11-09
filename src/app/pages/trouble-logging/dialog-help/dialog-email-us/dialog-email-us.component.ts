/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordService } from '@auth/services/forgot-password.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { HttpClientResponse } from '@core/models';

@Component({
  selector: 'app-dialog-email-us',
  templateUrl: './dialog-email-us.component.html',
  styleUrls: ['./dialog-email-us.component.scss']
})
// to use captch in angular you have to instal
export class DialogEmailUsComponent implements OnInit  {
  public aFormGroup!: FormGroup;
 
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public filename: string = "";
  public isDisable?: boolean;
  public filehelp!: any;
  public isSelectFile: boolean = true;
  public siteKey: string = '6LeCMnQiAAAAAOf9FPy84dccMDDsQ1b_wJNyHuAj';
 
  public theme: 'dark' | 'light' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio' = 'audio';
  public utils = Utils;

 
  public constructor(
    private fb: FormBuilder,
    private dialogService: DialogConfirmService,
    private service: ForgotPasswordService,
    public dialogRef: MatDialogRef<DialogEmailUsComponent>,
    public dialog : MatDialog
    ) {}
 
  public ngOnInit() {
    this.initialForm();
  }

  public dissmiss(): void {
    this.dialogRef.close();
  }

  private initialForm(): void{
    this.aFormGroup = this.fb.group({
      email: new FormControl(null, [Validators.required, this.utils.checkMail]),
      detail: new FormControl(null, [Validators.required]),
      recapcha: new FormControl(null, [Validators.required]),
      fileupload: new FormControl(null, [Validators.maxLength(255)])
    });
  }

  public validatorEMail(){
    this.aFormGroup.get('email')?.setValidators([this.utils.requireValidator, this.utils.checkMail]);
    this.aFormGroup.get('email')?.updateValueAndValidity();
    if (this.aFormGroup.controls['email']?.invalid) {
      this.isDisable = false;
      return;
    }
    this.isDisableButton();
  }

  public validatorDetail(){
    this.aFormGroup.get('detail')?.setValidators([Validators.required]);
    this.aFormGroup.get('detail')?.updateValueAndValidity();
    if(this.aFormGroup.controls['detail'].invalid){
      this.isDisable = false;
      return;
    }
    this.isDisableButton();
  }
  

  public submit(){
    const data = {
      mail : this.aFormGroup.get('email')?.value,
      detail : this.aFormGroup.get('detail')?.value,
      filehelp: this.filename
    };

    this.aFormGroup.get('email')?.setValidators([this.utils.requireValidator, this.utils.checkMail]);
    this.aFormGroup.get('email')?.updateValueAndValidity();

    this.aFormGroup.get('detail')?.setValidators([Validators.required]);
    this.aFormGroup.get('detail')?.updateValueAndValidity();

    if(this.aFormGroup.get('email')?.setValidators([this.utils.requireValidator, this.utils.checkMail])) return;
    if(this.aFormGroup.valid){
      this.service.emailUs(data, this.filehelp).subscribe((res : HttpClientResponse | HttpErrorResponse) => {
        if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200){
          if((res as HttpErrorResponse).error.meta.code === 'BKE00019')
            this.dialogService.customMessage('error','screen.trouble-loggin.dialog-email-us.error'); 
        } 
        if((res as HttpClientResponse) && (res as HttpClientResponse).meta.code === "200") {
            this.dialogService.customMessage('success','screen.trouble-loggin.dialog-email-us.success');
            this.dissmiss();
        }
      });
    }
  }
  public isDisableButton():void{
    if(this.aFormGroup.get('email')?.valid && this.aFormGroup.get('detail')?.valid && this.aFormGroup.get('recapcha')?.valid)
      this.isDisable = true;
  }

  public thecallback(): void{
    this.isDisableButton();
  }

  public deleteFile(): void{
    this.isSelectFile = true;
    this.filename = "";
    this.aFormGroup.controls['fileupload'].setValue('');
  }

  public validateFileType1(event: any){
    const target = event.target as HTMLInputElement;
    let fileName = '';
    if (target.files && target.files.length > 0) {
      fileName = target.files[0].name;
    }
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if ((extFile === "png" || extFile === "jpg" || extFile === "jpeg" || extFile === "pdf") && event.target.files[0].size < 1048576) {
      this.filehelp = event.target.files[0];
      this.filename = event.target.files[0].name;
      this.isSelectFile = false;
    } else {
      this.dialogService.customMessage('error', 'common.message.error-upload-file');
    }
  }
}
