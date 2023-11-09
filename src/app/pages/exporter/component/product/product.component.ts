/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatableComponent } from '@common/components/datatable/datatable.component';
import { ButtonActionModel } from '@common/models/datatable/table-config.model';
import { MENU_DATA_EXPORTER, MENU_SETTING_EXPORTER } from '@core/config/menu.config';
import { environment } from '@env/environment';
import { ISideMenuNode } from '@layout/models/menu.model';
import { RequestParamOperatorSeach } from 'src/app/pages/system/models/operator.model';
import { ExporterService } from '../../http-service/exporter.service';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { TABLE_PRODUCT_CONFIG } from './product.config';
import { RequestParamOrderSeach } from 'src/app/pages/customer/models/customerOrder.model';
import { CategoryComponent } from './category/category.component';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_EXPORTER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_EXPORTER;
  public tableUserConfig = TABLE_PRODUCT_CONFIG;
  public listCategory: any;
  public dataSource: any;
  public biding: string = '';
  public title: string = '';
  public title2: string = "";
  public iconClear: boolean = false;
  public requestParam: RequestParamOperatorSeach = {
    page: environment.pageIndex,
    size: environment.pageSize,
    keyWord: ''
  };
  @ViewChild(DatatableComponent) public childDataTable!: DatatableComponent;
  public constructor(
    private dialogRef: MatDialog,
    private expService: ExporterService
      ) { }

  public ngOnInit(): void {
    this.initData();
  }

  public initData(): void {
    this.expService.getProduct(this.requestParam).subscribe((res: any) => {
      this.dataSource = res.data.results;
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

  public dialogCreate(title: any) {
    const dialog = this.dialogRef.open(AddEditProductComponent, {
      width: '412px',
      height: '520px',
      data: {
        title
      }

    });
    dialog.afterClosed().subscribe(x => {
      this.initData();
    });
  }

  public dialogUpdate(data: any, title: any) {
    const dialog = this.dialogRef.open(AddEditProductComponent, {
      width: '412px',
      height: '520px',
      data: {
        data,
        title
      }

    });
    dialog.afterClosed().subscribe(x => {
      this.initData();
    });
  }

  public dialogCategory(title: any) {
    const dialog = this.dialogRef.open(CategoryComponent, {
      width: '412px',
      height: '520px',
      data:{
        title
      }
    });
    dialog.afterClosed().subscribe(x => {
      this.initData();
    });
  }

  public openCategory(){
    this.dialogCategory(this.title2);
  }
  public openUpdate(data: any){
    this.title2 = "Chỉnh sửa sản phẩm";
    this.dialogUpdate(data,this.title2);
  }

  public openDialog() {
    this.title2 = "Thêm mới sản phẩm";
    this.dialogCreate(this.title2);
  }

  public isShowIcon(): void {
    if (this.biding !== '') {
      this.iconClear = true;
    } else {
      this.iconClear = false;
    }
  }

  public clearSearch(): void {
    this.biding = '';
    this.iconClear = false;
  }

  public handleSearchClk(): void {

    this.requestParam.keyWord = this.biding;
    this.requestParam.page = environment.pageIndex;
    this.expService.createProduct(this.requestParam).subscribe((res: any) => {
      if (res.data) {

        let prevUserPage = [...this.dataSource.results];
        let prevNoRecordInPage = this.dataSource.noRecordInPage;

        this.dataSource = { ...this.dataSource, ...res.data as any };
        this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

        // this.dataSource.results = [...prevUserPage, ...res.data.results];
      }
    });
    // this.biding = '';
  }

  public handleBtnDataTableClick(event: ButtonActionModel): void { }

}
