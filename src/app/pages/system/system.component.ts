import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '@auth/services/login.service';
import { MENU_DATA_SYSTEM, MENU_SETTING_SYSTEM } from '@core/config/menu.config';
import { SideNavComponent } from '@layout/components/side-nav/side-nav.component';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit,AfterViewChecked {
@ViewChild(SideNavComponent) public childSideNav!: SideNavComponent;
public dataMenu = MENU_DATA_SYSTEM;
public menuSetting = MENU_SETTING_SYSTEM;
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
