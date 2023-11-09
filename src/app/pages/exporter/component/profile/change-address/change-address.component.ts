/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { LoadingSpinnerDialogService } from '@layout/services';
import { ZipCodeModel } from 'src/app/pages/system/models/company.model';
import { ExporterService } from '../../../http-service/exporter.service';
import { ExporterInfoModelResponse, Zipcode } from '../../../models/exporter.model';
import { ChangeNameComponent } from '../change-name/change-name.component';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {

  public utils = Utils;
  public dataZipCode!: ZipCodeModel;
  // public dataZipCode1!: Zipcode1;
  public zipCode !: Zipcode;
  public exporterForm !: FormGroup;

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
      postCode1: new FormControl(this.data.zipCode1, []),
      postalCode1Adress1: new FormControl(this.data.address11, []),
      postalCode1Adress2: new FormControl(this.data.address12, []),
      postalCode1Adress3: new FormControl(this.data.address13, []),
      postalCode1Adress4: new FormControl(this.data.address14, [])
    });
  }

  public blurCompanyAddress(event: any) {
    this.exporterForm.get('companyAddress')?.setValidators([Validators.maxLength(200), Validators.required]);
    this.exporterForm.get('companyAddress')?.updateValueAndValidity();
  }
  public replaceCode(value: string): void {

    this.exporterForm.controls[value].setValue(this.exporterForm.get(value)?.value.replace("[0-9]{3}-?[0-9]{4}/g"));
  }
  public getPostCode1(value: number) {
    this.exporterService.getZipcode(value)
      .subscribe({
        next: (res: any) => {
          if (res.data !== null) {
            this.exporterForm.controls['postalCode1Adress1'].setValue(res.data[0].address1);
            this.exporterForm.controls['postalCode1Adress2'].setValue(res.data[0].address2);
            this.exporterForm.controls['postalCode1Adress3'].setValue(res.data[0].address3);
          } else {
            this.exporterForm.controls['postalCode1Adress1'].setValue("");
            this.exporterForm.controls['postalCode1Adress2'].setValue("");
            this.exporterForm.controls['postalCode1Adress3'].setValue("");
            this.exporterForm.controls['postalCode1Adress4'].setValue("");
            this.exporterForm.get('postCode1')?.setValidators([this.utils.invalidFaxPhoneZipcode]);
            this.exporterForm.get('postCode1')?.updateValueAndValidity();
          }
        },
        error: (err) => {
          this.exporterForm.controls['postalCode1Adress1'].setValue("");
          this.exporterForm.controls['postalCode1Adress2'].setValue("");
          this.exporterForm.controls['postalCode1Adress3'].setValue("");
          this.exporterForm.controls['postalCode1Adress4'].setValue("");
          this.exporterForm.get('postCode1')?.setValidators([this.utils.invalidFaxPhoneZipcode]);
          this.exporterForm.get('postCode1')?.updateValueAndValidity();
        },
        complete: () => {

        }
      });
  }

  public postCode1(event: Event) {
    this.exporterForm.get('postCode1')?.setValidators([this.utils.validateZipcode, Validators.required]);
    this.exporterForm.get('postCode1')?.updateValueAndValidity();
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    if (!this.exporterForm.valid) {
      return;
    }
    this.loadingDialog.showSpinner(true);
    let postcode1 = value.replace('-', '');
    if (value) {
      this.getPostCode1(parseInt(postcode1));
    } else {

      this.exporterForm.controls['postalCode1Adress1'].setValue("");
      this.exporterForm.controls['postalCode1Adress2'].setValue("");
      this.exporterForm.controls['postalCode1Adress3'].setValue("");
      this.exporterForm.controls['postalCode1Adress4'].setValue("");
    }
    this.loadingDialog.showSpinner(false);

  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public onNoClick(): void {
    if (this.exporterForm.get('postCode1')?.value !== this.data.zipCode1 || this.exporterForm.get('postalCode1Adress4')?.value !== this.data.address14) {
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
    this.exporterService.changeAddress1Exporter({
      zipCode1: this.exporterForm.get('postCode1')?.value,
      address11: this.exporterForm.get('postalCode1Adress1')?.value,
      address12: this.exporterForm.get('postalCode1Adress2')?.value,
      address13: this.exporterForm.get('postalCode1Adress3')?.value,
      address14: this.exporterForm.get('postalCode1Adress4')?.value
    })
      .subscribe({
        next: (res) => {
          this.loadingDialog.showSpinner(false);
          this.dialogRef.close(res);
          this.toaster.show('success', 'Success', "Your Address1 update successful.");
        },
        error: (err) => {
          this.loadingDialog.showSpinner(false);
          this.dialogService.exporterMessage('error', "Can't change Address");
        }
      });
  }
}
