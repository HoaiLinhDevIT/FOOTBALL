import { ToasterService } from '@common/components/toaster/toaster.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  HttpClienAnotherUserLogintResponse,
  HttpClienUserLogintResponse,
  LoginModelResponse,
  UserLogin,
  HttpClientOtpResponse,
  DataUserLoginModel,
  OtpModel
} from '@auth/models';
import { LoginService } from '@auth/services/login.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { CommonService } from '@layout/services/common.service';
import { RolesModel } from '@common/models';
import { of } from 'rxjs';
import { LoadingSpinnerDialogService } from '@layout/services';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientResponse } from '@core/models';

@Component({
  selector: 'app-loggin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private tmpConstant: string = 'ESCROW-';
  public verifyOTPFlg: boolean = false;
  public showPassword: boolean = false;
  public phoneNumber: string = '';
  public loginForm: FormGroup = new FormGroup({});
  public OtpFormGroup: FormGroup = new FormGroup({});
  public user!: LoginModelResponse;
  private modelLogin!: DataUserLoginModel;
  private infoUserLogin!: Object;
  private otpModel!: OtpModel;
  public utils = Utils;
  public isLoggedin?: boolean;
  public isOtpExpoxter: boolean = false;
  public OtpExpoxter!: String ;

  public config = {
    length : 7,
    allowNumbersOnly: true,
    inputClass: 'digit-otp',
    inputStyles: {
      width:'34px',
      height:'33px'
    }
  };

  public constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dialogService: DialogConfirmService,
    private commonService: CommonService,
    private loadingDialog: LoadingSpinnerDialogService,
    private toaster: ToasterService
  ) { }

  public ngOnInit(): void {
    this.infoUserLogin = JSON.parse(sessionStorage.getItem('user_login') || '{}');
    const currentUser = sessionStorage.getItem('id_token');
    if (Object.keys(this.infoUserLogin).length !== 0 && currentUser) {
      this.router.navigate(['system/operator']);
    } else {
      sessionStorage.removeItem('user_login');
      sessionStorage.removeItem('id_token');
    }
    this.initialForm();
    console.log(this.infoUserLogin);
  }

  public togglePassWord(): void {
    this.showPassword = !this.showPassword;
  }

  public validatorEMail(): void{
    this.loginForm.get('mail')?.setValidators([this.utils.requireValidator, Validators.maxLength(255)]);
    this.loginForm.get('mail')?.updateValueAndValidity();
    if (this.loginForm.controls['mail']?.invalid) return;
  }

  public validatorPass(): void{
    this.loginForm.get('password')?.setValidators([this.utils.requireValidator]);
    this.loginForm.get('password')?.updateValueAndValidity();
    if (this.loginForm.controls['password']?.invalid) return;
  }

  public validatorOtpCode():void {
    this.OtpFormGroup.get('otpCode')?.setValidators([this.utils.requireValidator, this.utils.checkOtp]);
    this.OtpFormGroup.get('otpCode')?.updateValueAndValidity();
    if (this.OtpFormGroup.controls['otpCode']?.invalid) return;
  }

  public submitForm(): void {
    this.loginForm.get('password')?.addValidators([this.utils.requireValidator, Validators.maxLength(32)]);
    this.loginForm.get('password')?.updateValueAndValidity();
    this.loginForm.get('mail')?.addValidators([this.utils.requireValidator, Validators.maxLength(255)]);
    this.loginForm.get('mail')?.updateValueAndValidity();
    const data: UserLogin = this.loginForm.value;
    if(data.mail === '' || data.password === ''){
      this.dialogService.customMessage('error', 'common.message.login.E00003');
      return;
    }
    if (this.loginForm.invalid) {
      return;
    }
    this.loadingDialog.showSpinner(true);
    of(
      this.loginService.userLogin(data).subscribe({
        next: (loginModelResponse: LoginModelResponse) => {
          sessionStorage.removeItem('id_token');
          sessionStorage.removeItem('user_login');
          sessionStorage.setItem('id_token', loginModelResponse.access_token);
          of(
            this.loginService.getDetailUserLogin().subscribe({
              next: (res: HttpClienUserLogintResponse | HttpErrorResponse) => {
                if ((res as HttpClienUserLogintResponse).meta && ((res as HttpClienUserLogintResponse).meta.code === "201")){
                  this.loadingDialog.showSpinner(false);
                  sessionStorage.clear();
                  const dialog = this.dialogService.confirmDialog('screen.login.verify-otp-expoxter');
                  dialog.afterClosed().subscribe((confirm) => {
                    if(confirm === true){
                      this.isOtpExpoxter = true;
                    }
                    if(confirm === false){
                      this.isOtpExpoxter = false;
                    }
                  });
                }
                if ((res as HttpClienUserLogintResponse).data && ((res as HttpClienUserLogintResponse).meta.code === "200")) {
                  const response = res as HttpClienUserLogintResponse;
                    this.modelLogin = response.data;
                    if (
                      this.modelLogin.roles[0].role === RolesModel.SYSTEM ||
                      this.modelLogin.roles[0].role === RolesModel.ADMIN
                    ) {
                      sessionStorage.removeItem('user_login');
                      sessionStorage.setItem(
                        'user_login',
                        JSON.stringify(this.modelLogin)
                      );
                      this.loginService.isLoginAsync$.next(true);
                      this.router.navigate(['system/operator']);
                    } else {
                      if (this.modelLogin.activateOtp === "1"){
                        this.phoneNumber = this.modelLogin.phone;
                        this.verifyOTPFlg = true;
                        this.sendOTP();
                      }
                      else {
                        sessionStorage.removeItem('user_login');
                        sessionStorage.setItem('user_login',JSON.stringify(this.modelLogin));
                        this.loginService.isLoginAsync$.next(true);
                        this.router.navigate(['system/operator']);
                      }
                    }
                }
                if ((res as HttpErrorResponse).status){
                  if ((res as HttpErrorResponse).error.meta.code === "BKE00006"){
                    this.loadingDialog.showSpinner(false);
                    sessionStorage.clear();
                    const dialog = this.dialogService.confirmDialog('common.message.login.is-not-active');
                    dialog.afterClosed().subscribe((confirmed) => {
                      this.loadingDialog.showSpinner(true);
                      if(confirmed === true){
                        this.loginService.activatedAccount(this.loginForm.get('mail')?.value).subscribe((response : HttpClientResponse | HttpErrorResponse) => {
                            if((response as HttpClientResponse).meta){
                              this.dialogService.customMessage('success','The activation link has been sent to your email. Please check your email.');
                              this.loadingDialog.showSpinner(false);
                            }
                            if((response as HttpErrorResponse).status){
                                this.dialogService.customMessage('error','No Active Account');
                                this.loadingDialog.showSpinner(false);
                            }
                        });
                      }
                      if(confirmed === false) this.loadingDialog.showSpinner(false);
                    });

                  }
                  if((res as HttpErrorResponse).error.meta.code === "BKE00008"){
                    this.loadingDialog.showSpinner(false);
                    sessionStorage.clear();
                    this.dialogService.customMessage('error','common.message.login.is-lock');
                  }
                  if((res as HttpErrorResponse).error.meta.code === "BKE00009"){
                    this.loadingDialog.showSpinner(false);
                    sessionStorage.clear();
                    this.dialogService.customMessage('error','We have your information. Please wait for confirmation from the administrator.');
                  }
                  if((res as HttpErrorResponse).error.meta.code === "BKE00010"){
                    this.loadingDialog.showSpinner(false);
                    this.isOtpExpoxter === true;
                  }
                }
                this.loadingDialog.showSpinner(false);
              },
              error: () => {
                this.loadingDialog.showSpinner(false);
                this.dialogService.customMessage(
                  'error',
                  'common.message.login.E00004'
                );
                return;
              }
            })
          );
          this.loadingDialog.showSpinner(false);
        },
        error: () => {
          this.loadingDialog.showSpinner(false);
          this.dialogService.customMessage(
            'error',
            'common.message.login.E00002'
          );
          return;
        }
      })
    );
  }

  private initialForm(): void {
    this.loginForm = this.fb.group({
      mail: new FormControl(null, []),
      password: new FormControl(null, [])
    });
    this.OtpFormGroup = this.fb.group({
      otpCode: new FormControl(null)
    });
  }

  public signInWithFacebook(): void {
    this.loginService.FacebookAuth().then((respose) => {
      if (respose) {
        const otherInfoUser = JSON.parse(
          JSON.stringify(respose.user) || '{}'
        );
        if (otherInfoUser.email) {
          this.LoginWithSNS({email: otherInfoUser.email});
        }else{
          this.dialogService.customMessage('error', 'common.message.login.error-login');
          return;
        }
      }
    }).catch(() => {
      this.dialogService.customMessage('error', 'common.message.login.error-login');
    });
  }

  public signInWithTwitter(): void {
    this.loginService.TwitterAuth().then((respose) => {
      if (respose) {
        const profileUser = JSON.parse(
          JSON.stringify(respose.additionalUserInfo?.profile) || '{}'
        );
        if (profileUser.email) {
          this.LoginWithSNS({email: profileUser.email});
        }else{
          this.dialogService.customMessage('error', 'common.message.login.error-login');
          return;
        }
      }
    }).catch(() => {
      this.dialogService.customMessage('error', 'common.message.login.error-login');
    });
  }

  public signInWithGoogle(): void {
    this.loginService.GoogleAuth().then((respose) => {
      if (respose) {
        const otherInfoUser = JSON.parse(
          JSON.stringify(respose.user) || '{}'
        );
        if (otherInfoUser.email) {
          this.LoginWithSNS({email: otherInfoUser.email});
        }else{
          this.dialogService.customMessage('error', 'common.message.login.error-login');
          return;
        }

      }
    }).catch(() => {
      this.dialogService.customMessage('error', 'common.message.login.error-login');
    });
  }

  private LoginWithSNS(data: Object): void {
    this.loginService
      .verifyUserSNS(data)
      .subscribe(
        {
          next: (resAnotherUser: HttpClienAnotherUserLogintResponse) => {
            if (!resAnotherUser.data) {
              sessionStorage.removeItem('id_token');
              sessionStorage.removeItem('user_login');
              const dialog = this.dialogService.confirmDialog('screen.login.login-btn-confirm');
              dialog.afterClosed().subscribe((confirmed) => {
                if(confirmed === true){
                  this.router.navigate(['auth/register']);
                }
              });
              return;
            }
            const userLogin: UserLogin = {
              mail: resAnotherUser.data.mail,
              password: atob(resAnotherUser.data.ptmp).replace(
                this.tmpConstant,
                ''
              )
            };
            this.loginService
              .userLogin(userLogin)
              .subscribe({
                next: (resLoginModel: LoginModelResponse) => {
                  if (resLoginModel) {
                    sessionStorage.removeItem('id_token');
                    sessionStorage.removeItem('user_login');
                    sessionStorage.setItem('id_token', resLoginModel.access_token);
                    this.loginService
                      .getDetailUserLogin()
                      .subscribe((response: HttpClienUserLogintResponse | HttpErrorResponse) => {
                        if ((response as HttpClienUserLogintResponse).data && (response as HttpClienUserLogintResponse).meta?.code === "200") {
                          this.modelLogin = (response as HttpClienUserLogintResponse).data;
                          if (this.modelLogin.activateOtp === "1"){
                          this.phoneNumber = this.modelLogin.phone;
                          this.verifyOTPFlg = true;
                          this.sendOTP();
                          } else {
                          sessionStorage.setItem('user_login',JSON.stringify(this.modelLogin));
                          this.loginService.isLoginAsync$.next(true);
                          this.router.navigate(['system/operator']);
                          }
                        }
                        if (response as HttpErrorResponse){
                          if ((response as HttpErrorResponse).error.meta.code === "BKE00006"){
                          this.loadingDialog.showSpinner(false);
                          sessionStorage.clear();
                          const dialog = this.dialogService.confirmDialog('common.message.login.is-not-active');
                          dialog.afterClosed().subscribe((confirmed) => {
                            this.loadingDialog.showSpinner(true);
                            if(confirmed === true){
                             this.loginService.activatedAccount(resAnotherUser.data.mail).subscribe((response : HttpClientResponse | HttpErrorResponse) => {
                                if((response as HttpErrorResponse).status){
                                  this.dialogService.customMessage('error','No Active Account');
                                  this.loadingDialog.showSpinner(false);
                                }
                                if((response as HttpClientResponse).meta){

                                  this.dialogService.customMessage('success','Please check your mail');
                                  this.loadingDialog.showSpinner(false);
                                }
                             });
                            }
                            if(confirmed === false) this.loadingDialog.showSpinner(false);
                          });
                          }
                          if((response as HttpErrorResponse).error.meta.code === "BKE00008"){
                            sessionStorage.clear();
                            this.dialogService.customMessage('error','common.message.login.is-lock');
                            this.loadingDialog.showSpinner(false);
                          }
                        }
                      });
                  }
                },
                error: () => {
                  this.dialogService.customMessage('error', 'common.message.login.E00004');
                }
              });
          },
          error: () => {
            this.dialogService.customMessage('error', 'common.message.login.error-login');
          }
        }
      );
  }
  public backToLogin(): void {
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('user_login');
    this.verifyOTPFlg = false;
    this.OtpFormGroup.reset(this.OtpFormGroup.get('otpCode'));
  }

  public sendOTP(): void {
    this.commonService
      .sendOtp(this.modelLogin.phone)
      .subscribe((response: HttpClientOtpResponse) => {
        if (response.data) {
          this.otpModel = response.data;
        }
      });
  }

  public reSendOTP(): void {
    this.commonService
      .sendOtp(this.modelLogin.phone)
      .subscribe((response: HttpClientOtpResponse) => {
        if (response.data) {
          this.otpModel = response.data;
          this.dialogService.customMessage('success', 'common.message.login.I00001');
        }
      });
  }

  public checkOptOauthLogin() {
    if (this.OtpFormGroup.invalid) {
      return;
    }
    if (!this.OtpFormGroup.get('otpCode')?.value) {
      this.dialogService.customMessage('error', 'common.message.error-required');
      return;
    }
    const data = {
      id: this.otpModel.id,
      expired: this.otpModel.expired,
      otp: this.OtpFormGroup.get('otpCode')?.value
    };
    this.commonService.OtpVefification(data).subscribe((result: Object) => {
      const resultCode = this.checkResultOtp(result);
      switch (resultCode) {
        case 'BKE00003':
          this.dialogService.customMessage(
            'error',
            'common.message.login.verify-otp-msg'
          );
          return;
        case 'BKE00004':
          this.dialogService.customMessage(
            'error',
            'common.message.login.verify-otp-invalid'
          );
          return;
        case 'BKerror-login':
          this.dialogService.customMessage(
            'error',
            'common.message.login.verify-otp-expired'
          );
          return;
        default:
          break;
      }
      sessionStorage.removeItem('user_login');
      sessionStorage.setItem('user_login', JSON.stringify(this.modelLogin));
      this.loginService.isLoginAsync$.next(true);
      this.router.navigate(['system/operator']);
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

  public transformEntry(item: string): string {
    return item.slice(0, 5) + '*'.repeat(item.length - 4) + item.slice(-2);
  }
  public replaceName(): void {
    this.OtpFormGroup.controls['otpCode'].setValue(this.OtpFormGroup.get('otpCode')?.value.replace(/[^0-9]+/g, ""));
  }

  public notOtp(): void {
    this.initialForm();
    this.isOtpExpoxter = false;
  }

  public otpExporter(): void{
    const data = {
      mail : this.loginForm.get('mail')?.value,
      otp: this.OtpExpoxter
    };
    this.loadingDialog.showSpinner(true);
      if((!data.otp) || data.otp.length < this.config.length){
        this.loadingDialog.showSpinner(false);
        this.dialogService.customMessage('error','Please enter Otp');
      }
      else
      {
        this.loginService.veryfiyAccountExporter(data).subscribe((response: HttpClientResponse | HttpErrorResponse) =>  {
          console.log(response);
          if((response as HttpClientResponse).meta && (response as HttpClientResponse).meta.code === "200"){
            this.toaster.show('success', 'Success', 'Account is activated');
            this.loadingDialog.showSpinner(false);
            this.isOtpExpoxter = false;
            this.submitForm();
          }
          if((response as HttpErrorResponse).status && (response as HttpErrorResponse).status !== 200){
            this.loadingDialog.showSpinner(false);
            this.toaster.show('error', 'Error', 'Please re-enter the correct OTP code');
          }
        this.loadingDialog.showSpinner(false);
      });
    }
   }

  public onOtpChange(otp: String):void{
    this.OtpExpoxter =  otp;
  }
}
