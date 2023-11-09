/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExporterService } from 'src/app/pages/exporter/http-service/exporter.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { HttpClientResponse, Zipcode } from '@core/models';
import { LoadingSpinnerDialogService } from '@layout/services';
import { ToasterService } from '@common/components/toaster/toaster.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.scss']
})
export class ChangeNameComponent implements OnInit {
  public changeNameForm: FormGroup = new FormGroup({});
  public utils = Utils;

  public constructor(
    public fb: FormBuilder,
    public router: Router,
    public dialogService: DialogConfirmService,
    public exporterService: ExporterService,
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
    this.initialForm();
  }

  private initialForm(): void {
    this.changeNameForm = this.fb.group({
      name: new FormControl(this.data, [])
    });
  }

  public onNoClick(): void {
    if (this.changeNameForm.get('name')?.value !== this.data) {
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

  public validatorName(): void {
    this.changeNameForm.get('name')?.addValidators([this.utils.requireValidator, Validators.maxLength(140)]);
    this.changeNameForm.get('name')?.updateValueAndValidity();
    if (this.changeNameForm.get('name')?.invalid) {
      return;
    }
  }

  public update(value: any) {
    let prevData = JSON.parse(sessionStorage.getItem('user_login') || '{}');
    Object.keys(value).forEach(function (val, key) {
      prevData[val] = value[val];
    });
    sessionStorage.setItem('user_login', JSON.stringify(prevData));
  }

  public submitForm(): void {
    this.changeNameForm.get('name')?.addValidators([this.utils.requireValidator, Validators.maxLength(140)]);
    this.changeNameForm.get('name')?.updateValueAndValidity();
    if (this.changeNameForm.get('name')?.invalid) {
      return;
    }
    this.loadingDialog.showSpinner(true);
    this.exporterService.updateNameExporter({ userName: this.changeNameForm.get('name')?.value })
      .subscribe({
        next: (res: HttpClientResponse) => {
          this.loadingDialog.showSpinner(false);
          this.update({ userName: this.changeNameForm.get('name')?.value });
          this.dialogRef.close(res);
          this.toaster.show('success', 'Success', 'Your name has been changed.');
        },
        error: (err) => {
          this.loadingDialog.showSpinner(false);
          this.dialogRef.close();
          this.toaster.show('error', 'Error', "Can't changed your name.");
        }
      });
  }
}
