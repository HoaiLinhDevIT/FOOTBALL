/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { CustomerService } from "@auth/services/customer.service";
import { AddressService } from "@auth/services/address.service";
import { RolesModel } from "@common/models/role.model";
import { DialogConfirmService } from "@common/services/dialog-confirm.service";
import { Utils } from "@common/utils/utils";
import { SellerService } from "@auth/services/seller.service";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpClienSellerCreateResponse, SellerResponse } from "@auth/models/seller.model";
import { ToasterService } from "@common/components/toaster/toaster.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-exporter',
  templateUrl: './register-exporter.component.html',
  styleUrls: ['./register-exporter.component.scss']
})
export class RegisterExporterComponent implements OnInit {
  public SellerGroup: FormGroup = new FormGroup({});
  public isDisable?: boolean;
  public showPassword: boolean = false;
  public showCfPassword: boolean = false;
  public utils = Utils;
  public Tinh: any;
  public Huyen: any;
  public Xa: any;
  public constructor(
    private sellerSv: AddressService,
    private address: FormBuilder,
    private customerService: CustomerService,
    private dialogService: DialogConfirmService,
    private svSeller: SellerService,
    private toaster: ToasterService,
    private router: Router
  ) { }
  public ngOnInit(): void {
    this.initdata();
    this.getAddress();
  };
  public initdata(initData?: any): void {
    this.SellerGroup = this.address.group({
      userId: new FormControl({
        value: initData ? initData.userId : null,
        disabled: true
      }),
      companyName: new FormControl(null, []),
      mail: new FormControl(null, []),
      phoneCompany: new FormControl(null, []),
      address11: new FormControl(null, []),
      address12: new FormControl(null, []),
      address13: new FormControl(null, []),
      password: new FormControl(null, []),
      cfpassword: new FormControl(null, []),
      role: new FormControl(RolesModel.EXPORTER),
      updateDate: new FormControl(initData ? initData.updateDate : null),
      createDate: new FormControl(initData ? initData.createDate : null)
    });
  }

  public togglePassWord(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleCfPassWord(): void {
    this.showCfPassword = !this.showCfPassword;
  }

  public getAddress() {
    this.sellerSv.test().subscribe((res: any) => {

      this.Tinh = res.data;
      console.log(this.Tinh);
    });
  }

  public selectItem(item: any): void {
    // console.log(item.target.value);
    this.Tinh.forEach((element: any) => {
      if (element.name === item.target.value) {
        console.log(element);
        this.Huyen = element.listDistricts;
      }
    });
  }
  public selectXa(item: any): void {
    this.Huyen.forEach((element: any) => {
      if (element.name === item.target.value) {
        console.log(element);
        this.Xa = element.listWards;
      }
    });
  }

  public isDisableButton(): void {
    if (this.SellerGroup.get('mail')?.valid && this.SellerGroup.get('companyName')?.valid && this.SellerGroup.get('password')?.valid &&
      this.SellerGroup.get('cfpassword')?.valid && this.SellerGroup.get('phoneCompany')?.valid &&
      this.SellerGroup.get('mail')?.value !== null && this.SellerGroup.get('companyName')?.value !== null && this.SellerGroup.get('password')?.value !== null
      && this.SellerGroup.get('cfpassword')?.value !== null && this.SellerGroup.get('phoneCompany')?.value !== null) {
      this.isDisable = true;
    }
  }

  public verifyMail() {
    this.SellerGroup.get('mail')?.setValidators([this.utils.requireValidator, this.utils.checkMail]);
    this.SellerGroup.get('mail')?.updateValueAndValidity();
    if (this.SellerGroup.get('mail')?.invalid) {
      this.isDisable = false;
      return;
    }
    this.customerService.checkIsExistMail({ mail: this.SellerGroup.get('mail')?.value })
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

  public verifyUserName() {
    this.SellerGroup.get('companyName')?.setValidators([this.utils.requireValidator, this.utils.checkUserName]);
    this.SellerGroup.get('companyName')?.updateValueAndValidity();
    if (this.SellerGroup.get('companyName')?.invalid) {
      this.isDisable = false;
      return;
    } else this.isDisableButton();
  }

  public verifyPhone() {
    this.SellerGroup.get('phoneCompany')?.setValidators([this.utils.requireValidator, this.utils.validatePhoneNumber]);
    this.SellerGroup.get('phoneCompany')?.updateValueAndValidity();
    if (this.SellerGroup.get('phoneCompany')?.invalid) {
      this.isDisable = false;
      return;
    } else this.isDisableButton();
  }

  public validatorPass() {
    this.SellerGroup.get('password')?.setValidators([this.utils.requireValidator, this.utils.checkPassword]);
    this.SellerGroup.get('password')?.updateValueAndValidity();
    if (this.SellerGroup.get('password')?.invalid) {
      this.isDisable = false;
      return;
    } else this.isDisableButton();
  }

  public validatorCfPass() {
    this.SellerGroup.get('cfpassword')?.setValidators([this.utils.requireValidator]);
    this.SellerGroup.get('cfpassword')?.updateValueAndValidity();
    if (this.SellerGroup.get('cfpassword')?.invalid) {
      this.isDisable = false;
      return;
    }
    if (this.SellerGroup.get('cfpassword')?.value !== this.SellerGroup.get('password')?.value) {
      this.SellerGroup.get('cfpassword')?.setValidators([this.utils.wrongCfPassword]);
      this.SellerGroup.get('cfpassword')?.updateValueAndValidity();
      if (this.SellerGroup.get('cfpassword')?.value !== this.SellerGroup.get('password')?.value) {
        this.isDisable = false;
        return;
      }
    }
    if (this.SellerGroup.get('cfpassword')?.invalid) {
      this.isDisable = false;
      return;
    } else this.isDisableButton();
  }


  public createSeller(): void {

    this.svSeller.createSeller(this.SellerGroup.value).subscribe((res: HttpClienSellerCreateResponse | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Đăng ký thất bại');
        const response = res as HttpErrorResponse;
      } else {

        const response = res as HttpClienSellerCreateResponse;

        if (response.meta.code === 'BKE00041' && response.meta.field === '400') {
          // this.SellerGroup.get('email')?.setErrors({ emailExisted: true });
          this.toaster.show('error', 'Thất Bại', 'Đăng ký thất bại');
        } else {
          this.initdata(response.data as SellerResponse);
          this.toaster.show('success', 'Thành Công', 'Đăng ký thành công');
          this.router.navigate(['auth/login']);


        }
      }

    });
  }
}
