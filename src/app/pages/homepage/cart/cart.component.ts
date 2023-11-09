/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { AdminService } from '../../admin/http-service/admin.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public hompageLogo: string = 'icon-logo-football';
  public listCart: any;
  public checkMount: number = 0;
  public check: boolean = false;
  public group: FormGroup = new FormGroup({});
  public biding: string = '';
  public constructor(
    private ca: FormBuilder,
    private toaster: ToasterService,
    private adm: AdminService,
    private dialogcf: DialogConfirmService
  ) { }

  public ngOnInit(): void {
    this.getListCart();
    this.initForm();
    console.log(this.biding);


  }

  public initForm(initData?: any): void {
    this.group = this.ca.group({
      // amount: new FormControl("2",[])
    });
  }


  public getListCart(): void {

    this.adm.getListCart().subscribe({
      next: (res) => {
        this.listCart = res.data;
        console.log(this.listCart);

      },
      error: () => {
        console.log("error");
      }
    });
  }

  public deleteCart(id: number):void{
    this.dialogcf.confirmDialog('Xác nhận xoá').afterClosed().subscribe((x: boolean) => {
      if (x) {
        this.adm.deleteCart(id).subscribe((res: any | HttpErrorResponse) => {
          if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
            this.toaster.show('error', 'Thất Bại', 'Xoá thất bại');
          } else {
            this.toaster.show('success', 'Thành Công', 'Xoá thành công');
            this.getListCart();
          }
        });

      }
    });
  }

public checkAmount(data: string):void{
  let a = this.group.get('amount')?.value.toString().replaceAll(',', '');
  this.group.get("amount")?.setValue(data);
}

}
