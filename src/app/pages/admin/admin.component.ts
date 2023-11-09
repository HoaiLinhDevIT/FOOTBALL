import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from '@auth/services/login.service';
import { MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';


@Component({
  selector: 'app-system',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewChecked {
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;

  public constructor(
    private cdr: ChangeDetectorRef,
    public loginService: LoginService
  ) { }
  public ngOnInit(): void {
    this.loginService.isLoginAsync$.next(true);
  }
  public ngAfterViewChecked(): void {
    this.cdr.detectChanges();

  }

}
