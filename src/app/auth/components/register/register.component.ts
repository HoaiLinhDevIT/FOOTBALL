/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientOtpResponse, OtpModel } from '@auth/models';
import { UserModels } from '@common/models/user/user.models';
import { Utils } from '@common/utils/utils';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '@auth/services/login.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { CommonService } from '@layout/services/common.service';
import { CountryModel, HttpClientCountryResponse } from '@auth/models/register.model';
import { LoadingSpinnerDialogService } from '@layout/services';
import { environment } from '@env/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from '@auth/services/customer.service';
import { CustomerResponse, HttpClienCustomerCreateResponse } from '@auth/models/customer.model';
import { RolesModel } from '@common/models';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  public CustomerGroup: FormGroup = new FormGroup({});
  public isDisable ?: boolean ;
  public showPassword: boolean = false;
  public showCfPassword: boolean = false;
  public isExporterAccount: boolean = false;
  public screen1 = true;
  public screen2 = false;
  public screen3 = false;
  public screen4 = false;
  public screen5 = false;
  public screen6 = false;
  public registerSuccess: boolean = false;
  public registerForm: FormGroup = new FormGroup({});
  public utils = Utils;
  private otpModel!: OtpModel;
  public listCountry: Array<CountryModel> = [];
  public cfPasswrodWrong = false;

  public constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private loginService: LoginService,
    private dialogService: DialogConfirmService,
    private commonService: CommonService,
    private loadingDialog: LoadingSpinnerDialogService,
    private customerService: CustomerService,
    private cus: FormBuilder,
    private toaster:ToasterService,

    private router: Router
  ) { }

  public ngOnInit(): void {

    this.initForm();
  };

  public initForm(initData?: CustomerResponse): void{
    this.CustomerGroup = this.cus.group({
      userId: new FormControl({
        value: initData ? initData.userId : null,
        disabled: true
      }),
      userName: new FormControl(null, []),
      mail: new FormControl(null, []),
      phone: new FormControl(null,[]),
      password: new FormControl(null, []),
      cfpassword: new FormControl(null, []),
      role: new FormControl(RolesModel.USER),
      updateDate: new FormControl(initData ? initData.updateDate : null),
      createDate:new FormControl(initData ? initData.createDate : null)
    });
  }

  public togglePassWord(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleCfPassWord(): void {
    this.showCfPassword = !this.showCfPassword;
  }
  public createNewCustomer(): void {

    this.customerService.createCustomer(this.CustomerGroup.value).subscribe((res: HttpClienCustomerCreateResponse | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error','Thất Bại', 'Đăng ký thất bại');
        const response = res as HttpErrorResponse;
      } else {

        const response = res as HttpClienCustomerCreateResponse;

        if (response.meta.code === 'BKE00041' && response.meta.field === '400') {
          // this.CustomerGroup.get('email')?.setErrors({ emailExisted: true });
          this.toaster.show('error','Thất Bại', 'Đăng ký thất bại');
        } else {
          this.initForm(response.data as CustomerResponse);
          this.toaster.show('success','Thành Công', 'Đăng ký thành công');
          this.router.navigate(['auth/login']);


        }
      }

    });
  }
  public isDisableButton(): void{
    if(this.CustomerGroup.get('mail')?.valid && this.CustomerGroup.get('userName')?.valid && this.CustomerGroup.get('password')?.valid &&
    this.CustomerGroup.get('cfpassword')?.valid && this.CustomerGroup.get('phone')?.valid &&
    this.CustomerGroup.get('mail')?.value !== null && this.CustomerGroup.get('userName')?.value !== null && this.CustomerGroup.get('password')?.value !== null
    && this.CustomerGroup.get('cfpassword')?.value !== null && this.CustomerGroup.get('phone')?.value !== null){
      this.isDisable= true;
    }
  }

  public verifyMail(){
    this.CustomerGroup.get('mail')?.setValidators([this.utils.requireValidator, this.utils.checkMail]);
    this.CustomerGroup.get('mail')?.updateValueAndValidity();
     if (this.CustomerGroup.get('mail')?.invalid){
      this.isDisable = false;
      return;
     }
      this.customerService.checkIsExistMail({ mail: this.CustomerGroup.get('mail')?.value })
      .subscribe({
        error: (err) => {
          this.dialogService.customMessage('error', `common.message.register.operator.${err.error.meta.code}`);
          console.log("error");
          this.isDisable = false;
          return;
        },
        complete: () => {
          this.isDisableButton();
       }
      });
  }

  public verifyUserName(){
    this.CustomerGroup.get('userName')?.setValidators([this.utils.requireValidator, this.utils.checkUserName]);
    this.CustomerGroup.get('userName')?.updateValueAndValidity();
    if(this.CustomerGroup.get('userName')?.invalid){
      this.isDisable = false;
      return;
    } else this.isDisableButton();
  }

  public verifyPhone(){
this.CustomerGroup.get('phone')?.setValidators([this.utils.requireValidator, this.utils.validatePhoneNumber]);
this.CustomerGroup.get('phone')?.updateValueAndValidity();
if(this.CustomerGroup.get('phone')?.invalid){
  this.isDisable = false;
  return;
} else this.isDisableButton();
}

  public validatorPass() {
    this.CustomerGroup.get('password')?.setValidators([this.utils.requireValidator, this.utils.checkPassword]);
    this.CustomerGroup.get('password')?.updateValueAndValidity();
    if (this.CustomerGroup.get('password')?.invalid) {
      this.isDisable = false;
      return;
    }else this.isDisableButton();
  }

  public validatorCfPass() {
    this.CustomerGroup.get('cfpassword')?.setValidators([this.utils.requireValidator]);
    this.CustomerGroup.get('cfpassword')?.updateValueAndValidity();
    if (this.CustomerGroup.get('cfpassword')?.invalid) {
      this.isDisable = false;
      return;
    }
    if (this.CustomerGroup.get('cfpassword')?.value !== this.CustomerGroup.get('password')?.value) {
      this.CustomerGroup.get('cfpassword')?.setValidators([this.utils.wrongCfPassword]);
      this.CustomerGroup.get('cfpassword')?.updateValueAndValidity();
      if (this.CustomerGroup.get('cfpassword')?.value !== this.CustomerGroup.get('password')?.value) {
        this.isDisable = false;
        return;
      }
    }
    if (this.CustomerGroup.get('cfpassword')?.invalid) {
      this.isDisable = false;
      return;
    } else this.isDisableButton();
  }


}
