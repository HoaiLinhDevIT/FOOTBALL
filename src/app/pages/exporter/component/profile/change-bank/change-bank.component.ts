import { DataActionSeachModel } from './../../../../system/models/user.model';
import { BankInfoModel, BankInfoResponse, HttpClientBankInfoResponse } from './../../../models/exporter.model';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Utils } from '@common/utils/utils';
import { ExporterService } from '../../../http-service/exporter.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeNameComponent } from '../change-name/change-name.component';
import { LoadingSpinnerDialogService } from '@layout/services';
import { Zipcode } from '../../../models/exporter.model';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '@common/components/toaster/toaster.service';

@Component({
  selector: 'app-change-bank',
  templateUrl: './change-bank.component.html',
  styleUrls: ['./change-bank.component.scss']
})
export class ChangeBankComponent implements OnInit {
  public zipCode !: Zipcode;
  public utils = Utils;
  public changeBankForm!: FormGroup;
  public bankModel !: HttpClientBankInfoResponse;
  public constructor(
    public toast: ToastrService,
    public toaster: ToasterService,
    private fb: FormBuilder,
    public dialogService: DialogConfirmService,
    public exporterService: ExporterService,
    public dialogRef: MatDialogRef<ChangeBankComponent>,
    public loadingDialog: LoadingSpinnerDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.dialogRef.backdropClick().subscribe(() => {
      this.onNoClick();
    }); }

  public ngOnInit(): void {
    console.log(this.data);
    this.initialForm();
  }

  public initialForm() {
    this.changeBankForm = this.fb.group({
      bankName: new FormControl(this.data.bankName, []),
      branch: new FormControl(this.data.branch, []),
      accountNumber: new FormControl(this.data.accountNumber, [])
    });
  }


  public cancel(): void {
    this.dialogRef.close();
  }

  public onNoClick(): void {
    if (this.changeBankForm.get('bankName')?.value !== this.data.bankName || this.changeBankForm.get('branch')?.value !== this.data.branch) {
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

  public validatorBank(): boolean {
    this.changeBankForm.get('bankName')?.addValidators([this.utils.validateBank1, this.utils.requireValidator]);
    this.changeBankForm.get('bankName')?.updateValueAndValidity();
    if (this.changeBankForm.get('bankName')?.invalid) {
      return true;
    }
    return false;
  }

  public validatorBranch(): boolean {
    this.changeBankForm.get('branch')?.addValidators([this.utils.requireValidator, this.utils.validateBank]);
    this.changeBankForm.get('branch')?.updateValueAndValidity();
    if (this.changeBankForm.get('branch')?.invalid) {
      return true;
    }
    return false;
  }
  public validatorAccNum(): boolean {
    this.changeBankForm.get('accountNumber')?.addValidators([this.utils.requireValidator, this.utils.validateBank]);
    this.changeBankForm.get('accountNumber')?.updateValueAndValidity();
    if (this.changeBankForm.get('accountNumber')?.invalid) {
      return true;
    }
    return false;
  }

  public submitForm(): void {
    this.loadingDialog.showSpinner(true);

    this.exporterService.changeBanks({
      bankName: this.changeBankForm.get('bankName')?.value,
      branch: this.changeBankForm.get('branch')?.value,
      accountNumber: this.changeBankForm.get('accountNumber')?.value,
      id: this.data.id
    })
      .subscribe({
        next: (res) => {
          this.loadingDialog.showSpinner(false);
          this.dialogRef.close(res);
          this.toaster.show('success', 'Success','Your bank registration has been saved.');
        },
        error: (err) => {
          this.loadingDialog.showSpinner(false);
          this.dialogService.exporterMessage('error', "Can't change Bank");
        }
      });
  }

  public replaceName(value: string): void {
    this.changeBankForm.controls[value].setValue(this.changeBankForm.get(value)?.value.replace(/[^0-9]+/g, ""));
  }
}
