import { Component, OnInit } from '@angular/core';
import { MENU_SETTING_EXPORTER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_EXPORTER;
  public title: string = '';

  public constructor() { }

  public ngOnInit(): void {
    this.title = 'Notification';
  }

}
