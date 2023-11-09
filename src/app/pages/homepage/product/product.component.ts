/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin/http-service/admin.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public listCategory: any;
  public test : Array<object> = [];
  public hompageLogo: string = 'icon-logo-football';
  public selectedTabIndex: number = 0;
  public allProduct: any;
  public checklogin: any;
  public constructor(
    private adm: AdminService,
    private dialogRef: MatDialog,
    private adminSv: AdminService
  ) { }

  public ngOnInit(): void {
    this.getCategory();
    this.checkLogin();

  }

  public getCategory(): void{
    this.adm.getListCatego().subscribe((res)=>{
      this.listCategory = res.data;
      this.getValue(this.listCategory);
    });
  }
  public getValue(data: any):void{
    this.test = data;

  }

  public getAllProductByCategory(data: any): void {

    this.adm.getListProductByCategory(this.test[data.index]).subscribe({
      next: (res) => {
        this.allProduct = res.data;

      },
      error: () => {
        console.log("error");
      }
    });
  }

  public dialogCreate(data: any) {
    const dialog = this.dialogRef.open(ProductDetailComponent, {
      width: '1000px',
      height: '800px',
      data: data
    });
    dialog.disableClose = false;
    dialog.afterClosed().subscribe(x => {
    });
  }

  public checkLogin(): void {
    this.adminSv.checklogin().subscribe((res) => {
      this.checklogin = res.data;
      console.log(this.checklogin);

    });
  }
}
