import { HttpClientBankInfoResponse, BankInfoModel } from './../../../models/exporter.model';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExporterResponse, ExporterInfoModelResponse, ProfileModel } from './../../../models/exporter.model';
import { ExporterService } from 'src/app/pages/exporter/http-service/exporter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OtpModel } from '@auth/models';
import { CountryModel, HttpClientCountryResponse } from '@auth/models/register.model';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { HttpClientResponse } from '@core/models';
import { LoadingSpinnerDialogService } from '@layout/services';
import { CommonService } from '@layout/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '@common/components/toaster/toaster.service';


@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.scss']
})
export class ChangePhoneComponent implements OnInit {
  public bankModel!: HttpClientBankInfoResponse;
  public changePhoneForm: FormGroup = new FormGroup({});
  public showPassword: boolean = false;
  public showCfPassword: boolean = false;
  public utils = Utils;
  public validPassword: boolean = false;
  private otpModel!: OtpModel;
  public screen1 = true;
  public screen2 = false;
  public screen3 = false;
  public screen4 = false;
  public maskphone?: string;
  public listCountry: Array<CountryModel> = [];



  public constructor(
    public fb: FormBuilder,
    public router: Router,
    public dialogService: DialogConfirmService,
    public toast: ToastrService,
    private commonService: CommonService,
    public exporterService: ExporterService,
    public dialogRef: MatDialogRef<ChangePhoneComponent>,
    public toaster: ToasterService,
    public loadingDialog: LoadingSpinnerDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogRef.backdropClick().subscribe(() => {
      this.onNoClick();
    });
}

  public ngOnInit(): void {
    console.log(this.data.phonePersonal);
    this.initialForm();
    this.getCountry();
  }

  public onNoClick(): void {
    if (this.changePhoneForm.get('phone')?.value ) {
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

  public close(): void {
    this.dialogRef.close();
  }

  public maskPhone(phone: string) {
    let mask = '';
    if (phone) {
      for (let i = 1; i <= phone.length - 4; i++) {
        mask += '*';
      }
      return mask + phone.slice(phone.length - 4);
    } else {
      return '';
    }
  }

  private initialForm(): void {
    this.changePhoneForm = this.fb.group({
      phone: new FormControl(null, []),
      otp: new FormControl(null, []),
      codePhone: new FormControl(null, [])
    });
  }

  private getCountry(): void {
    this.exporterService
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

        let coutryIdDefault = this.listCountry.find((l) => {
          return l.countryName === this.data.countryName;
        })?.countryId;
        this.changePhoneForm.get('codePhone')?.setValue(coutryIdDefault ? coutryIdDefault : this.listCountry[0].countryId);
      });
  }


  public validatorPhone(): boolean {
    this.changePhoneForm.get('phone')?.addValidators([this.utils.requireValidator, Validators.maxLength(15), this.utils.validatePhoneNumber]);
    this.changePhoneForm.get('phone')?.updateValueAndValidity();
    if (this.changePhoneForm.get('phone')?.invalid) {
      return true;
    }
    return false;
  }


  public stepPhone() {
    if (!this.validatorPhone()) {
      this.loadingDialog.showSpinner(true);
      this.maskphone = this.maskPhone(this.changePhoneForm.get('phone')?.value);
      this.exporterService.verifyPhone(
        {
          phone: this.changePhoneForm.get('phone')?.value,
          codePhone: this.changePhoneForm.get('codePhone')?.value
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
              this.dialogService.customMessage('error', "screen.profile.message.phone-same-old-phone");
            }
            if (err.error.meta.code === "BKE00028") {
              this.dialogService.customMessage('error', "screen.profile.message.exist-phone");
            }
          }
        });
    }
  }

  public validatorOtp(): boolean {
    this.changePhoneForm.get('otp')?.addValidators([this.utils.requireValidator, this.utils.validateFaxPhonePostCode]);
    this.changePhoneForm.get('otp')?.updateValueAndValidity();
    if (this.changePhoneForm.get('otp')?.invalid) {
      return true;
    }
    return false;
  }

  public stepOtp() {
    if (!this.validatorOtp()) {
      this.verifyOTP();
    }

  }


  public verifyOTP() {
    const data = {
      id: this.otpModel.id,
      expired: this.otpModel.expired,
      otp: this.changePhoneForm.get('otp')?.value
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
      this.updatePhone();
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

  public updatePhone() {
    this.loadingDialog.showSpinner(true);
    this.exporterService.updatePhoneExporter({ phone: this.changePhoneForm.get('phone')?.value, codePhone: this.changePhoneForm.get('codePhone')?.value }).subscribe({
      next: (res: HttpClientResponse) => {

        this.loadingDialog.showSpinner(false);
        if (res.meta.code === "200") {
          this.dialogRef.close(res);
          this.toaster.show('success', 'Well done!', 'Your phone number has been changed.');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loadingDialog.showSpinner(false);
        this.toaster.show('error', 'Check it out!', 'This is a error alert');
      }
    });
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
    this.changePhoneForm.controls[value].setValue(this.changePhoneForm.get(value)?.value.replace(/[^0-9]+/g, ""));
  }


}
