import { Component, OnInit } from '@angular/core';
import { MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';

@Component({
  selector: 'app-add-edit-payment',
  templateUrl: './add-edit-payment.component.html',
  styleUrls: ['./add-edit-payment.component.scss']
})
export class AddEditPaymentComponent implements OnInit {
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;
  public constructor() { }

  public ngOnInit(): void {
    console.log("");
  }

}
