/* eslint-disable  @typescript-eslint/no-explicit-any */
import { filter } from 'rxjs/operators';
import { AddBankComponent } from './add-bank/add-bank.component';
import { HttpClientBankInfoResponse } from './../../models/exporter.model';
import { ExporterService } from 'src/app/pages/exporter/http-service/exporter.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { ISideMenuNode } from '@layout/models/menu.model';
import { UserDetailModel } from '@layout/models/user.model';
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
import { BankInfoModel, BankInfoResponse, ExporterInfoModelResponse, HttpClientExporterInfoResponse, Zipcode } from '../../models/exporter.model';
import { MENU_DATA_EXPORTER, MENU_SETTING_EXPORTER } from '@core/config';
import { ChangeAddress2Component } from './change-address2/change-address2.component';
import { ChangeBankComponent } from './change-bank/change-bank.component';
import { ToasterService } from '@common/components/toaster/toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('inputBusinessLicense') public inputBusinessLicense!: ElementRef;
  @ViewChild('inputindentificationCardFill') public inputindentificationCardFill!: ElementRef;


  public SellerGroup: FormGroup = new FormGroup({});
  public isDisable?: boolean;
  public showPassword: boolean = false;
  public showCfPassword: boolean = false;
  public utils = Utils;
  public Tinh: any;
  public Huyen: any;
  public Xa: any;
  public constructor(

  ) { }
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_EXPORTER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_EXPORTER;

  public test: any;
  public defaultAvatar: string = 'assets/images/avatar.svg';
  public userLogin!: UserDetailModel;
  public exporterInfo!: ExporterInfoModelResponse;
  public zipCode !: Zipcode;
  public bankResponse!: Array<BankInfoModel>;
  public bankResponse1!: BankInfoModel;
  public phone: string = '';
  public phonePeronal: string = '';
  public countryName: string = '';
  public mail = '';
  public editName: boolean = false;
  public editMail: boolean = false;
  public editPassword: boolean = false;
  public editPhone: boolean = false;
  public editAddress1: boolean = false;
  public editAddress2: boolean = false;
  public exporterInfoForm: FormGroup = new FormGroup({});
  public exporterInfoRequestForm: FormGroup = new FormGroup({});
  public popupEmail: Boolean = false;

  public imageIndentificationCard!: any;

  public isHaveBank: boolean = false;


  public ngOnInit(): void {
    console.log('ac');
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





}
