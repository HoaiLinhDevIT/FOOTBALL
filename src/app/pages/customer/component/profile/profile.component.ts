/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { MENU_SETTING_CUSTOMER, MENU_DATA_CUSTOMER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { UserDetailModel } from '@layout/models/user.model';
import { CustomerService } from '../../http-service/customer.service';
import { CustomerInfoModelResponse, HttpClientCustomerInfoResponse } from '../../models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LoadingSpinnerDialogService } from '@layout/services';
import { CloseAccountDialogComponent } from './close-account-dialog/close-account-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeNameComponent } from './change-name/change-name.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ToasterService } from '@common/components/toaster/toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('inputBusinessLicense') public inputBusinessLicense!: ElementRef;
  @ViewChild('inputindentificationCardFill') public inputindentificationCardFill!: ElementRef;

  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_CUSTOMER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_CUSTOMER;

  public defaultAvatar: string = 'assets/images/avatar.svg';
  public userLogin!: UserDetailModel;
  public customerInfo!: CustomerInfoModelResponse;
  public phone: string = '';
  public utils = Utils;
  public mail = '';
  public editName: boolean = false;
  public editMail: boolean = false;
  public editPassword: boolean = false;
  public editPhone: boolean = false;
  public editAddress: boolean = false;
  public customerInfoForm: FormGroup = new FormGroup({});
  public customerInfoRequestForm: FormGroup = new FormGroup({});
  public popupEmail: Boolean = false;
  public userName: string = '';

  public imageIndentificationCard!: any;
  public nameDisplay: string = '';
  public emailDisplay: string = '';


  public constructor(
    private customerService: CustomerService,
    private dialogService: DialogConfirmService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public toaster: ToasterService,
    private loadingDialog: LoadingSpinnerDialogService
  ) {
  }

  public ngOnInit(): void {
    let infoUserLogin = JSON.parse(sessionStorage.getItem('user_login') || '{}');
    if (Object.keys(infoUserLogin).length !== 0) {
      this.userLogin = infoUserLogin as UserDetailModel;
      this.mail = this.userLogin.mail;
      this.getCustomerInfo();
      this.initialForm();
    }
  }

  public initialForm(): void {
    this.customerInfoForm = this.formBuilder.group({
      userId: this.userLogin.userId,
      moneyTransfer: new FormControl(false, []),
      receiveFromSeller: new FormControl(false, []),
      completionFromSeller: new FormControl(false, []),
      confirmationComplete: new FormControl(false, []),
      generalAlert: new FormControl(false, []),
      activateOtp: new FormControl(false, [])
    });
  };

  private initialRequestForm(): void {
    this.customerInfoRequestForm = this.formBuilder.group({
      userId: this.userLogin.userId,
      moneyTransfer: this.customerInfoForm.get('moneyTransfer')?.value ? '1' : '0',
      receiveFromSeller: this.customerInfoForm.get('receiveFromSeller')?.value ? '1' : '0',
      completionFromSeller: this.customerInfoForm.get('completionFromSeller')?.value ? '1' : '0',
      confirmationComplete: this.customerInfoForm.get('confirmationComplete')?.value ? '1' : '0',
      generalAlert: this.customerInfoForm.get('generalAlert')?.value ? '1' : '0',
      activateOtp: this.customerInfoForm.get('activateOtp')?.value ? '1' : '0'
    });
  }

  // Get Customer Info
  private getCustomerInfo(): void {
    this.loadingDialog.showSpinner(true);
    this.customerService
      .getCustomerInfo()
      .subscribe({
        next: (res: HttpClientCustomerInfoResponse): void => {
          if (res.data) {
            this.customerInfo = res.data;
            this.userName = res.data.userName;
            this.displayName(this.customerInfo.userName);
            this.phone = this.maskPhone(this.customerInfo.phone);
            this.customerInfoForm.patchValue({
              moneyTransfer: this.customerInfo.moneyTransfer === '1' ? true : false,
              receiveFromSeller: this.customerInfo.receiveFromSeller === "1" ? true : false,
              completionFromSeller: this.customerInfo.completionFromSeller === "1" ? true : false,
              confirmationComplete: this.customerInfo.confirmationComplete === '1' ? true : false,
              generalAlert: this.customerInfo.generalAlert === '1' ? true : false,
              activateOtp: this.customerInfo.activateOtp === '1' ? true : false
            });
            this.initialRequestForm();
          } else {
            this.dialogService.customMessage('error', 'No Data');
          }
          this.loadingDialog.showSpinner(false);
        },
        error: (err: HttpErrorResponse): void => {
          this.loadingDialog.showSpinner(false);
          this.dialogService.customMessage("error", err.error?.meta?.message);
        }
      });
  }

  // update customer
  public updateCustomerInfo(): void {
    this.loadingDialog.showSpinner(true);
    this.customerService.updateCustomerInfo(this.customerInfoRequestForm.value)
      .subscribe({
        next: (res: HttpClientCustomerInfoResponse) => {
          this.getCustomerInfo();
        },
        error: (err: HttpErrorResponse) => {
          this.loadingDialog.showSpinner(false);
          this.dialogService.customMessage('error', err.error?.meta?.message);
        }
      });
  }

  // update setting
  public onToggle(event: MatSlideToggleChange): void {
    this.customerInfoRequestForm.patchValue({
      moneyTransfer: this.customerInfoForm.get('moneyTransfer')?.value ? '1' : '0',
      receiveFromSeller: this.customerInfoForm.get('receiveFromSeller')?.value ? '1' : '0',
      completionFromSeller: this.customerInfoForm.get('completionFromSeller')?.value ? '1' : '0',
      confirmationComplete: this.customerInfoForm.get('confirmationComplete')?.value ? '1' : '0',
      generalAlert: this.customerInfoForm.get('generalAlert')?.value ? '1' : '0',
      activateOtp: this.customerInfoForm.get('activateOtp')?.value ? '1' : '0'
    });
    this.updateCustomerInfo();
  }


  // upload avatar
  public updateAvatar(file: any): void {
    this.loadingDialog.showSpinner(true);
    this.customerService.updateAvatarCutomer(file, this.userLogin.userId)
      .subscribe({
        next: (res: HttpClientCustomerInfoResponse) => {
          this.update({avatar: res.data.avatar});
          this.getCustomerInfo();
          this.toaster.show('success', 'Success', "Image update successful.");
        },
        error: (err) => {
          this.loadingDialog.showSpinner(false);
          this.dialogService.customMessage('error', err.error.meta.message);
        }
      });
  }


  public maskPhone(phone: string) {
    let mask = '';
    let codePhone = this.customerInfo.countryId.toString();
    let contentPhone = phone.replace(codePhone, '');

    if (contentPhone) {
      for (let i = 2; i <= phone.length - 4; i++) {
        mask += '*';
      }
      return contentPhone[0] + contentPhone[1] + mask + phone.slice(phone.length - 4);
    } else {
      return '';
    };
  };

  public displayName(name: string = ''): string {
    let lengthName = name.length;
    if (lengthName > 15) {
      return this.nameDisplay = name.replace(name.slice(15), '...');
    } else return this.nameDisplay = name;
  }

  public displayEmail(email: string = ''): string {
    let lengthName = email.length;
    if (lengthName > 30) {
      return email = email.replace(email.slice(0, lengthName - 30), '...');
    } else return email;
  }

  public update(value: any){
    let prevData = JSON.parse(sessionStorage.getItem('user_login') || '{}');
    Object.keys(value).forEach(function(val, key){
         prevData[val] = value[val];
    });
    sessionStorage.setItem('user_login', JSON.stringify(prevData));
}
  // select file image
  public selecFile(event: any): void {
    const target = event.target as HTMLInputElement;
    let fileName = '';
    if (target.files && target.files.length > 0) {
      fileName = target.files[0].name;
      // let reader = new FileReader();
      // reader.readAsDataURL(target.files[0]);
      // reader.onload = (events: any) => {
      //   this.urlAvatar = events.target.result;
      // };
    }
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "png" || extFile === "jpg" || extFile === "jpeg" || extFile === "jfif") {
      if (event.target.files[0].size < 5242880) {

        this.imageIndentificationCard = event.target.files[0];
        this.updateAvatar(event.target.files[0]);
        event.target.value = '';
      }else {
        this.toaster.show('error', 'Error', "Can't upload files over 5mb.");
        event.target.value = '';
      }

    } else {
      this.toaster.show('error', 'Error', "The data entered is in an incorrect format.");
      event.target.value = '';
    }
  }

  public openDialogCloseAccount(): void {
    const dialogRef = this.dialog.open(CloseAccountDialogComponent, {
      width: "28.25rem"
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public openDialogChangeEmail(): void {
    const dialogRef = this.dialog.open(ChangeEmailComponent, {
      width: "28.25rem",
      disableClose: true,
      data: this.customerInfo?.email
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.meta?.code === "200") {
        this.getCustomerInfo();
      }
    });

  }

  public openDialogChangePhone(): void {
    const dialogRef = this.dialog.open(ChangePhoneComponent, {
      width: "28.25rem",
      data: this.customerInfo?.country,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.meta?.code === "200") {
        this.getCustomerInfo();
      }
    });
  }

  public openDialogChangeName(): void {
    const dialogRef = this.dialog.open(ChangeNameComponent, {
      width: "28.25rem",
      data: this.customerInfo?.userName,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.meta?.code === "200") {
        this.getCustomerInfo();
      }
    });
  }

  public openDialogChangeAddress(): void {
    const dialogRef = this.dialog.open(ChangeAddressComponent, {
      width: "28.25rem",
      data: this.customerInfo?.address,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.meta?.code === "200") {
        this.getCustomerInfo();
      }
    });
  }
}
