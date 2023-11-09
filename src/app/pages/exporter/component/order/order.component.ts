/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MENU_SETTING_EXPORTER, MENU_DATA_EXPORTER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import { DatatableComponent } from '@common/components/datatable/datatable.component';
import { ExporterService } from '../../http-service/exporter.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingSpinnerDialogService } from '@layout/services';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DataSearchOrderModel, RequestParamOrderSeach } from '../../models/exporter.model';
import { Utils } from '@common/utils/utils';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_EXPORTER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_EXPORTER;
  public listSelected: Array<{ name: string, sortDecrease: boolean, isActive: boolean }> = [
    { name: 'Date', sortDecrease: true, isActive: false },
    { name: 'ID', sortDecrease: true, isActive: false },
    { name: 'Seller', sortDecrease: false, isActive: false },
    { name: 'Maker', sortDecrease: false, isActive: false },
    { name: 'CHASSIS#', sortDecrease: false, isActive: false }
  ];
  public noDataMsg: string = '';
  public listTab: Array<string> = ['Tất cả', 'Đang chờ', 'Đang giao', 'Hoàn Thành'];
  public title: string = '';
  public newTerms: string = '';
  public previous: string = '';
  public next: string = '';
  public requestId?: number;
  public userId?: number;
  public requestNo: string = '';
  public maker: string = '';
  public isToggleEdit: boolean = false;
  public dataSource : any;
  public searchContent: string = '';
  public sortActive?: number;
  public requestParam: RequestParamOrderSeach = {
    page: environment.pageIndex,
    size: 5,
    keyWord: ''
  };
  public sortDecreaseDefault: boolean = true;
  public sortIncreaseDefault: boolean = true;
  public decreaseDate: boolean = true;
  public decreaseId: boolean = true;
  public decreaseSeller: boolean = false;
  public decreaseMaker: boolean = false;
  public decreaseChassis: boolean = false;
  public selectedTabIndex: number = 0;
  public utils = Utils;
  public listStatus = this.utils.LIST_STATUS_ORDER;


  @ViewChild(DatatableComponent) public childDataTable!: DatatableComponent;
  public iconClear: boolean = false;
  public constructor(
    private exporterService: ExporterService,
    private dialogService: DialogConfirmService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private loadingDialog: LoadingSpinnerDialogService,
    public toaster: ToasterService,
    private dialogcf: DialogConfirmService,
    private adm: AdminService
  ) {

  }

  public ngOnInit(): void {
    this.title = 'Danh sách đơn hàng';
    this.newTerms = 'New Terms';
    this.previous = 'Previous';
    this.next = 'Next';
    this.getListExporterOrder();
    this.initData();
  }
  public inputSearchContent = new FormControl('', [Validators.required]);

  private getListExporterOrder(): void {
    switch (this.selectedTabIndex) {
      case 0:
        this.requestParam.fieldsTab = "";
        this.getListCustomerOrder();
        break;
      case 1:
        this.requestParam.fieldsTab = "open";
        this.getListCustomerOrder();
        break;
      case 2:
        this.requestParam.fieldsTab = "close";
        this.getListCustomerOrder();
        break;
      case 3:
        this.requestParam.fieldsTab = "request";
        this.getListCustomerOrder();
        break;
      default:
        break;
    }
  }
  private getListCustomerOrder(): void {
    this.exporterService.sellerGetOrder(this.requestParam)
      .subscribe({
        next: (res) => {
          console.log(res.data.results);
          this.dataSource = res.data.results;
        },
        error: (err) => {
          this.toaster.show('error', 'Thất bại', "Không thể hiển thị danh sách đơn hàng.");
        }
      });
  }

  public onTabChanged(event: any): void {
    this.listSelected = this.listSelected.map((value, i) => {
      return { name: value.name, sortDecrease: value.sortDecrease, isActive: false };
    });
    this.searchContent = '';
    this.requestParam.keyWord = '';
    this.selectedTabIndex = event.index;
    this.getListExporterOrder();
  }
  // search action
  public searchInput(): void {
    this.requestParam.keyWord = this.searchContent;
    if (this.searchContent && this.searchContent.trim().length > 0) {
      this.getListExporterOrder();
    }
  }

  public reverseSort(name: string): void {
    let index = 1;
    this.listSelected = this.listSelected.map((value, i) => {
      if (value.name === name) {
        index = i;
      }
      return { name: value.name, sortDecrease: value.name === name ? !value.sortDecrease : value.sortDecrease, isActive: value.name === name ? true : false };
    });
    this.sortItem(index);
  }

  // sort action
  public sortItem(i: number): void {
    this.sortActive = i;
    switch (i) {
      case 0:
        if (this.listSelected[0].sortDecrease) {
          this.requestParam.sort = 'desc';
        } else {
          this.requestParam.sort = 'asc';
        }
        this.requestParam.column = 'updateDate';
        this.getListExporterOrder();
        break;
      case 1:
        if (this.listSelected[1].sortDecrease) {
          this.requestParam.sort = 'desc';
        } else {
          this.requestParam.sort = 'asc';
        }
        this.requestParam.column = 'requestId';
        this.getListExporterOrder();
        break;
      case 2:
        this.sortIncreaseDefault = !this.sortIncreaseDefault;
        if (this.sortIncreaseDefault) {
          this.requestParam.sort = 'asc';
        } else {
          this.requestParam.sort = 'desc';
        }
        this.requestParam.column = 'requestNo';
        this.getListExporterOrder();
        break;
      case 3:
        if (this.listSelected[3].sortDecrease) {
          this.requestParam.sort = 'desc';
        } else {
          this.requestParam.sort = 'asc';
        }
        this.requestParam.column = 'maker';
        this.getListExporterOrder();
        break;
      case 4:
        if (this.listSelected[4].sortDecrease) {
          this.requestParam.sort = 'desc';
        } else {
          this.requestParam.sort = 'asc';
        }
        this.requestParam.column = 'chassisNumber';
        this.getListExporterOrder();
        break;
    }
  }

  public initData(): void { }

  public btnPrevioues() {
    this.requestParam.page--;
    this.getListExporterOrder();
  }

  public btnNext() {
    this.requestParam.page++;
    this.getListExporterOrder();
  }

  public isShowIcon(): void {
    if (this.searchContent !== '') {
      this.iconClear = true;
    } else {
      this.iconClear = false;
    }
  }

  public clearSearch(): void {
    this.searchContent = '';
    this.iconClear = false;
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

  public deleteCart(id: number):void{
    this.dialogcf.confirmDialog('Xác nhận giao hàng').afterClosed().subscribe((x: boolean) => {
      if (x) {
        this.adm.confirmOrder(id).subscribe((res: any | HttpErrorResponse) => {
          if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
            this.toaster.show('error', 'Thất Bại', 'Thất bại');
          } else {
            this.toaster.show('success', 'Thành Công', 'thành công');
            this.getListCustomerOrder();
          }
        });

      }
    });
  }
}
