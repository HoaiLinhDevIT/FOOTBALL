import { HttpClientResponse } from './../../../core/models/http-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from './../../../layout/services/common.service';
import { HttpClientOtpResponse, OtpModel } from './../../models/login.model';
import { RegisterService } from '@auth/services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryModel, HttpClientCountryResponse } from '@auth/models/register.model';
import { ForgotPasswordService } from '@auth/services/forgot-password.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';

@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.scss']
})
export class ChangePhoneComponent implements OnInit {
  public utils = Utils;
  public isOtp: boolean = false;
  public listCountry: Array<CountryModel> = [];
  public phoneForm: FormGroup = new FormGroup({});
  private otpModel!: OtpModel;

  public constructor(
    private router: Router,
    private routeActivate: ActivatedRoute,
    public fb: FormBuilder,
    public services : ForgotPasswordService,
    public dialogService : DialogConfirmService,
    public registerService: RegisterService,
    private commonService: CommonService
  ) { }

  public ngOnInit(): void {
    this.intitialForm();
    this.getCountry();
    }

  private getCountry(): void {
    this.registerService
      .getListCountry()
      .subscribe((res: HttpClientCountryResponse) => {
        Object.entries(res).map((e) => {
          const contryModel: CountryModel = {
            countryId: e[1].countryId,
            countryName: e[1].countryName,
            decription: e[1].decription
          };
          this.listCountry.push(contryModel);
        });
      });
  }

  public intitialForm(){
    this.phoneForm = this.fb.group({
      phone : new FormControl(null, []),
      faxCodePhone: new FormControl(null, []),
      codePhone: new FormControl(null, [])
    });
  }
  public validatorPhone(): void{
    this.phoneForm.get('phone')?.setValidators([this.utils.requireValidator, this.utils.validatePhoneNumber , Validators.maxLength(15)]);
    this.phoneForm.get('phone')?.updateValueAndValidity();
    if (this.phoneForm.controls['phone']?.invalid) return;
  }
  
  public submit(): void {

    this.phoneForm.get('phone')?.addValidators([Validators.required, this.utils.validatePhoneNumber, Validators.maxLength(15)]);
    this.phoneForm.get('phone')?.updateValueAndValidity();
    this.phoneForm.get('codePhone')?.addValidators([Validators.required]);
    this.phoneForm.get('codePhone')?.updateValueAndValidity();
    if(this.phoneForm.invalid){
      return;
    }
    if(this.phoneForm.valid){
      if (this.phoneForm.get('codePhone')?.value && this.phoneForm.get('phone')?.value) {
        let phoneNumber = this.phoneForm.get('codePhone')?.value + this.phoneForm.get('phone')?.value;
        this.commonService.sendOtp(phoneNumber).subscribe({
          next: (res: HttpClientOtpResponse) => {
            this.otpModel = res.data;
            this.isOtp = true;
          },
          error: () => {
            this.dialogService.customMessage('error', 'Your phone number is not a valid phone number');
            return;
          }
        });
      }
    }
  }

  public verifyOtp():void{
    this.phoneForm.get('faxCodePhone')?.addValidators([this.utils.requireValidator, this.utils.validateFaxPhonePostCode]);
    this.phoneForm.get('faxCodePhone')?.updateValueAndValidity();
    if (this.phoneForm.get('faxCodePhone')?.invalid) {
      return;
    }
    this.verifyOTP();
  }

  public verifyOTP(): void{
    const data = {
      id: this.otpModel.id,
      expired: this.otpModel.expired,
      otp: this.phoneForm.get('faxCodePhone')?.value
    };

    this.commonService.OtpVefification(data).subscribe((result: Object) => {
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
      this.changePhoneNumber();
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


  
  private changePhoneNumber():void{
    const data = {
      phone: this.phoneForm.get('phone')?.value,
      activatedToken: this.routeActivate.snapshot.params['userId']
    };
    this.services.changePhone(data).subscribe((res: HttpClientResponse| HttpErrorResponse) =>{
      if((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200){
        return;
      }
      if((res as HttpClientResponse) && (res as HttpClientResponse).meta.code === "200"){
        this.dialogService.customMessage('success','');
      }
    });
  }



  public replaceName(value: string): void {
    this.phoneForm.controls[value].setValue(this.phoneForm.get(value)?.value.replace(/[^0-9]+/g, ""));
  }

  public maskPhone(phone: string) {
    let mask = '';
    if (phone) {
      for (let i = 1; i <= phone.length - 2; i++) {
        mask += '*';
      }
      return mask + phone.slice(phone.length - 2);
    } else {
      return '';
    }
  }
  public validatorPhoneCode() {
    this.phoneForm.get('faxCodePhone')?.addValidators([this.utils.requireValidator, this.utils.validateFaxPhonePostCode]);
    this.phoneForm.get('faxCodePhone')?.updateValueAndValidity();
    if (this.phoneForm.get('faxCodePhone')?.invalid) {
      return;
    }
  }
}
