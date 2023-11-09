/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressService } from '@auth/services/address.service';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';

@Component({
  selector: 'app-pitch-detail',
  templateUrl: './pitch-detail.component.html',
  styleUrls: ['./pitch-detail.component.scss']
})
export class PitchDetailComponent implements OnInit {
  public group: FormGroup = new FormGroup({});
  public Tinh: any;
  public Huyen: any;
  public Xa: any;
  public listCategory: any;
  public constructor(
    private sellerSv: AddressService,
    private adm: AdminService,
    public dialogOp: MatDialogRef<PitchDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private dataRow: any,
    private ca: FormBuilder,
    private toaster: ToasterService
  ) { }

  public ngOnInit(): void {
    this.getAddress();
    this.getCategory();
    this.initForm();
  }

  public initForm(initData?: any, category?: any): void {
    this.group = this.ca.group({
      id: new FormControl(initData? initData.id : null),
      pitchName: new FormControl(initData ? initData.pitchName : null, []),
      image: new FormControl(initData ? initData.image : null),
      price: new FormControl(initData ? initData.price : null, []),
      address1: new FormControl(initData ? initData.address1 : null, []),
      address2: new FormControl(initData ? initData.address2 : null, []),
      address3: new FormControl(initData ? initData.address3 : null, []),
      address4: new FormControl(initData ? initData.address4 : null, []),
      category: new FormControl(initData ? initData.category : category, []),
      description: new FormControl(initData ? initData.description : null, [])
    });
  }

  public getAddress() {
    this.sellerSv.test().subscribe((res: any) => {

      this.Tinh = res.data;
    });
  }

  public selectItem(item: any): void {
    this.Tinh.forEach((element: any) => {
      if (element.name === item.target.value) {
        this.Huyen = element.listDistricts;
      }
    });
  }
  public selectXa(item: any): void {
    this.Huyen.forEach((element: any) => {
      if (element.name === item.target.value) {
        this.Xa = element.listWards;
      }
    });
  }

  public getCategory(): void{
    this.adm.getListCategoPitch().subscribe((res)=>{
      this.listCategory = res.data;
      this.initForm(this.dataRow.data,this.listCategory[0].categoryName);
    });
  }

  public addCategory(): void {

    this.adm.addPitch(this.group.value).subscribe((res: any | HttpErrorResponse) => {
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

  public closeDialog(): void {
    this.dialogOp.close();
  }

}
