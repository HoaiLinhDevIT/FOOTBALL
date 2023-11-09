/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressService } from '@auth/services/address.service';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { AdminService } from '../../admin/http-service/admin.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public group: FormGroup = new FormGroup({});
  public SellerGroup: FormGroup = new FormGroup({});
  public hompageLogo: string = 'icon-logo-football';
  public Tinh: any;
  public Huyen: any;
  public Xa: any;
  public constructor(
    private sellerSv: AddressService,
    private address: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataRow: any,
    private adminSv: AdminService,
    private toaster: ToasterService,
    public dialogOp: MatDialogRef<PaymentComponent>
  ) { }

  public ngOnInit(): void {
    console.log(this.dataRow);
    this.getAddress();
    this.initdata();
    this.sumPrice();
  }
  public initdata(initData?: any): void {
    this.group = this.address.group({
     image: new FormControl(this.dataRow ? this.dataRow.image1 : null,[]),
     productId: new FormControl(this.dataRow ? this.dataRow.productId : null,[]),
     sellerId: new FormControl(this.dataRow ? this.dataRow.sellerId : null,[]),
     productName: new FormControl(this.dataRow ? this.dataRow.name : null,[]),
     price: new FormControl(null,[]),
     amount: new FormControl( "1",[]),
     size: new FormControl(this.dataRow ? this.dataRow.size : null,[]),
     color: new FormControl(this.dataRow ? this.dataRow.color : null,[]),
     address1: new FormControl(null,[]),
     address2: new FormControl(null,[]),
     address3: new FormControl(null,[]),
     address4: new FormControl(null,[]),
     phone: new FormControl(null,[])
    });
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

  public sumPrice():void{
    this.group.controls['price'].setValue('0');
    let amount1 = this.group.get('amount')?.value.toString().replaceAll(',', '');
    let a = this.dataRow.price * amount1;
    this.group.controls['price'].setValue(Number(a));
  }

  public formatPrice(number: number | bigint): string {
    let num = number?.toString();
    if (number) {
      let newNum = "";
      for (let i=num.length-1, j=1; i>=0; i--, j++) {
        newNum = num[i] + newNum;
        if (j%3===0 && i!==0) { newNum = "," + newNum; }
      }
      return newNum;
    }
    return num;
  }

  public addOrder(): void{
    this.adminSv.addOrder(this.group.value).subscribe((res: any | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Đặt hàng thất bại');
        const response = res as HttpErrorResponse;
      } else {
        const response = res as any;
        this.initdata(response.data as any);
        this.toaster.show('success', 'Thành Công', 'Thêm mới thành công');
        this.closeDialog();


      }

    });
  }

  public closeDialog():void{
    this.dialogOp.close();
  }
}
