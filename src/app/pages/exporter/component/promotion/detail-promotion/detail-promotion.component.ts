/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { Utils } from '@common/utils/utils';
import { ExporterService } from '../../../http-service/exporter.service';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.scss']
})
export class DetailPromotionComponent implements OnInit {
  public utils = Utils;
  public group: FormGroup = new FormGroup({});
  public constructor(
    @Inject(MAT_DIALOG_DATA) private dataRow: any,
    private toaster: ToasterService,
    private sellerSv: ExporterService,
    private ca: FormBuilder,
    public dialogOp: MatDialogRef<DetailPromotionComponent>
  ) { }

  public ngOnInit(): void {
    this.initForm();
    console.log(this.dataRow);

    this.group.get("name")?.setValue(this.dataRow.name);
    this.group.get("price")?.setValue(this.dataRow.price);
    this.group.get("date")?.setValue(this.dataRow.date);
    this.group.get("toDate")?.setValue(this.dataRow.toDate);
    this.group.get("hinhThuc")?.setValue(this.dataRow.hinhThuc);

  }

  public initForm(initData?: any): void {
    this.group = this.ca.group({
      id: new FormControl(this.dataRow ? this.dataRow.id : null),
      name: new FormControl(this.dataRow ? this.dataRow.name : null, []),
      price: new FormControl(this.dataRow ? this.dataRow.price : null),
      date: new FormControl(this.dataRow ? this.dataRow.date : null, []),
      toDate: new FormControl(this.dataRow ? this.dataRow.toDate : null, []),
      hinhThuc: new FormControl(this.dataRow ? this.dataRow.hinhThuc : null, [])
    });
  }

  public addCategory(): void {


    this.sellerSv.addPromotion(this.group.value).subscribe((res: any | HttpErrorResponse) => {
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

  public updateCategory(): void {
    this.sellerSv.updatePromotion(this.group.value).subscribe((res: any | HttpErrorResponse) => {
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

  public closeDialog(): void {
    this.dialogOp.close();
  }
}
