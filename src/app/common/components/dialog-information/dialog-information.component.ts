import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogInformation } from '@common/models/dialog/dialog-information.model';

@Component({
  selector: 'app-dialog-information',
  templateUrl: './dialog-information.component.html',
  styleUrls: ['./dialog-information.component.scss']
})
export class DialogInformationComponent implements OnInit {
  public icon: string = '';
  public color: string = '';
  public type: string = '';
  public bgColor: string = '';

  public constructor(
    public dialogRef: MatDialogRef<DialogInformationComponent>,
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
      case 'error':
        this.icon = 'icon-alert-error';
        this.color = 'color-error';
        this.type = 'Error';
        this.bgColor = 'bg-color-error';
        break;
      case 'info':
        this.icon = 'icon-alert-confirm';
        this.color = 'color-info';
        this.type = 'Confirm';
        this.bgColor = 'bg-color-info';
        break;
      case 'info-jp':
        this.icon = 'icon-alert-confirm';
        this.color = 'color-info';
        this.type = '確認';
        this.bgColor = 'bg-color-info';
        break;

      default:
        break;
    }
  }
}
