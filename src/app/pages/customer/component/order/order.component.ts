/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MENU_SETTING_EXPORTER, MENU_DATA_EXPORTER, MENU_DATA_CUSTOMER, MENU_SETTING_CUSTOMER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import { DatatableComponent } from '@common/components/datatable/datatable.component';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingSpinnerDialogService } from '@layout/services';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { OrderService } from '../../http-service/order.service';
import { CustomerOderModel, CustomerOderResponse, DataSearchOrderModel, HttpClienGetOrderByIdResponse, HttpClienGetOrderResponse, RequestParamOrderSeach } from '../../models/customerOrder.model';
import { DataSearchModel } from '@core/models';
import { Utils } from '@common/utils/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { ExporterService } from 'src/app/pages/exporter/http-service/exporter.service';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public iconClear: boolean = false;
  public response: any;
  public actionRequired: any;
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_CUSTOMER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_CUSTOMER;
  public listSelected: Array<{name: string, sortDecrease: boolean, isActive: boolean}> = [
    {name: 'Date', sortDecrease: true, isActive: false},
    {name: 'ID', sortDecrease: true, isActive: false},
    {name: 'Seller', sortDecrease: false, isActive: false},
    {name: 'Maker', sortDecrease: false, isActive: false},
    {name: 'CHASSIS#', sortDecrease: false, isActive: false}
  ];
  public listTab: Array<string> = ['Tất cả', 'Đang chờ', 'Đang giao', 'Hoàn Thành'];
  // public listTab: Array<string> = ['All', 'Action Required', 'Open', 'Close'];
  public rowPicked: CustomerOderModel | undefined;
  public title: string = '';
  public newTerms: string = '';
  public previous: string = '';
  public next: string = '';
  public requestId?: number;
  public userId?: number;
  public requestNo: string = '';
  public maker: string = '';
  public statusPayment: string = '';
  public isToggleEdit: boolean = false;
  public dataSource : any;
  public searchContent: string = '';
  public sortActive?: number;
  public requestParam: RequestParamOrderSeach = {
    page: environment.pageIndex,
    size: environment.pageSize,
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
  public listStatus = Utils.LIST_STATUS_ORDER;


  @ViewChild(DatatableComponent) public childDataTable!: DatatableComponent;

  public constructor(
    private dialogService: DialogConfirmService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private loadingDialog: LoadingSpinnerDialogService,
    public toaster: ToasterService,
    private orderService: OrderService,
    private dialogcf: DialogConfirmService,
    private exporterService: ExporterService,
    private adm: AdminService
  ) {}

  public ngOnInit(): void {
    this.newTerms = 'New Terms';
    this.previous = 'Previous';
    this.next = 'Next';
    this.getListCustomerOrder();
    this.initData();
  }
  public inputSearchContent = new FormControl('', [Validators.required]);

  private getListCustomerOrder(): void {
    this.exporterService.buyerGetOrder(this.requestParam)
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
      this.getListCustomerOrder();
  }




  public initData(): void {}

  public btnPrevioues() {
    this.requestParam.page--;
    this.getListCustomerOrder();
  }

  public btnNext() {
    this.requestParam.page++;
    this.getListCustomerOrder();
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

  public noDataMsg: string = '';

  public deleteOrder(id: number):void{
    this.dialogcf.confirmDialog('Xác nhận xoá đơn hàng').afterClosed().subscribe((x: boolean) => {
      if (x) {
        this.adm.deleteOrder(id).subscribe((res: any | HttpErrorResponse) => {
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
