import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePhoneComponent } from '@auth/components/change-phone/change-phone.component';
import { LoginService } from '@auth/services/login.service';
import { ISideMenuNode } from '@layout/models/menu.model';
import { UserDetailModel } from '@layout/models/user.model';
import { CommonService } from '@layout/services/common.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

export interface DataHeader {
  parent: string;
  chilren: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Input() public title: string = '';
  @Input() public dataMenu?: Array<ISideMenuNode>;
  @Input() public menuSetting?: Array<ISideMenuNode>;
  @Input() public userName: string = '';
  @Input() public avatar: string = '';


  private userLogin!: UserDetailModel;
  public userRole: string = '';
  public selectedItem!: ISideMenuNode;

  public constructor(
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private loginService: LoginService
  ) {
  }

  public ngOnInit(): void {
    let infoUserLogin = JSON.parse(sessionStorage.getItem('user_login') || '{}');
    if (Object.keys(infoUserLogin).length !== 0) {
      this.userLogin = infoUserLogin as UserDetailModel;
      this.userName = this.userLogin.userName;
      this.avatar = this.userLogin.avatar;
      if(this.userName !== null && this.userName.indexOf('@') > 0){
        this.userName = this.userName.split('@')[0];
      }
      if(this.userName === null){
        this.userName = this.userLogin.mail.split('@')[0];
      }
      this.userRole = this.userLogin.roles[0].role;
    }
    if(this.dataMenu){
      this.dataMenu.forEach((item: ISideMenuNode) => {
        if(this.router.url.includes(item.name)){
          this.selectedItem = item;
        }
      });
    }
    console.log(this.dataMenu)
    
  }


  public logOut(): void {
    this.commonService.logout();
    this.loginService.isLoginAsync$.next(false);
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('user_login');
    this.router.navigate(['auth/login']);
  }
  public onClickMenuClick(item: ISideMenuNode): void {
    if (item.name.includes('logOut')) {
      this.logOut();
      return;
    }
    if (item.name.includes('changePassowrd')) {
      this.openDialogChangePhone();
      return;
    }
    this.router.navigate([item.route]);
  }

  public menuSettingClick(item: ISideMenuNode): void{
    if (item.name.includes('logOut')) {
      this.logOut();
      return;
    }
    this.router.navigate([item.route]);
  }

  public openDialogChangePhone(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "28.25rem",
      disableClose: true
    });
  }
}
