/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { environment } from '@env/environment';
import { ISideMenuNode } from '@layout/models/menu.model';
import { AdminService } from '../../http-service/admin.service';
import { RequestParamOrderSeach } from 'src/app/pages/customer/models/customerOrder.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailNewsComponent } from './detail-news/detail-news.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public category: any;
  public iconClear: boolean = false;
  public AllCategory: any;
  public selectedTabIndex: number = 0;
  public listTab: Array<string> = ['Tất cả', 'Hiện Có', 'Yêu Cầu'];
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public requestParam: RequestParamOrderSeach = {
    page: environment.pageIndex,
    size: environment.pageSize,
    keyWord: ''
  };

  public listSelected: Array<{ name: string, sortDecrease: boolean, isActive: boolean }> = [
    { name: 'Date', sortDecrease: true, isActive: true },
    { name: 'ID', sortDecrease: true, isActive: false },
    { name: 'Seller', sortDecrease: false, isActive: false },
    { name: 'Maker', sortDecrease: false, isActive: false },
    { name: 'CHASSIS#', sortDecrease: false, isActive: false }
  ];
  public searchContent: string = '';
  public noDataMsg: string = '';
  public constructor(
    private adminSv: AdminService,
    private toaster: ToasterService,
    private dialogcf: DialogConfirmService,
    private dialogRef: MatDialog
  ) { }

  public ngOnInit(): void {
    this.getAllCategory();
  }

  public getAllCategory(): void {
    this.adminSv.getListNews(this.requestParam).subscribe({
      next: (res) => {

        this.AllCategory = res.data;
      },
      error: () => {
        console.log("error");
      }
    });
  }

  private getListCustomerOrder(): void {
    switch (this.selectedTabIndex) {

      case 0:
        this.requestParam.fieldsTab = "";
        this.getAllCategory();
        break;
      case 1:
        this.requestParam.fieldsTab = "all";
        this.getAllCategory();
        break;
      case 2:
        this.requestParam.fieldsTab = "open";
        this.getAllCategory();
        break;
    }
  }

  public onTabChanged(event: any): void {
    this.requestParam.page = 1;
    this.listSelected = this.listSelected.map((value, i) => {

      return { name: value.name, sortDecrease: value.sortDecrease, isActive: i === 0 ? true : false };

    });
    this.searchContent = '';
    this.requestParam.keyWord = '';
    setTimeout(() => {
      this.noDataMsg = 'không có dữ liệu';
    }, 500);
    this.selectedTabIndex = event.index;
    this.AllCategory = [];

    this.getListCustomerOrder();
  }

  public isShowIcon(): void {
    if (this.requestParam.keyWord !== '') {
      this.iconClear = true;
    } else {
      this.iconClear = false;
    }
  }
  public clearSearch(): void {
    this.requestParam.keyWord = '';
    this.iconClear = false;
    this.category();
  }

  public searchInput(): void {
    //this.requestParam.keyWord = this.searchContent;
    this.requestParam.page = 1;
    this.getListCustomerOrder();
    if (this.requestParam.keyWord && this.requestParam.keyWord?.trim().length > 0 && this.category.noRecordInPage > 1) {
      this.noDataMsg = 'There is no data to be displayed.';
    }
  }

  public btnFirst() {
    this.requestParam.page = 1;
    this.getListCustomerOrder();
  }
  public btnLast() {
    this.requestParam.page = this.category.totalPage;
    this.getListCustomerOrder();
  }
  public btnPrevioues() {
    this.requestParam.page--;
    this.getListCustomerOrder();
  }

  public btnNext() {
    this.requestParam.page++;
    this.getListCustomerOrder();
  }

  public deleteCategory(id: number): void {
    this.dialogcf.confirmDialog('Xác nhận xoá').afterClosed().subscribe((x: boolean) => {
      if (x) {
        this.adminSv.deleteNews(id).subscribe((res: any | HttpErrorResponse) => {
          if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
            this.toaster.show('error', 'Thất Bại', 'Xoá thất bại');
          } else {
            this.toaster.show('success', 'Thành Công', 'Xoá thành công');
            this.getAllCategory();
          }
        });

      }
    });
  }

  public dialogCreate() {
    const dialog = this.dialogRef.open(DetailNewsComponent, {
      width: '412px',
      height: '520px'
    });
    dialog.disableClose = false;
    dialog.afterClosed().subscribe(x => {
      this.getAllCategory();
    });
  }


  public dialogUpdate(data: any) {
    const dialog = this.dialogRef.open(DetailNewsComponent, {
      data: data,
      width: '412px',
      height: '520px'

    });
    dialog.disableClose = false;
    dialog.afterClosed().subscribe(x => {
      this.getAllCategory();
    });
  }


  public activeCategory(id: number): void {
    this.dialogcf.confirmDialog('Chấp nhận yêu cầu').afterClosed().subscribe((x: boolean) => {
      if (x) {
        this.adminSv.activeNews(id).subscribe((res: any | HttpErrorResponse) => {
          if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
            this.toaster.show('error', 'Thất Bại', 'Chấp nhận thất bại');
          } else {
            this.toaster.show('success', 'Thành Công', 'Chấp nhận thành công');
            this.getAllCategory();
          }
        });

      }
    });
  }

}
