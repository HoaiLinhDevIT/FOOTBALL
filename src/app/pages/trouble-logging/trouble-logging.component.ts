import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { MENU_LIST_HELP } from '@core/config';
import { IListHelp } from '@layout/models/menu.model';
import { EmailVertificationComponent } from './dialog-help/email-vertification/email-vertification.component';
import { TroubleLoggingService } from './services/trouble-logging.service';

@Component({
  selector: 'app-trouble-logging',
  templateUrl: './trouble-logging.component.html',
  styleUrls: ['./trouble-logging.component.scss']
})
export class TroubleLoggingComponent implements OnInit {
  public hompageLogo: string = 'homepage-scroll-logo';
  public dataMenu: Array<IListHelp> = MENU_LIST_HELP;


  public constructor(
    private dialog: MatDialog,
    private router: Router,
    private dialogService: TroubleLoggingService
    ) { }

  public ngOnInit(): void {
    sessionStorage.clear();
  }

  public onClickMenuClick(item: IListHelp): void {
    if (item.dialog)
      this.dialog.open(item.dialog,{disableClose: item.disableClose});
    else 
    if(item.confirm){
      if(item.dialogConfirm) {
        const dialog = this.dialogService.confirmDialog(item.confirm);
        dialog.afterClosed().subscribe((confirmed) => {
          if(confirmed === true && item.dialogConfirm){
            this.dialog.open(item.dialogConfirm);
          }
        });
      }  
      else {
        const dialog = this.dialogService.confirmDialog(item.confirm);
        dialog.afterClosed().subscribe((confirmed) => {
          if(confirmed === true){
          this.router.navigate([item.route]);
          }
        });
      }
    }
    else {
      this.router.navigate([item.route]);
    }
  }

}
