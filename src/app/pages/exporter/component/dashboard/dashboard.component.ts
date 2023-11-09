import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@auth/services/login.service';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { ButtonConfig } from '@common/models';
import { MENU_DATA_EXPORTER, MENU_SETTING_EXPORTER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { CommonService } from '@layout/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public btnSearchConfig = new ButtonConfig(true, true);
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_EXPORTER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_EXPORTER;
  public title: string = '';

  public constructor(
    private loginService: LoginService,
    private commonService: CommonService,
    private router: Router,
    private toaster: ToasterService
  ) {
   }

  public ngOnInit(): void {
    this.title = 'DashBoard';
  }

  public LogOut(){
    sessionStorage.clear();
      this.commonService.logout();
      sessionStorage.removeItem('id_token');
      sessionStorage.removeItem('user_login');
      this.loginService.isLoginAsync$.next(false);
      this.router.navigate(['auth/login']);
  }
  public showSuccessToaster() {
    this.toaster.show('success', 'Well done!', 'This is a success alert');
  }
  public showErrorToaster() {
    this.toaster.show('error', 'Check it out!', 'This is a error alert');
  }
}
