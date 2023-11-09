import { Component, OnInit } from '@angular/core';
import { LoginService } from '@auth/services/login.service';
import { MENU_DATA_EXPORTER, MENU_SETTING_EXPORTER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.scss']
})
export class ExporterComponent implements OnInit {

  public dataMenu: Array<ISideMenuNode> = MENU_DATA_EXPORTER;

  public constructor(
    public loginService: LoginService
  ) { }
  public ngOnInit(): void {
    this.loginService.isLoginAsync$.next(true);
  }

}
