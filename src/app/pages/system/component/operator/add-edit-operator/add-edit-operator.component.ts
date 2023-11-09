/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { RolesModel } from '@common/models';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { LanguageService } from '@core/services';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { OperatorService } from '../../../http-services';
import { HttpClienGetOperatorByIdResponse, HttpClienOperatorCreateResponse, OperatorModel, OperatorResponse } from '../../../models/operator.model';

@Component({
  selector: 'app-add-edit-operator',
  templateUrl: './add-edit-operator.component.html',
  styleUrls: ['./add-edit-operator.component.scss']
})
export class AddEditOperatorComponent implements OnInit {
  public response?: HttpClienGetOperatorByIdResponse;
  public showPassword: boolean = false;
  public showCfPassword: boolean = false;
  public operatorGroup: FormGroup = new FormGroup({});
  public utils = Utils;
  public isDisable?: boolean;
  public title!: string;
  public constructor(
    private toaster: ToasterService,
    private ope: FormBuilder,
    public operatorService: OperatorService,
    private toastr: ToastrService,
    private languageService: LanguageService,
    private dialogService: DialogConfirmService,
    public dialogOp: MatDialogRef<AddEditOperatorComponent>,
    @Inject(MAT_DIALOG_DATA) private dataRow: OperatorModel

  ) { }

  public ngOnInit(): void {
    this.initForm();
    if (this.dataRow) {
      this.title = "screen.operator-system.title-update";
    } else { this.title = "screen.operator-system.title"; }

    if (this.dataRow) {
      this.operatorGroup.get('email')?.setValue(this.dataRow.email);
      this.operatorGroup.get('userName')?.setValue(this.dataRow.userName);
      this.operatorGroup.get('acl')?.setValue(this.dataRow.acl);
      this.operatorGroup.get('description')?.setValue(this.dataRow.description);
    }
  }


  public initForm(initData?: OperatorResponse): void {
    this.operatorGroup = this.ope.group({
      userId: new FormControl(this.dataRow ? this.dataRow.userId : null),
      userName: new FormControl(null, []),
      role: new FormControl(RolesModel.ADMIN),
      email: new FormControl(null, []),
      password: new FormControl(null, []),
      cfpassword: new FormControl(null, []),
      description: new FormControl(null, []),
      updateDate: new FormControl(initData ? initData.updateDate : null),
      urlRedirect: environment.HOME_PAGE
    });
  }

  public closeDialog(): void {
    this.dialogOp.close();
  }

