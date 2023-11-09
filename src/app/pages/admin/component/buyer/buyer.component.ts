/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { DataSearchModel } from '@core/models';
import { ISideMenuNode } from '@layout/models/menu.model';
import { AdminService } from '../../http-service/admin.service';
import { TABLE_BUYER_CONFIG } from './buyer.config';
import { environment } from '@env/environment';
import { DatatableComponent } from '@common/components/datatable/datatable.component';
import { ButtonActionModel } from '@common/models';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { HttpClienGetBuyerResponse, RequestParamBuyerSeach } from '../../model/buyer.model';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {

  public isToggleEdit: boolean = false;
  public tableBuyerConfig = TABLE_BUYER_CONFIG;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;
  public keySeach: string = '';


  @ViewChild(DatatableComponent) public childDataTable!: DatatableComponent;

  public biding: string = '';
  public iconClear: boolean = false;

  public requestParam: RequestParamBuyerSeach = {
    page: environment.pageIndex,
    size: environment.pageSize,
    keyWord: ''
  };


  public constructor(
    public adminService: AdminService,
    private dialog: DialogConfirmService

  ) { }
  public dataSource = new DataSearchModel();
  public page: number = environment.pageIndex;
  public size: number = environment.pageSize;

  public ngOnInit(): void {
    this.initData();
  }

  public initData(): void {



    this.adminService.getListBuyer(this.requestParam).subscribe((res: HttpClienGetBuyerResponse) => {
      if (res.data) {
        console.log(res.data.results);
        let prevUserPage = [...this.dataSource.results];
        let prevNoRecordInPage = this.dataSource.noRecordInPage;

        this.dataSource = { ...this.dataSource, ...res.data as DataSearchModel };
        this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

        // this.dataSource.results = [...prevUserPage, ...res.data.results];
      }
    });

  }

  public handleBtnDataTableClick(event: ButtonActionModel): void {
    switch (event.action) {
      case 'previous':
        this.requestParam.page--;
        this.adminService.getListBuyer(this.requestParam).subscribe((res: HttpClienGetBuyerResponse) => {
          if (res.data) {
            this.isToggleEdit = false;
            let prevUserPage = [...this.dataSource.results];
            let prevNoRecordInPage = this.dataSource.noRecordInPage;

            this.dataSource = { ...this.dataSource, ...res.data as DataSearchModel };
            this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

            this.dataSource.results = [...res.data.results];
          }
        });
        break;

      case 'next':
        this.requestParam.page++;
        this.adminService.getListBuyer(this.requestParam).subscribe((res: HttpClienGetBuyerResponse) => {
          if (res.data) {
            this.isToggleEdit = false;
            let prevUserPage = [...this.dataSource.results];
            let prevNoRecordInPage = this.dataSource.noRecordInPage;

            this.dataSource = { ...this.dataSource, ...res.data as DataSearchModel };
            this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

            this.dataSource.results = [...res.data.results];
          }
        });
        break;
    }
  }

  public handleSearchClk(): void {

    this.requestParam.keyWord = this.biding;
    this.requestParam.page = environment.pageIndex;
    this.adminService.getListBuyer(this.requestParam).subscribe((res: HttpClienGetBuyerResponse) => {
      if (res.data) {

        let prevUserPage = [...this.dataSource.results];
        let prevNoRecordInPage = this.dataSource.noRecordInPage;

        this.dataSource = { ...this.dataSource, ...res.data as DataSearchModel };
        this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

        // this.dataSource.results = [...prevUserPage, ...res.data.results];
      }
    });
    // this.biding = '';
  }

  public clearSearch(): void {
    this.biding = '';
    this.iconClear = false;
  }
  public isShowIcon(): void {
    if (this.biding !== '') {
      this.iconClear = true;
    } else {
      this.iconClear = false;
    }
  }
}
