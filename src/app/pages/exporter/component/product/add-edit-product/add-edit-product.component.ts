/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';
import { ExporterService } from '../../../http-service/exporter.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  public group: FormGroup = new FormGroup({});
  public title?: string;
  public listCategory: any;
  public constructor(
    private toaster: ToasterService,
    private sellerSv: ExporterService,
    private ca: FormBuilder,
    public dialogOp: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) private dataRow: any,
    private adm: AdminService

  ) { }

  public ngOnInit(): void {
    this.getCategory();
    console.log(this.listCategory);
    this.initForm();

    console.log(this.dataRow.data);
    console.log(this.title);
    this.title = this.dataRow.title;
  }


  public initForm(initData?: any, category?: any): void {
    this.group = this.ca.group({
      id: new FormControl(initData? initData.id : null),
      name: new FormControl(initData ? initData.productName : null, []),
      image1: new FormControl(initData ? initData.image1 : null),
      image2: new FormControl(initData ? initData.image2 : null),
      image3: new FormControl(initData ? initData.image3 : null),
      image4: new FormControl(initData ? initData.image4 : null),
      price: new FormControl(initData ? initData.price : null, []),
      role: new FormControl(initData ? initData.role : null, []),
      origin: new FormControl(initData ? initData.origin : null, []),
      subtance: new FormControl(initData ? initData.substance : null, []),
      amount: new FormControl(initData ? initData.amount : null, []),
      discount: new FormControl(initData ? initData.discount : null, []),
      category: new FormControl(initData ? initData.category : category, []),
      description: new FormControl(initData ? initData.description : category, [])
    });
  }

  public getCategory(): void{
    this.adm.getListCatego().subscribe((res)=>{
      this.listCategory = res.data;
      console.log(this.listCategory[0].categoryName);
      this.initForm(this.dataRow.data,this.listCategory[0].categoryName);
    });
  }

  public addCategory(): void {

    this.sellerSv.addProduct(this.group.value).subscribe((res: any | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Thêm sản phấm thất bại');
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
    this.sellerSv.updateProduct(this.group.value).subscribe((res: any | HttpErrorResponse) => {
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
    if (this.dataRow.data) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  public closeDialog(): void {
    this.dialogOp.close();
  }

}
