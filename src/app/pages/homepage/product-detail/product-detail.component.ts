/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { MENU_DATA_SYSTEM, MENU_SETTING_SYSTEM } from '@core/config/menu.config';
import { AdminService } from '../../admin/http-service/admin.service';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public group: FormGroup = new FormGroup({});
  public groupCm: FormGroup = new FormGroup({});
  public hompageLogo: string = 'icon-logo-football';
  public checklogin: any;
  public comment: any;
  public constructor(
    @Inject(MAT_DIALOG_DATA) public dataRow: any,
    public dialogOp: MatDialogRef<ProductDetailComponent>,
    private ca: FormBuilder,
    private adminSv: AdminService,
    private toaster: ToasterService,
    private adm: AdminService,
    private dialogRef: MatDialog
  ) { }

  public ngOnInit(): void {
    console.log(this.dataRow);

    this.initForm();
    this.sumPrice();
    this.checkLogin();
    this.formComent(this.dataRow);
    this.getComment(this.dataRow);
    this.group.get("color")?.setValue("Màu đen");
    this.group.get("size")?.setValue("S");

  }


  public closeDialog():void{
    this.dialogOp.close();
  }

  public initForm(initData?: any): void {
    this.group = this.ca.group({
      image1: new FormControl(this.dataRow ? this.dataRow.image1 : null),
      name: new FormControl(this.dataRow ? this.dataRow.productName : null, []),
      sumanyPrice: new FormControl(null ,[]),
      amount:  new FormControl({value: !this.dataRow.amount ? null : this.dataRow.amount ,disabled: true}),
      category: new FormControl({value: !this.dataRow.category ? null : this.dataRow.category ,disabled: true}),
      origin: new FormControl({value: !this.dataRow.origin ? null : this.dataRow.origin ,disabled: true}),
      substance: new FormControl({value: !this.dataRow.substance ? null : this.dataRow.substance ,disabled: true}),
      color: new FormControl(null, []),
      size: new FormControl(null,[]),
      amount2: new FormControl("1",[]),
      sellerId: new FormControl(this.dataRow ? this.dataRow.exporterId : null,[]),
      productId: new FormControl(this.dataRow ? this.dataRow.Id : null,[]),
      price: new FormControl(this.dataRow ? this.dataRow.price : null,[])
    });
  }

  public formComent(data: any): void{
    this.groupCm = this.ca.group({
      productId: new FormControl(data ? data.Id : null, [] ),
      content: new FormControl(null,[])
    });
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

  public sumPrice():void{
    this.group.controls['sumanyPrice'].setValue('0');
    let amount = this.group.get('amount2')?.value.toString().replaceAll(',', '');
    let a = this.dataRow.price * amount;
    this.group.controls['sumanyPrice'].setValue(Number(a));
  }

  public checkLogin(): void {
    this.adminSv.checklogin().subscribe((res) => {
      this.checklogin = res.data;

    });
  }

  public addComent(): void {
    if(this.checklogin === undefined){
      this.toaster.show('error', 'Thất Bại', 'Vui lòng đăng nhập');
      return;
    }

    else{
    this.adminSv.addComment(this.groupCm.value).subscribe((res: any | HttpErrorResponse) => {

      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Thêm bình luận thất bại');
        const response = res as HttpErrorResponse;
      } else {
        const response = res as any;
        this.initForm(response.data as any);
        this.toaster.show('success', 'Thành Công', 'Thêm mới thành công');
        this.adm.getListCommentByProductId(this.groupCm.get("productId")?.value).subscribe({
          next: (res) => {
            this.comment = res.data;
            console.log(this.comment);

          },
          error: () => {
            console.log("error");
          }
        });
        this.groupCm.get("content")?.setValue('');
      }
    });
  }
  }

  public getComment(data: any): void {
    this.adm.getListCommentByProductId(data.Id).subscribe({
      next: (res) => {
        this.comment = res.data;
        console.log(this.comment);

      },
      error: () => {
        console.log("error");
      }
    });
  }

  public addCart(): void{
    this.adminSv.addCart(this.group.value).subscribe((res: any | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Thêm vào giỏ hàng thất bại');
        const response = res as HttpErrorResponse;
      } else {
        const response = res as any;
        this.initForm(response.data as any);
        this.toaster.show('success', 'Thành Công', 'Thêm mới thành công');
        this.closeDialog();


      }

    });
  }

  public openDialog(): void{
    this.dialogCreate(this.group.value);
  }

  public dialogCreate(data: any) {
    const dialog = this.dialogRef.open(PaymentComponent, {
      width: '1000px',
      height: '700px',
      data: data
    });
    dialog.disableClose = false;
    dialog.afterClosed().subscribe(x => {
    });
  }

}
