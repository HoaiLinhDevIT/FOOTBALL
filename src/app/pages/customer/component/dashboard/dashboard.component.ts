import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@auth/services/login.service';
import { ButtonConfig } from '@common/models';
import { MENU_DATA_CUSTOMER, MENU_SETTING_CUSTOMER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { RequestParamUserSeach } from 'src/app/pages/system/models';
import { CustomerService } from '../../http-service/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public btnSearchConfig = new ButtonConfig(true, true);
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_CUSTOMER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_CUSTOMER;
  public requestNo: string = 'D123456';

  public title: string = '';

  public constructor(
    private customerService: CustomerService
  ) {}

  public ngOnInit(): void {
    this.initData();
  }

  public initData(): void {
    this.title = 'DashBoard';
  }
}
