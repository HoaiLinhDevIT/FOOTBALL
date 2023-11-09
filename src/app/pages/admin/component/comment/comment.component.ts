import { Component, OnInit } from '@angular/core';
import { MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public constructor() { }

  public ngOnInit(): void {
    console.log("first");
  }

}
