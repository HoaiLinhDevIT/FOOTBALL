/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { LoadingSpinnerDialogService } from '@layout/services';
import { ExporterService } from '../../../http-service/exporter.service';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {
  public utils = Utils;
  public addBankForm!: FormGroup;

  public constructor(
    private fb: FormBuilder,
    public dialogService: DialogConfirmService,
    public exporterService: ExporterService,
    public dialogRef: MatDialogRef<AddBankComponent>,
    public loadingDialog: LoadingSpinnerDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogRef.backdropClick().subscribe(() => {
      this.onNoClick();
    });
}

  public ngOnInit(): void {
    this.initialForm();

  }
  public initialForm() {
    this.addBankForm = this.fb.group({
      bankName: new FormControl(null, []),
      branch: new FormControl(null, []),
      accountNumber: new FormControl(null, [])
    });
  }


  public cancel(): void {
    this.dialogRef.close();
  }

  public onNoClick(): void {
    if (this.addBankForm.get('bankName')?.value !== this.data.bankName || this.addBankForm.get('branch')?.value !== this.data.branch) {
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
    this.addBankForm.get('bankName')?.addValidators([this.utils.validateBank1, this.utils.requireValidator]);
    this.addBankForm.get('bankName')?.updateValueAndValidity();
    if (this.addBankForm.get('bankName')?.invalid) {
      return true;
    }
    return false;
  }

  public validatorBranch(): boolean {
    this.addBankForm.get('branch')?.addValidators([this.utils.requireValidator, this.utils.validateBank]);
    this.addBankForm.get('branch')?.updateValueAndValidity();
    if (this.addBankForm.get('branch')?.invalid) {
      return true;
    }
    return false;
  }
  public validatorAccNum(): boolean {
    this.addBankForm.get('accountNumber')?.addValidators([this.utils.requireValidator, this.utils.validateBank]);
    this.addBankForm.get('accountNumber')?.updateValueAndValidity();
    if (this.addBankForm.get('accountNumber')?.invalid) {
      return true;
    }
    return false;
  }



  public submitForm(): void {
    this.loadingDialog.showSpinner(true);
    this.exporterService.addBank({
      bankName: this.addBankForm.get('bankName')?.value,
      branch: this.addBankForm.get('branch')?.value,
      accountNumber: this.addBankForm.get('accountNumber')?.value
    })
      .subscribe({
        next: (res: any) => {
          this.loadingDialog.showSpinner(false);
          this.dialogRef.close(res);
        },
        error: (err: any) => {
          this.loadingDialog.showSpinner(false);
          this.dialogService.exporterMessage('error', "Can't change Address");
        }
      });
  }


  public replaceName(value: string): void {
    this.addBankForm.controls[value].setValue(this.addBankForm.get(value)?.value.replace(/[^0-9]+/g, ""));
  }

}
