import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { IDialogInformation } from '@common/models';
import { DialogConfirmComponent } from '../dialog-help/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class TroubleLoggingService {

  public constructor(
    private matDialog: MatDialog
  ) { }

  public confirmDialog(type: string): MatDialogRef<DialogConfirmComponent> {
    const dialogData: IDialogInformation = {
      type: type,
      content: '',
      positive: {
        title: '',
        click: () => {
          dialogConfirmRef.close(true);
        }
      },
      negative: {
        title: 'common.button.cancel',
        click: () => {
          dialogConfirmRef.close(false);
        }
      }
    };
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.data = dialogData;
    dialogConfig.disableClose = false;
    const dialogConfirmRef: MatDialogRef<DialogConfirmComponent> = this.matDialog.open(DialogConfirmComponent, dialogConfig);

    return dialogConfirmRef;
  }
}
