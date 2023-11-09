import { Component, OnInit } from '@angular/core';
import { LoginService } from '@auth/services/login.service';
import { MENU_DATA_CUSTOMER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { List } from 'lodash';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public dataMenu: Array<ISideMenuNode> = MENU_DATA_CUSTOMER;
  
  public constructor(
    public loginService: LoginService
  ) { }
  public ngOnInit(): void {
    this.loginService.isLoginAsync$.next(true);
  }

}
