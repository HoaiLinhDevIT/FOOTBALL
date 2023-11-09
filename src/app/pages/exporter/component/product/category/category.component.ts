/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { Utils } from '@common/utils/utils';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public utils = Utils;
  public listTL = this.utils.LIST_THELOAI;
  public group: FormGroup = new FormGroup({});
 public  constructor(
  private ca: FormBuilder,
  public dialogOp: MatDialogRef<CategoryComponent>,
  private adminSv: AdminService,
  private toaster: ToasterService
 ) { }

  public ngOnInit(): void {
    this.initForm();

  }

  public initForm(initData?: any): void {
    this.group = this.ca.group({
      id: new FormControl(null,[]),
      categoryName: new FormControl(null,[]),
      roleName: new FormControl(this.utils.LIST_THELOAI[0].value, []),
      role: new FormControl(this.utils.LIST_THELOAI[0].role, []),
      active: new FormControl("1")
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
      this.closeDialogCreate();
  }

  public selectItem(item: any): void {
    this.listTL.forEach((element: any) => {
      if (element.value === item.target.value) {
        console.log(element);
        this.group.get('role')?.setValue(element.role);
      }
    });
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
}
