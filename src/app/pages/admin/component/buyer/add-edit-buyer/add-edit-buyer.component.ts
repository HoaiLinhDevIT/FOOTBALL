import { Component, OnInit } from '@angular/core';
import { MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';

@Component({
  selector: 'app-add-edit-buyer',
  templateUrl: './add-edit-buyer.component.html',
  styleUrls: ['./add-edit-buyer.component.scss']
})
export class AddEditBuyerComponent implements OnInit {
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;
  public constructor() { }

  public ngOnInit(): void {
    console.log("");
  }

}
