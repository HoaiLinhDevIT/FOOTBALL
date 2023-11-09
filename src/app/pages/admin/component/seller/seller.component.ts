/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@common/components/datatable/datatable.component';
import { ButtonActionModel } from '@common/models';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { DataSearchModel } from '@core/models';
import { environment } from '@env/environment';
import { ISideMenuNode } from '@layout/models/menu.model';
import { AdminService } from '../../http-service/admin.service';
import { DataBuyerModel, RequestParamBuyerSeach } from '../../model';
import { HttpClienGetSellerResponse, RequestParamSellerSeach } from '../../model/seller.model';
import { TABLE_SELLER_CONFIG } from './seller.config';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  public isToggleEdit: boolean = false;
  public tableSellerConfig = TABLE_SELLER_CONFIG;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;
  public keySeach: string = '';


  @ViewChild(DatatableComponent) public childDataTable!: DatatableComponent;

  public biding: string = '';
  public iconClear: boolean = false;

  public requestParam: RequestParamSellerSeach = {
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



    this.adminService.getListSeller(this.requestParam).subscribe((res: HttpClienGetSellerResponse) => {
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
        this.adminService.getListSeller(this.requestParam).subscribe((res: HttpClienGetSellerResponse) => {
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
        this.adminService.getListSeller(this.requestParam).subscribe((res: HttpClienGetSellerResponse) => {
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
    this.adminService.getListSeller(this.requestParam).subscribe((res: HttpClienGetSellerResponse) => {
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
