import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { LoadingSpinnerDialogService } from '@layout/services';
import { ZipCodeModel } from 'src/app/pages/system/models/company.model';
import { CustomerService } from '../../../http-service/customer.service';
import { ChangeNameComponent } from '../change-name/change-name.component';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {
  public utils = Utils;
  public dataZipCode!: ZipCodeModel;
  public address?: string;


  public constructor(
    public fb: FormBuilder,
    public dialogService: DialogConfirmService,
    public customerService: CustomerService,
    public dialogRef: MatDialogRef<ChangeNameComponent>,
    public loadingDialog: LoadingSpinnerDialogService,
    public toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.dialogRef.backdropClick().subscribe(() => {
      this.onNoClick();
    });
   }

  public ngOnInit(): void {
    this.address = this.data;
  }

  public onNoClick(): void {
    if (this.data !== this.address) {
      this.dialogService.confirmDialog("Are you sure you want to leave?")
        .afterClosed().subscribe((confirm) => {
          if (confirm) {
            this.dialogRef.close();
          } else return;
        });
    } else {
      this.dialogRef.close();
    }
  }


  public submitForm(): void {
      this.loadingDialog.showSpinner(true);
      this.customerService.changeAddressCustomer({ address: this.address})
        .subscribe({
          next: (res) => {
            this.loadingDialog.showSpinner(false);
            this.dialogRef.close(res);
            this.toaster.show('success', 'Success', 'Your address has been changed.');
          },
          error: (err) => {
            this.loadingDialog.showSpinner(false);
            //this.dialogService.customMessage('error', "Can't change Address");
            this.toaster.show('error', 'Error', "Can't changed your address.");
          }
        });
  }
}
