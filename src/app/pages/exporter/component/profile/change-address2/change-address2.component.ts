/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { LoadingSpinnerDialogService } from '@layout/services';
import { ExporterService } from '../../../http-service/exporter.service';
import { Zipcode } from '../../../models/exporter.model';
import { ChangeNameComponent } from '../change-name/change-name.component';

@Component({
  selector: 'app-change-address2',
  templateUrl: './change-address2.component.html',
  styleUrls: ['./change-address2.component.scss']
})
export class ChangeAddress2Component implements OnInit {
  public utils = Utils;
  public exporterForm !: FormGroup;
  public zipCode !: Zipcode;

  public constructor(
    public toaster: ToasterService,
    private fb: FormBuilder,
    public dialogService: DialogConfirmService,
    public exporterService: ExporterService,
    public dialogRef: MatDialogRef<ChangeNameComponent>,
    public loadingDialog: LoadingSpinnerDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogRef.backdropClick().subscribe(() => {
      this.onNoClick();
    });
  }

  public ngOnInit(): void {
    // this.companyAddress1 = this.data;
    this.initialForm();
  }
  public initialForm() {
    this.exporterForm = this.fb.group({
      postCode2: new FormControl(this.data.zipCode2, []),
      postalCode2Adress1: new FormControl(this.data.address21, []),
      postalCode2Adress2: new FormControl(this.data.address22, []),
      postalCode2Adress3: new FormControl(this.data.address23, []),
      postalCode2Adress4: new FormControl(this.data.address24, [])
    });
  }

  public blurCompanyAddress(event: any) {
    this.exporterForm.get('companyAddress2')?.setValidators([Validators.maxLength(200), Validators.required]);
    this.exporterForm.get('companyAddress2')?.updateValueAndValidity();
  }
  public replaceCode(value: string): void {

    this.exporterForm.controls[value].setValue(this.exporterForm.get(value)?.value.replace("[0-9]{3}-?[0-9]{4}/g"));
  }
  public getPostCode2(value: number) {
    this.exporterService.getZipcode(value)
      .subscribe({
        next: (res: any) => {
          if (res.data !== null) {
            this.exporterForm.controls['postalCode2Adress1'].setValue(res.data[0].address1);
            this.exporterForm.controls['postalCode2Adress2'].setValue(res.data[0].address2);
            this.exporterForm.controls['postalCode2Adress3'].setValue(res.data[0].address3);
          } else {
            this.exporterForm.controls['postalCode2Adress1'].setValue("");
            this.exporterForm.controls['postalCode2Adress2'].setValue("");
            this.exporterForm.controls['postalCode2Adress3'].setValue("");
            this.exporterForm.controls['postalCode2Adress4'].setValue("");
            this.exporterForm.get('postCode2')?.setValidators([this.utils.invalidFaxPhoneZipcode]);
            this.exporterForm.get('postCode2')?.updateValueAndValidity();
          }
        },
        error: (err) => {
          this.exporterForm.controls['postalCode2Adress1'].setValue("");
          this.exporterForm.controls['postalCode2Adress2'].setValue("");
          this.exporterForm.controls['postalCode2Adress3'].setValue("");
          this.exporterForm.controls['postalCode2Adress4'].setValue("");
          this.exporterForm.get('postCode2')?.setValidators([this.utils.invalidFaxPhoneZipcode]);
          this.exporterForm.get('postCode2')?.updateValueAndValidity();
        },
        complete: () => {

        }
      });
  }

  public postCode2(event: Event) {
    this.exporterForm.get('postCode2')?.setValidators([this.utils.validateZipcode, Validators.required, this.utils.validateBank]);
    this.exporterForm.get('postCode2')?.updateValueAndValidity();
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    if(!this.exporterForm.valid){
      return;
    }
    this.loadingDialog.showSpinner(true);
    let postcode2 = value.replace('-', '');
    if (value) {
      this.getPostCode2(parseInt(postcode2));
    } else {
      this.exporterForm.controls['postalCode2Adress1'].setValue("");
      this.exporterForm.controls['postalCode2Adress2'].setValue("");
      this.exporterForm.controls['postalCode2Adress3'].setValue("");
      this.exporterForm.controls['postalCode2Adress4'].setValue("");
    }
    this.loadingDialog.showSpinner(false);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public onNoClick(): void {
    if (this.exporterForm.get('postCode2')?.value !== this.data.zipCode2 || this.exporterForm.get('postalCode2Adress4')?.value !== this.data.address24) {
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
    this.exporterService.changeAddress2Exporter({
      zipCode2: this.exporterForm.get('postCode2')?.value,
      address21: this.exporterForm.get('postalCode2Adress1')?.value,
      address22: this.exporterForm.get('postalCode2Adress2')?.value,
      address23: this.exporterForm.get('postalCode2Adress3')?.value,
      address24: this.exporterForm.get('postalCode2Adress4')?.value
    })
      .subscribe({
        next: (res) => {
          this.loadingDialog.showSpinner(false);
          this.dialogRef.close(res);
          this.toaster.show('success', 'Success', "Your Address2 update successful.");

        },
        error: (err) => {
          this.loadingDialog.showSpinner(false);
          this.dialogService.exporterMessage('error', "Can't change Address");
        }
      });
  }
}