  public togglePassWord(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleCfPassWord(): void {
    this.showCfPassword = !this.showCfPassword;
  }

  //close update
  public closeDialogUpdate(): void {
    if (this.operatorGroup.get('email')?.value !== this.dataRow.email || this.operatorGroup.get('userName')?.value !== this.dataRow.userName ||
      this.operatorGroup.get('description')?.value !== this.dataRow.description) {
      this.dialogService.confirmDialog('Bạn có muốn đóng').afterClosed().subscribe((x: boolean) => {
        if (x) {
          this.closeDialog();
        }

      });
    }
    else this.closeDialog();
  }

  //close create
  public closeDialogCreate(): void {
    if (this.operatorGroup.get('email')?.value !== null || this.operatorGroup.get('userName')?.value !== null ||
      this.operatorGroup.get('password')?.value !== null || this.operatorGroup.get('cfpassword')?.value !== null) {
      this.dialogService.confirmDialog('Bạn có muốn đóng').afterClosed().subscribe((x: boolean) => {
        if (x) {
          this.closeDialog();
        }

      });
    }
    else this.closeDialog();
  }

  public afterCloseDialog(): void {
    if (this.dataRow) {
      this.closeDialogUpdate();
    } else {
      this.closeDialogCreate();
    }
  }

  public saveUser(): void {
    if (this.dataRow) {
      this.updateOperator();
    } else {
      this.createNewOperator();
    }
  }

  //mail
  public verifyMail() {
    this.operatorGroup.get('email')?.setValidators([this.utils.requireValidator, this.utils.checkMail]);
    this.operatorGroup.get('email')?.updateValueAndValidity();
    if (this.operatorGroup.get('email')?.invalid) {
      this.isDisable = false;
      return;
    }
    if (this.dataRow) {
      if (this.operatorGroup.get('email')?.value !== this.dataRow.email) {

        this.operatorService.checkIsExistMail({ email: this.operatorGroup.get('email')?.value })
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
      this.isDisable = false;
    }
    else {
      this.operatorService.checkIsExistMail({ email: this.operatorGroup.get('email')?.value })
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


  }

  //userName
  public verifyUserName() {
    this.operatorGroup.get('userName')?.setValidators([this.utils.requireValidator, this.utils.checkUserName]);
    this.operatorGroup.get('userName')?.updateValueAndValidity();
    if (this.operatorGroup.get('userName')?.invalid) {
      this.isDisable = false;
      return;
    } else this.isDisableButton();
    if (this.dataRow) {
      if (this.operatorGroup.get('userName')?.value !== this.dataRow.userName) {
        this.isDisableButton();
      }
      else this.isDisable = false;
    }

  }

  public validatorPass() {
    this.operatorGroup.get('password')?.setValidators([this.utils.requireValidator, this.utils.checkPassword]);
    this.operatorGroup.get('password')?.updateValueAndValidity();
    if (this.operatorGroup.get('password')?.invalid) {
      this.isDisable = false;
      return;
    } else this.isDisableButton();
  }

  public validatorCfPass() {
    this.operatorGroup.get('cfpassword')?.setValidators([this.utils.requireValidator]);
    this.operatorGroup.get('cfpassword')?.updateValueAndValidity();
    if (this.operatorGroup.get('cfpassword')?.invalid) {
      this.isDisable = false;
      return;
    }
    if (this.operatorGroup.get('cfpassword')?.value !== this.operatorGroup.get('password')?.value) {
      this.operatorGroup.get('cfpassword')?.setValidators([this.utils.wrongCfPassword]);
      this.operatorGroup.get('cfpassword')?.updateValueAndValidity();
      if (this.operatorGroup.get('cfpassword')?.value !== this.operatorGroup.get('password')?.value) {
        this.isDisable = false;
        return;
      }
    }
    if (this.operatorGroup.get('cfpassword')?.invalid) {
      this.isDisable = false;
      return;
    } else this.isDisableButton();
  }

  //description
  public verifyDescription() {
    if (this.dataRow) {
      if (this.operatorGroup.get('description')?.value !== this.dataRow.description) {
        this.isDisableButton();
      }
      else this.isDisable = false;
    }
  }


  public isDisableButton(): void {
    if (this.operatorGroup.get('email')?.valid && this.operatorGroup.get('userName')?.valid &&
      this.operatorGroup.get('email')?.value !== null && this.operatorGroup.get('userName')?.value !== null) {
      this.isDisable = true;
    }
  }
  public createNewOperator(): void {


    this.operatorService.createOperator(this.operatorGroup.value).subscribe((res: HttpClienOperatorCreateResponse | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất bại', 'Đăng ký thất bại');
        const response = res as HttpErrorResponse;
      } else {

        const response = res as HttpClienOperatorCreateResponse;

        if (response.meta.code === 'BKE00041' && response.meta.field === '400') {
          this.operatorGroup.get('email')?.setErrors({ emailExisted: true });
          this.toaster.show('error', 'Thất bại', 'Đăng ký thất bại');
        } else {
          this.initForm(response.data as OperatorResponse);
          this.toaster.show('success', 'Thành công', 'Đăng ký thành công');
          this.closeDialog();

        }
      }

    });




  }

  public updateOperator(): void {
    this.operatorService.updateOperator(this.operatorGroup.value).subscribe((res: HttpClienOperatorCreateResponse | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất bại', 'Đăng ký thất bại');
        const response = res as HttpErrorResponse;
      } else {

        const response = res as HttpClienOperatorCreateResponse;

        if (response.meta.code === 'BKE00041' && response.meta.field === '400') {
          this.operatorGroup.get('email')?.setErrors({ emailExisted: true });
          this.toaster.show('error', 'Thất bại', 'Đăng ký thất bại');
        } else {
          this.initForm(response.data as OperatorResponse);
          this.toaster.show('success', 'Thành công', 'Lưu thông tin thành công');
          this.closeDialog();
        }
      }
    });
  }
}



