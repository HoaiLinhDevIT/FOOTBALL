import { Inject } from '@angular/core';  
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogInformation } from '@common/models';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  public icon: string = '';
  public color: string = '';
  public type: string = '';
  public bgColor: string = '';
  public isHideCancel: boolean = true;

  public constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogInformation
  ) { }

  public ngOnInit(): void {
    if (this.data) {
      this.getType(this.data.type);
    }
  }
  public dissmiss(): void {
    this.dialogRef.close();
  }

  public getType(type: string): void {
    switch (type) {
      case 'success':
        this.icon = 'icon-alert-success';
        this.color = 'color-success';
        this.type = 'Success';
        this.bgColor = 'bg-color-success';
        break;
      case '2-step':
        this.icon = 'icon-alert-confirm';
        this.color = 'color-info';
        this.bgColor = 'bg-color-info';
        this.type = 'screen.trouble-loggin.dialog-2step.type';
        this.data.contentchangephone = 'screen.trouble-loggin.dialog-2step.contentchangephone';
        this.data.positive!.title = 'screen.trouble-loggin.dialog-2step.button';
        break;
      case 'forgot-pwd':
        this.icon = 'icon-alert-confirm';
        this.color = 'color-info';
        this.bgColor = 'bg-color-info';
        this.type = 'screen.trouble-loggin.dialog-forgot.type';
        this.data.content = 'screen.trouble-loggin.dialog-forgot.content';
        this.data.positive!.title = 'common.button.forgot-pwd';
        break;

      default:
        break;
    }
  }

}
