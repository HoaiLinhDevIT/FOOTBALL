/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { Utils } from '@common/utils/utils';
import { MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { AdminService } from '../../../http-service/admin.service';
@Component({
  selector: 'app-add-edit-remittance',
  templateUrl: './add-edit-remittance.component.html',
  styleUrls: ['./add-edit-remittance.component.scss']
})
export class AddEditRemittanceComponent implements OnInit {
  public title!: string;
  public utils = Utils;
  public listTL = this.utils.LIST_THELOAI;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;
  public group: FormGroup = new FormGroup({});
  public constructor(
    private ca: FormBuilder,
    public dialogOp: MatDialogRef<AddEditRemittanceComponent>,
    @Inject(MAT_DIALOG_DATA) private dataRow: any,
    private adminSv: AdminService,
    private toaster: ToasterService
  ) { }

  public ngOnInit(): void {
    this.initForm();
    console.log(this.dataRow);
    if (this.dataRow) {
      this.group.get('categoryName')?.setValue(this.dataRow.categoryName);
      this.group.get('roleName')?.setValue(this.dataRow.roleName);

    }
  }

  public initForm(initData?: any): void {
    this.group = this.ca.group({
      id: new FormControl(this.dataRow ? this.dataRow.id : null),
      categoryName: new FormControl(this.dataRow ? this.dataRow.categoryName : null),
      roleName: new FormControl(this.utils.LIST_THELOAI[0].value, []),
      role: new FormControl(this.utils.LIST_THELOAI[0].role, []),
      active: new FormControl("0")
    });
  }


  public closeDialog(): void {
    this.dialogOp.close();
  }

  public closeDialogUpdate(): void {

    this.closeDialog();
  }

  public closeDialogCreate(): void {

    this.closeDialog();
  }

  public afterCloseDialog(): void {
    if (this.dataRow) {
      this.closeDialogUpdate();
    } else {
      this.closeDialogCreate();
    }
  }

  public addCategory(): void {


    this.adminSv.addCategory(this.group.value).subscribe((res: any | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Thêm danh mục thất bại');
        const response = res as HttpErrorResponse;
      } else {
        const response = res as any;
        this.initForm(response.data as any);
        this.toaster.show('success', 'Thành Công', 'Thêm mới thành công');
        this.closeDialog();


      }

    });
  }

  public selectItem(item: any): void {
    this.listTL.forEach((element: any) => {
      if (element.value === item.target.value) {
        console.log(element);
        this.group.get('role')?.setValue(element.role);
      }
    });
  }

  public updateCategory(): void {
    this.adminSv.updateCategory(this.group.value).subscribe((res: any | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Chỉnh sửa thất bại');
        const response = res as HttpErrorResponse;
      } else {

        const response = res as any;
        this.initForm(response.data as any);
        this.toaster.show('success', 'Thành Công', 'Chỉnh sửa thành công');
        this.closeDialog();
      }

    });
  }

  public saveUser(): void {
    if (this.dataRow) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }
}
